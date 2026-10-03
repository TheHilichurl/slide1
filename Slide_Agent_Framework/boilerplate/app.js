/**
 * ==============================================================================
 * DAI NAM UNIVERSITY (DNU) PRESENTATION ENGINE - JAVASCRIPT CORE
 * Features:
 *  - Fixed 16:9 (1920x1080) Auto-Scaling Viewport Engine
 *  - Dynamic Slide Navigation & Keyboard Shortcuts
 *  - Auto Presentation Timer (mm:ss)
 *  - Focus Mode (Hide/Show HUD UI)
 *  - Universal Image Aspect Ratio Preservation Engine for Export
 *  - Client-Side 2K Lossless Canvas PPTX & PDF Export Packaging
 * ==============================================================================
 */

/* ==============================================================================
   1. STATE MANAGEMENT
   ============================================================================== */
const PresentationState = {
  currentSlide: 1,
  totalSlides: 1,
  timerStarted: false,
  timerInterval: null,
  timerSeconds: 0,
  isFocusMode: false,
  isExporting2K: false
};

/* ==============================================================================
   2. VIEWPORT 16:9 AUTO-SCALING ENGINE
   ============================================================================== */
function updateStageScale() {
  const stage = document.getElementById('slide-stage');
  if (!stage || document.body.classList.contains('exporting-2k')) return;

  const windowW = window.innerWidth;
  const windowH = window.innerHeight;
  const targetW = 1920;
  const targetH = 1080;

  // Compute maximum scale that fits within viewport without distortion
  const scale = Math.min(windowW / targetW, windowH / targetH);
  stage.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', updateStageScale);

/* ==============================================================================
   3. SLIDE NAVIGATION & TIMER
   ============================================================================== */
function goToSlide(slideIndex) {
  const total = PresentationState.totalSlides;
  const targetIndex = Math.max(1, Math.min(total, slideIndex));
  PresentationState.currentSlide = targetIndex;

  // Toggle active class on slides
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  const activeSlide = document.getElementById(`slide-${targetIndex}`);
  if (activeSlide) activeSlide.classList.add('active');

  // Update top progress bar
  const progressBar = document.getElementById('top-progress-bar');
  if (progressBar) {
    const pct = ((targetIndex - 1) / Math.max(1, total - 1)) * 100;
    progressBar.style.width = `${pct}%`;
  }

  // Update slide select dropdown if present
  const selectPicker = document.getElementById('slide-select-picker');
  if (selectPicker) selectPicker.value = targetIndex;

  // Refresh Lucide icons in newly displayed slide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Auto-start presentation timer when moving past cover slide
  if (targetIndex > 1 && !PresentationState.timerStarted) {
    startPresentationTimer();
  }
}

function nextSlide() {
  if (PresentationState.currentSlide < PresentationState.totalSlides) {
    goToSlide(PresentationState.currentSlide + 1);
  }
}

function prevSlide() {
  if (PresentationState.currentSlide > 1) {
    goToSlide(PresentationState.currentSlide - 1);
  }
}

function startPresentationTimer() {
  if (PresentationState.timerStarted) return;
  PresentationState.timerStarted = true;
  PresentationState.timerInterval = setInterval(() => {
    PresentationState.timerSeconds++;
    const mins = String(Math.floor(PresentationState.timerSeconds / 60)).padStart(2, '0');
    const secs = String(PresentationState.timerSeconds % 60).padStart(2, '0');
    const formatted = `${mins}:${secs}`;

    // Update all footer timers
    document.querySelectorAll('.timer-text').forEach(el => el.textContent = formatted);
    // Update HUD timer display if present
    const hudTimer = document.getElementById('hud-timer-val');
    if (hudTimer) hudTimer.textContent = formatted;
  }, 1000);
}

function resetPresentationTimer() {
  if (PresentationState.timerInterval) clearInterval(PresentationState.timerInterval);
  PresentationState.timerStarted = false;
  PresentationState.timerSeconds = 0;
  document.querySelectorAll('.timer-text').forEach(el => el.textContent = '00:00');
  const hudTimer = document.getElementById('hud-timer-val');
  if (hudTimer) hudTimer.textContent = '00:00';
  showToast("Đã đặt lại đồng hồ thuyết trình về 00:00");
}

/* ==============================================================================
   4. FULLSCREEN & FOCUS MODE
   ============================================================================== */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn("Fullscreen request error:", err);
    });
  } else {
    document.exitFullscreen().catch(err => {
      console.warn("Exit fullscreen error:", err);
    });
  }
}

function toggleFocusMode() {
  PresentationState.isFocusMode = !PresentationState.isFocusMode;
  document.body.classList.toggle('focus-mode', PresentationState.isFocusMode);
  showToast(PresentationState.isFocusMode ? "Đã bật Chế độ Tập trung (Ẩn HUD)" : "Đã tắt Chế độ Tập trung (Hiện HUD)");
}

