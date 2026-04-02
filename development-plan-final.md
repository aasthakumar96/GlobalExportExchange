# Development Plan — Sharma's Global Export Exchange Website

**IDE:** Antigravity | **Stack:** HTML5 / CSS3 / Vanilla JS | **Hosting:** Netlify

---

## Phase 0 — Setup & Design System (Day 1)

### Project Structure
```
/
├── index.html
├── about.html
├── products.html
├── products/
│   ├── agriculture.html       ← placeholder, content TBD
│   ├── industrial.html        ← placeholder, content TBD
│   ├── textiles.html          ← placeholder, content TBD
│   ├── chemicals.html         ← placeholder, content TBD
│   └── machinery.html         ← placeholder, content TBD
├── services.html
├── network.html
├── certifications.html
├── trust.html
├── blog/
│   ├── index.html
│   └── post-template.html
├── clients.html
├── contact.html
├── rfq.html
├── supplier.html
├── bulk-deals.html
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── animations.js
│   │   ├── whatsapp.js
│   │   └── currency.js
│   └── images/
└── netlify.toml
```

> **Language note:** English only at launch. No i18n architecture needed — keep HTML clean and revisit if international markets are targeted later.

### Design Tokens (CSS Variables)
- **Palette:**
  - `--navy-deep: #0A0E1A`
  - `--navy-mid: #0D1B3E`
  - `--gold: #C9A84C`
  - `--gold-light: #E8C97A`
  - `--white: #F8F6F1`
  - `--glass-bg: rgba(255,255,255,0.06)`
  - `--glass-border: rgba(201,168,76,0.2)`
- **Typography:**
  - Headings: `Cormorant Garamond` or `Playfair Display`
  - Body: `Inter` or `DM Sans`
  - Source: Google Fonts (free)
