# Meta Tags Reference — NextDoor Constructions LLP
# ─────────────────────────────────────────────────────────────────────────────
# This file is a DEVELOPER REFERENCE — not served to users.
# Copy the tags from each section into the corresponding HTML <head>.
# Replace all [PLACEHOLDERS] with final content from the brochure.
# Domain: https://www.nextdoorconstructions.com
# ─────────────────────────────────────────────────────────────────────────────

---

## index.html — Homepage

```html
<title>NextDoor Constructions LLP — Building Excellence Across India</title>
<meta name="description" content="[Replace: 150-160 char description from brochure tagline]" />
<link rel="canonical" href="https://YOUR-DOMAIN/index.html" />
<meta property="og:title"       content="NextDoor Constructions LLP — Building Excellence Across India" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image"       content="https://YOUR-DOMAIN/assets/images/og-home.jpg" />
<meta property="og:url"         content="https://YOUR-DOMAIN/" />
<meta property="og:type"        content="website" />
```

---

## about.html — About Us

```html
<title>About Us — NextDoor Constructions LLP</title>
<meta name="description" content="[Replace: 150-160 char description of company history and values]" />
<link rel="canonical" href="https://YOUR-DOMAIN/about.html" />
<meta property="og:title"       content="About NextDoor Constructions LLP" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image"       content="https://YOUR-DOMAIN/assets/images/og-about.jpg" />
```

---

## services.html — Services

```html
<title>Construction Services — NextDoor Constructions LLP</title>
<meta name="description" content="[Replace: 150-160 chars listing key services — residential, commercial, industrial, turnkey]" />
<link rel="canonical" href="https://YOUR-DOMAIN/services.html" />
<meta property="og:title"       content="Construction Services — NextDoor Constructions LLP" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image"       content="https://YOUR-DOMAIN/assets/images/og-services.jpg" />
```

---

## projects.html — Projects Portfolio

```html
<title>Projects Portfolio — NextDoor Constructions LLP</title>
<meta name="description" content="[Replace: 150-160 chars describing portfolio — types of projects, locations, scale]" />
<link rel="canonical" href="https://YOUR-DOMAIN/projects.html" />
<meta property="og:title"       content="Projects — NextDoor Constructions LLP" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image"       content="https://YOUR-DOMAIN/assets/images/og-projects.jpg" />
```

---

## contact.html — Contact

```html
<title>Contact Us — NextDoor Constructions LLP</title>
<meta name="description" content="Contact NextDoor Constructions LLP to request a quote or discuss your construction project. Call, email, or fill in our form. We respond in 24 hours." />
<link rel="canonical" href="https://YOUR-DOMAIN/contact.html" />
<meta property="og:title"       content="Contact NextDoor Constructions LLP" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image"       content="https://YOUR-DOMAIN/assets/images/og-contact.jpg" />
```

---

## Open Graph Image Specs

- **Size**: 1200 × 630 pixels
- **Format**: JPG (optimised, under 200KB)
- **Content**: Company logo on dark background, tagline, project imagery
- **Files**: Save to `/assets/images/og-*.jpg`

---

## JSON-LD Structured Data (Organization)
> Paste inside a `<script type="application/ld+json">` tag in each page's `<head>`.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NextDoor Constructions LLP",
  "url": "https://YOUR-DOMAIN/",
  "logo": "https://YOUR-DOMAIN/assets/logos/nextdoor-logo.svg",
  "telephone": "[Your Phone Number]",
  "email": "[Your Email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[PIN Code]",
    "addressCountry": "IN"
  }
}
```

---

## Checklist Before Going Live

- [x] All YOUR-VERCEL-DOMAIN placeholders replaced with https://www.nextdoorconstructions.com
- [ ] Add unique `<title>` and `<meta name="description">` to every page
- [ ] Upload all 5 OG images (1200×630px) to `/assets/images/`
- [ ] Update JSON-LD structured data with real contact info
- [ ] Submit `/seo/sitemap.xml` to Google Search Console
- [ ] Verify mobile-friendliness in Google's Mobile-Friendly Test
- [ ] Run Lighthouse audit (target: 90+ on all scores)
