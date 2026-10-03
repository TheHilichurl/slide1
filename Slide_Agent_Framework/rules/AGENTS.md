---
trigger: always_on
---

# Antigravity Agent Guidelines: Đại Nam Slide Presentations

When working in this directory or generating slide decks under this framework:
1. **Always enforce Đại Nam Brand Identity**:
   - Primary: Orange `#F37021` / `#EA580C`.
   - Secondary: Deep Cobalt `#003B7A` / `#0A2246`.
   - Header must feature slogan **"HỌC ĐỂ THAY ĐỔI"** and the DNU Logo.
   - Footer must feature live timer, `https://dainam.edu.vn`, unit metadata, and `current/total` slide counter.
2. **Preserve Fixed 16:9 Viewport**: All coordinate math must be in `1920x1080px`.
3. **Strict Image Ratio Integrity**:
   - Never write CSS that deforms images.
   - Always hook `html2canvas` export with `fixSlideImagesForExport()` in `onclone` to prevent squashed or stretched photos in PPTX and PDF exports.
