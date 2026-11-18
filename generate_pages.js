const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');

const siteConfig = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'site_config.json'), 'utf-8'));
const categories = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'categories.json'), 'utf-8'));
const games = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'games.json'), 'utf-8'));
const homeEduText = fs.readFileSync('home_educational_text.html', 'utf-8');

const ad = siteConfig.adsense || {};
const adHeaderScript = ad.enabled ? `
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ad.publisherId || 'ca-pub-1234567890123456'}" crossorigin="anonymous"></script>
` : '';

const analytics = siteConfig.analytics || {};
const gaMeasurementId = analytics.measurementId ? analytics.measurementId.trim() : '';
const analyticsHeaderScript = (analytics.enabled && gaMeasurementId) ? `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaMeasurementId}', {
      page_path: window.location.pathname + window.location.search,
      cookie_flags: 'SameSite=None;Secure'
    });
  </script>
` : '';

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderSeoHeadTags({ title, description, keywords, canonicalPath = '', ogImage = '', jsonLd = null }) {
  const cfgSeo = siteConfig.seo || {};
  const base = (cfgSeo.canonicalBase || 'https://coloringtool.com').replace(/\/+$/, '');
  const siteName = siteConfig.siteName || 'ColoringTool';
  const pageTitle = title || cfgSeo.defaultTitle || siteConfig.siteTitle || `${siteName}.com — Free Online Coloring Pages for Kids`;
  const pageDesc = description || cfgSeo.defaultDescription || siteConfig.tagline || 'Free online coloring pages for kids.';
  const pageKeywords = keywords || cfgSeo.keywords || 'coloring pages, free coloring pages, online coloring for kids';
  const canonicalUrl = `${base}${canonicalPath}`;
  const shareImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${base}${ogImage}`) : `${base}${cfgSeo.ogImage || '/my-favicon/favicon-96x96.png'}`;
  const robots = cfgSeo.robotsDirectives || 'index, follow, max-image-preview:large';

  let verificationMeta = '';
  if (cfgSeo.googleVerification) {
    verificationMeta += `\n  <meta name="google-site-verification" content="${escapeAttr(cfgSeo.googleVerification)}">`;
  }
  if (cfgSeo.bingVerification) {
    verificationMeta += `\n  <meta name="msvalidate.01" content="${escapeAttr(cfgSeo.bingVerification)}">`;
  }

  let ldJsonBlock = '';
  if (jsonLd) {
    ldJsonBlock = `\n  <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`;
  }

  return `  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeAttr(pageDesc)}">
  <meta name="keywords" content="${escapeAttr(pageKeywords)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="${robots}">${verificationMeta}

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeAttr(siteName)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeAttr(pageTitle)}">
  <meta property="og:description" content="${escapeAttr(pageDesc)}">
  <meta property="og:image" content="${shareImage}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(pageTitle)}">
  <meta name="twitter:description" content="${escapeAttr(pageDesc)}">
  <meta name="twitter:image" content="${shareImage}">${ldJsonBlock}`;
}

function generateSitemapXml() {
  const cfgSeo = siteConfig.seo || {};
  const base = (cfgSeo.canonicalBase || 'https://coloringtool.com').replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url>\n    <loc>${base}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${base}/gallery.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${base}/about.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${base}/privacy.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${base}/terms.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${base}/contact.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;

  categories.forEach(c => {
    xml += `  <url>\n    <loc>${base}/${c.id}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  games.forEach(g => {
    xml += `  <url>\n    <loc>${base}/studio.html?cat=${encodeURIComponent(g.catId)}&amp;game=${encodeURIComponent(g.slug)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

function generateRobotsTxt() {
  const cfgSeo = siteConfig.seo || {};
  const base = (cfgSeo.canonicalBase || 'https://coloringtool.com').replace(/\/+$/, '');
  if (cfgSeo.robotsTxt && cfgSeo.robotsTxt.trim()) {
    return cfgSeo.robotsTxt.trim() + '\n';
  }
  return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n\nSitemap: ${base}/sitemap.xml\n`;
}

function renderAdUnit(slotId, label = 'ADVERTISEMENT') {
  if (!ad.enabled) return '';
  return `
    <div class="adsense-wrapper">
      <div class="adsense-unit">
        <div class="ad-notice">${label}</div>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${ad.publisherId || 'ca-pub-1234567890123456'}"
             data-ad-slot="${slotId || '1234567890'}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </div>
  `;
}

function renderBrandLogo() {
  const logo = siteConfig.logo || {};
  const mode = logo.mode || (logo.imageSrc ? 'image_text' : 'icon_text');
  const siteName = siteConfig.siteName || logo.text || 'ColoringTool';
  const logoText = logo.text || siteName || 'ColoringTool';

  let brandTextHtml = `<span class="brand-text">Coloring<span class="brand-accent">Tool</span><span style="font-size:0.95rem;opacity:0.85;">.com</span></span>`;
  if (logoText !== 'ColoringTool' && logoText !== 'ColoringTool.com') {
    brandTextHtml = `<span class="brand-text">${escapeHtml(logoText)}</span>`;
  }

  if (mode === 'image_only' && logo.imageSrc) {
    return `
      <a href="/" class="brand-logo" id="brandLogoLink" title="${escapeAttr(siteName)}">
        <img src="${escapeAttr(logo.imageSrc)}" alt="${escapeAttr(siteName)}" class="brand-custom-logo" style="max-height:40px;max-width:180px;object-fit:contain;display:block;">
      </a>
    `;
  }

  if (mode === 'image_text' && logo.imageSrc) {
    return `
      <a href="/" class="brand-logo" id="brandLogoLink" title="${escapeAttr(siteName)}">
        <img src="${escapeAttr(logo.imageSrc)}" alt="${escapeAttr(siteName)}" class="brand-custom-logo" style="max-height:38px;max-width:44px;object-fit:contain;border-radius:8px;display:block;">
        ${brandTextHtml}
      </a>
    `;
  }

  return `
    <a href="/" class="brand-logo" id="brandLogoLink" title="${escapeAttr(siteName)}">
      <div class="brand-logo-icon">${logo.icon || '🎨'}</div>
      ${brandTextHtml}
    </a>
  `;
}

function renderNav(activeTab = '') {
  return `
  <nav class="site-nav">
    <div class="nav-container">
      ${renderBrandLogo()}
      <button class="nav-toggle-btn" id="navToggleBtn" aria-label="Toggle Navigation" onclick="toggleMobileNav(event)">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
      <div class="nav-links" id="siteNavLinks">
        <a href="/" ${activeTab === 'home' ? 'class="active"' : ''}>🏠 Home</a>
        <div class="dropdown">
          <a href="javascript:void(0)" class="dropbtn" onclick="toggleMobileDropdown(this)">📂 Categories ▾</a>
          <div class="dropdown-content">
            ${categories.map(c => `<a href="/${c.id}/">${c.icon || '🎨'} ${c.name}</a>`).join('')}
          </div>
        </div>
        <a href="/gallery.html" ${activeTab === 'gallery' ? 'class="active"' : ''}>🎨 My Art Gallery</a>
        <a href="/about.html" ${activeTab === 'about' ? 'class="active"' : ''}>ℹ️ About Us</a>
        <a href="/privacy.html" ${activeTab === 'privacy' ? 'class="active"' : ''}>🔒 Privacy Policy</a>
      </div>
    </div>
  </nav>
  <script>
    function toggleMobileNav(e) {
      if (e) e.stopPropagation();
      const el = document.getElementById('siteNavLinks');
      if (el) el.classList.toggle('mobile-open');
    }
    function toggleMobileDropdown(btn) {
      if (window.innerWidth <= 768) {
        const parent = btn.closest('.dropdown');
        if (parent) parent.classList.toggle('mobile-open');
      }
    }
    // Live header logo sync across open tabs
    (function() {
      function syncHeaderLogo(cfg) {
        if (!cfg || !cfg.logo) return;
        const link = document.getElementById('brandLogoLink');
        if (!link) return;
        const logo = cfg.logo;
        const mode = logo.mode || (logo.imageSrc ? 'image_text' : 'icon_text');
        const sName = cfg.siteName || logo.text || 'ColoringTool';
        const txt = logo.text || sName || 'ColoringTool';
        const txtHtml = (txt === 'ColoringTool' || txt === 'ColoringTool.com') ?
          '<span class="brand-text">Coloring<span class="brand-accent">Tool</span><span style="font-size:0.95rem;opacity:0.85;">.com</span></span>' :
          ('<span class="brand-text">' + txt + '</span>');
        if (mode === 'image_only' && logo.imageSrc) {
          link.innerHTML = '<img src="' + logo.imageSrc + '" alt="' + sName + '" class="brand-custom-logo" style="max-height:40px;max-width:180px;object-fit:contain;display:block;">';
        } else if (mode === 'image_text' && logo.imageSrc) {
          link.innerHTML = '<img src="' + logo.imageSrc + '" alt="' + sName + '" class="brand-custom-logo" style="max-height:38px;max-width:44px;object-fit:contain;border-radius:8px;display:block;">' + txtHtml;
        } else {
          link.innerHTML = '<div class="brand-logo-icon">' + (logo.icon || '🎨') + '</div>' + txtHtml;
        }
      }
      window.addEventListener('storage', function(e) {
        if (e.key === 'coloringtool_logo_update' || e.key === 'coloringtool_site_config') {
          fetch('/api/site-config?t=' + Date.now()).then(function(r){ return r.json(); }).then(syncHeaderLogo).catch(function(){});
        }
      });
    })();
  </script>
  `;
}

function renderFooter() {
  const logo = siteConfig.logo || {};
  const showImg = (logo.mode !== 'icon_text') && Boolean(logo.imageSrc);
  return `
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <div class="footer-logo">
          ${showImg ?
            `<img src="${escapeAttr(logo.imageSrc)}" alt="${escapeAttr(siteConfig.siteName || 'ColoringTool.com')}" style="max-height:36px;max-width:140px;object-fit:contain;display:block;">` :
            `<div class="brand-logo-icon" style="width:34px;height:34px;font-size:1.2rem;">${logo.icon || '🎨'}</div>
             <strong>${escapeHtml(siteConfig.siteName || 'ColoringTool')}.com</strong>`
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
          ${categories.map(c => `<li><a href="/${c.id}/">${c.icon || '🎨'} Online ${c.name} Drawings</a></li>`).join('')}
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
  `;
}

// ----------------------------------------------------
// 1. GENERATE HOMEPAGE (public/index.html)
// ----------------------------------------------------
console.log('Generating public/index.html...');
const homeCardsHtml = games.map(g => `
  <div class="drawing-card" data-cat="${g.catId}" data-name="${g.label.toLowerCase()}">
    <a href="/studio.html?cat=${g.catId}&game=${g.slug}" class="drawing-card-inner" onclick="if(typeof window.gtag==='function'){gtag('event','select_content',{content_type:'drawing',item_id:'${g.slug}',item_name:'${g.label.replace(/'/g, "\\'")}',item_category:'${g.catName}'});}">
      <div class="drawing-thumb-wrap">
        <img src="/${g.thumbSrc || g.fullImageSrc}" alt="${g.label} Coloring Page" loading="lazy" width="130" height="110">
        <span class="badge-cat badge-${g.catId}">${g.catName}</span>
      </div>
      <h3 class="drawing-title">${g.label}</h3>
      <span class="drawing-cta">🎨 Color Now &rarr;</span>
    </a>
  </div>
`).join('');

const catCardsHtml = categories.map(c => {
  const catCount = games.filter(g => g.catId === c.id).length;
  return `
    <a href="/${c.id}/" class="cat-card cat-card-${c.id}">
      <div class="cat-card-icon">${c.icon || '🎨'}</div>
      <div class="cat-card-info">
        <h3>${c.name}</h3>
        <p>${catCount} Drawings to Paint</p>
      </div>
    </a>
  `;
}).join('');

const homeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: siteConfig.seo?.defaultTitle || siteConfig.siteTitle,
  description: siteConfig.seo?.defaultDescription || siteConfig.tagline,
  keywords: siteConfig.seo?.keywords,
  canonicalPath: '/',
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.siteName || "ColoringTool",
    "url": (siteConfig.seo?.canonicalBase || "https://coloringtool.com"),
    "description": siteConfig.seo?.defaultDescription || siteConfig.tagline,
    "potentialAction": {
      "@type": "SearchAction",
      "target": (siteConfig.seo?.canonicalBase || "https://coloringtool.com") + "/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('home')}

  <!-- Google AdSense Header Leaderboard -->
  ${renderAdUnit(ad.headerSlot || '1234567890')}

  <!-- Hero Header -->
  <header class="hero-banner">
    <h1 class="hero-title">Free Online Coloring Pages for Kids 🎨</h1>
    <p class="hero-sub">Color, paint, and create directly on your screen! Fun, educational, and safe for kids ages 3 to 10. No download, no signup required!</p>
    
    <div class="search-bar-wrap">
      <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search drawings (e.g. unicorn, monkey, lion, car, pizza)..." oninput="filterDrawings()">
      <span class="search-icon">🎨</span>
    </div>

    <div class="filter-pills" id="filterPills">
      <span class="filter-pill active" onclick="setFilter('all', this)">🌈 All Drawings (${games.length})</span>
      ${categories.map(c => `
        <span class="filter-pill" onclick="setFilter('${c.id}', this)">${c.icon || '🎨'} ${c.name} (${games.filter(g => g.catId === c.id).length})</span>
      `).join('')}
    </div>
  </header>

  <!-- Categories Grid -->
  <section class="section-container">
    <div class="section-header">
      <h2>Explore Coloring Categories</h2>
      <p>Pick your favorite theme and discover dozens of free drawings!</p>
    </div>
    <div class="cats-grid">
      ${catCardsHtml}
    </div>
  </section>

  <!-- Drawings Grid -->
  <section class="section-container">
    <div class="section-header">
      <h2 id="galleryTitle">All Coloring Pages & Painting Games</h2>
      <p id="gallerySubtitle">Choose any picture to launch the interactive coloring studio!</p>
    </div>
    <div class="drawings-grid" id="drawingsGrid">
      ${homeCardsHtml}
    </div>
  </section>

  <!-- Google AdSense In-Content Banner -->
  ${renderAdUnit(ad.belowGameSlot || '3456789012')}

  <!-- Educational Article & Benefits for Kids -->
  <section class="section-container">
    <div class="edu-card">
      ${homeEduText}
    </div>
  </section>

  ${renderFooter()}

  <script>
    let currentFilter = 'all';

    function setFilter(cat, pill) {
      currentFilter = cat;
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      if (pill) pill.classList.add('active');
      filterDrawings();
    }

    function filterDrawings() {
      const q = document.getElementById('searchInput').value.toLowerCase().trim();
      const cards = document.querySelectorAll('.drawing-card');
      let visible = 0;

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const name = card.getAttribute('data-name');
        const matchesCat = (currentFilter === 'all' || cat === currentFilter);
        const matchesQuery = (!q || name.includes(q));

        if (matchesCat && matchesQuery) {
          card.style.display = 'block';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('gallerySubtitle').innerText = 'Showing ' + visible + ' coloring drawing' + (visible === 1 ? '' : 's');
    }

    // Accordion handler for FAQ items
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        q.parentElement.classList.toggle('open');
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), homeHtml);

// ----------------------------------------------------
// 2. GENERATE CATEGORY PAGES (public/<cat>/index.html)
// ----------------------------------------------------
console.log('Generating category pages...');
categories.forEach(cat => {
  const catGames = games.filter(g => g.catId === cat.id);
  const catDir = path.join(PUBLIC_DIR, cat.id);
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

  const catGamesHtml = catGames.map(g => `
    <div class="drawing-card">
      <a href="/studio.html?cat=${g.catId}&game=${g.slug}" class="drawing-card-inner" onclick="if(typeof window.gtag==='function'){gtag('event','select_content',{content_type:'drawing',item_id:'${g.slug}',item_name:'${g.label.replace(/'/g, "\\'")}',item_category:'${g.catName}'});}">
        <div class="drawing-thumb-wrap">
          <img src="/${g.thumbSrc || g.fullImageSrc}" alt="${g.label} Coloring Page" loading="lazy" width="130" height="110">
          <span class="badge-cat badge-${g.catId}">${g.catName}</span>
        </div>
        <h3 class="drawing-title">${g.label}</h3>
        <span class="drawing-cta">🎨 Color Now &rarr;</span>
      </a>
    </div>
  `).join('');

  const catPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: `Free Online ${cat.name} Coloring Pages for Kids | ColoringTool.com`,
  description: cat.description || `Play free online ${cat.name} coloring pages for kids. Beautiful printable drawings to paint and color online on ColoringTool.com.`,
  keywords: `${cat.name.toLowerCase()} coloring pages, free ${cat.name.toLowerCase()} drawings, online ${cat.name.toLowerCase()} coloring for kids, printable ${cat.name.toLowerCase()} sheets`,
  canonicalPath: `/${cat.id}/`,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${cat.name} Coloring Pages`,
    "url": `${(siteConfig.seo?.canonicalBase || 'https://coloringtool.com')}/${cat.id}/`,
    "description": cat.description
  }
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('')}

  ${renderAdUnit(ad.headerSlot || '1234567890')}

  <header class="hero-banner" style="background: linear-gradient(135deg, ${cat.color} 0%, #312E81 100%);">
    <div style="font-size:3.5rem;margin-bottom:8px;">${cat.icon || '🎨'}</div>
    <h1 class="hero-title">${cat.name} Coloring Pages for Kids</h1>
    <p class="hero-sub">${cat.description}</p>
    <a href="/studio.html?cat=${cat.id}&random=1" class="btn-surprise" style="margin-top:16px;">✨ Pick Random ${cat.name} Drawing</a>
  </header>

  <section class="section-container">
    <div class="section-header">
      <h2>Free Online ${cat.name} Drawings (${catGames.length})</h2>
      <p>Click any illustration below to color directly in your web browser!</p>
    </div>
    <div class="drawings-grid">
      ${catGamesHtml}
    </div>
  </section>

  ${renderAdUnit(ad.belowGameSlot || '3456789012')}

  ${renderFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(catDir, 'index.html'), catPageHtml);
});

// ----------------------------------------------------
// 3. GENERATE GALLERY PAGE (public/gallery.html)
// ----------------------------------------------------
console.log('Generating public/gallery.html...');
const galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: 'My Art Gallery — ColoringTool.com',
  description: 'View, print, and download all your colored masterpieces and drawings on ColoringTool.com.',
  keywords: 'my art gallery, saved coloring pages, kids artwork, print colored drawings',
  canonicalPath: '/gallery.html'
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('gallery')}

  <header class="hero-banner">
    <div style="font-size:3.5rem;margin-bottom:8px;">🎨</div>
    <h1 class="hero-title">My Saved Art Gallery</h1>
    <p class="hero-sub">All your saved colored drawings from ColoringTool.com are saved right here in your browser!</p>
  </header>

  <main class="section-container" style="min-height:50vh;">
    <div id="emptyGalleryNotice" style="text-align:center;padding:60px 20px;background:#FFFFFF;border-radius:20px;border:1px solid #E2E8F0;box-shadow:0 4px 15px rgba(0,0,0,0.04);">
      <div style="font-size:3rem;margin-bottom:12px;">🖼️</div>
      <h2>Your Gallery is Waiting for Artwork!</h2>
      <p style="color:#64748B;max-width:500px;margin:10px auto 20px;">Whenever you color a drawing in our studio and click <strong>"Save / Download"</strong>, a copy appears here!</p>
      <a href="/studio.html" class="btn-surprise">Start Coloring a Drawing Now &rarr;</a>
    </div>

    <div class="drawings-grid" id="savedGalleryGrid" style="display:none;"></div>
  </main>

  ${renderAdUnit(ad.belowGameSlot || '3456789012')}

  ${renderFooter()}

  <script>
    function loadGallery() {
      const saved = JSON.parse(localStorage.getItem('coloring_art_gallery') || '[]');
      const emptyDiv = document.getElementById('emptyGalleryNotice');
      const gridDiv = document.getElementById('savedGalleryGrid');

      if (!saved || saved.length === 0) {
        emptyDiv.style.display = 'block';
        gridDiv.style.display = 'none';
        return;
      }

      emptyDiv.style.display = 'none';
      gridDiv.style.display = 'grid';
      gridDiv.innerHTML = saved.map((item, idx) => {
        return '<div class="drawing-card">' +
          '<div class="drawing-card-inner" style="cursor:default;">' +
            '<div class="drawing-thumb-wrap">' +
              '<img src="' + item.thumb + '" alt="' + item.title + '" style="object-fit:contain;background:#FFFFFF;">' +
            '</div>' +
            '<h3 class="drawing-title">' + item.title + '</h3>' +
            '<p style="font-size:0.8rem;color:#64748B;margin:4px 0 10px;">' + item.category + ' &bull; ' + item.date + '</p>' +
            '<div style="display:flex;gap:6px;width:100%;">' +
              '<a href="' + item.thumb + '" download="' + item.title + '.png" class="btn-action" style="flex:1;text-align:center;padding:6px;font-size:0.85rem;text-decoration:none;background:#10B981;">📥 Download</a>' +
              '<button onclick="deleteArt(' + idx + ')" style="background:#EF4444;color:white;border:none;padding:6px 10px;border-radius:8px;cursor:pointer;">🗑️</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function deleteArt(idx) {
      if (!confirm('Remove this drawing from your gallery?')) return;
      const saved = JSON.parse(localStorage.getItem('coloring_art_gallery') || '[]');
      saved.splice(idx, 1);
      localStorage.setItem('coloring_art_gallery', JSON.stringify(saved));
      loadGallery();
    }

    window.onload = loadGallery;
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'gallery.html'), galleryHtml);

// ----------------------------------------------------
// 4. GENERATE INTERACTIVE COLORING STUDIO (public/studio.html)
// ----------------------------------------------------
console.log('Generating public/studio.html...');
const studioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
${renderSeoHeadTags({
  title: 'Coloring Studio — Free Online Coloring Games for Kids | ColoringTool.com',
  description: 'Interactive online coloring studio for kids. Paint, draw, color, and print over 100 free animals, unicorns, food, and Christmas drawings online!',
  keywords: 'coloring studio, online coloring tool, free kids drawing game, paint online, printable coloring games',
  canonicalPath: '/studio.html',
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ColoringTool Studio",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All modern browsers",
    "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (siteConfig.seo?.ratingValue || "4.9"),
      "reviewCount": (siteConfig.seo?.ratingCount || "1280")
    }
  }
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">

  <!-- Adobe Animate playSound global helper -->
  <script>
    window.playSound = function(id, loop, offset) {
      if (window.createjs && createjs.Sound) {
        try {
          return createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
        } catch(e) {
          console.warn("createjs.Sound.play:", e);
        }
      }
    };
  </script>
  <script src="/js/createjs.min.js"></script>

  ${adHeaderScript}
  ${analyticsHeaderScript}

  <style>
    body {
      background: #F1F5F9;
      margin: 0;
      padding: 0;
      color: #0F172A;
    }
    .studio-top-bar {
      background: #000000 !important;
      color: white;
      padding: 10px 18px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.25);
      gap: 14px;
    }
    .studio-title-box {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      min-width: 0;
    }
    .studio-title-box h1 {
      margin: 0;
      font-size: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-width: 0;
    }
    .btn-back {
      background: rgba(255,255,255,0.15);
      color: white;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.88rem;
      font-weight: 600;
      white-space: nowrap;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    .btn-back:hover {
      background: var(--primary);
    }
    .studio-layout {
      max-width: 1280px;
      margin: 20px auto;
      padding: 0 16px;
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 24px;
    }
    @media (max-width: 992px) {
      .studio-layout {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
    @media (max-width: 640px) {
      .studio-layout {
        padding: 0 8px;
        margin: 10px auto;
        gap: 16px;
      }
      .studio-top-bar {
        padding: 8px 12px;
        flex-direction: row;
        gap: 10px;
      }
      .studio-title-box {
        gap: 10px;
        width: 100%;
      }
      .studio-title-box h1 {
        font-size: 1.05rem !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
      }
      .btn-back {
        padding: 6px 12px;
        font-size: 0.85rem;
      }
    }
    .stage-wrapper {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(15,23,42,0.06);
      border: 1px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
    }
    @media (max-width: 640px) {
      .stage-wrapper {
        padding: 10px 6px;
        border-radius: 14px;
      }
      .hint-banner {
        font-size: 0.78rem !important;
        padding: 7px 10px !important;
        margin-bottom: 8px !important;
        border-radius: 14px !important;
      }
    }
    .hint-banner {
      background: #EEF2FF;
      color: #4F46E5;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      text-align: center;
      line-height: 1.4;
    }
    .canvas-container {
      position: relative;
      width: 100%;
      max-width: 510px;
      height: auto;
      background: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: url('/images/paintbrush-cursor.svg') 2 30, crosshair;
    }
    #canvas {
      width: 100%;
      height: 100%;
      display: block;
      touch-action: none;
      cursor: url('/images/paintbrush-cursor.svg') 2 30, crosshair;
    }
    .controls-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: 100%;
      max-width: 510px;
      margin-top: 14px;
      gap: 8px;
      box-sizing: border-box;
    }
    @media (max-width: 600px) {
      .controls-strip {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
    .btn-studio-action {
      background: #4F46E5;
      color: white;
      border: none;
      padding: 10px 8px;
      border-radius: 14px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.88rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: all 0.2s;
      width: 100%;
      box-sizing: border-box;
      white-space: nowrap;
    }
    .btn-studio-action:hover {
      background: #4338CA;
      transform: translateY(-2px);
    }
    .btn-print {
      background: #0284C7;
    }
    .btn-print:hover {
      background: #0369A1;
    }
    .btn-save {
      background: #10B981;
    }
    .btn-save:hover {
      background: #059669;
    }
      background: #0369A1;
    }
    .btn-save {
      background: #10B981;
    }
    .btn-save:hover {
      background: #059669;
    }
    .studio-sidebar {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .sidebar-widget {
      background: #FFFFFF;
      border-radius: 18px;
      padding: 20px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    }
    .widget-title {
      margin: 0 0 14px;
      font-size: 1.1rem;
      color: #0F172A;
      font-weight: 700;
      border-bottom: 2px solid #F1F5F9;
      padding-bottom: 8px;
    }
    .related-scroll-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      max-height: 480px;
      overflow-y: auto;
    }
    .related-card {
      text-decoration: none;
      color: inherit;
      background: #F8FAFC;
      border-radius: 10px;
      padding: 8px;
      text-align: center;
      border: 1px solid #E2E8F0;
      transition: all 0.2s;
    }
    .related-card:hover {
      border-color: #4F46E5;
      transform: translateY(-2px);
    }
    .related-card img {
      width: 100%;
      height: 70px;
      object-fit: cover;
      border-radius: 6px;
    }
    .related-card span {
      font-size: 0.8rem;
      font-weight: 600;
      display: block;
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
        /* Studio Workspace layout: Side-by-side on desktop, stacked on mobile */
    .studio-workspace {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      gap: 24px;
      width: 100%;
    }
    .studio-canvas-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 auto;
      max-width: 510px;
      width: 100%;
    }
    .studio-tools-side {
      display: none; /* Shown dynamically for raster games */
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: 250px;
      flex-shrink: 0;
      background: #FFFFFF;
      padding: 16px 14px;
      border-radius: 18px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
      box-sizing: border-box;
    }
    .studio-tools-side-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Common tool button & badge styles */
    .tool-group {
      display: flex;
      gap: 6px;
      align-items: center;
      width: 100%;
    }
    .tool-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: #F1F5F9;
      border: 2px solid transparent;
      color: #1E293B;
      padding: 7px 12px;
      border-radius: 12px;
      font-family: inherit;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
    }
    .tool-btn:hover {
      background: #E2E8F0;
    }
    .tool-btn.active {
      background: #4F46E5;
      color: #FFFFFF;
      border-color: #4338CA;
      box-shadow: 0 3px 10px rgba(79, 70, 229, 0.3);
    }
    .tool-indicator-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #F8FAFC;
      padding: 6px 12px;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
    }
    .brush-icon-wrapper {
      position: relative;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brush-dot {
      position: absolute;
      bottom: -1px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
    .brush-info {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }
    .brush-mode-text {
      font-size: 0.85rem;
      font-weight: 700;
      color: #0F172A;
    }
    .brush-color-name {
      font-size: 0.72rem;
      color: #64748B;
      font-weight: 600;
    }
    .palette-swatch {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: transform 0.15s;
      flex-shrink: 0;
    }
    .palette-swatch:hover, .palette-swatch.active {
      transform: scale(1.22);
      border-color: #0F172A;
      box-shadow: 0 0 0 3px #38BDF8, 0 4px 12px rgba(0,0,0,0.25);
    }

    /* DESKTOP ONLY: Color palette, tools, and action buttons docked on the RIGHT side of canvas */
    @media (min-width: 900px) {
      .studio-tools-side {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        width: 250px;
        flex-shrink: 0;
        background: #FFFFFF;
        padding: 16px 14px;
        border-radius: 18px;
        border: 1px solid #E2E8F0;
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
        box-sizing: border-box;
      }
      .studio-tool-bar {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        width: 100%;
        background: transparent;
        padding: 0;
        border: none;
        box-shadow: none;
        margin: 0;
      }
      .studio-tool-bar .tool-group {
        display: flex;
        gap: 6px;
        width: 100%;
      }
      .studio-tool-bar .tool-group .tool-btn {
        flex: 1;
        justify-content: center;
        padding: 8px 10px;
        font-size: 0.85rem;
      }
      .studio-tool-bar .tool-indicator-badge {
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        padding: 8px 12px;
      }
      .raster-palette {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        width: 100%;
        max-width: 220px;
        margin: 6px auto 0;
        box-sizing: border-box;
      }
      .controls-strip {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        width: 100%;
        margin-top: 10px;
        padding-top: 12px;
        border-top: 1px solid #F1F5F9;
        box-sizing: border-box;
      }
      .btn-studio-action {
        width: 100%;
        padding: 9px 6px;
        font-size: 0.82rem;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        border-radius: 12px;
      }
    }

    /* MOBILE: Under 900px, color palette, tools, and action buttons stack below canvas */
    @media (max-width: 899px) {
      .studio-workspace {
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      .studio-canvas-area {
        max-width: 510px;
        width: 100%;
      }
      .studio-tools-side {
        display: flex !important;
        width: 100%;
        max-width: 510px;
        padding: 0;
        background: transparent;
        border: none;
        box-shadow: none;
        gap: 10px;
      }
      .studio-tools-side-title {
        display: none;
      }
      .studio-tool-bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: #FFFFFF;
        padding: 8px 12px;
        border-radius: 16px;
        border: 1px solid #E2E8F0;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
        box-sizing: border-box;
        margin: 0;
      }
      .studio-tool-bar .tool-group {
        width: auto;
      }
      .studio-tool-bar .tool-indicator-badge {
        width: auto;
      }
      .raster-palette {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        width: 100%;
        max-width: 510px;
        margin: 4px auto 0;
      }
      .palette-swatch {
        width: 32px;
        height: 32px;
      }
      .controls-strip {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        width: 100%;
        max-width: 510px;
        margin-top: 8px;
        box-sizing: border-box;
      }
    }

    @media (max-width: 520px) {
      .controls-strip {
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      }
      .btn-studio-action {
        padding: 8px 6px;
        font-size: 0.78rem;
      }
    }

    @media (max-width: 600px) {
      .studio-tool-bar {
        justify-content: center !important;
        gap: 6px !important;
        padding: 6px 8px !important;
      }
      .tool-btn {
        padding: 6px 8px !important;
        font-size: 0.78rem !important;
      }
      .tool-indicator-badge {
        padding: 4px 6px !important;
      }
      .palette-swatch {
        width: 30px !important;
        height: 30px !important;
      }
    }
    @media print {
      body * { visibility: hidden; }
      .canvas-container, .canvas-container * { visibility: visible; }
      .canvas-container { position: absolute; left: 0; top: 0; width: 100% !important; height: auto !important; }
    }
  </style>
</head>
<body>
  ${renderNav('')}

  <header class="studio-top-bar">
    <div class="studio-title-box">
      <a href="/" id="backLink" class="btn-back">&larr; Back</a>
      <h1 id="gameTitle">Coloring Studio</h1>
    </div>
  </header>

  <div class="studio-layout">
    <!-- Main Drawing Stage -->
    <main class="stage-wrapper">
      <div class="hint-banner">
        <span>💡 Tap a color in the palette, then tap inside any part of the picture to color it!</span>
      </div>

      <div class="studio-workspace">
        <div class="studio-canvas-area">
          <div class="canvas-container">
            <canvas id="canvas" width="510" height="580"></canvas>
          </div>
        </div>

        <!-- Right Side Controls & Palette (Desktop Right Side / Mobile Below) -->
        <div class="studio-tools-side" id="studioToolsSide">
          <div class="studio-tools-side-title raster-only" id="toolsSideTitle" style="display:none;">
            <span>🎨 Color Tools</span>
          </div>

          <!-- Raster custom drawing toolbar (active for custom uploaded drawings) -->
          <div class="studio-tool-bar raster-only" id="rasterToolBar" style="display:none;">
            <div class="tool-group">
              <button type="button" class="tool-btn active" id="toolBrushBtn" onclick="setStudioTool('brush')" title="Paint Brush">
                <span>🖌️</span>
                <span>Paint Brush</span>
              </button>
            </div>

            <div class="tool-indicator-badge" id="toolIndicatorBadge">
              <div class="brush-icon-wrapper">
                <svg class="brush-svg" viewBox="0 0 32 32" width="30" height="30" style="overflow:visible;display:block;">
                  <polygon points="6,26 10,25 25,10 21,6 6,21" fill="#F8FAFC" stroke="#0F172A" stroke-width="1.6" stroke-linejoin="round"/>
                  <polygon id="brushSvgTip" points="6,26 10,25 6,21" fill="#FF3B30" stroke="#0F172A" stroke-width="1.2"/>
                  <polygon points="21,6 25,10 27,8 23,4" fill="#94A3B8" stroke="#0F172A" stroke-width="1.4" stroke-linejoin="round"/>
                  <circle id="brushColorDot" cx="4" cy="28" r="3.5" fill="#FF3B30" stroke="#FFFFFF" stroke-width="1.5"/>
                </svg>
              </div>
              <div class="brush-info">
                <div style="display:flex;align-items:center;gap:4px;">
                  <span id="toolIndicatorIcon">🖌️</span>
                  <span class="brush-mode-text" id="brushModeText">Paint Brush</span>
                </div>
                <span class="brush-color-name" id="brushColorName">Color: Red</span>
              </div>
            </div>

            <div class="tool-group">
              <button type="button" class="tool-btn btn-undo" id="btnUndo" onclick="undoLastColorAction()" title="Undo Last Action">
                <span>↩️ Undo</span>
              </button>
              <button type="button" class="tool-btn btn-clean" id="btnCleanCanvas" onclick="cleanRasterCanvas()" title="Reset Canvas">
                <span>🧹 Clean</span>
              </button>
            </div>
          </div>

          <!-- Raster custom drawing palette (active for uploaded pictures) -->
          <div class="raster-palette raster-only" id="rasterPalette" style="display:none;"></div>

          <!-- Action buttons (Placed in Right Panel on Desktop, Stacked Below on Mobile) -->
          <div class="controls-strip" id="controlsStrip">
            <button class="btn-studio-action" onclick="navigateGame(-1)">◀ Previous</button>
            <button class="btn-studio-action" onclick="navigateGame(1)">Next ▶</button>
            <button class="btn-studio-action btn-print" onclick="if(typeof window.gtag==='function'){window.gtag('event','print_drawing',{item_name:currentGame.label,item_category:currentGame.catName});} window.print()">🖨️ Print</button>
            <button class="btn-studio-action btn-save" onclick="saveArtwork()">💾 Save Artwork</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Sidebar with Related Drawings -->
    <aside class="studio-sidebar">
      ${ad.enabled ? `
      <div class="sidebar-widget" style="padding:10px;text-align:center;">
        <div class="ad-notice">SPONSORED</div>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${ad.publisherId || 'ca-pub-1234567890123456'}"
             data-ad-slot="${ad.sidebarSlot || '2345678901'}"
             data-ad-format="rectangle"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>` : ''}

      <!-- Sidebar Original Color Guide Card -->
      <div class="sidebar-widget original-color-widget">
        <div class="original-color-widget-header">
          <span class="original-color-pill">🎨 Color Guide</span>
          <span style="font-size:0.75rem;color:#64748B;font-weight:700;">SAMPLE ARTWORK</span>
        </div>
        <h3 class="widget-title" style="margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #F1F5F9;font-size:1.05rem;">Original Color Image</h3>
        <div class="original-color-frame" onclick="openOriginalImageModal()" title="Click to view full size">
          <img id="sidebarOriginalColorImg" src="" alt="Original Colored Reference">
          <button type="button" class="zoom-hint-btn">🔍 View Full Size</button>
        </div>
        <div class="original-color-caption">
          <strong>💡 Artist's Inspiration:</strong> See how this picture looks when colored! Follow these shades or invent your own palette.
        </div>
      </div>

      <div class="sidebar-widget">
        <h3 class="widget-title" id="relatedTitle">More Fun Drawings</h3>
        <div class="related-scroll-grid" id="relatedGrid"></div>
      </div>
    </aside>
  </div>

  <!-- Dedicated Original Color Image & Inspiration Showcase Section -->
  <section class="original-color-section" id="originalColorSection">
    <div class="showcase-card">
      <div class="showcase-header">
        <div class="showcase-badge-wrap">
          <span style="font-size:1.3rem;">🎨</span>
          <span class="showcase-badge">Original Color Guide & Reference</span>
        </div>
        <h2 class="showcase-title" id="originalColorSectionTitle">Original Color Image</h2>
        <p class="showcase-subtitle">Compare the original artist's colored illustration with your live interactive coloring canvas above!</p>
      </div>

      <div class="showcase-grid">
        <!-- Original Colored Reference Card -->
        <div class="showcase-item">
          <div class="showcase-item-header">
            <span class="showcase-item-tag tag-colored">
              <span style="font-size:1.15rem;">🖼️</span>
              <strong>Original Colored Illustration</strong>
            </span>
            <span style="background:#EEF2FF;color:#4F46E5;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">REFERENCE GUIDE</span>
          </div>

          <div class="showcase-img-wrap" onclick="openOriginalImageModal()" title="Click to view full size">
            <img id="sectionOriginalColorImg" src="" alt="Original Colored Drawing">
          </div>

          <div class="showcase-details">
            <h4>✨ Color Guide & Artist Tips:</h4>
            <ul class="showcase-bullets">
              <li>Notice how the artist balanced vibrant subject colors with soothing background tones.</li>
              <li>Use this colored artwork as a visual guide to find matching colors on the palette.</li>
              <li>Or unleash your creativity with completely new, unique color combinations!</li>
            </ul>
            <button type="button" class="btn-showcase-action btn-showcase-colored" onclick="openOriginalImageModal()">
              🔍 View Original Image Full Size
            </button>
          </div>
        </div>

        <!-- Line-Art Contour & Coloring Feature Card -->
        <div class="showcase-item">
          <div class="showcase-item-header">
            <span class="showcase-item-tag tag-outline">
              <span style="font-size:1.15rem;">🖌️</span>
              <strong>Your Coloring Canvas (Interactive)</strong>
            </span>
            <span style="background:#E0F2FE;color:#0284C7;padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700;">LIVE STUDIO</span>
          </div>

          <div class="showcase-img-wrap" onclick="scrollToCanvas()" title="Click to start painting above">
            <img id="sectionOutlineImg" src="" alt="Contour Line Art Drawing">
          </div>

          <div class="showcase-details">
            <h4>🎨 Interactive Studio Features:</h4>
            <ul class="showcase-bullets">
              <li><strong>Clean Contour Fills:</strong> Colors stay strictly within the lines without bleeding out.</li>
              <li><strong>Kid-Friendly Palette:</strong> 15 vibrant, child-safe shades ready for instant one-tap coloring.</li>
              <li><strong>Save & Print:</strong> Save your masterpiece directly to your Art Gallery or print anytime!</li>
            </ul>
            <button type="button" class="btn-showcase-action btn-showcase-paint" onclick="scrollToCanvas()">
              🎨 Jump Up to Color Now! ☝️
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Dedicated Coloring Page Description & Educational Guide Box -->
  <section class="coloring-desc-section">
    <div class="desc-box-card">
      <div class="desc-box-header">
        <div class="desc-header-icon" id="descIcon">🎨</div>
        <div>
          <span class="desc-subtitle-badge" id="descCatBadge">Category &bull; Free Printable & Online Drawing</span>
          <h2 class="desc-title" id="descHeading">About this Coloring Page</h2>
        </div>
      </div>

      <div class="desc-body">
        <div class="desc-text-col">
          <p id="descMainText" class="desc-main-text"></p>
          
          <div class="desc-features-grid">
            <div class="feature-pill">
              <span class="feature-icon">✨</span>
              <div>
                <strong>Ages 3 to 10</strong>
                <span>Preschool & Elementary</span>
              </div>
            </div>
            <div class="feature-pill">
              <span class="feature-icon">🎨</span>
              <div>
                <strong>Free Online & Print</strong>
                <span>Instant play, no download</span>
              </div>
            </div>
            <div class="feature-pill">
              <span class="feature-icon">🧠</span>
              <div>
                <strong>Fine Motor Skills</strong>
                <span>Focus, grip & coordination</span>
              </div>
            </div>
          </div>
        </div>

        <div class="desc-tips-col">
          <div class="tips-box">
            <div class="tips-header">
              <span style="font-size:1.3rem;">💡</span>
              <h4>Creative Coloring Tips</h4>
            </div>
            <ul class="tips-list" id="descTipsList">
              <li>Tap any color tile in the palette below the picture to activate your brush.</li>
              <li>Tap inside each region of the drawing to fill it neatly without spilling outside!</li>
              <li>When you're happy with your masterpiece, click <strong>"Save Artwork"</strong> to save it to your personal Art Gallery, or <strong>"Print"</strong> to color with real crayons!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- High-Resolution Original Color Image Modal -->
  <div id="originalColorModal" class="color-modal" onclick="closeOriginalImageModal(event)">
    <div class="color-modal-content" onclick="event.stopPropagation()">
      <div class="color-modal-header">
        <h3 id="modalGameTitle">Original Colored Drawing</h3>
        <button type="button" class="color-modal-close" onclick="closeOriginalImageModal()">&times;</button>
      </div>
      <div class="color-modal-body">
        <img id="modalColorImg" src="" alt="Original Colored Drawing">
      </div>
      <div class="color-modal-footer">
        <span>💡 Use this sample as inspiration while painting above!</span>
        <button type="button" class="btn-studio-action" style="padding:6px 16px;font-size:0.85rem;" onclick="closeOriginalImageModal()">Close</button>
      </div>
    </div>
  </div>

  <!-- Below Game AdSense Banner -->
  ${renderAdUnit(ad.belowGameSlot || '3456789012')}

  ${renderFooter()}

  <script>
    let allGames = ${JSON.stringify(games)};
    let currentGame = null;
    let stage, exportRoot;
    let currentColor = '#FF3B30';
    const canvas = document.getElementById('canvas');

    const PALETTE_COLORS = [
      '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE',
      '#30B0C7', '#32ADE6', '#007AFF', '#5856D6', '#AF52DE',
      '#FF2D55', '#A2845E', '#8E8E93', '#FFFFFF', '#000000'
    ];

    function formatImgSrc(src) {
      if (!src) return '/my-favicon/favicon-96x96.png';
      src = String(src).trim();
      if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) return src;
      if (src.startsWith('/')) return src;
      return '/' + src;
    }

    async function initStudio() {
      const urlParams = new URLSearchParams(window.location.search);
      let catParam = urlParams.get('cat');
      let gameParam = urlParams.get('game');
      const isRandom = urlParams.get('random');

      if (!catParam || !gameParam) {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length >= 2 && pathParts[0] !== 'admin') {
          catParam = pathParts[0];
          gameParam = pathParts[1].replace('.php', '').replace('.html', '');
        }
      }

      // 1. Fetch latest games list dynamically from server or static fallback
      try {
        const gRes = await fetch('/api/games');
        if (gRes.ok) {
          const apiGames = await gRes.json();
          if (Array.isArray(apiGames) && apiGames.length > 0) allGames = apiGames;
        }
      } catch(e) {
        try {
          const fbRes = await fetch('/data/games.json');
          if (fbRes.ok) {
            const fbGames = await fbRes.json();
            if (Array.isArray(fbGames) && fbGames.length > 0) allGames = fbGames;
          }
        } catch(e2) {}
      }

      // 2. Also merge any local drawings saved in localStorage
      try {
        const localGames = JSON.parse(localStorage.getItem('coloringtool_local_games') || '[]');
        if (Array.isArray(localGames) && localGames.length > 0) {
          localGames.forEach(lg => {
            if (!lg || !lg.slug) return;
            const idx = allGames.findIndex(g => g.id === lg.id || (g.catId === lg.catId && g.slug === lg.slug));
            if (idx >= 0) allGames[idx] = Object.assign({}, allGames[idx], lg);
            else if (lg.fullImageSrc || lg.thumbSrc || lg.gameScript) allGames.push(lg);
          });
        }
      } catch(e) {}

      if (isRandom) {
        let pool = allGames;
        if (catParam) pool = allGames.filter(g => g.catId === catParam);
        currentGame = pool[Math.floor(Math.random() * pool.length)];
      } else if (catParam && gameParam) {
        currentGame = allGames.find(g => (g.catId === catParam || !catParam) && (g.slug === gameParam || g.id === gameParam));
      } else if (gameParam) {
        currentGame = allGames.find(g => g.slug === gameParam || g.id === gameParam);
      }

      if (!currentGame) {
        currentGame = allGames.find(g => g.slug === 'scs') || allGames.find(g => g.fullImageSrc || g.gameScript) || allGames[0];
      }

      // Update UI elements & dynamic SEO metadata
      const pageTitle = (currentGame.h1 ? (currentGame.h1 + ' | ColoringTool.com') : (currentGame.label + ' Free Online Coloring Page | ColoringTool.com'));
      document.title = pageTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', currentGame.metaDescription || currentGame.descriptionText || ('Free online ' + currentGame.label + ' coloring page for kids. Color online or print for free!'));
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', (currentGame.label.toLowerCase() + ' coloring page, free ' + currentGame.label.toLowerCase() + ' printable, online coloring ' + currentGame.label.toLowerCase() + ', ' + currentGame.catName.toLowerCase() + ' coloring'));
      const linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) linkCanonical.setAttribute('href', window.location.origin + '/studio.html?cat=' + encodeURIComponent(currentGame.catId) + '&game=' + encodeURIComponent(currentGame.slug));

      document.getElementById('gameTitle').innerText = currentGame.label + ' (' + currentGame.catName + ')';
      document.getElementById('backLink').href = '/' + currentGame.catId + '/';
      document.getElementById('backLink').innerText = '← ' + currentGame.catName;
      document.getElementById('relatedTitle').innerText = 'More ' + currentGame.catName + ' Drawings';

      // Update Dedicated Description Box
      const catIcons = { unicorn: '🦄', animals: '🦁', princess: '👑', transport: '🚀', christmas: '🎄', food: '🍦' };
      const icon = catIcons[currentGame.catId] || '🎨';
      const iconEl = document.getElementById('descIcon');
      if (iconEl) iconEl.innerText = icon;
      const catBadgeEl = document.getElementById('descCatBadge');
      if (catBadgeEl) catBadgeEl.innerText = (currentGame.catName ? currentGame.catName.toUpperCase() : 'COLORING') + ' • FREE ONLINE & PRINTABLE DRAWING';
      const headingEl = document.getElementById('descHeading');
      if (headingEl) headingEl.innerText = currentGame.h1 || ('About ' + currentGame.label + ' Coloring Page');
      const mainTextEl = document.getElementById('descMainText');
      if (mainTextEl) mainTextEl.innerText = currentGame.descriptionText || ('Enjoy coloring this ' + currentGame.label + ' drawing online! Specially crafted for young children ages 3 to 10 to unleash their imagination, discover colors, and build fine motor skills.');

      // Bind Original Color Image and Outline Preview
      const originalImgSrc = formatImgSrc(currentGame.thumbSrc || currentGame.fullImageSrc);
      const outlineImgSrc = formatImgSrc(currentGame.fullImageSrc || currentGame.thumbSrc);

      const sidebarColorImg = document.getElementById('sidebarOriginalColorImg');
      if (sidebarColorImg) {
        sidebarColorImg.src = originalImgSrc;
        sidebarColorImg.alt = 'Original colored ' + currentGame.label;
      }

      const sectionColorImg = document.getElementById('sectionOriginalColorImg');
      if (sectionColorImg) {
        sectionColorImg.src = originalImgSrc;
        sectionColorImg.alt = 'Original colored ' + currentGame.label;
      }

      const sectionTitle = document.getElementById('originalColorSectionTitle');
      if (sectionTitle) {
        sectionTitle.innerText = 'Original Color Image: ' + currentGame.label;
      }

      const sectionOutline = document.getElementById('sectionOutlineImg');
      if (sectionOutline) {
        sectionOutline.src = outlineImgSrc;
        sectionOutline.alt = currentGame.label + ' line art contour';
      }

      const modalImg = document.getElementById('modalColorImg');
      if (modalImg) modalImg.src = originalImgSrc;
      const modalTitle = document.getElementById('modalGameTitle');
      if (modalTitle) modalTitle.innerText = currentGame.label + ' — Original Color Image';

      // Populate sidebar
      const related = allGames.filter(g => g.catId === currentGame.catId && g.slug !== currentGame.slug);
      document.getElementById('relatedGrid').innerHTML = related.slice(0, 10).map(g => {
        return '<a href="/studio.html?cat=' + g.catId + '&game=' + g.slug + '" class="related-card">' +
          '<img src="/' + (g.thumbSrc || g.fullImageSrc) + '" alt="' + g.label + '">' +
          '<span>' + g.label + '</span>' +
        '</a>';
      }).join('');

      // Google Analytics (GA4) Event: view_item
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'view_item', {
          item_id: currentGame.slug || currentGame.id,
          item_name: currentGame.label,
          item_category: currentGame.catName
        });
      }

      // Check whether this is a CreateJS Flash game or a direct line-art image
      if (currentGame.gameScript) {
        loadCreateJSGame(currentGame);
      } else {
        loadRasterColoringGame(currentGame);
      }
    }

    function loadCreateJSGame(game) {
      document.querySelectorAll('.raster-only').forEach(el => el.style.display = 'none');
      const s = document.createElement('script');
      s.src = '/' + game.gameScript.split('?')[0];
      s.onload = function() {
        try {
          const compKeys = Object.keys(AdobeAn.compositions);
          const compId = compKeys[compKeys.length - 1];
          const comp = AdobeAn.getComposition(compId) || AdobeAn.compositions[compId];
          const lib = comp.getLibrary();

          // Initialize root and stage immediately so drawing renders instantly!
          const funcKeys = Object.keys(lib).filter(k => typeof lib[k] === 'function' && k !== 'Stage' && k !== 'AnMovieClip');
          const RootConstructor = lib[funcKeys[funcKeys.length - 1]];

          exportRoot = new RootConstructor();
          stage = new lib.Stage(canvas);
          stage.enableMouseOver(20);
          stage.addChild(exportRoot);
          createjs.Ticker.setFPS(lib.properties.fps || 32);
          createjs.Ticker.addEventListener("tick", stage);
          stage.update();

          if (exportRoot.menu_btn) {
            exportRoot.menu_btn.removeAllEventListeners('click');
            exportRoot.menu_btn.on('click', () => {
              window.location.href = '/' + game.catId + '/';
            });
          }

          makeResponsive(true, 'both', false, 1, lib);

          // Asynchronously register sounds without blocking canvas
          try {
            createjs.Sound.registerSound({ src: '/' + game.catId + '/sounds/sonidoClic.mp3', id: 'sonidoClic' });
            createjs.Sound.registerSound({ src: '/' + game.catId + '/sounds/Sound36.mp3', id: 'Sound36' });
          } catch(e) {}
        } catch (err) {
          console.error("CreateJS initialization failed:", err);
          loadRasterColoringGame(game);
        }
      };
      document.body.appendChild(s);
    }

    // Raster Coloring Engine for Admin-uploaded Pictures
    const COLOR_NAMES = {
      '#FF3B30': 'Red',
      '#FF9500': 'Orange',
      '#FFCC00': 'Yellow',
      '#34C759': 'Green',
      '#00C7BE': 'Teal',
      '#30B0C7': 'Cyan',
      '#32ADE6': 'Sky Blue',
      '#007AFF': 'Blue',
      '#5856D6': 'Deep Blue',
      '#AF52DE': 'Purple',
      '#FF2D55': 'Pink',
      '#A2845E': 'Brown',
      '#8E8E93': 'Grey',
      '#FFFFFF': 'White',
      '#000000': 'Black'
    };

    let currentTool = 'brush'; // 'brush' (Paint Brush)
    let undoStack = [];
    let baseLineArtImg = null;

    function saveUndoState() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (undoStack.length >= 25) undoStack.shift();
      undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function undoLastColorAction() {
      if (undoStack.length === 0) return;
      const ctx = canvas.getContext('2d');
      const lastState = undoStack.pop();
      ctx.putImageData(lastState, 0, 0);
      try { createjs.Sound.play('sonidoClic'); } catch(e) {}
    }

    function cleanRasterCanvas() {
      if (!baseLineArtImg) return;
      saveUndoState();
      renderImageToCanvas();
      try { createjs.Sound.play('sonidoClic'); } catch(e) {}
    }

    function updateBrushCursor(c) {
      const color = c || currentColor || '#FF3B30';
      const encColor = encodeURIComponent(color);
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">' +
        '<defs><filter id="s" x="-20%" y="-20%" width="150%" height="150%"><feDropShadow dx="1" dy="1" stdDeviation="0.8" flood-color="#000000" flood-opacity="0.45"/></filter></defs>' +
        '<g filter="url(#s)">' +
        '<path d="M21,3 L29,11 L27,13 L19,5 Z" fill="#D97706" stroke="#78350F" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<path d="M16,8 L23,15 L19,19 L12,12 Z" fill="#E2E8F0" stroke="#475569" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<line x1="14.5" y1="13.5" x2="20.5" y2="17.5" stroke="#94A3B8" stroke-width="0.8"/>' +
        '<path d="M12,12 L19,19 L11,25 C7,29 2,30 2,30 C2,30 3,25 7,21 Z" fill="' + encColor + '" stroke="#0F172A" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<path d="M13,15 L9,21 C7,23 5,26 4,28" stroke="rgba(255,255,255,0.75)" stroke-width="1.2" stroke-linecap="round" fill="none"/>' +
        '<circle cx="2" cy="30" r="1.8" fill="' + encColor + '" stroke="#FFFFFF" stroke-width="0.8"/>' +
        '</g></svg>';
      const cursorVal = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") 2 30, url(/images/paintbrush-cursor.svg) 2 30, crosshair';
      if (canvas) canvas.style.cursor = cursorVal;
      const wrap = document.querySelector('.canvas-container');
      if (wrap) wrap.style.cursor = cursorVal;
    }

    function setStudioTool(tool) {
      currentTool = 'brush';
      const brushBtn = document.getElementById('toolBrushBtn');
      const modeText = document.getElementById('brushModeText');
      const iconSpan = document.getElementById('toolIndicatorIcon');

      if (brushBtn) brushBtn.classList.add('active');
      if (modeText) modeText.innerText = 'Paint Brush';
      if (iconSpan) iconSpan.innerText = '🖌️';
      updateBrushCursor(currentColor);
      try { createjs.Sound.play('sonidoClic'); } catch(e) {}
    }

    function selectColor(c, el) {
      currentColor = c;
      document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('active'));
      if (el) {
        el.classList.add('active');
      } else {
        const swatches = document.querySelectorAll('.palette-swatch');
        swatches.forEach(s => {
          if (s.style.background.toLowerCase() === c.toLowerCase() || s.getAttribute('data-color') === c) {
            s.classList.add('active');
          }
        });
      }

      const tipSvg = document.getElementById('brushSvgTip');
      if (tipSvg) tipSvg.setAttribute('fill', c);
      const colorDot = document.getElementById('brushColorDot');
      if (colorDot) colorDot.setAttribute('fill', c);
      const nameEl = document.getElementById('brushColorName');
      if (nameEl) nameEl.innerText = 'Color: ' + (COLOR_NAMES[c] || c);

      updateBrushCursor(c);
      try { createjs.Sound.play('sonidoClic'); } catch(e) {}
    }

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(ch => ch + ch).join('');
      const num = parseInt(hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    // High-performance 4-Way Queue BFS Flood Fill Algorithm for line-art
    function performFloodFill(startX, startY, fillHex) {
      startX = Math.round(startX);
      startY = Math.round(startY);
      if (startX < 0 || startX >= canvas.width || startY < 0 || startY >= canvas.height) return;

      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const fillRgb = hexToRgb(fillHex);
      const fillR = fillRgb[0], fillG = fillRgb[1], fillB = fillRgb[2];

      let sX = startX;
      let sY = startY;
      let startIdx = (sY * w + sX) * 4;
      let startR = data[startIdx];
      let startG = data[startIdx + 1];
      let startB = data[startIdx + 2];
      let startA = data[startIdx + 3];
      let startLum = 0.299 * startR + 0.587 * startG + 0.114 * startB;

      // Smart Touch Snapping: If finger tapped directly on a dark outline, look in 1-5px radius for fillable space
      if (startLum < 75 && startA > 160) {
        let found = false;
        for (let r = 1; r <= 5 && !found; r++) {
          const offsets = [
            [0, -r], [0, r], [-r, 0], [r, 0],
            [-r, -r], [r, -r], [-r, r], [r, r]
          ];
          for (let i = 0; i < offsets.length; i++) {
            const nx = sX + offsets[i][0];
            const ny = sY + offsets[i][1];
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nIdx = (ny * w + nx) * 4;
              const nLum = 0.299 * data[nIdx] + 0.587 * data[nIdx + 1] + 0.114 * data[nIdx + 2];
              if (nLum >= 75) {
                sX = nx;
                sY = ny;
                startIdx = nIdx;
                startR = data[nIdx];
                startG = data[nIdx + 1];
                startB = data[nIdx + 2];
                startA = data[nIdx + 3];
                startLum = nLum;
                found = true;
                break;
              }
            }
          }
        }
        if (!found) return; // Surrounded entirely by thick dark line
      }

      // Check if target area already matches the fill color
      const diffToFill = Math.abs(startR - fillR) + Math.abs(startG - fillG) + Math.abs(startB - fillB);
      if (diffToFill < 16) {
        return;
      }

      saveUndoState();

      // Check if starting in an unfilled / white area
      const isStartWhite = startLum >= 180 && (Math.max(startR, startG, startB) - Math.min(startR, startG, startB) < 35);

      function matchPixel(idx) {
        const a = data[idx + 3];
        if (a < 50) return false;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum < 75 && a > 160) return false; // Stop at dark line contour

        if (isStartWhite) {
          // Uncolored region: fills all white/light paper up to the dark ink outline
          // Stop if pixel has significant color saturation from another painted section
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          if (sat > 35) return false;
          return lum >= 75;
        } else {
          // Repainting an already-colored area
          const diff = Math.abs(r - startR) + Math.abs(g - startG) + Math.abs(b - startB);
          return diff <= 75;
        }
      }

      const totalPixels = w * h;
      const visited = new Uint8Array(totalPixels);
      const queue = new Int32Array(totalPixels);
      let queueStart = 0;
      let queueEnd = 0;

      const startPixel = startY * w + startX;
      queue[queueEnd++] = startPixel;
      visited[startPixel] = 1;

      while (queueStart < queueEnd) {
        const pixel = queue[queueStart++];
        const px = pixel % w;
        const py = (pixel / w) | 0;
        const idx = pixel * 4;

        data[idx] = fillR;
        data[idx + 1] = fillG;
        data[idx + 2] = fillB;
        data[idx + 3] = 255;

        // West
        if (px > 0) {
          const left = pixel - 1;
          if (!visited[left] && matchPixel(left * 4)) {
            visited[left] = 1;
            queue[queueEnd++] = left;
          }
        }
        // East
        if (px < w - 1) {
          const right = pixel + 1;
          if (!visited[right] && matchPixel(right * 4)) {
            visited[right] = 1;
            queue[queueEnd++] = right;
          }
        }
        // North
        if (py > 0) {
          const up = pixel - w;
          if (!visited[up] && matchPixel(up * 4)) {
            visited[up] = 1;
            queue[queueEnd++] = up;
          }
        }
        // South
        if (py < h - 1) {
          const down = pixel + w;
          if (!visited[down] && matchPixel(down * 4)) {
            visited[down] = 1;
            queue[queueEnd++] = down;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      try { createjs.Sound.play('sonidoClic'); } catch(e) {}
    }

    // Raster Coloring Engine for Admin-uploaded Pictures
    function loadRasterColoringGame(game) {
      document.querySelectorAll('.raster-only').forEach(el => el.style.display = 'flex');
      const titleEl = document.getElementById('toolsSideTitle');
      if (titleEl && window.innerWidth >= 900) titleEl.style.display = 'flex';

      const palette = document.getElementById('rasterPalette');
      if (palette) {
        palette.style.display = 'flex';
        palette.innerHTML = PALETTE_COLORS.map(c => {
          return '<div class="palette-swatch ' + (c === currentColor ? 'active' : '') + '" style="background:' + c + ';" data-color="' + c + '"></div>';
        }).join('');
        palette.querySelectorAll('.palette-swatch').forEach(swatch => {
          swatch.onclick = function() {
            selectColor(this.getAttribute('data-color'), this);
          };
        });
      }

      setStudioTool('brush');
      selectColor(currentColor || '#FF3B30', document.querySelector('.palette-swatch'));

      const ctx = canvas.getContext('2d');
      canvas.width = 510;
      canvas.height = 580;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const rawSrc = formatImgSrc(game.fullImageSrc || game.thumbSrc);
      const img = new Image();

      // Only set crossOrigin for external remote URLs
      if (rawSrc.startsWith('http://') || rawSrc.startsWith('https://')) {
        try {
          const u = new URL(rawSrc);
          if (u.origin !== window.location.origin) {
            img.crossOrigin = 'anonymous';
          }
        } catch(e) {}
      }

      function renderImageToCanvas() {
        baseLineArtImg = img;
        const natW = img.naturalWidth || img.width || 510;
        const natH = img.naturalHeight || img.height || 580;
        const aspect = natW / natH;

        // Adapt canvas height to natural aspect ratio so it fills the screen cleanly
        const targetW = 510;
        let targetH = Math.round(targetW / aspect);
        if (targetH < 380) targetH = 380;
        if (targetH > 620) targetH = 620;

        if (canvas.width !== targetW) canvas.width = targetW;
        if (canvas.height !== targetH) canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Scale image to fill canvas edge-to-edge
        let w = canvas.width - 12;
        let h = w / aspect;
        if (h > canvas.height - 12) {
          h = canvas.height - 12;
          w = h * aspect;
        }
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(img, x, y, w, h);
        undoStack = [];
        makeResponsive(true, 'both', false, 1, { properties: { width: targetW, height: targetH } });
      }

      let retryWithoutCors = false;
      img.onload = () => {
        renderImageToCanvas();
      };

      img.onerror = (err) => {
        console.warn('Canvas image load warning:', err, rawSrc);
        if (!retryWithoutCors && img.crossOrigin) {
          retryWithoutCors = true;
          img.crossOrigin = null;
          img.src = rawSrc + (rawSrc.includes('?') ? '&' : '?') + 't=' + Date.now();
          return;
        }

        canvas.width = 510;
        canvas.height = 580;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, 470, 540);
        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 22px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(game.label || 'Coloring Page', 255, 270);
        ctx.font = '16px Fredoka, sans-serif';
        ctx.fillText('Tap colors below to paint this canvas!', 255, 310);
      };

      // Set src AFTER handlers are defined
      img.src = rawSrc;

      // Handle synchronously cached images
      if (img.complete && img.naturalWidth !== 0) {
        renderImageToCanvas();
      }

      // Pointer & Touch interactions (Tap to Fill & Smooth Paint Brush)
      let isPointerDown = false;
      let startPos = { x: 0, y: 0 };
      let lastX = 0, lastY = 0;
      let hasDragged = false;

      function getCanvasPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
        }
        return {
          x: Math.round((clientX - rect.left) * scaleX),
          y: Math.round((clientY - rect.top) * scaleY)
        };
      }

      function onPointerDown(e) {
        if (e.cancelable) e.preventDefault();
        isPointerDown = true;
        hasDragged = false;
        const pos = getCanvasPos(e);
        startPos = pos;
        lastX = pos.x;
        lastY = pos.y;

        // PAINT BRUSH TOOL: Fill region immediately on touch/click down!
        performFloodFill(pos.x, pos.y, currentColor);
      }

      function onPointerMove(e) {
        if (!isPointerDown) return;
        if (e.cancelable) e.preventDefault();
      }

      function onPointerUp(e) {
        if (!isPointerDown) return;
        isPointerDown = false;
        if (e.cancelable) e.preventDefault();
      }

      let lastActionTime = 0;
      function handleTouchDown(e) {
        const now = Date.now();
        if (now - lastActionTime < 50) return;
        lastActionTime = now;
        onPointerDown(e);
      }

      // Pointer events (modern unified standard)
      if (window.PointerEvent) {
        canvas.addEventListener('pointerdown', handleTouchDown, { passive: false });
        canvas.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      }

      // Touch & Mouse fallbacks
      canvas.addEventListener('touchstart', handleTouchDown, { passive: false });
      canvas.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
      window.addEventListener('touchcancel', onPointerUp);

      canvas.addEventListener('mousedown', handleTouchDown);
      canvas.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      canvas.addEventListener('click', handleTouchDown);
    }

    function makeResponsive(isResp, respDim, isScale, scaleType, lib) {
      function resizeCanvas() {
        const w = (lib && lib.properties && lib.properties.width) || 510;
        const h = (lib && lib.properties && lib.properties.height) || 580;
        const wrap = document.querySelector('.canvas-container');
        const containerW = wrap ? wrap.clientWidth : Math.min(window.innerWidth - 24, w);
        const sRatio = containerW / w;
        const targetH = Math.round(h * sRatio);

        // Only set canvas coordinate attributes if they actually changed (to prevent wiping 2D canvas context)
        if (canvas.width !== w) canvas.width = w;
        if (canvas.height !== h) canvas.height = h;

        canvas.style.width = containerW + 'px';
        canvas.style.height = targetH + 'px';
        if (wrap) {
          wrap.style.width = containerW + 'px';
          wrap.style.height = targetH + 'px';
        }

        // Inside the canvas, Adobe Animate scenes are authored for w x h (e.g. 510 x 580).
        // Since CSS canvas.style.width already visually scales the canvas to containerW,
        // stage.scaleX and stage.scaleY MUST remain 1:1 so the drawing fills 100% of the canvas
        // without being double-shrunk or displaced on mobile!
        if (stage) {
          stage.scaleX = 1;
          stage.scaleY = 1;
          stage.update();
        }
      }
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('orientationchange', resizeCanvas);
      resizeCanvas();
      setTimeout(resizeCanvas, 50);
      setTimeout(resizeCanvas, 200);
    }

    function saveArtwork() {
      const dataUrl = canvas.toDataURL('image/png');
      try {
        const saved = JSON.parse(localStorage.getItem('coloring_art_gallery') || '[]');
        saved.unshift({
          id: Date.now(),
          title: currentGame.label,
          category: currentGame.catName,
          date: new Date().toLocaleDateString(),
          thumb: dataUrl
        });
        localStorage.setItem('coloring_art_gallery', JSON.stringify(saved.slice(0, 40)));
      } catch (e) {}

      // Google Analytics (GA4) Event: save_artwork
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'save_artwork', {
          item_id: currentGame.slug || currentGame.id,
          item_name: currentGame.label,
          item_category: currentGame.catName
        });
      }

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = (currentGame.slug || 'coloring-page') + '.png';
      a.click();
      alert('🎨 Artwork saved to "My Art Gallery" and downloaded!');
    }

    function navigateGame(dir) {
      const catGames = allGames.filter(g => g.catId === currentGame.catId);
      const currIdx = catGames.findIndex(g => g.slug === currentGame.slug);
      let nextIdx = currIdx + dir;
      if (nextIdx < 0) nextIdx = catGames.length - 1;
      if (nextIdx >= catGames.length) nextIdx = 0;
      window.location.href = '/studio.html?cat=' + catGames[nextIdx].catId + '&game=' + catGames[nextIdx].slug;
    }

    function openOriginalImageModal() {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'view_color_guide', {
          item_name: currentGame.label,
          item_category: currentGame.catName
        });
      }
      const modal = document.getElementById('originalColorModal');
      if (modal) modal.classList.add('show');
    }

    function closeOriginalImageModal(e) {
      if (e && e.target !== e.currentTarget && !e.target.classList.contains('color-modal-close') && !e.target.closest('.btn-studio-action')) {
        return;
      }
      const modal = document.getElementById('originalColorModal');
      if (modal) modal.classList.remove('show');
    }

    function scrollToCanvas() {
      const canvasEl = document.getElementById('canvas');
      if (canvasEl) {
        canvasEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('originalColorModal');
        if (modal) modal.classList.remove('show');
      }
    });

    window.onload = initStudio;
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'studio.html'), studioHtml);

// ----------------------------------------------------
// 5. GENERATE ABOUT US & PRIVACY POLICY PAGES
// ----------------------------------------------------
console.log('Generating public/about.html and public/privacy.html...');

const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: 'About Us — ColoringTool.com',
  description: 'Learn about ColoringTool.com: safe, fun, and free online coloring activities for kids and families worldwide.',
  keywords: 'about coloringtool, kids coloring platform, online painting website, safe coloring games',
  canonicalPath: '/about.html'
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('about')}
  <header class="hero-banner" style="padding:40px 20px 30px;">
    <h1 class="hero-title">About ColoringTool.com</h1>
    <p class="hero-sub">Providing safe, joyful, and creative digital activities for kids around the world.</p>
  </header>
  <main style="max-width:960px;margin:40px auto;padding:0 20px;">
    <div style="background:#FFFFFF;border-radius:20px;padding:40px;box-shadow:0 8px 30px rgba(15,23,42,0.08);border:1px solid #E2E8F0;line-height:1.8;font-size:1.05rem;color:#334155;">
      ${siteConfig.aboutUsHtml || '<p>Welcome to ColoringTool.com!</p>'}
    </div>
  </main>
  ${renderAdUnit(ad.belowGameSlot || '3456789012')}
  ${renderFooter()}
</body>
</html>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'about.html'), aboutHtml);

const privacyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: 'Privacy Policy & Children\'s Safety — ColoringTool.com',
  description: 'Privacy Policy for ColoringTool.com. We prioritize child safety, strict COPPA compliance, and transparent data practices.',
  keywords: 'coloringtool privacy policy, COPPA compliance, child safe coloring website',
  canonicalPath: '/privacy.html'
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('privacy')}
  <header class="hero-banner" style="padding:40px 20px 30px;">
    <h1 class="hero-title">Privacy Policy & Children's Safety</h1>
    <p class="hero-sub">Our commitment to transparency, child privacy, and COPPA compliance.</p>
  </header>
  <main style="max-width:960px;margin:40px auto;padding:0 20px;">
    <div style="background:#FFFFFF;border-radius:20px;padding:40px;box-shadow:0 8px 30px rgba(15,23,42,0.08);border:1px solid #E2E8F0;line-height:1.8;font-size:1.05rem;color:#334155;">
      ${siteConfig.privacyPolicyHtml || '<p>ColoringTool.com respects your privacy.</p>'}
    </div>
  </main>
  ${renderAdUnit(ad.belowGameSlot || '3456789012')}
  ${renderFooter()}
</body>
</html>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'privacy.html'), privacyHtml);

const termsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: 'Terms of Use — ColoringTool.com',
  description: 'Terms of Use and free educational licensing policy for ColoringTool.com. Free online coloring games and classroom printables.',
  keywords: 'coloringtool terms of use, classroom coloring license, printable drawings terms',
  canonicalPath: '/terms.html'
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('terms')}
  <header class="hero-banner" style="padding:40px 20px 30px;">
    <h1 class="hero-title">Terms of Use &amp; Educational Licensing</h1>
    <p class="hero-sub">Our guidelines for safe personal, home, and classroom educational coloring.</p>
  </header>
  <main style="max-width:960px;margin:40px auto;padding:0 20px;">
    <div style="background:#FFFFFF;border-radius:20px;padding:40px;box-shadow:0 8px 30px rgba(15,23,42,0.08);border:1px solid #E2E8F0;line-height:1.8;font-size:1.05rem;color:#334155;">
      ${siteConfig.termsHtml || '<p>Welcome to ColoringTool.com Terms of Use.</p>'}
    </div>
  </main>
  ${renderAdUnit(ad.belowGameSlot || '3456789012')}
  ${renderFooter()}
</body>
</html>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'terms.html'), termsHtml);

const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${renderSeoHeadTags({
  title: 'Contact Us & FAQ — ColoringTool.com',
  description: 'Contact ColoringTool.com for support, teacher inquiries, drawing suggestions, and COPPA child privacy questions.',
  keywords: 'contact coloringtool, support email, teacher coloring inquiry, drawing suggestions',
  canonicalPath: '/contact.html'
})}
  <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96">
  <link rel="stylesheet" href="/css/modern-theme.css">
  ${adHeaderScript}
  ${analyticsHeaderScript}
</head>
<body>
  ${renderNav('contact')}
  <header class="hero-banner" style="padding:40px 20px 30px;">
    <h1 class="hero-title">Contact Us &amp; Support</h1>
    <p class="hero-sub">Have questions or drawing ideas? We love hearing from parents, teachers, and kids!</p>
  </header>
  <main style="max-width:960px;margin:40px auto;padding:0 20px;">
    <div style="background:#FFFFFF;border-radius:20px;padding:40px;box-shadow:0 8px 30px rgba(15,23,42,0.08);border:1px solid #E2E8F0;line-height:1.8;font-size:1.05rem;color:#334155;">
      ${siteConfig.contactHtml || '<p>Contact us at contact@coloringtool.com</p>'}
    </div>
  </main>
  <script>
    function handleContactSubmit() {
      const btn = document.getElementById('contactSubmitBtn');
      const msg = document.getElementById('contactSuccessMsg');
      if (btn) btn.disabled = true;
      if (msg) msg.style.display = 'block';
      setTimeout(() => {
        const form = document.getElementById('contactForm');
        if (form) form.reset();
        if (btn) btn.disabled = false;
      }, 4000);
    }
  </script>
  ${renderAdUnit(ad.belowGameSlot || '3456789012')}
  ${renderFooter()}
</body>
</html>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'contact.html'), contactHtml);

// ----------------------------------------------------
// 6. GENERATE SITEMAP.XML AND ROBOTS.TXT
// ----------------------------------------------------
console.log('Generating public/sitemap.xml and public/robots.txt...');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateSitemapXml(), 'utf-8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobotsTxt(), 'utf-8');

// Automatically generate Cloudflare Worker edge files
try {
  require('./generate_worker.js');
} catch(e) {}

console.log('All ColoringTool.com pages generated successfully!');
