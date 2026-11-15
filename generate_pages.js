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

function renderNav(activeTab = '') {
  return `
  <nav class="site-nav">
    <div class="nav-container">
      <a href="/" class="brand-logo">
        <div class="brand-logo-icon">🎨</div>
        <span class="brand-text">Coloring<span class="brand-accent">Tool</span><span style="font-size:0.95rem;opacity:0.85;">.com</span></span>
      </a>
      <div class="nav-links">
        <a href="/" ${activeTab === 'home' ? 'class="active"' : ''}>🏠 Home</a>
        <div class="dropdown">
          <a href="#" class="dropbtn">📂 Categories ▾</a>
          <div class="dropdown-content">
            ${categories.map(c => `<a href="/${c.id}/">${c.icon || '🎨'} ${c.name}</a>`).join('')}
          </div>
        </div>
        <a href="/gallery.html" ${activeTab === 'gallery' ? 'class="active"' : ''}>🎨 My Art Gallery</a>
        <a href="/about.html" ${activeTab === 'about' ? 'class="active"' : ''}>ℹ️ About Us</a>
        <a href="/privacy.html" ${activeTab === 'privacy' ? 'class="active"' : ''}>🔒 Privacy Policy</a>
      </div>
      <div class="nav-actions">
        <a href="/studio.html?random=1" class="btn-surprise" title="Surprise Me with a random drawing!">✨ Surprise Me!</a>
        <a href="/admin/" class="btn-admin-link">⚙️ Admin</a>
      </div>
    </div>
  </nav>
  `;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <div class="footer-logo">
          <div class="brand-logo-icon" style="width:34px;height:34px;font-size:1.2rem;">🎨</div>
          <strong>ColoringTool.com</strong>
        </div>
        <p>${siteConfig.tagline}</p>
      </div>
      <div class="footer-links-group">
        <h4>Coloring Categories</h4>
        <ul>
          ${categories.map(c => `<li><a href="/${c.id}/">${c.icon || '🎨'} Online ${c.name} Drawings</a></li>`).join('')}
        </ul>
      </div>
      <div class="footer-links-group">
        <h4>Features & Information</h4>
        <ul>
          <li><a href="/gallery.html">🎨 My Art Gallery</a></li>
          <li><a href="/studio.html?random=1">✨ Random Drawing</a></li>
          <li><a href="/about.html">ℹ️ About ColoringTool.com</a></li>
          <li><a href="/privacy.html">🔒 Privacy Policy & COPPA</a></li>
          <li><a href="/admin/">⚙️ Admin Management Tool</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 <a href="/">ColoringTool.com</a> &bull; All rights reserved. Free online drawing and coloring games for kids. Safe, instant, educational!</p>
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
  <title>${siteConfig.siteTitle}</title>
  <meta name="description" content="${siteConfig.tagline}">
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
  <title>Free Online ${cat.name} Coloring Pages for Kids | ColoringTool.com</title>
  <meta name="description" content="${cat.description}">
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
  <title>My Art Gallery — ColoringTool.com</title>
  <meta name="description" content="View, print, and download all your colored masterpieces on ColoringTool.com">
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
  <title>Coloring Studio — ColoringTool.com</title>
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
      background: #1E1B4B;
      color: white;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }
    .studio-title-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn-back {
      background: rgba(255,255,255,0.15);
      color: white;
      text-decoration: none;
      padding: 7px 16px;
      border-radius: 20px;
      font-size: 0.92rem;
      font-weight: 600;
      transition: background 0.2s;
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
      }
    }
    .stage-wrapper {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(15,23,42,0.06);
      border: 1px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      align-items: center;
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
    }
    .canvas-container {
      position: relative;
      width: 510px;
      height: 580px;
      max-width: 100%;
      background: #999999;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    }
    #canvas {
      width: 100%;
      height: 100%;
      display: block;
      touch-action: manipulation;
    }
    .controls-strip {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 540px;
      margin-top: 20px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .btn-studio-action {
      background: #4F46E5;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 25px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.92rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
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
    /* Dynamic Color Palette for raster custom uploaded drawings */
    .raster-palette {
      display: none;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
      justify-content: center;
      max-width: 510px;
    }
    .palette-swatch {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: transform 0.15s;
    }
    .palette-swatch:hover, .palette-swatch.active {
      transform: scale(1.25);
      border-color: #0F172A;
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
      <h1 style="margin:0;font-size:1.35rem;" id="gameTitle">Coloring Studio</h1>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="/studio.html?random=1" class="btn-back" style="background:#F59E0B;">✨ Surprise Drawing!</a>
    </div>
  </header>

  <div class="studio-layout">
    <!-- Main Drawing Stage -->
    <main class="stage-wrapper">
      <div class="hint-banner">
        <span>💡 Tap a color in the palette below, then tap inside any part of the picture to color it!</span>
      </div>

      <div class="canvas-container">
        <canvas id="canvas" width="510" height="580"></canvas>
      </div>

      <!-- Raster custom drawing palette (active for uploaded pictures) -->
      <div class="raster-palette" id="rasterPalette"></div>

      <div class="controls-strip">
        <div style="display:flex;gap:8px;">
          <button class="btn-studio-action" onclick="navigateGame(-1)">◀ Previous</button>
          <button class="btn-studio-action" onclick="navigateGame(1)">Next ▶</button>
        </div>
        <div style="display:flex;gap:8px;">
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

      if (isRandom) {
        let pool = allGames;
        if (catParam) pool = allGames.filter(g => g.catId === catParam);
        currentGame = pool[Math.floor(Math.random() * pool.length)];
      } else if (catParam && gameParam) {
        currentGame = allGames.find(g => g.catId === catParam && (g.slug === gameParam || g.id === gameParam));
      }

      if (!currentGame) {
        currentGame = allGames[0];
      }

      // Update UI elements
      document.title = currentGame.label + ' — Coloring Studio | ColoringTool.com';
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
      const originalImgSrc = '/' + (currentGame.thumbSrc || currentGame.fullImageSrc);
      const outlineImgSrc = '/' + (currentGame.fullImageSrc || currentGame.thumbSrc);

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
    function loadRasterColoringGame(game) {
      const palette = document.getElementById('rasterPalette');
      palette.style.display = 'flex';
      palette.innerHTML = PALETTE_COLORS.map(c => {
        return '<div class="palette-swatch ' + (c === currentColor ? 'active' : '') + '" style="background:' + c + ';" onclick="selectColor(\\'' + c + '\\', this)"></div>';
      }).join('');

      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/' + (game.fullImageSrc || game.thumbSrc);
      img.onload = () => {
        canvas.width = 510;
        canvas.height = 580;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Center image
        const aspect = img.width / img.height;
        let w = canvas.width - 20;
        let h = w / aspect;
        if (h > canvas.height - 20) {
          h = canvas.height - 20;
          w = h * aspect;
        }
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(img, x, y, w, h);
      };

      // Tap-to-paint / brush on canvas
      let isDrawing = false;
      canvas.onmousedown = (e) => { isDrawing = true; drawRaster(e); };
      canvas.onmousemove = (e) => { if (isDrawing) drawRaster(e); };
      window.onmouseup = () => { isDrawing = false; };

      canvas.ontouchstart = (e) => { isDrawing = true; drawRaster(e.touches[0]); e.preventDefault(); };
      canvas.ontouchmove = (e) => { if (isDrawing) drawRaster(e.touches[0]); e.preventDefault(); };
      window.ontouchend = () => { isDrawing = false; };
    }

    function selectColor(c, el) {
      currentColor = c;
      document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('active'));
      if (el) el.classList.add('active');
    }

    function drawRaster(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = currentColor;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    function makeResponsive(isResp, respDim, isScale, scaleType, lib) {
      function resizeCanvas() {
        const w = lib.properties.width || 510;
        const h = lib.properties.height || 580;
        const wrap = document.querySelector('.canvas-container');
        const containerW = wrap ? wrap.clientWidth : w;
        const sRatio = containerW / w;

        canvas.style.width = (w * sRatio) + 'px';
        canvas.style.height = (h * sRatio) + 'px';
        if (stage) {
          stage.scaleX = sRatio;
          stage.scaleY = sRatio;
          stage.update();
        }
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
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

// Automatically generate Cloudflare Worker edge files
try {
  require('./generate_worker.js');
} catch(e) {}

console.log('All ColoringTool.com pages generated successfully!');