/* ==============================================================================
   5. TOAST NOTIFICATIONS & PROGRESS MODAL
   ============================================================================== */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function showExportProgress(title, desc) {
  const modal = document.getElementById('export-progress-modal');
  if (!modal) return;
  const titleEl = document.getElementById('export-modal-title');
  const descEl = document.getElementById('export-modal-desc');
  const barEl = document.getElementById('export-modal-bar');
  const curEl = document.getElementById('export-modal-current');
  const pctEl = document.getElementById('export-modal-percent');

  if (titleEl) titleEl.textContent = title || "Đang Xuất Bản Trình Chiếu 2K";
  if (descEl) descEl.textContent = desc || "Đang chụp từng slide ở độ phân giải Canvas 2K siêu nét (2560x1440)...";
  if (barEl) barEl.style.width = "0%";
  if (curEl) curEl.textContent = "Chuẩn bị khởi tạo...";
  if (pctEl) pctEl.textContent = "0%";
  modal.classList.add('active');
}

function updateExportProgress(current, total, statusText) {
  const percent = Math.min(100, Math.round((current / total) * 100));
  const barEl = document.getElementById('export-modal-bar');
  const curEl = document.getElementById('export-modal-current');
  const pctEl = document.getElementById('export-modal-percent');
  if (barEl) barEl.style.width = `${percent}%`;
  if (curEl) curEl.textContent = statusText || `Đang xử lý ${current}/${total}`;
  if (pctEl) pctEl.textContent = `${percent}%`;
}

function hideExportProgress() {
  const modal = document.getElementById('export-progress-modal');
  if (!modal) return;
  modal.classList.remove('active');
}

/* ==============================================================================
   6. UNIVERSAL IMAGE ASPECT RATIO PRESERVATION ENGINE FOR EXPORT
   Fixes html2canvas limitation where object-fit: cover/contain is ignored,
   causing stretched, squashed or distorted images during PPTX and PDF export.
   ============================================================================== */
function parseObjectPosition(posStr) {
  let ox = 0.5, oy = 0.5;
  if (!posStr) return { ox, oy };
  const parts = posStr.trim().split(/\s+/);
  function parseVal(val) {
    if (val === 'center') return 0.5;
    if (val === 'left' || val === 'top') return 0;
    if (val === 'right' || val === 'bottom') return 1;
    if (val.endsWith('%')) {
      const num = parseFloat(val);
      return isNaN(num) ? 0.5 : num / 100;
    }
    return 0.5;
  }
  if (parts.length >= 1) ox = parseVal(parts[0]);
  if (parts.length >= 2) oy = parseVal(parts[1]);
  return { ox, oy };
}

function drawImageProp(ctx, img, w, h, ox, oy, objectFit) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  if (objectFit === 'contain') {
    const r = Math.min(w / iw, h / ih);
    const nw = iw * r;
    const nh = ih * r;
    const dx = (w - nw) * ox;
    const dy = (h - nh) * oy;
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, nw, nh);
    return;
  }

  // Default: object-fit: cover
  const r = Math.min(w / iw, h / ih);
  let nw = iw * r, nh = ih * r, ar = 1;
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;
  let cw = iw / (nw / w);
  let ch = ih / (nh / h);
  let cx = (iw - cw) * ox;
  let cy = (ih - ch) * oy;
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;
  ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
}

function fixSlideImagesForExport(clonedSlide, originalSlide) {
  if (!clonedSlide || !originalSlide) return;

  const origImages = originalSlide.querySelectorAll('img');
  const clonedImages = clonedSlide.querySelectorAll('img');

  origImages.forEach((origImg, i) => {
    const clonedImg = clonedImages[i];
    if (!clonedImg || !origImg.complete || origImg.naturalWidth === 0) return;

    const compStyle = window.getComputedStyle(origImg);
    const objectFit = compStyle.objectFit;

    // Process images using cover or contain
    if (objectFit !== 'cover' && objectFit !== 'contain') return;

    const w = origImg.clientWidth;
    const h = origImg.clientHeight;
    if (w <= 0 || h <= 0) return;

    const { ox, oy } = parseObjectPosition(compStyle.objectPosition);

    const scale = 2560 / 1920;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.className = clonedImg.className;
    canvas.style.cssText = clonedImg.style.cssText;
    canvas.style.display = compStyle.display || 'block';

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    drawImageProp(ctx, origImg, canvas.width, canvas.height, ox, oy, objectFit);

    if (clonedImg.parentNode) {
      clonedImg.parentNode.replaceChild(canvas, clonedImg);
    }
  });
}

/* ==============================================================================
   7. 2K CANVAS CAPTURE ENGINE
   ============================================================================== */
