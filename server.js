const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-memory active session tokens
const activeSessions = new Set();

// Helper to read and write JSON data files safely
function readJson(filename, defaultVal = {}) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return defaultVal;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultVal;
  }
}

function writeJson(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    const pubFilePath = path.join(PUBLIC_DIR, 'data', filename);
    try {
      if (!fs.existsSync(path.join(PUBLIC_DIR, 'data'))) {
        fs.mkdirSync(path.join(PUBLIC_DIR, 'data'), { recursive: true });
      }
      fs.writeFileSync(pubFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch(e) {}
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.webmanifest': 'application/manifest+json'
};

// Parse cookies from request header
function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

// Check admin authentication
function isAuthenticated(req) {
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (activeSessions.has(token)) return true;
  }
  // 2. Check X-Admin-Token header
  const tokenHeader = req.headers['x-admin-token'];
  if (tokenHeader && activeSessions.has(tokenHeader.trim())) {
    return true;
  }
  // 3. Check Cookie
  const cookies = parseCookies(req);
  return Boolean(cookies.admin_session && activeSessions.has(cookies.admin_session));
}

// Helper to read JSON request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) { // 50MB limit for image uploads
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// HTML Generator helper for dynamic About Us & Privacy Policy pages
function renderDynamicContentPage(pageTitle, pageHeading, contentHtml, siteConfig, categories) {
  const ad = siteConfig.adsense || {};
  const adHeaderScript = ad.enabled ? `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ad.publisherId || 'ca-pub-1234567890123456'}" crossorigin="anonymous"></script>
  ` : '';

  const analytics = siteConfig.analytics || {};
  const gaId = analytics.measurementId ? analytics.measurementId.trim() : '';
  const analyticsHeaderScript = (analytics.enabled && gaId) ? `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        page_path: window.location.pathname + window.location.search,
        cookie_flags: 'SameSite=None;Secure'
      });
    </script>
  ` : '';

  const catLinks = categories.map(c => `
    <li><a href="/${c.id}/">${c.icon || '🎨'} Online ${c.name} Coloring Pages</a></li>
  `).join('');

  const logo = siteConfig.logo || {};
  const logoMode = logo.mode || (logo.imageSrc ? 'image_text' : 'icon_text');
  const siteName = siteConfig.siteName || 'ColoringTool';
  let logoHtml = `
    <a href="/" class="brand-logo" title="${siteName}">
      <div class="brand-logo-icon">${logo.icon || '🎨'}</div>
      <span class="brand-text">Coloring<span class="brand-accent">Tool</span><span style="font-size:0.95rem;opacity:0.85;">.com</span></span>
    </a>
  `;
  if (logoMode === 'image_only' && logo.imageSrc) {
    logoHtml = `
      <a href="/" class="brand-logo" title="${siteName}">
        <img src="${logo.imageSrc}" alt="${siteName}" class="brand-custom-logo" style="max-height:40px;max-width:180px;object-fit:contain;display:block;">
      </a>
    `;
  } else if (logoMode === 'image_text' && logo.imageSrc) {
    logoHtml = `
      <a href="/" class="brand-logo" title="${siteName}">
        <img src="${logo.imageSrc}" alt="${siteName}" class="brand-custom-logo" style="max-height:38px;max-width:44px;object-fit:contain;border-radius:8px;display:block;">
        <span class="brand-text">Coloring<span class="brand-accent">Tool</span><span style="font-size:0.95rem;opacity:0.85;">.com</span></span>
      </a>
    `;
  }

  const seo = siteConfig.seo || {};
  const base = (seo.canonicalBase || 'https://coloringtool.com').replace(/\/+$/, '');
  let canonicalPath = '/about.html';
  let metaDescription = 'Learn about ColoringTool.com: safe, fun, and free online coloring activities for kids and families worldwide.';

  if (pageTitle.toLowerCase().includes('privacy')) {
    canonicalPath = '/privacy.html';
    metaDescription = 'Privacy Policy for ColoringTool.com. We prioritize child safety, strict COPPA compliance, and Google AdSense transparency.';
  } else if (pageTitle.toLowerCase().includes('terms')) {
    canonicalPath = '/terms.html';
    metaDescription = 'Terms of Use and educational coloring license for ColoringTool.com. Free online coloring games and classroom printables.';
  } else if (pageTitle.toLowerCase().includes('contact')) {
    canonicalPath = '/contact.html';
    metaDescription = 'Contact ColoringTool.com for support, teacher inquiries, drawing suggestions, and COPPA child privacy questions.';
  }

  const canonicalUrl = `${base}${canonicalPath}`;
  const shareImg = seo.ogImage ? (seo.ogImage.startsWith('http') ? seo.ogImage : `${base}${seo.ogImage}`) : `${base}/my-favicon/favicon-96x96.png`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle} — ColoringTool.com</title>
  <meta name="description" content="${metaDescription}">
  <meta name="keywords" content="${seo.keywords || 'coloring pages, online coloring for kids'}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="${seo.robotsDirectives || 'index, follow, max-image-preview:large'}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${siteName}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${pageTitle} — ColoringTool.com">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:image" content="${shareImg}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle} — ColoringTool.com">
  <meta name="twitter:description" content="${metaDescription}">
  <meta name="twitter:image" content="${shareImg}">

  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  <!-- Navigation Header -->
  <nav class="site-nav">
    <div class="nav-container">
      ${logoHtml}
      <button class="nav-toggle-btn" aria-label="Toggle Navigation" onclick="document.getElementById('serverNavLinks').classList.toggle('mobile-open')">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
      <div class="nav-links" id="serverNavLinks">
        <a href="/">🏠 Home</a>
        <div class="dropdown">
          <a href="#" class="dropbtn" onclick="if(window.innerWidth<=768){this.closest('.dropdown').classList.toggle('mobile-open');return false;}">📂 Categories ▾</a>
          <div class="dropdown-content">
            ${categories.map(c => `<a href="/${c.id}/">${c.icon || '🎨'} ${c.name}</a>`).join('')}
          </div>
        </div>
        <a href="/gallery.html">🎨 My Art Gallery</a>
        <a href="/about.html" ${pageHeading.toLowerCase().includes('about') ? 'class="active"' : ''}>ℹ️ About Us</a>
        <a href="/privacy.html" ${pageHeading.toLowerCase().includes('privacy') ? 'class="active"' : ''}>🔒 Privacy Policy</a>
      </div>
    </div>
  </nav>

  <!-- Main Content Container -->
  <main class="page-container" style="max-width:960px;margin:40px auto;padding:0 20px;">
    <div class="card-panel" style="background:#FFFFFF;border-radius:20px;padding:36px;box-shadow:0 8px 30px rgba(15,23,42,0.08);border:1px solid #E2E8F0;line-height:1.75;font-size:1.05rem;color:#334155;">
      ${contentHtml}
    </div>
  </main>

  <!-- Google AdSense Container -->
  ${ad.enabled ? `
  <div class="adsense-wrapper">
    <div class="adsense-unit">
      <div class="ad-notice">ADVERTISEMENT</div>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="${ad.publisherId}"
           data-ad-slot="${ad.belowGameSlot || '3456789012'}"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>` : ''}

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <div class="footer-logo">
          ${logo.imageSrc ?
            `<img src="${logo.imageSrc}" alt="${siteConfig.siteName || 'ColoringTool.com'}" style="max-height:36px;max-width:140px;object-fit:contain;display:block;">` :
            `<div class="brand-logo-icon" style="width:34px;height:34px;font-size:1.2rem;">${logo.icon || '🎨'}</div>
             <strong>${siteConfig.siteName || 'ColoringTool'}.com</strong>`
          }
        </div>
        <p>${siteConfig.tagline}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
          <span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);padding:4px 10px;border-radius:20px;font-size:0.75rem;color:#E2E8F0;">🛡️ Kid-Safe &amp; COPPA Compliant</span>
          <span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);padding:4px 10px;border-radius:20px;font-size:0.75rem;color:#E2E8F0;">🔒 SSL Secure</span>
        </div>
      </div>
      <div class="footer-links-group">
        <h4>Coloring Themes</h4>
        <ul>
          ${catLinks}
        </ul>
      </div>
      <div class="footer-links-group">
        <h4>Quick Navigation</h4>
        <ul>
          <li><a href="/">🏠 Homepage</a></li>
          <li><a href="/gallery.html">🎨 My Art Gallery</a></li>
          <li><a href="/studio.html?random=1">✨ Random Drawing</a></li>
          <li><a href="/about.html">ℹ️ About Our Mission</a></li>
          <li><a href="/contact.html">✉️ Contact Us &amp; FAQ</a></li>
        </ul>
      </div>
      <div class="footer-links-group">
        <h4>Legal &amp; Policies</h4>
        <ul>
          <li><a href="/privacy.html">🔒 Privacy Policy</a></li>
          <li><a href="/terms.html">📜 Terms of Use</a></li>
          <li><a href="/contact.html">✉️ Contact Support</a></li>
          <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">🍪 Google Ad Choices</a></li>
          <li><a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">🌐 AboutAds Opt-Out</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 <a href="/">ColoringTool.com</a> &bull; All rights reserved. Free online drawing and coloring games for kids. Safe, instant, educational!</p>
      <div style="margin-top:10px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;font-size:0.85rem;">
        <a href="/privacy.html" style="color:#94A3B8;">Privacy Policy</a> &bull;
        <a href="/terms.html" style="color:#94A3B8;">Terms of Use</a> &bull;
        <a href="/contact.html" style="color:#94A3B8;">Contact Us</a> &bull;
        <a href="/about.html" style="color:#94A3B8;">About Us</a> &bull;
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color:#94A3B8;">Ad Settings</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method.toUpperCase();

  // Set global security and CORS headers
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  if (origin !== '*') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // ========================================================
  // ROOT GOOGLE ADSENSE ads.txt ROUTE
  // ========================================================
  if (pathname === '/ads.txt') {
    const siteConfig = readJson('site_config.json');
    const adsTxt = siteConfig.adsense?.adsTxtContent || `google.com, ${siteConfig.adsense?.publisherId || 'pub-1234567890123456'}, DIRECT, f08c47fec0942fa0`;
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
    return res.end(adsTxt);
  }

  // ========================================================
  // PUBLIC API ENDPOINTS
  // ========================================================
  if (pathname === '/api/games' && method === 'GET') {
    const games = readJson('games.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    return res.end(JSON.stringify(games));
  }

  if (pathname === '/api/categories' && method === 'GET') {
    const categories = readJson('categories.json', []);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    return res.end(JSON.stringify(categories));
  }

  if (pathname.startsWith('/api/game/') && method === 'GET') {
    const parts = pathname.replace('/api/game/', '').split('/');
    const cat = parts[0];
    const slug = parts[1]?.replace('.php', '').replace('.html', '');
    const games = readJson('games.json', []);
    const game = games.find(g => g.catId === cat && (g.slug === slug || g.id === slug));
    if (game) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify(game));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ error: 'Drawing not found' }));
    }
  }

  // ========================================================
  // ADMIN AUTHENTICATION API
  // ========================================================
  if (pathname === '/api/admin/check' && method === 'GET') {
    const authed = isAuthenticated(req);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    return res.end(JSON.stringify({ authenticated: authed }));
  }

  if (pathname === '/api/admin/login' && method === 'POST') {
    const body = await parseBody(req);
    const siteConfig = readJson('site_config.json');
    const validUsername = siteConfig.admin?.username || 'admin';
    const validPassword = siteConfig.admin?.password || 'admin123';

    if (body.username === validUsername && body.password === validPassword) {
      const sessionToken = crypto.randomBytes(32).toString('hex');
      activeSessions.add(sessionToken);

      // Set cookie for 7 days
      res.writeHead(200, {
        'Set-Cookie': `admin_session=${sessionToken}; Path=/; HttpOnly; Max-Age=604800; SameSite=Lax`,
        'Content-Type': 'application/json; charset=UTF-8'
      });
      return res.end(JSON.stringify({ success: true, token: sessionToken, message: 'Login successful' }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }));
    }
  }

  if (pathname === '/api/admin/logout' && method === 'POST') {
    const cookies = parseCookies(req);
    if (cookies.admin_session) {
      activeSessions.delete(cookies.admin_session);
    }
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      activeSessions.delete(authHeader.slice(7).trim());
    }
    const tokenHeader = req.headers['x-admin-token'];
    if (tokenHeader) {
      activeSessions.delete(tokenHeader.trim());
    }
    res.writeHead(200, {
      'Set-Cookie': `admin_session=; Path=/; HttpOnly; Max-Age=0`,
      'Content-Type': 'application/json; charset=UTF-8'
    });
    return res.end(JSON.stringify({ success: true }));
  }

  // ========================================================
  // ADMIN CRUD & CONFIGURATION ENDPOINTS (Protected)
  // ========================================================
  if (pathname.startsWith('/api/admin/')) {
    if (!isAuthenticated(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ error: 'Unauthorized. Please login.' }));
    }

    // 1. Get Site Config (AdSense, About Us, Privacy Policy, Admin settings)
    if (pathname === '/api/admin/config' && method === 'GET') {
      const siteConfig = readJson('site_config.json');
      const safeConfig = {
        siteName: siteConfig.siteName,
        domain: siteConfig.domain,
        siteTitle: siteConfig.siteTitle,
        tagline: siteConfig.tagline,
        adsense: siteConfig.adsense,
        aboutUsHtml: siteConfig.aboutUsHtml,
        privacyPolicyHtml: siteConfig.privacyPolicyHtml,
        admin: { username: siteConfig.admin?.username || 'admin' }
      };
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify(safeConfig));
    }

    // 2. Add or Edit Coloring Page (Picture)
    if (pathname === '/api/admin/games' && method === 'POST') {
      const body = await parseBody(req);
      const games = readJson('games.json', []);
      const categories = readJson('categories.json', []);

      const catObj = categories.find(c => c.id === body.catId) || categories[0] || { id: 'animals', name: 'Animals' };
      let imagePath = body.imageUrl || '';
      let colorImagePath = body.colorImageUrl || '';

      // Helper to save base64 image to uploads/
      function saveBase64File(base64Str, prefix = 'drawing', originalFilename = '') {
        if (!base64Str || typeof base64Str !== 'string') return null;
        try {
          const commaIdx = base64Str.indexOf(',');
          const base64Data = commaIdx !== -1 ? base64Str.slice(commaIdx + 1) : base64Str;
          let ext = 'png';
          if (commaIdx !== -1) {
            const header = base64Str.slice(0, commaIdx);
            const m = header.match(/data:image\/([a-zA-Z0-9\+\-\.]+)/);
            if (m) {
              const matchedExt = m[1].toLowerCase();
              if (matchedExt === 'jpeg' || matchedExt === 'jpg') ext = 'jpg';
              else if (matchedExt === 'svg+xml' || matchedExt === 'svg') ext = 'svg';
              else if (matchedExt === 'webp') ext = 'webp';
              else ext = 'png';
            }
          }
          const cleanName = (originalFilename || `${prefix}_${Date.now()}`).replace(/[^a-zA-Z0-9_\-\.]/g, '_');
          const finalFilename = cleanName.endsWith(`.${ext}`) ? cleanName : `${cleanName}.${ext}`;
          const targetDiskPath = path.join(UPLOADS_DIR, finalFilename);
          fs.writeFileSync(targetDiskPath, Buffer.from(base64Data, 'base64'));
          return `uploads/${finalFilename}`;
        } catch (uploadErr) {
          console.error('Failed to save uploaded image:', uploadErr);
          return null;
        }
      }

      if (body.imageBase64) {
        const saved = saveBase64File(body.imageBase64, 'drawing', body.filename);
        if (saved) imagePath = saved;
      }

      if (body.colorImageBase64) {
        const saved = saveBase64File(body.colorImageBase64, 'sample', body.colorFilename);
        if (saved) colorImagePath = saved;
      }

      if (body.id) {
        // Edit existing game
        const idx = games.findIndex(g => g.id === body.id);
        if (idx !== -1) {
          games[idx].label = body.title || games[idx].label;
          games[idx].catId = body.catId || games[idx].catId;
          games[idx].catName = catObj.name;
          if (imagePath) games[idx].fullImageSrc = imagePath;
          if (colorImagePath) games[idx].thumbSrc = colorImagePath;
          else if (imagePath && !games[idx].thumbSrc) games[idx].thumbSrc = imagePath;
          if (body.desc) games[idx].descriptionText = body.desc;
          writeJson('games.json', games);

          try {
            const { execSync } = require('child_process');
            execSync('node generate_pages.js', { cwd: __dirname });
            execSync('node generate_worker.js', { cwd: __dirname });
          } catch(e) {}

          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          return res.end(JSON.stringify({ success: true, game: games[idx] }));
        }
      }

      // Create new game
      const slug = (body.title || 'new-drawing').toLowerCase().replace(/[^a-z0-9\-]/g, '-').replace(/-+/g, '-');
      const newGame = {
        id: `game-${Date.now()}`,
        catId: catObj.id,
        catName: catObj.name,
        slug: slug,
        label: body.title,
        thumbSrc: colorImagePath || imagePath || `${catObj.id}/img/${slug}.png`,
        fullImageSrc: imagePath || colorImagePath || `${catObj.id}/img/${slug}.png`,
        gameScript: '', // Custom uploaded coloring sheet runs interactive raster/fill canvas
        descriptionText: body.desc || `Free online coloring page: ${body.title}. Fun coloring activity for kids ages 3 to 10 on ColoringTool.com`,
        h1: `Online ${body.title} Coloring Page for Kids`,
        metaDescription: `Color and paint this ${body.title} online for free on ColoringTool.com!`,
        createdAt: new Date().toISOString()
      };

      games.unshift(newGame);
      writeJson('games.json', games);

      try {
        const { execSync } = require('child_process');
        execSync('node generate_pages.js', { cwd: __dirname });
        execSync('node generate_worker.js', { cwd: __dirname });
      } catch (genErr) {
        console.error('Failed to regenerate pages:', genErr);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true, game: newGame }));
    }

    // 3. Delete Coloring Page
    if (pathname.startsWith('/api/admin/games/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/games/', '');
      let games = readJson('games.json', []);
      games = games.filter(g => g.id !== id && g.slug !== id);
      writeJson('games.json', games);

      try {
        const { execSync } = require('child_process');
        execSync('node generate_pages.js', { cwd: __dirname });
        execSync('node generate_worker.js', { cwd: __dirname });
      } catch (genErr) {}

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true }));
    }

    // 4. Add Category
    if (pathname === '/api/admin/categories' && method === 'POST') {
      const body = await parseBody(req);
      const categories = readJson('categories.json', []);
      const newCat = {
        id: body.slug.toLowerCase().replace(/[^a-z0-9\-]/g, '-'),
        name: body.name,
        icon: body.icon || '🎨',
        color: body.color || '#4F46E5',
        banner: body.banner || 'minis-menu/sm-animals.png',
        description: body.desc || `Explore beautiful ${body.name} coloring pages for kids online.`
      };
      categories.push(newCat);
      writeJson('categories.json', categories);

      // Ensure directory exists for category
      const catDir = path.join(PUBLIC_DIR, newCat.id);
      if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true, category: newCat }));
    }

    // 5. Delete Category
    if (pathname.startsWith('/api/admin/categories/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/categories/', '');
      let categories = readJson('categories.json', []);
      categories = categories.filter(c => c.id !== id);
      writeJson('categories.json', categories);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true }));
    }

    // 6. Save About Us, Privacy Policy, Terms of Use, and Contact Us content
    if (pathname === '/api/admin/content' && method === 'POST') {
      const body = await parseBody(req);
      const siteConfig = readJson('site_config.json');
      if (body.aboutUsHtml !== undefined) siteConfig.aboutUsHtml = body.aboutUsHtml;
      if (body.privacyPolicyHtml !== undefined) siteConfig.privacyPolicyHtml = body.privacyPolicyHtml;
      if (body.termsHtml !== undefined) siteConfig.termsHtml = body.termsHtml;
      if (body.contactHtml !== undefined) siteConfig.contactHtml = body.contactHtml;
      writeJson('site_config.json', siteConfig);

      try {
        const { execSync } = require('child_process');
        execSync('node generate_pages.js', { cwd: __dirname });
      } catch (genErr) {
        console.error('Failed to regenerate pages:', genErr);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true }));
    }

    // 7. Save Google AdSense & ads.txt settings
    if (pathname === '/api/admin/adsense' && method === 'POST') {
      const body = await parseBody(req);
      const siteConfig = readJson('site_config.json');
      siteConfig.adsense = {
        enabled: Boolean(body.enabled),
        publisherId: body.publisherId || siteConfig.adsense?.publisherId || 'ca-pub-1234567890123456',
        autoAds: Boolean(body.autoAds),
        headerSlot: body.headerSlot || '1234567890',
        sidebarSlot: body.sidebarSlot || '2345678901',
        belowGameSlot: body.belowGameSlot || '3456789012',
        adsTxtContent: body.adsTxtContent || `google.com, ${body.publisherId || 'pub-1234567890123456'}, DIRECT, f08c47fec0942fa0`
      };
      writeJson('site_config.json', siteConfig);

      // Also write root public/ads.txt file for static web servers
      try {
        fs.writeFileSync(path.join(PUBLIC_DIR, 'ads.txt'), siteConfig.adsense.adsTxtContent, 'utf-8');
      } catch (e) {}

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true }));
    }

    // 8. Update Admin Credentials (Username and Password)
    if (pathname === '/api/admin/credentials' && method === 'POST') {
      const body = await parseBody(req);
      const siteConfig = readJson('site_config.json');
      if (!siteConfig.admin) siteConfig.admin = {};
      if (body.username) siteConfig.admin.username = body.username.trim();
      if (body.password) siteConfig.admin.password = body.password.trim();
      writeJson('site_config.json', siteConfig);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true }));
    }

    // 9. Save Google Analytics Settings
    if (pathname === '/api/admin/analytics' && method === 'POST') {
      const body = await parseBody(req);
      const siteConfig = readJson('site_config.json');
      siteConfig.analytics = {
        enabled: Boolean(body.enabled),
        measurementId: (body.measurementId || '').trim(),
        sendPageView: body.sendPageView !== undefined ? Boolean(body.sendPageView) : true,
        trackDrawingClicks: body.trackDrawingClicks !== undefined ? Boolean(body.trackDrawingClicks) : true,
        trackArtworkSaves: body.trackArtworkSaves !== undefined ? Boolean(body.trackArtworkSaves) : true,
        trackPrints: body.trackPrints !== undefined ? Boolean(body.trackPrints) : true
      };
      writeJson('site_config.json', siteConfig);

      // Trigger automatic regeneration of static pages
      try {
        const { execSync } = require('child_process');
        execSync('node generate_pages.js', { cwd: __dirname });
      } catch (genErr) {
        console.error('Failed to regenerate pages:', genErr);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true, analytics: siteConfig.analytics }));
    }

    // 10. Update Website Logo & Branding
    if (pathname === '/api/admin/logo' && method === 'POST') {
      const body = await parseBody(req);
      const siteConfig = readJson('site_config.json');
      if (!siteConfig.logo) siteConfig.logo = {};

      let logoUrl = body.logoUrl || siteConfig.logo.imageSrc || '';

      if (body.imageBase64) {
        try {
          const match = body.imageBase64.match(/^data:image\/([a-zA-Z0-9\+]+);base64,(.+)$/);
          const ext = match ? (match[1].replace('svg+xml', 'svg')) : 'png';
          const base64Data = match ? match[2] : body.imageBase64;
          const cleanName = (body.filename || `logo_${Date.now()}`).replace(/[^a-zA-Z0-9_\-\.]/g, '_');
          const finalFilename = cleanName.endsWith(`.${ext}`) ? cleanName : `${cleanName}.${ext}`;
          const targetDiskPath = path.join(UPLOADS_DIR, finalFilename);

          fs.writeFileSync(targetDiskPath, Buffer.from(base64Data, 'base64'));
          logoUrl = `/uploads/${finalFilename}`;
        } catch (uploadErr) {
          console.error('Failed to save uploaded logo:', uploadErr);
        }
      }

      siteConfig.logo = {
        imageSrc: logoUrl,
        icon: body.icon || siteConfig.logo.icon || '🎨',
        mode: body.mode || siteConfig.logo.mode || (logoUrl ? 'image_text' : 'icon_text'),
        text: body.text || siteConfig.logo.text || 'ColoringTool'
      };
      if (body.siteName) siteConfig.siteName = body.siteName;

      writeJson('site_config.json', siteConfig);

      // Trigger automatic regeneration of static pages
      try {
        const { execSync } = require('child_process');
        execSync('node generate_pages.js', { cwd: __dirname });
      } catch (genErr) {
        console.error('Failed to regenerate pages:', genErr);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true, logo: siteConfig.logo, siteName: siteConfig.siteName }));
    }

    // 11. Update SEO & Keywords Configuration
    if (pathname === '/api/admin/seo' && method === 'POST') {
      const body = await parseBody(req);
      const siteConfig = readJson('site_config.json');
      if (!siteConfig.seo) siteConfig.seo = {};

      siteConfig.seo = {
        defaultTitle: (body.defaultTitle !== undefined ? body.defaultTitle : (siteConfig.seo.defaultTitle || '')).trim(),
        defaultDescription: (body.defaultDescription !== undefined ? body.defaultDescription : (siteConfig.seo.defaultDescription || '')).trim(),
        keywords: (body.keywords !== undefined ? body.keywords : (siteConfig.seo.keywords || '')).trim(),
        canonicalBase: (body.canonicalBase || siteConfig.seo.canonicalBase || 'https://coloringtool.com').trim(),
        ogImage: (body.ogImage || siteConfig.seo.ogImage || '/my-favicon/favicon-96x96.png').trim(),
        googleVerification: (body.googleVerification !== undefined ? body.googleVerification : (siteConfig.seo.googleVerification || '')).trim(),
        bingVerification: (body.bingVerification !== undefined ? body.bingVerification : (siteConfig.seo.bingVerification || '')).trim(),
        robotsDirectives: (body.robotsDirectives || siteConfig.seo.robotsDirectives || 'index, follow, max-image-preview:large').trim(),
        robotsTxt: (body.robotsTxt !== undefined ? body.robotsTxt : (siteConfig.seo.robotsTxt || '')).trim(),
        ratingValue: (body.ratingValue || siteConfig.seo.ratingValue || '4.9').trim(),
        ratingCount: (body.ratingCount || siteConfig.seo.ratingCount || '1280').trim()
      };

      writeJson('site_config.json', siteConfig);

      // Trigger automatic regeneration of static pages & sitemap
      try {
        const { execSync } = require('child_process');
        execSync('node generate_pages.js', { cwd: __dirname });
      } catch (genErr) {
        console.error('Failed to regenerate pages:', genErr);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: true, seo: siteConfig.seo }));
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=UTF-8' });
    return res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }

  // ========================================================
  // DYNAMIC HTML PAGES (About Us & Privacy Policy)
  // ========================================================
  if (pathname === '/about' || pathname === '/about.html') {
    const siteConfig = readJson('site_config.json');
    const categories = readJson('categories.json', []);
    const html = renderDynamicContentPage(
      'About Us',
      'About ColoringTool.com',
      siteConfig.aboutUsHtml || '<h2>About ColoringTool.com</h2><p>Welcome to ColoringTool.com!</p>',
      siteConfig,
      categories
    );
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    return res.end(html);
  }

  if (pathname === '/privacy' || pathname === '/privacy.html') {
    const siteConfig = readJson('site_config.json');
    const categories = readJson('categories.json', []);
    const html = renderDynamicContentPage(
      'Privacy Policy',
      'Privacy Policy',
      siteConfig.privacyPolicyHtml || '<h2>Privacy Policy</h2><p>Privacy Policy content...</p>',
      siteConfig,
      categories
    );
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    return res.end(html);
  }

  if (pathname === '/terms' || pathname === '/terms.html') {
    const siteConfig = readJson('site_config.json');
    const categories = readJson('categories.json', []);
    const html = renderDynamicContentPage(
      'Terms of Use',
      'Terms of Use',
      siteConfig.termsHtml || '<h2>Terms of Use</h2><p>Terms of Use content...</p>',
      siteConfig,
      categories
    );
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    return res.end(html);
  }

  if (pathname === '/contact' || pathname === '/contact.html') {
    const siteConfig = readJson('site_config.json');
    const categories = readJson('categories.json', []);
    const html = renderDynamicContentPage(
      'Contact Us',
      'Contact Us',
      siteConfig.contactHtml || '<h2>Contact Us</h2><p>Contact Us content...</p>',
      siteConfig,
      categories
    );
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    return res.end(html);
  }

  // ========================================================
  // SEO ROUTES (Sitemap & Robots.txt)
  // ========================================================
  if (pathname === '/sitemap.xml') {
    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.writeHead(200, { 'Content-Type': 'application/xml; charset=UTF-8' });
      return fs.createReadStream(sitemapPath).pipe(res);
    }
  }

  if (pathname === '/robots.txt') {
    const siteConfig = readJson('site_config.json');
    const robotsTxt = siteConfig.seo?.robotsTxt || `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n\nSitemap: https://coloringtool.com/sitemap.xml\n`;
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
    return res.end(robotsTxt);
  }

  // ========================================================
  // ROUTE NORMALIZATION & SHORTCUTS
  // ========================================================
  if (pathname === '/' || pathname === '/index.php') {
    pathname = '/index.html';
  }

  if (pathname === '/admin' || pathname === '/admin/') {
    pathname = '/admin/index.html';
  }

  // Handle category root routes e.g. /animals or /animals/
  const categories = readJson('categories.json', []);
  const catMatch = categories.find(c => pathname === `/${c.id}` || pathname === `/${c.id}/`);
  if (catMatch) {
    pathname = `/${catMatch.id}/index.html`;
  }

  // Handle individual drawing games e.g. /animals/monkey.php or /unicorn/jumping-unicorn
  const gameMatch = pathname.match(/^\/([a-zA-Z0-9_\-]+)\/([a-zA-Z0-9_\-\.]+)(?:\.php|\.html)?$/);
  if (gameMatch) {
    const cat = gameMatch[1];
    let slug = gameMatch[2].replace('.php', '').replace('.html', '');
    if (slug !== 'index') {
      const games = readJson('games.json', []);
      const found = games.find(g => g.catId === cat && (g.slug === slug || g.id === slug));
      if (found) {
        pathname = '/studio.html';
      }
    }
  }

  // ========================================================
  // STATIC FILE SERVING
  // ========================================================
  let filePath = path.join(PUBLIC_DIR, pathname.replace(/^\//, ''));

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, try with .html extension
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // If file still doesn't exist, serve friendly 404
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    return res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Page Not Found | ColoringTool.com</title>
        <link rel="stylesheet" href="/css/modern-theme.css">
        <style>
          body { text-align: center; padding: 60px 20px; background: #F8FAFC; color: #0F172A; }
          .error-card { max-width: 580px; margin: auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 2px solid #E2E8F0; }
          a.btn { display: inline-block; background: #4F46E5; color: white; padding: 12px 28px; border-radius: 25px; text-decoration: none; font-weight: 700; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="error-card">
          <div style="font-size:3rem;margin-bottom:10px;">🎨</div>
          <h1>Drawing Not Found</h1>
          <p>We couldn't locate this coloring drawing, but over 100 free pictures are ready to paint right now!</p>
          <a class="btn" href="/">Return to ColoringTool.com Homepage 🚀</a>
        </div>
      </body>
      </html>
    `);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`🎨 ColoringTool.com server running at http://localhost:${PORT}`);
  console.log(`⚙️ Admin Dashboard: http://localhost:${PORT}/admin/ (User: admin / Pass: admin123)`);
  console.log(`📄 Root ads.txt: http://localhost:${PORT}/ads.txt`);
});
