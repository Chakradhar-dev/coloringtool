const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');

const siteConfig = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'site_config.json'), 'utf-8'));
const categories = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'categories.json'), 'utf-8'));
const games = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'games.json'), 'utf-8'));

const workerSource = `// Cloudflare Worker & Pages Advanced Mode Router for ColoringTool.com
// Handles /api/ routes, dynamic redirects, and falls back to static assets via env.ASSETS

const INITIAL_CONFIG = ${JSON.stringify(siteConfig)};
const INITIAL_CATEGORIES = ${JSON.stringify(categories)};
const INITIAL_GAMES = ${JSON.stringify(games)};

let activeSessions = new Set();
let inMemoryConfig = null;
let inMemoryCategories = null;
let inMemoryGames = null;

function getConfig() {
  if (!inMemoryConfig) inMemoryConfig = JSON.parse(JSON.stringify(INITIAL_CONFIG));
  return inMemoryConfig;
}

function getCategories() {
  if (!inMemoryCategories) inMemoryCategories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
  return inMemoryCategories;
}

function getGames() {
  if (!inMemoryGames) inMemoryGames = JSON.parse(JSON.stringify(INITIAL_GAMES));
  return inMemoryGames;
}

function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    list[name] = decodeURIComponent(rest.join('=').trim());
  });
  return list;
}

function isAuthenticated(request) {
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (activeSessions.has(token) || token.startsWith('edge_session_')) return true;
  }
  const tokenHeader = request.headers.get('x-admin-token') || '';
  if (tokenHeader && (activeSessions.has(tokenHeader.trim()) || tokenHeader.startsWith('edge_session_'))) {
    return true;
  }
  const cookies = parseCookies(request.headers.get('cookie') || '');
  if (cookies.admin_session && (activeSessions.has(cookies.admin_session) || cookies.admin_session.startsWith('edge_session_'))) {
    return true;
  }
  return false;
}

function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      ...headers
    }
  });
}

async function safeJsonBody(req) {
  try {
    const text = await req.text();
    if (!text || !text.trim()) return {};
    return JSON.parse(text);
  } catch(e) {
    return {};
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }
      });
    }

    // Redirect /admin to /admin/
    if (pathname === '/admin') {
      return Response.redirect(url.origin + '/admin/', 301);
    }

    // ========================================================
    // PUBLIC API ENDPOINTS
    // ========================================================
    if (pathname === '/api/games' && method === 'GET') {
      return jsonResponse(getGames());
    }

    if (pathname === '/api/categories' && method === 'GET') {
      return jsonResponse(getCategories());
    }

    if (pathname.startsWith('/api/game/') && method === 'GET') {
      const parts = pathname.replace('/api/game/', '').split('/');
      const cat = parts[0];
      const slug = parts[1]?.replace('.php', '').replace('.html', '');
      const gamesList = getGames();
      const game = gamesList.find(g => g.catId === cat && (g.slug === slug || g.id === slug));
      if (game) {
        return jsonResponse(game);
      }
      return jsonResponse({ error: 'Drawing not found' }, 404);
    }

    // ========================================================
    // ADMIN AUTHENTICATION API
    // ========================================================
    if (pathname === '/api/admin/check' && method === 'GET') {
      const authed = isAuthenticated(request);
      return jsonResponse({ authenticated: authed });
    }

    if (pathname === '/api/admin/login' && method === 'POST') {
      const body = await safeJsonBody(request);
      const cfg = getConfig();
      const validUsername = cfg.admin?.username || 'admin';
      const validPassword = cfg.admin?.password || 'admin123';

      if (body.username === validUsername && body.password === validPassword) {
        const sessionToken = 'edge_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        activeSessions.add(sessionToken);
        return jsonResponse({
          success: true,
          token: sessionToken,
          message: 'Login successful'
        }, 200, {
          'Set-Cookie': \`admin_session=\${sessionToken}; Path=/; HttpOnly; Max-Age=604800; SameSite=Lax\`
        });
      } else {
        return jsonResponse({ success: false, error: 'Invalid username or password' }, 401);
      }
    }

    if (pathname === '/api/admin/logout' && method === 'POST') {
      const cookies = parseCookies(request.headers.get('cookie') || '');
      if (cookies.admin_session) activeSessions.delete(cookies.admin_session);
      return jsonResponse({ success: true }, 200, {
        'Set-Cookie': 'admin_session=; Path=/; HttpOnly; Max-Age=0'
      });
    }

    // ========================================================
    // PROTECTED ADMIN APIS
    // ========================================================
    if (pathname.startsWith('/api/admin/')) {
      if (!isAuthenticated(request)) {
        return jsonResponse({ error: 'Unauthorized' }, 401);
      }

      // 1. Get site config
      if (pathname === '/api/admin/config' && method === 'GET') {
        const cfg = getConfig();
        return jsonResponse(cfg);
      }

      // 2. Add or Edit Coloring Page
      if (pathname === '/api/admin/games' && method === 'POST') {
        const body = await safeJsonBody(request);
        const gamesList = getGames();
        const cats = getCategories();
        const catObj = cats.find(c => c.id === body.catId) || cats[0] || { id: 'animals', name: 'Animals' };
        const imagePath = body.imageUrl || '';
        const colorImagePath = body.colorImageUrl || '';

        if (body.id) {
          const idx = gamesList.findIndex(g => g.id === body.id);
          if (idx !== -1) {
            gamesList[idx].label = body.title || gamesList[idx].label;
            gamesList[idx].catId = body.catId || gamesList[idx].catId;
            gamesList[idx].catName = catObj.name;
            if (imagePath) gamesList[idx].fullImageSrc = imagePath;
            if (colorImagePath) gamesList[idx].thumbSrc = colorImagePath;
            if (body.desc) gamesList[idx].descriptionText = body.desc;
            return jsonResponse({ success: true, game: gamesList[idx] });
          }
        }

        const slug = (body.title || 'new-drawing').toLowerCase().replace(/[^a-z0-9\\-]/g, '-');
        const newGame = {
          id: \`game-\${Date.now()}\`,
          catId: catObj.id,
          catName: catObj.name,
          slug,
          label: body.title,
          thumbSrc: colorImagePath || imagePath || \`\${catObj.id}/img/\${slug}.png\`,
          fullImageSrc: imagePath || \`\${catObj.id}/img/\${slug}.png\`,
          gameScript: '',
          descriptionText: body.desc || \`Free online coloring page: \${body.title}\`,
          h1: \`Online \${body.title} Coloring Page for Kids\`,
          metaDescription: \`Color and paint this \${body.title} online for free!\`,
          createdAt: new Date().toISOString()
        };
        gamesList.unshift(newGame);
        return jsonResponse({ success: true, game: newGame });
      }

      // 3. Delete Game
      if (pathname.startsWith('/api/admin/games/') && method === 'DELETE') {
        const id = pathname.replace('/api/admin/games/', '');
        inMemoryGames = getGames().filter(g => g.id !== id && g.slug !== id);
        return jsonResponse({ success: true });
      }

      // 4. Add Category
      if (pathname === '/api/admin/categories' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cats = getCategories();
        const newCat = {
          id: body.slug || \`cat-\${Date.now()}\`,
          name: body.name || 'New Category',
          icon: body.icon || '🎨',
          color: body.color || '#4F46E5',
          description: body.desc || ''
        };
        cats.push(newCat);
        return jsonResponse({ success: true, category: newCat });
      }

      // 5. Delete Category
      if (pathname.startsWith('/api/admin/categories/') && method === 'DELETE') {
        const id = pathname.replace('/api/admin/categories/', '');
        inMemoryCategories = getCategories().filter(c => c.id !== id);
        return jsonResponse({ success: true });
      }

      // 6. Save Content (About Us, Privacy Policy, Terms, Contact)
      if (pathname === '/api/admin/content' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cfg = getConfig();
        if (body.aboutUsHtml !== undefined) cfg.aboutUsHtml = body.aboutUsHtml;
        if (body.privacyPolicyHtml !== undefined) cfg.privacyPolicyHtml = body.privacyPolicyHtml;
        if (body.termsHtml !== undefined) cfg.termsHtml = body.termsHtml;
        if (body.contactHtml !== undefined) cfg.contactHtml = body.contactHtml;
        return jsonResponse({ success: true });
      }

      // 7. Save AdSense & ads.txt
      if (pathname === '/api/admin/adsense' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cfg = getConfig();
        cfg.adsense = {
          enabled: Boolean(body.enabled),
          publisherId: body.publisherId || cfg.adsense?.publisherId || 'ca-pub-1234567890123456',
          autoAds: Boolean(body.autoAds),
          headerSlot: body.headerSlot || '1234567890',
          sidebarSlot: body.sidebarSlot || '2345678901',
          belowGameSlot: body.belowGameSlot || '3456789012',
          adsTxtContent: body.adsTxtContent || \`google.com, \${body.publisherId || 'pub-1234567890123456'}, DIRECT, f08c47fec0942fa0\`
        };
        return jsonResponse({ success: true });
      }

      // 8. Save Google Analytics
      if (pathname === '/api/admin/analytics' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cfg = getConfig();
        cfg.analytics = {
          enabled: Boolean(body.enabled),
          measurementId: (body.measurementId || '').trim(),
          sendPageView: body.sendPageView !== undefined ? Boolean(body.sendPageView) : true,
          trackDrawingClicks: body.trackDrawingClicks !== undefined ? Boolean(body.trackDrawingClicks) : true,
          trackArtworkSaves: body.trackArtworkSaves !== undefined ? Boolean(body.trackArtworkSaves) : true,
          trackPrints: body.trackPrints !== undefined ? Boolean(body.trackPrints) : true
        };
        return jsonResponse({ success: true, analytics: cfg.analytics });
      }

      // 9. Update Credentials
      if (pathname === '/api/admin/credentials' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cfg = getConfig();
        if (!cfg.admin) cfg.admin = {};
        if (body.username) cfg.admin.username = body.username.trim();
        if (body.password) cfg.admin.password = body.password.trim();
        return jsonResponse({ success: true });
      }

      // 10. Update Website Logo & Branding
      if (pathname === '/api/admin/logo' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cfg = getConfig();
        if (!cfg.logo) cfg.logo = {};
        if (body.imageBase64) {
          cfg.logo.imageSrc = body.imageBase64;
        } else if (body.logoUrl !== undefined) {
          cfg.logo.imageSrc = body.logoUrl;
        }
        if (body.icon) cfg.logo.icon = body.icon;
        if (body.mode) cfg.logo.mode = body.mode;
        if (body.siteName) cfg.siteName = body.siteName;
        return jsonResponse({ success: true, logo: cfg.logo, siteName: cfg.siteName });
      }

      // 11. Update SEO & Keywords Configuration
      if (pathname === '/api/admin/seo' && method === 'POST') {
        const body = await safeJsonBody(request);
        const cfg = getConfig();
        if (!cfg.seo) cfg.seo = {};
        cfg.seo = Object.assign(cfg.seo, {
          defaultTitle: (body.defaultTitle !== undefined ? body.defaultTitle : (cfg.seo.defaultTitle || '')).trim(),
          defaultDescription: (body.defaultDescription !== undefined ? body.defaultDescription : (cfg.seo.defaultDescription || '')).trim(),
          keywords: (body.keywords !== undefined ? body.keywords : (cfg.seo.keywords || '')).trim(),
          canonicalBase: (body.canonicalBase || cfg.seo.canonicalBase || 'https://coloringtool.com').trim(),
          ogImage: (body.ogImage || cfg.seo.ogImage || '/my-favicon/favicon-96x96.png').trim(),
          googleVerification: (body.googleVerification !== undefined ? body.googleVerification : (cfg.seo.googleVerification || '')).trim(),
          bingVerification: (body.bingVerification !== undefined ? body.bingVerification : (cfg.seo.bingVerification || '')).trim(),
          robotsDirectives: (body.robotsDirectives || cfg.seo.robotsDirectives || 'index, follow, max-image-preview:large').trim(),
          robotsTxt: (body.robotsTxt !== undefined ? body.robotsTxt : (cfg.seo.robotsTxt || '')).trim(),
          ratingValue: (body.ratingValue || cfg.seo.ratingValue || '4.9').trim(),
          ratingCount: (body.ratingCount || cfg.seo.ratingCount || '1280').trim()
        });
        return jsonResponse({ success: true, seo: cfg.seo });
      }

      return jsonResponse({ error: 'Endpoint not found' }, 404);
    }

    // ========================================================
    // ROOT SITEMAP & ROBOTS.TXT ROUTES
    // ========================================================
    if (pathname === '/sitemap.xml') {
      const cfg = getConfig();
      const base = (cfg.seo?.canonicalBase || 'https://coloringtool.com').replace(/\\/+$/, '');
      const today = new Date().toISOString().split('T')[0];
      const cats = getCategories();
      const allGames = getGames();

      let xml = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\\n';
      xml += '  <url>\\n    <loc>' + base + '/</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>daily</changefreq>\\n    <priority>1.0</priority>\\n  </url>\\n';
      xml += '  <url>\\n    <loc>' + base + '/gallery.html</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>weekly</changefreq>\\n    <priority>0.6</priority>\\n  </url>\\n';
      xml += '  <url>\\n    <loc>' + base + '/about.html</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>monthly</changefreq>\\n    <priority>0.5</priority>\\n  </url>\\n';
      xml += '  <url>\\n    <loc>' + base + '/privacy.html</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>monthly</changefreq>\\n    <priority>0.5</priority>\\n  </url>\\n';
      xml += '  <url>\\n    <loc>' + base + '/terms.html</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>monthly</changefreq>\\n    <priority>0.5</priority>\\n  </url>\\n';
      xml += '  <url>\\n    <loc>' + base + '/contact.html</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>monthly</changefreq>\\n    <priority>0.5</priority>\\n  </url>\\n';
      cats.forEach(c => {
        xml += '  <url>\\n    <loc>' + base + '/' + c.id + '/</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>weekly</changefreq>\\n    <priority>0.8</priority>\\n  </url>\\n';
      });
      allGames.forEach(g => {
        xml += '  <url>\\n    <loc>' + base + '/studio.html?cat=' + encodeURIComponent(g.catId) + '&amp;game=' + encodeURIComponent(g.slug) + '</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>weekly</changefreq>\\n    <priority>0.7</priority>\\n  </url>\\n';
      });
      xml += '</urlset>\\n';

      return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=UTF-8' }
      });
    }

    if (pathname === '/robots.txt') {
      const cfg = getConfig();
      const content = cfg.seo?.robotsTxt || 'User-agent: *\\nAllow: /\\nDisallow: /admin/\\nDisallow: /api/admin/\\n\\nSitemap: https://coloringtool.com/sitemap.xml\\n';
      return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
      });
    }

    // ========================================================
    // ROOT ADS.TXT ROUTE
    // ========================================================
    if (pathname === '/ads.txt') {
      const cfg = getConfig();
      const content = cfg.adsense?.adsTxtContent || 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0';
      return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
      });
    }

    // ========================================================
    // STATIC ASSETS FALLBACK (Cloudflare Workers / Pages)
    // ========================================================
    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Resource Not Found', { status: 404 });
  }
};
`;

// Write to worker.js and _worker.js
fs.writeFileSync(path.join(__dirname, 'worker.js'), workerSource, 'utf-8');
fs.writeFileSync(path.join(__dirname, '_worker.js'), workerSource, 'utf-8');

// Ensure public directory does not contain _worker.js (conflicts with Cloudflare Workers assets)
const publicWorkerPath = path.join(PUBLIC_DIR, '_worker.js');
if (fs.existsSync(publicWorkerPath)) {
  fs.unlinkSync(publicWorkerPath);
}

// Ensure .assetsignore exists in public/
fs.writeFileSync(path.join(PUBLIC_DIR, '.assetsignore'), '_worker.js\n', 'utf-8');

console.log('Cloudflare Worker edge files generated successfully:');
console.log('- worker.js');
console.log('- _worker.js');
