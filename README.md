# 🎨 ColoringTool.com — Free Online Coloring Pages & Painting Games for Kids

**ColoringTool.com** is a modern, high-performance, kid-friendly web application for coloring and painting online. It features 113 interactive coloring pages, a dual-engine canvas (vector and raster), a full-featured Admin Management Tool, and seamless Google AdSense compatibility with root `/ads.txt` support.

---

## 🌟 Key Features

### 1. Catalog of 113 Coloring Drawings & Games
* 🦁 **Animals** (21 drawings)
* 🦄 **Unicorns** (21 drawings)
* 👑 **Princesses** (21 drawings)
* 🚀 **Transportation** (17 drawings)
* 🎄 **Christmas** (15 drawings)
* 🍦 **Food** (18 drawings)

### 2. Dual-Engine Coloring Studio
* **Vector CreateJS Engine**: Authentic Flash/Animate vector fill engine with contour edge boundaries and audio feedback. Colors fill inside line contours with zero bleeding.
* **HTML5 Raster Canvas Engine**: Interactive tap-and-brush coloring with a 15-color palette, print sheet, and artwork download for custom admin-uploaded pictures.
* **Local Storage Art Gallery**: Kids can save finished masterpieces to "My Gallery" stored locally on their device.

### 3. Modern, High-Contrast Vibrant Design
* Royal Indigo (`#4F46E5`), Candy Pink (`#EC4899`), Sunshine Gold (`#F59E0B`), and Sky Cyan theme.
* Rounded card layouts with hover elevation, live search filtering, and category pills.
* 100% mobile, tablet, and desktop responsive.

### 4. Admin Management Dashboard (`/admin/`)
* **Secure Authentication**: Dual session auth (session cookies + Bearer token in localStorage).
* **Coloring Pages & Pictures**: Add new drawings with image file uploads (saved to `public/uploads/`), edit metadata, or delete drawings.
* **Categories Manager**: Create, configure, and delete categories with custom icons and theme colors.
* **Live Content Editors**: Real-time rich HTML editors for **About Us** and **Privacy Policy** pages.
* **Google AdSense Manager**: Toggle ads on/off site-wide, configure Publisher ID, Header, Sidebar, and In-Feed slot IDs, and manage root `/ads.txt` content.
* **Admin Security**: Change admin username and password directly from the dashboard.

### 5. Google AdSense & ads.txt Compatibility
* Pre-configured AdSense script in `<head>` and labeled `.adsense-wrapper` ad units.
* Root `/ads.txt` direct route (`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`).
* Turned off by default; can be toggled on with one click once you input your publisher credentials.
* COPPA & AdSense compliant Privacy Policy with cookie opt-out disclosures.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/Chakradhar-dev/coloringtool.git
cd coloringtool

# Start the server
node server.js
```

Open your browser at:
* **Website:** `http://localhost:3000/`
* **Coloring Studio:** `http://localhost:3000/studio.html`
* **Admin Dashboard:** `http://localhost:3000/admin/`
  * **Default Username:** `admin`
  * **Default Password:** `admin123`
* **Root ads.txt:** `http://localhost:3000/ads.txt`

---

## 📁 Project Structure

```
coloringtool/
├── server.js               # Node.js HTTP server (auth, dynamic rendering, ads.txt, API)
├── generate_pages.js       # Page generator script for public HTML pages
├── data/
│   ├── site_config.json    # Branding, theme, admin credentials, AdSense, About/Privacy HTML
│   ├── categories.json     # Categories metadata
│   └── games.json          # 113 drawings metadata & script paths
├── public/
│   ├── index.html          # Homepage
│   ├── studio.html         # Interactive Coloring Studio
│   ├── gallery.html        # My Art Gallery
│   ├── admin/
│   │   └── index.html      # Admin Management Dashboard
│   ├── uploads/            # Admin uploaded pictures
│   ├── css/
│   │   └── modern-theme.css # Modern Indigo/Pink/Amber styling
│   └── <category>/         # Category vector scripts, line art images, and pages
└── README.md
```

---

## 📄 License

MIT License. Designed with ❤️ for kids, parents, and teachers worldwide.