- **Aesthetic system:** Glassmorphism cards, CSS gradient overlays on images, custom bezier transitions (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`), Intersection Observer for scroll reveals

### Imagery Direction (site-wide)
Sources: Unsplash / Pexels (free). Apply `--navy-deep` gradient overlay at 60% opacity on all hero/section images.

| Section | Image theme |
|---------|-------------|
| Hero | Aerial container port at dusk, cargo ships, global logistics |
| About Us | Professional handshake or meeting in port/warehouse setting |
| Products | Category-specific: grain silos, textile rolls, chemical drums, machinery |
| Global Network | Illuminated world map, flight path overlays |
| Services | Documentation on a desk, customs officials, loading dock |
| Blog | Editorial-style port photography or isometric trade illustrations |
| Contact / RFQ | Clean office / professional inquiry imagery |

---

## Phase 1 — Core Layout & Navigation (Day 1–2)

- Sticky nav with glassmorphism blur effect — branded as **Sharma's Global Export Exchange**
- Mobile hamburger menu (CSS + JS)
- **Currency converter** — compact toggle in nav bar showing INR and USD; live rates from open.er-api.com (free, no API key); rates cached in `sessionStorage`
- Footer with company info, quick links, social icons
- **WhatsApp floating button** — fixed bottom-right, links to `wa.me/+919810818274`
- SEO meta tags on every page (title, description, og:image)

---

## Phase 2 — Homepage (Day 2–3)

Based on template Section 1:
- **Hero:** Full-viewport navy gradient + canvas particle animation
  - Headline: "Connecting Global Buyers & Sellers Seamlessly"
  - Subtext: "Your trusted partner in international trade, sourcing, and export solutions."
  - CTA buttons: "Get a Quote" → rfq.html | "Explore Products" → products.html
- **Stats bar:** ~~Hidden~~ — will be added once real numbers are available
- **Featured Products strip:** 5 category cards (Agriculture, Industrial, Textiles, Chemicals, Machinery) with glassmorphism hover — each linking to its placeholder category page
- **Why Choose Us:** Icon grid, 4–6 points
- **Certifications bar:** Slim strip noting IEC / GST / ISO — styled as "in progress" badges since none are held yet; copy reads "Registered & compliant Indian exporter"
- **Trust bar:** Slim banner — icons + short labels for Secure Payments (PayPal), INR/USD pricing, and NDA Protected; links to trust.html

---

## Phase 3 — About Us (Day 3)

Based on template Section 2:
- Company overview paragraph — **Sharma's Global Export Exchange**
- Vision & Mission two-column layout
- **Founder card:** Raj Kumar Sharma — solo founder; photo placeholder until image provided; title: Founder & Managing Director
- **Global Presence:** SVG world map — India highlighted as origin; 1–5 destination countries highlighted (exact countries TBD)
- Certifications & Compliance: note IEC and GST registration; no ISO badges until obtained

---

## Phase 4 — Products / Trade Categories (Day 4–5)

Based on template Section 3:
- Main products page: 5-category grid
- Each category page: **content placeholder** with stock imagery (see Phase 0 brief), "Products coming soon — submit an RFQ for current availability" CTA, and a pre-filled RFQ link for that category
- Prices shown in INR / USD toggle via the currency converter from Phase 1

> **Note:** All 5 category pages are structural placeholders at launch. Real product specs, MOQs, and export markets to be added once decided.

---

## Phase 5 — Services Page (Day 5)

Based on template Section 4:
- 6 service cards: Export & Import Consulting, Supplier Sourcing, Trade Documentation, Customs Clearance, Logistics & Shipping, Private Labeling/OEM
- Each card: icon, title, short description, "Learn More" expand
- Process timeline section

---

## Phase 6 — Global Network (Day 6)

Based on template Section 5:
- SVG/CSS interactive world map — India highlighted as HQ; 1–5 export destination countries highlighted (countries TBD)
- Partner logos strip — placeholder "Partner network coming soon"
- Trade stats: hidden until real numbers available (consistent with homepage decision)

---

## Phase 7 — Certifications & Compliance (Day 6)

Based on template Section 6:
- IEC and GST cards — present as "registered and in good standing"; no certificate numbers displayed until provided
- ISO section: "ISO certification in progress" — timeline badge
- Quality Assurance process accordion

---

## Phase 8 — Blog / Insights (Day 7)

Based on template Section 7:
- Blog index with 3 seed articles:
  1. "How to Export from India: A Beginner's Guide"
  2. "Top Export Products from India in 2025"
  3. "Understanding Trade Documentation: What Every Buyer Needs to Know"
- Article template page

---

## Phase 9 — Clients & Testimonials (Day 7)

Based on template Section 8:
- Testimonial carousel — 3 AI-generated placeholder testimonials at launch
- Case study cards — 1 placeholder case study
- Client logo grid — "Our clients" section with placeholder until real logos provided

---

## Phase 10 — Contact & RFQ Pages (Day 8)

Based on template Sections 9–10:
- **Contact page:**
  - Phone / WhatsApp: +91-9810818274
  - Email: *(to be added)*
  - Address: *(to be added — Google Maps embed will be added when address is confirmed)*
  - Inquiry form via Netlify Forms
- **RFQ page:** Product / Quantity / Destination Country / Timeline / Special Requirements — Netlify Forms

---

## Phase 11 — Trust & Compliance Page (Day 9)

Based on template Section 11:

- **Secure Payments:** PayPal accepted; INR and USD supported; "100% Secure Transactions" badge
- **Trade Assurance:** On-time shipment commitment, quality verification process, dispute resolution statement
- **NDA & Confidentiality:** All buyer inquiries handled under strict confidentiality; downloadable NDA template (PDF placeholder) via Netlify Form-gated link
- **Export Promotion Councils:** Section present but copy reads "Council affiliations in progress — we are actively pursuing FIEO and APEDA membership"; styled as aspirational rather than current
- **Trade Inquiry Chatbot** — vanilla JS rule-based FAQ widget; 10 pre-loaded Q&As:

| # | Question | Answer |
|---|----------|--------|
| 1 | What is your minimum order quantity? | Varies by product — please submit an RFQ for a specific quote |
| 2 | Do you accept PayPal? | Yes, PayPal is accepted |
| 3 | What currencies do you accept? | USD and INR |
| 4 | How long does shipping take? | Typically 15–30 days depending on destination and method |
| 5 | Can I get a sample before placing a bulk order? | Yes — contact us via WhatsApp or the RFQ form to request samples |
| 6 | Do you provide export documentation? | Yes — we handle all standard export documents including invoice, packing list, and Bill of Lading |
| 7 | Which countries do you ship to? | We ship globally — submit an RFQ with your destination for a shipping quote |
| 8 | Is my inquiry kept confidential? | Yes — all inquiries are handled under strict confidentiality |
| 9 | How do I get a price quote? | Use the RFQ page or contact us directly on WhatsApp |
| 10 | Are you registered in India? | Yes — Sharma's Global Export Exchange is a registered Indian export firm |

Chatbot falls back to a WhatsApp CTA (+91-9810818274) for anything outside these 10 topics.

---

## Phase 12 — Bonus Pages (Day 9)

- **Become a Supplier:** Application form (Netlify Forms)
- **Bulk Deals:** "Coming soon" placeholder with WhatsApp CTA
- **Downloadable Catalog:** PDF placeholder with "Request our latest catalog via WhatsApp" CTA

---

## Phase 13 — Polish, SEO & Deployment (Day 10)

- SEO: semantic HTML, meta descriptions, Open Graph tags, sitemap.xml, robots.txt
  - Brand name: Sharma's Global Export Exchange
  - Target keywords: Indian exporter, bulk export India, global trade sourcing
- Performance: image lazy loading, minified CSS/JS, currency rates cached in `sessionStorage`
- Accessibility: ARIA labels, keyboard navigation, contrast ratios
- `netlify.toml`: redirects, cache headers
- Deploy to Netlify; custom domain instructions ready

---

## Resolved TBDs

| # | Item | Value |
|---|------|-------|
| 1 | Company name | Sharma's Global Export Exchange |
| 2 | WhatsApp / Phone | +91-9810818274 |
| 3 | Founder name | Raj Kumar Sharma (Solo founder) |
| 4 | Team size | Solo founder — single card on About page |
| 5 | Languages | English only at launch |
| 6 | Currencies | INR + USD |
| 7 | Payment methods | PayPal |
| 8 | Export Promotion Councils | None yet — aspirational copy used |
| 9 | Certifications | None yet — IEC/GST noted as registered; ISO as in progress |
| 10 | Countries exported to | 1–5 (just starting out) — stats bar hidden |
| 11 | Stats bar | Hidden until real numbers available |
| 12 | Product category content | All 5 categories structural placeholders at launch |
| 13 | Chatbot FAQs | 10 defaults confirmed (see Phase 11) |

## Still Outstanding

| # | Item | Impact |
|---|------|--------|
| 1 | Email address | Contact page, RFQ form reply-to |
| 2 | Office address | Contact page, Google Maps embed |
| 3 | Specific products per category | Product pages (all placeholders at launch) |
| 4 | Exact countries currently served | Network map destination highlights |
| 5 | Raj Kumar Sharma photo | About page founder card |
