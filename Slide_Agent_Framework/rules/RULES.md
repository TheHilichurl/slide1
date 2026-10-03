# Đại Nam University Presentation Rules & Standards

This document establishes the binding architectural, visual, and functional standards for all presentation web applications built for **Trường Đại học Đại Nam (DNU)**.

---

## 1. TECH STACK & APPLICATION ARCHITECTURE
1. **Single-Page Application (SPA)**: Clean, standalone HTML5, modern CSS3, and vanilla modern JavaScript (ES6+). No heavy frameworks required unless requested.
2. **Third-Party CDN Dependencies**:
   - **Icons**: Lucide Icons via CDN (`https://unpkg.com/lucide@latest`).
   - **Canvas Capture**: html2canvas (`https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js`).
   - **PDF Generation**: jsPDF (`https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`).
   - **PowerPoint Generation**: PptxGenJS (`https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js`).
   - **Google Fonts**: Plus Jakarta Sans (Headings) + Be Vietnam Pro (Body text).
3. **Self-Contained & Offline-Friendly**: The application must run locally on any simple static server (`python -m http.server 8000`, VS Code Live Server, etc.).

---

## 2. BRAND IDENTITY & DESIGN SYSTEM ("ĐẠI NAM STYLE")

### 2.1 Color Palette
- **Primary Accent (DNU Orange)**: `#F37021` (vibrant) or `#EA580C` (deep orange). Used for high-priority CTA buttons, active state indicators, key highlights, and slogan branding.
- **Secondary Accent (Imperial / Cobalt Blue)**: `#003B7A` or `#1D4ED8`. Represents academic prestige, discipline, and solid foundation.
- **Deep Navy Background (Dark Theme)**: Radial gradient `radial-gradient(circle at 75% 35%, #0B254E 0%, #050F22 100%)`.
- **Soft Off-White Background (Light Theme)**: Base canvas `#F8FAFC`, card containers `#FFFFFF`, card borders `#E2E8F0`.
- **Neutral Dark Slate Text**: `#0F172A` for primary body text, `#475569` for secondary text on light slides.
- **Pure White / Silver Text**: `#FFFFFF` for primary headings, `#CBD5E1` for subtext on dark slides.

### 2.2 Typography Hierarchy
- **Font Families**:
  - Headings: `'Plus Jakarta Sans', -apple-system, sans-serif`
  - Body Text: `'Be Vietnam Pro', -apple-system, sans-serif`
- **Recommended Font Sizes (Base 1920x1080 Viewport)**:
  - Hero Title: `54px – 64px`, font-weight `900`
  - Slide Section Title (`<h2>`): `38px – 46px`, font-weight `900`
  - Card Titles (`<h3>` / `<h4>`): `24px – 32px`, font-weight `800`
  - Body Paragraphs & List Items: `20px – 28px`, font-weight `500 – 600`
  - Meta Tags & Badges: `14px – 18px`, font-weight `700`, uppercase with letter-spacing.

---

## 3. MANDATORY SLIDE HEADER SPECIFICATION
Every slide **MUST** include a persistent top header containing:
1. **Top-Left**:
   - Official Slogan: **"HỌC ĐỂ THAY ĐỔI"** (uppercase, bold, font size `18px–22px`, colored `#F37021` or `#EA580C`).
   - Breadcrumb / Topic Badge: Displays chapter or subject metadata (e.g., `GDQP-AN • BỘ MÔN QUÂN SỰ` or `PHẦN I: LÝ LUẬN CĂN BẢN`).
2. **Top-Right**:
   - Official Đại Nam Logo: SVG badge (`dai-nam-logo-ngang.svg`) with fixed height `56px` and `object-fit: contain`. Fallback text: "ĐẠI HỌC ĐẠI NAM".

---

## 4. MANDATORY SLIDE FOOTER SPECIFICATION
Every slide **MUST** include a persistent bottom footer containing:
1. **Bottom-Left**:
   - Live Presentation Timer (`mm:ss`) with a clock icon.
   - Clickable Official University URL: `https://dainam.edu.vn` (opens in a new tab).
2. **Bottom-Center**:
   - Presentation Unit Metadata Pill: `Nhóm 1 | Tiểu đội 1 | Trung đội 1 | Đại đội 6 | Môn: GDQP-AN` (or course equivalent).
3. **Bottom-Right**:
   - Slide Counter: `Current / Total` formatted with leading zero (e.g., `01 / 10`, `06 / 10`).

---

## 5. 16:9 RESPONSIVE VIEWPORT ENGINE
1. **Fixed Coordinate Space**: Internal coordinate space is strictly `1920px` width by `1080px` height (16:9).
2. **Dynamic Scaling**: The stage scales via CSS `transform: scale(calc(...))` based on viewport dimensions (`window.innerWidth / 1920`, `window.innerHeight / 1080`), centered on the screen with letterbox borders if aspect ratios differ.
3. **Presentation Controls (Floating HUD)**:
   - Prev (`←` / `Space`), Next (`→` / `Enter`).
   - Quick Slide Jump Dropdown.
   - Timer Start / Reset.
   - Fullscreen Toggle (`F`).
   - Focus Mode (`H`) to hide/show all web HUD UI during presentation.
   - 2K PPTX Export & 2K PDF Export buttons.

---

## 6. IMAGE ASPECT RATIO INTEGRITY (STRICT RULE)
1. **Zero Distortion**: Images **must never** be squeezed horizontally, squashed vertically, or stretched out of proportion.
2. **Container Sizing Matching Image Natural Ratio**:
   - If an image is 16:9 (e.g. `vn-hung-temple.jpg`, `vn-military-parade.jpg`), its display card/box must use a 16:9 aspect ratio (e.g. `aspect-ratio: 16 / 9; width: 550px; height: 310px;`).
3. **Universal Export Hook for html2canvas**:
   - Because `html2canvas` ignores CSS `object-fit: cover` and `object-fit: contain`, the export engine **must intercept images via `onclone`**.
   - It must pre-render an offscreen canvas with `ctx.drawImage` cropping the source image according to `object-position`, then replace the cloned `<img>` with this exact-ratio canvas so that the exported PPTX and PDF files contain **100% distortion-free images**.

---

## 7. DUAL EXPORT SPECIFICATION
1. **Export to PDF (2K Landscape)**:
   - Captured at 2560x1440 resolution.
   - Packaged with `jsPDF` (`orientation: 'landscape'`, `unit: 'px'`, `format: [2560, 1440]`).
2. **Export to PPTX (2K Canvas Packaging)**:
   - Generated with `PptxGenJS` using `LAYOUT_16x9` (10 x 5.625 inches).
   - Each slide added with lossless 2K canvas image, guaranteeing zero layout shift and 100% visual fidelity on all PowerPoint versions.
