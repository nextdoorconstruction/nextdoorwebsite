# NextDoor Constructions LLP

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fnextdoorconstructions.com&logo=vercel)](https://YOUR-VERCEL-DOMAIN.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![JS Vanilla](https://img.shields.io/badge/Vanilla_JS-ES6%2B-f7df1e?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A professional, high-end, design-driven website for **NextDoor Constructions LLP** (a turnkey construction partner in Kerala, India). The project is engineered as a lightning-fast, static web application powered by Tailwind CSS, featuring modular template imports, dynamic content loading from static JSON/external Google Sheets, and interactive client integrations.

---

## Overview

The NextDoor Constructions LLP website showcases the firm’s core engineering capabilities, structural portfolio, and career openings. It functions as a complete business-to-client (B2C) portal enabling customers to view completed projects, request structural quotes, and apply for open career positions. 

The site is built with a **performance-first** approach: serving optimized static HTML, rendering components client-side via asynchronous dynamic imports, and using micro-animations to enhance user experience without heavy JS bundle overhead.

---

## Features

- 🏗️ **Dynamic Portfolio Engine**: Fetches and renders completed projects dynamically from a JSON database with interactive category filter buttons.
- 👥 **Minds Behind NextDoor**: Explores the leadership profiles, built with hover effects and glassmorphism styling card layouts.
- 📋 **Google Sheets Powered Careers (CMS)**: Fetches and displays open jobs dynamically from a published Google Sheet CSV endpoint in real-time. Includes automatic error boundaries and empty-state handlers.
- 📬 **Interactive Lead Generation**: Features a validation-ready Quote and Consultation Form connected directly to the Web3Forms API.
- 💎 **Modern Fluid UI**: Designed with a sleek aesthetic including rich animations, blueprint grid backgrounds, glassmorphic container modules, and subtle gradients.
- 🧱 **Reusable Component Imports**: Simulates server-side imports by loading HTML headers, footers, and call-to-actions asynchronously using vanilla browser fetches.
- 📱 **Fully Responsive Layout**: Built with custom media breaks for a tailored visual layout on everything from mobile screens to ultrawide desktop monitors.

---

## Tech Stack

| Layer | Technology / Tool | Purpose |
|---|---|---|
| **Structure** | HTML5 | Semantic structure and SEO |
| **Styling** | Vanilla CSS + Tailwind CSS v3 | Design system token styling and custom micro-animations |
| **Logic** | ES6+ Vanilla JavaScript | Dynamic components, Google Sheet fetching, and DOM transitions |
| **Forms Handling**| Web3Forms API | Serverless submission of contact and general career requests |
| **Data Storage** | Static JSON (`data/`) / Google Sheets | Decoupled CMS data for projects, partners, and job listings |
| **Deployment** | Vercel Serverless Hosting | Lightning-fast globally distributed static deployment |

---

## Project Structure

```bash
next-door-website/
├── index.html                  # Homepage (Hero Video, Why Choose Us, Stats)
├── about.html                  # About Page (Story, Team, Vision & Mission)
├── services.html               # Services Page (Integrated Solutions grid)
├── projects.html               # Portfolio Page (Category filtering, grid)
├── careers.html                # Careers Page (CMS Google Sheet job listing, Job Form)
├── contact.html                # Contact Page (Office info, dynamic Quote Form)
├── vercel.json                 # Vercel hosting rules and clean routing redirects
├── package.json                # Tailwind CSS compile commands & developer dependencies
├── tailwind.config.js          # Design system extensions (custom HSL colors, fonts)
│
├── css/
│   ├── style.css               # Tailwind directives and template baseline rules
│   ├── output.css              # Minified production-ready output CSS
│   ├── utilities.css           # Custom global utility overrides (scrollbar, fonts)
│   └── animations.css          # Fluid keyframes and transition animations
│
├── js/
│   ├── main.js                 # Global component fetch manager and page initializers
│   ├── navbar.js               # Responsive sticky mobile and desktop navigation script
│   ├── animations.js           # Scroll triggers, intersection observers, and slide effects
│   ├── contact-form.js         # Web3Forms handler, loader UI and validation logic
│   └── projects.js             # Client-side templating engine for the projects grid
│
├── data/
│   ├── projects.json           # Client project lists (title, image path, categories)
│   ├── services.json           # Structural listing metadata for services
│   └── clients.json            # Partner branding and trust data
│
├── components/                 # Dynamic template fragments
│   ├── navbar.html             # Common site navigation header
│   ├── footer.html             # Common site footer (no-gradient style)
│   ├── cta-section.html        # Pre-footer call-to-action block
│   └── contact-section.html    # Inline map and contact detail helper
│
├── assets/                     # Media static directories
│   ├── images/                 # Optimized portfolio and team graphics
│   ├── videos/                 # High-definition looping video headers
│   └── logos/                  # Vector logos and identity SVGs
│
└── seo/
    ├── sitemap.xml             # Search engine crawler mapping
    ├── robots.txt              # Standard indexing directives
    └── meta-tags.md            # Metadata and keywords design guide
```

---

## Installation

### Prerequisites
Make sure you have Node.js (version 18 or above) installed.

### Steps
1. Clone the project locally:
   ```bash
   git clone https://github.com/your-username/next-door-website.git
   cd next-door-website
   ```
2. Install build-time dependencies (Tailwind CSS CLI):
   ```bash
   npm install
   ```

---

## Environment Variables & Configuration

This project runs completely serverless. Configuration constants are stored at the top of Javascript files in `js/`:

- **Web3Forms Key**: Set your Web3Forms access token in `js/contact-form.js`:
  ```javascript
  const WEB3FORMS_ACCESS_KEY = "YOUR-ACCESS-KEY-HERE";
  ```
  ```

---

## Running Locally

Because the project loads dynamic HTML fragments (like headers and footers) via AJAX fetch, running files directly in the browser using the `file://` protocol will result in CORS errors. 

You must run the website using a local web server:

### Development Environment (With Tailwind Compiler)
1. Start the Tailwind watcher to compile CSS modifications on save:
   ```bash
   npm run dev
   ```
2. Start your local web server:
   ```bash
   npx serve . -p 3000
   ```
3. Open your browser to `http://localhost:3000`.

---

## Build & Deployment

### Production Compilation
Before deploying, compile and minify the Tailwind stylesheets:
```bash
npm run build
```
This processes `css/style.css` and generates a highly optimized stylesheet at `css/output.css`.

### Deployment to Vercel
This project is pre-configured for Vercel deployment via `vercel.json`:
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Link the project inside your Vercel Dashboard.
3. Configure the following project settings on Vercel:
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: `./` (Root directory)

---

## Design System

The layout is built using strict design parameters defined in `tailwind.config.js` and `css/utilities.css`:

### 🎨 Color Palette
- **Brand Background**: `#FFFFFF` (Pure white)
- **Brand Surface**: `#F5F5F5` (Light grey)
- **Brand Red**: `#D93025` (Primary accent color)
- **Brand Text**: `#111111` (Rich dark grey)
- **Brand Muted**: `#666666` (Medium grey)

### ✍️ Typography
- **Headings & Titles**: `Bebas Neue` (Loaded from Google Fonts, uppercase geometric style)
- **Body & Information**: `Inter` (Sans-serif, clean for reading small lines)

### 💫 Transitions & Animations
Custom smooth visual cues are configured in `css/animations.css`:
- `.anim-fade-up`: Smooth upward fade in on scroll.
- `.anim-stagger`: Ordered transition delay for item lists.
- `.marquee-track`: Smooth scrolling carousel animation for client logs.

---

## Performance Optimizations

- **Image Adjustments**: High-resolution image assets are custom-processed (e.g., using Python-level filters to selectively tone down background contrasts) to balance layout visibility and fast file transfers.
- **Tailwind Purging**: Minimizes CSS file delivery down to a few kilobytes, leaving only the exact styles utilized by the project.
- **Asynchronous Scripting**: All core scripts include `defer` parameters to prevent blocking HTML parsing during page load.

---

## Accessibility

- **Semantic Layouts**: Explicit HTML5 nodes (`<main>`, `<header>`, `<footer>`, `<section>`) are used throughout to guide screen readers.
- **ARIA Anchors**: Interactive targets utilize `aria-labelledby`, `aria-live`, and `aria-hidden` attributes to ensure keyboard navigation compatibility.
- **Focus Indicators**: Standard inputs feature high-visibility outline rings on keyboard selection.

---

## Future Improvements

- Add structured JSON-LD Schema markup for individual career job openings.
- Create automated image conversion workflows using webp encoders to reduce asset payload size.
- Implement client-side search indexing to filter through portfolios instantaneously.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
#   n e x t d o o r w e b s i t e  
 