async function captureAllSlides2K(onProgress) {
  if (PresentationState.isExporting2K) {
    throw new Error("Đang có tiến trình xuất file khác đang hoạt động!");
  }
  PresentationState.isExporting2K = true;

  const total = PresentationState.totalSlides;
  const savedSlide = PresentationState.currentSlide;
  const stage = document.getElementById('slide-stage');
  const origTransform = stage ? stage.style.transform : '';

  // Activate exporting mode (unrestricts dimensions, removes scaling, hides HUD)
  document.body.classList.add('exporting-2k');

  const capturedImages = [];

  try {
    for (let i = 1; i <= total; i++) {
      if (onProgress) {
        onProgress(i, total + 1, `Đang chụp Canvas 2K: Slide ${i}/${total}...`);
      }

      // Show target slide only
      document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
      const targetSlide = document.getElementById(`slide-${i}`);
      if (!targetSlide) continue;
      targetSlide.classList.add('active');

      if (window.lucide) window.lucide.createIcons();
      await new Promise(r => setTimeout(r, 120));

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

      capturedImages.push(canvas.toDataURL('image/png'));
    }
    return capturedImages;
  } finally {
    document.body.classList.remove('exporting-2k');
    if (stage) stage.style.transform = origTransform;
    goToSlide(savedSlide);
    updateStageScale();
    PresentationState.isExporting2K = false;
  }
}

/* ==============================================================================
   8. EXPORT TO PPTX (2K CANVAS PACKAGING)
   ============================================================================== */
async function exportToPPTX2K(fileName = "Thuyet_Trinh_DaiNam_2K.pptx") {
  if (typeof PptxGenJS === 'undefined') {
    showToast("Thư viện PptxGenJS đang tải, vui lòng thử lại sau...");
    return;
  }
  if (typeof html2canvas === 'undefined') {
    showToast("Thư viện html2canvas đang tải, vui lòng thử lại sau...");
    return;
  }

  showExportProgress("Đang Xuất File PowerPoint (PPTX 2K)", "Đang chụp từng slide ở độ phân giải 2K siêu nét (2560x1440)...");

  try {
    const images = await captureAllSlides2K((cur, total, msg) => {
      updateExportProgress(cur, total, msg);
    });

    updateExportProgress(PresentationState.totalSlides + 1, PresentationState.totalSlides + 1, "Đang đóng gói file PowerPoint (.pptx)...");

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches (16:9 widescreen)
    pptx.title = "Báo Cáo Thuyết Trình - Đại Học Đại Nam";
    pptx.company = "Trường Đại học Đại Nam (DNU)";

    for (let i = 0; i < images.length; i++) {
      const slide = pptx.addSlide();
      slide.addImage({
        data: images[i],
        x: 0,
        y: 0,
        w: 10,
        h: 5.625
      });
    }

    await pptx.writeFile({ fileName });
    hideExportProgress();
    showToast("Xuất file PowerPoint 2K (.pptx) thành công!");
  } catch (err) {
    console.error("Export PPTX error:", err);
    hideExportProgress();
    showToast("Lỗi khi xuất PowerPoint: " + err.message);
  }
}

/* ==============================================================================
   9. EXPORT TO PDF (2K LANDSCAPE PACKAGING)
   ============================================================================== */
async function exportToPDF2K(fileName = "Thuyet_Trinh_DaiNam_2K.pdf") {
  const jspdfLib = window.jspdf?.jsPDF || window.jsPDF;
  if (!jspdfLib) {
    showToast("Thư viện jsPDF đang tải, vui lòng thử lại sau...");
    return;
  }
  if (typeof html2canvas === 'undefined') {
    showToast("Thư viện html2canvas đang tải, vui lòng thử lại sau...");
    return;
  }

  showExportProgress("Đang Xuất File PDF (2K Siêu Nét)", "Đang chụp từng slide ở độ phân giải 2K siêu nét (2560x1440)...");

  try {
    const images = await captureAllSlides2K((cur, total, msg) => {
      updateExportProgress(cur, total, msg);
    });

    updateExportProgress(PresentationState.totalSlides + 1, PresentationState.totalSlides + 1, "Đang đóng gói tài liệu PDF 2K...");

    const pdf = new jspdfLib({
      orientation: 'landscape',
      unit: 'px',
      format: [2560, 1440],
      hotfixes: ['px_scaling']
    });

    for (let i = 0; i < images.length; i++) {
      if (i > 0) pdf.addPage([2560, 1440], 'landscape');
      pdf.addImage(images[i], 'PNG', 0, 0, 2560, 1440, undefined, 'FAST');
    }

    pdf.save(fileName);
    hideExportProgress();
    showToast("Xuất file PDF 2K thành công!");
  } catch (err) {
    console.error("Export PDF error:", err);
    hideExportProgress();
    showToast("Lỗi khi xuất PDF: " + err.message);
  }
}

/* ==============================================================================
   10. KEYBOARD SHORTCUTS & INITIALIZATION
   ============================================================================== */
document.addEventListener('keydown', (e) => {
  if (PresentationState.isExporting2K) return;

  switch (e.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      e.preventDefault();
      nextSlide();
      break;
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault();
      prevSlide();
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'h':
    case 'H':
      e.preventDefault();
      toggleFocusMode();
      break;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Count total slides
  PresentationState.totalSlides = document.querySelectorAll('.slide').length;

  updateStageScale();
  if (window.lucide) window.lucide.createIcons();
  goToSlide(1);

  console.log(`[DNU Engine] Presentation initialized with ${PresentationState.totalSlides} slides.`);
});
