---
name: dnu-slide-framework
description: >-
  Framework and design system for generating interactive, presentation-ready web slides
  and 2K editable PPTX/PDF exports following the Đại Nam University ("Đại Nam Style") brand identity.
  Use when creating, redesigning, or exporting slides for Đại Nam University with mandatory header,
  footer, responsive 16:9 viewport engine, standard layouts, and aspect-ratio-safe export mechanics.
---

# Đại Nam University Presentation Framework (Skill Guide)

This skill equips the agent to architect, design, build, and export high-impact 16:9 interactive web presentations conforming strictly to **Đại Nam University Brand Guidelines ("Đại Nam Style")**.

---

## 1. Core Principles & Philosophy
1. **"Học Để Thay Đổi" (Learn to Change)**: The presentation must look modern, energetic, academic, and forward-looking.
2. **Fixed 16:9 Coordinate Space (`1920x1080px`)**: All slides are designed in a virtual `1920x1080px` canvas and dynamically scaled via CSS `transform: scale(...)` to fit any screen (mobile, tablet, 4K projector, widescreen) without aspect-ratio deformation.
3. **Legibility for Projectors**: Minimum heading font size `36–56px`, body text `22–32px`, high contrast, scannable cards, bold visual hierarchy.
4. **Distortion-Proof Dual Export**: When exporting to **PPTX** and **PDF**, the engine **strictly preserves image aspect ratios** using pre-rendered canvas crops to overcome `html2canvas`'s native `object-fit` limitation.

---

## 2. Brand Identity Cheat Sheet

| Element | Specification | Code / Asset |
| :--- | :--- | :--- |
| **Primary Accent** | Vibrant Energetic Orange | `#F37021` / `#EA580C` |
| **Secondary Accent** | Imperial / Cobalt Blue | `#003B7A` / `#0A2246` |
| **Dark Theme Bg** | Deep Navy Radial Gradient | `radial-gradient(circle at 75% 35%, #0B254E 0%, #050F22 100%)` |
| **Light Theme Bg** | Crisp White & Soft Blue Gray | `#FFFFFF` container on `#F8FAFC` canvas |
| **Neutral Text** | Slate Dark / Pure White | `#0F172A` (light slides) / `#FFFFFF` (dark slides) |
| **Heading Font** | Plus Jakarta Sans / Montserrat | `font-family: 'Plus Jakarta Sans', sans-serif;` |
| **Body Font** | Be Vietnam Pro | `font-family: 'Be Vietnam Pro', sans-serif;` |
| **Official Slogan** | Uppercase Bold Top-Left | `HỌC ĐỂ THAY ĐỔI` (Font size 18–22px) |
| **Official Logo** | SVG Horizontal Badge | `assets/dai-nam-logo-ngang.svg` |
| **Official Website** | Clickable Link in Footer | `https://dainam.edu.vn` (or `https://dainam.edu.vn/vi`) |

---

## 3. Mandatory Slide Structure

Every slide **must** include:
```html
<section class="slide [theme-dark]" id="slide-N" data-slide-index="N">
  <!-- MANDATORY HEADER -->
  <header class="slide-header">
    <div class="header-left">
      <div class="brand-slogan">HỌC ĐỂ THAY ĐỔI</div>
      <div class="header-topic-badge">
        <i data-lucide="shield-check"></i>
        [TÊN CHUYÊN ĐỀ / PHẦN / BỘ MÔN]
      </div>
    </div>
    <div class="header-right">
      <img src="assets/dai-nam-logo-ngang.svg" alt="Trường Đại học Đại Nam" class="official-logo-img">
    </div>
  </header>

  <!-- SLIDE CONTENT BODY (SCALED TO 1920x1080) -->
  <div class="slide-body">
    <!-- Slide Layout Elements Here -->
  </div>

  <!-- MANDATORY FOOTER -->
  <footer class="slide-footer">
    <div class="footer-left">
      <div class="footer-timer-display">
        <i data-lucide="clock"></i>
        <span class="timer-text">00:00</span>
      </div>
      <a href="https://dainam.edu.vn" target="_blank" rel="noopener noreferrer" class="footer-dnu-link">
        <i data-lucide="external-link"></i>
        dainam.edu.vn
      </a>
    </div>
    <div class="footer-center">
      <span class="footer-meta-pill">[Đơn Vị]</span> | [Tiểu đội / Lớp] | [Khoa / Đại đội] | Môn: [Tên Môn]
    </div>
    <div class="footer-right">
      <div class="slide-counter"><span class="current-num">0N</span> / 10</div>
    </div>
  </footer>
</section>
```

---

## 4. Standard Slide Layout Types

When designing slide decks, select from the standardized layouts defined in [`templates/layouts.md`](./templates/layouts.md):

1. **Layout 1: Hero / Cover Slide**: Left headline + meta cards, right hero visual card with gradient overlay.
2. **Layout 2: Definition & Theory**: Left definition quote box + 16:9 contextual photo preview, right 3-step vertical card stack.
3. **Layout 3: Four Pillars Grid**: 4 equal vertical cards with category tags, bold headers, and structured bullet lists.
4. **Layout 4: Dual Comparison (2 Columns)**: Side-by-side contrast (Threat vs Countermeasure, DBHB vs BLLĐ).
5. **Layout 5: Sequential Process Flow**: Horizontal 4-step cards linked with chevrons + bottom dialectic conclusion box + right context photo.
6. **Layout 6: Interactive Cycle / Loop Diagram**: Circular feedback diagram + interactive modal trigger for deep-dive case studies.
7. **Layout 7: 2x2 Matrix / Quad Action Grid**: 4 quadrant cards with check icons and distinct pastel badge backgrounds.
8. **Layout 8: Conclusion & Historic Quote Banner**: Top 16:9 photo box + Hồ Chí Minh / DNU quote banner, bottom 3 takeaway cards, and Q&A footer bar.

---

## 5. Export Engine & Aspect Ratio Protection Workflow

### Problem Solved
`html2canvas` ignores `object-fit: cover` and `object-fit: contain`, which distorts images (stretching or squashing) when capturing slides at 2K for PPTX or PDF export.

### Solution Pattern
Always intercept images using `onclone` callback:
```javascript
const canvas = await html2canvas(targetSlide, {
  scale: 2560 / 1920,
  width: 1920,
  height: 1080,
  useCORS: true,
  allowTaint: true,
  backgroundColor: null,
  logging: false,
  imageTimeout: 15000,
  onclone: (clonedDoc) => {
    const clonedSlide = clonedDoc.getElementById(`slide-${i}`);
    fixSlideImagesForExport(clonedSlide, targetSlide);
  }
});
```
`fixSlideImagesForExport` computes the precise crop rectangle matching `object-fit` and `object-position`, draws it onto an offscreen canvas at 2K resolution, and replaces the `<img>` in the clone so that `html2canvas` paints pixel-perfect, undistorted images into the PPTX/PDF.

---

## 6. How to Start a New Presentation
1. Copy the [`boilerplate/`](./boilerplate/) directory into your project root.
2. Replace content inside `boilerplate/index.html` using the templates in [`templates/`](./templates/).
3. Customize metadata pills, student/group names, and slide titles.
4. Run a local server: `python -m http.server 8000` and open in your browser.
5. Export with one click: **"Xuất PPTX"** or **"Xuất PDF"**.
