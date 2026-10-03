# Slide Agent Framework (Đại Nam University Style)
> **Bộ Framework & Skill Mẫu Thiết Kế Slide Thuyết Trình Chuẩn Bản Sắc Đại Nam Cho AI Agent & Lập Trình Viên**

---

## 1. Giới thiệu tổng quan
**Slide Agent Framework** là bộ tài nguyên và chuẩn hóa thiết kế toàn diện, được đóng gói chuyên dụng cho AI Agents (Google Antigravity, Claude, ChatGPT, Cursor,...) và nhà phát triển để tạo ra các bài thuyết trình web dạng Single-Page Application (SPA) 16:9 sắc nét, chuyên nghiệp, tuân thủ nghiêm ngặt nhận diện thương hiệu Đại học Đại Nam và hỗ trợ xuất file **PPTX / PDF độ phân giải cao 2K mà không bao giờ bị méo tỉ lệ hình ảnh**.

---

## 2. Cấu trúc thư mục Framework
```text
Slide_Agent_Framework/
├── SKILL.md                     # Bộ định nghĩa Agent Skill chuẩn Antigravity (YAML + instructions)
├── README.md                    # Tài liệu hướng dẫn sử dụng chi tiết này
├── rules/                       # Bộ quy chuẩn thiết kế, công nghệ và xuất file
│   ├── RULES.md                 # Quy tắc cốt lõi: bảng màu, header/footer, canvas 16:9, tỷ lệ ảnh, export
│   └── AGENTS.md                # System prompt chỉ thị hành vi cho AI Agent khi sinh slide
├── assets/                      # Tài nguyên đồ họa & CSS gốc
│   ├── dai-nam-logo-ngang.svg   # Logo vector Đại học Đại Nam chuẩn tỉ lệ
│   ├── favicon.svg              # Favicon nhận diện
│   └── styles-core.css          # Toàn bộ Design System (tokens, grid, card, typography, HUD, print)
├── templates/                   # Thư viện 8 layout slide mẫu (HTML sạch, chuẩn BEM)
│   ├── layouts.md               # Catalog mô tả 8 layout, trường hợp sử dụng & visual blueprint
│   ├── header-footer.html       # Chuẩn Header & Footer bắt buộc trên từng slide
│   ├── layout-01-hero-cover.html        # Slide 01: Bìa mở đầu ấn tượng (Hero Cover)
│   ├── layout-02-definition-quote.html  # Slide 02: Định nghĩa cốt lõi & Trích dẫn
│   ├── layout-03-four-pillars.html      # Slide 03: 4 Trụ cột / 4 Yếu tố chiến lược
│   ├── layout-04-dual-comparison.html   # Slide 04: So sánh đối chiếu 2 mặt (Dual Comparison)
│   ├── layout-05-process-flow.html      # Slide 05: Quy trình / Tiến trình 4 bước (Process Flow)
│   ├── layout-06-interactive-loop.html  # Slide 06: Vòng lặp tương tác đa chiều (Interactive Loop)
│   ├── layout-07-quad-matrix.html       # Slide 07: Ma trận 4 ô phân tích (Quad Matrix)
│   └── layout-08-closing-quote.html     # Slide 08: Kết luận, Trích dẫn lãnh tụ & Cảm ơn
├── boilerplate/                 # Bản mẫu hoàn chỉnh sẵn sàng chạy (Turnkey Ready)
│   ├── index.html               # Ứng dụng thuyết trình web mẫu 3 slide với HUD controls
│   └── app.js                   # Logic Presentation Engine (Scale 16:9, Timer, Phím tắt, 2K Exporter)
└── scripts/                     # Tool tự động hóa xuất file
    └── export_slides.py         # Script Python headless Playwright chụp slide 2K ra PPTX & PDF
```

---

## 3. Bản sắc nhận diện thương hiệu Đại Nam (Brand Identity)

### 3.1. Bảng màu chuẩn (Color Tokens)
| Tên Token | Mã Hex | Vai trò & Ứng dụng |
|---|---|---|
| `--color-primary` | `#F37021` | Cam Đại Nam năng động: Slogan, tag badge, điểm nhấn, CTA, viền active |
| `--color-secondary` | `#003B7A` | Xanh Cobalt Hoàng Gia: Nền hero, tiêu đề lớn, thanh tiến trình |
| `--color-text-main` | `#0F172A` | Slate tối đậm: Chữ nội dung chính, độ tương phản cao chống mỏi mắt |
| `--color-text-muted` | `#64748B` | Xám trung tính: Mô tả phụ, nhãn metadata |
| `--color-card-bg` | `#FFFFFF` | Trắng tinh khiết: Nền card kính mờ kết hợp viền `rgba(0,0,0,0.06)` |
| `--color-bg-base` | `#F8FAFC` | Nền canvas slide dịu nhẹ cho mắt khi chiếu máy chiếu hội trường |

### 3.2. Slogan & Website trường
- **Slogan đặc trưng:** `"HỌC ĐỂ THAY ĐỔI"` (Viết hoa, in đậm, màu cam `#F37021`, gắn cố định góc trên bên trái mỗi slide).
- **Website trường:** `https://dainam.edu.vn/vi` (Gắn góc dưới bên trái cạnh đồng hồ bấm giờ thuyết trình).
- **Logo trường:** `dai-nam-logo-ngang.svg` (Góc trên bên phải mọi slide, chiều cao chuẩn `56px`, nền tối dùng filter trắng).

### 3.3. Cấu trúc Header & Footer bất biến trên từng Slide
Mỗi slide `div.slide` **bắt buộc** phải chứa cấu trúc sau:
```html
<!-- HEADER BẮT BUỘC -->
<header class="slide-header">
    <div class="slogan-badge">HỌC ĐỂ THAY ĐỔI</div>
    <div class="university-brand">
        <img src="../assets/dai-nam-logo-ngang.svg" alt="Đại học Đại Nam" class="dnu-logo">
    </div>
</header>

<!-- NỘI DUNG SLIDE (Sử dụng 1 trong 8 Layout Templates) -->
<div class="slide-content">
    ...
</div>

<!-- FOOTER BẮT BUỘC -->
<footer class="slide-footer">
    <div class="footer-left">
        <span class="timer-display"><i data-lucide="clock"></i> 00:00</span>
        <a href="https://dainam.edu.vn/vi" target="_blank" class="school-url">https://dainam.edu.vn/vi</a>
    </div>
    <div class="footer-center">
        Nhóm 1 | Tiểu đội 1 | Trung đội 1 | Đại đội 6 | Môn: GDQP-AN
    </div>
    <div class="footer-right">
        <span class="slide-counter">01 / 10</span>
    </div>
</footer>
```

---

## 4. Danh mục 8 Layout Slide Chuẩn Hóa
1. **Layout 01 - Hero Cover**: Slide mở đầu hoành tráng, typography cấp đại học, avatar diễn giả, thông tin môn học, nút bấm bắt đầu.
2. **Layout 02 - Definition & Quote**: Cấu trúc 2 cột kinh điển: bên trái định nghĩa/nguyên lý, bên phải trích dẫn danh ngôn hoặc card trực quan.
3. **Layout 03 - Four Pillars Grid**: Lưới 4 cột đối xứng cho 4 nguyên tắc, 4 giải pháp, 4 bài học chiến lược kèm metric badge.
4. **Layout 04 - Dual Comparison**: So sánh 2 mặt đối lập (Thời chiến vs Thời bình, Truyền thống vs Hiện đại, Điểm mạnh vs Điểm yếu) với icon đối xứng.
5. **Layout 05 - Process Flow**: Quy trình 4 bước tuần tự với đường nối tiến trình, số thứ tự `01, 02, 03, 04` và thanh trạng thái.
6. **Layout 06 - Interactive Loop**: Mô hình tương tác trung tâm đa chiều (Hub-and-Spoke), phân tích mối liên kết qua lại giữa các thực thể.
7. **Layout 07 - Quad Matrix**: Ma trận phân tích 2x2 (SWOT, Phân khúc, Phân loại mối đe dọa) với 4 màu viền chủ đạo.
8. **Layout 08 - Closing Quote & Appreciation**: Slide kết bài trang trọng, ảnh lãnh tụ/danh nhân chuẩn tỉ lệ 16:9, lời dặn dò lịch sử và lời cảm ơn người nghe.

*(Xem chi tiết code mẫu tại thư mục [templates/](file:///c:/Users/Giang/Desktop/slide_new/Slide_Agent_Framework/templates/))*

---

## 5. Cơ chế Chống Méo Ảnh & Bộ Máy Xuất File 2K (Universal Image Aspect-Ratio Engine)

### 5.1. Vấn đề méo ảnh trong xuất slide và giải pháp triệt để
Khi chụp màn hình DOM qua thư viện canvas (`html2canvas`) hoặc in PDF, các thuộc tính CSS như `object-fit: cover` hay `contain` thường bị bỏ qua, dẫn tới việc ảnh bị co dẹp (squashed) biến dạng méo mó.

Framework áp dụng giải pháp 2 tầng:
1. **Thiết kế Container:** Các khối chứa ảnh (như khung chân dung lãnh tụ, ảnh di tích) phải có tỉ lệ tương đồng với ảnh gốc (khuyên dùng `aspect-ratio: 16/9; width: 550px; height: 310px;`).
2. **Offscreen Canvas Substitution:** Trong callback `onclone` của bộ xuất file, script tính toán ma trận crop chính xác của ảnh và thay thế thẻ `<img>` bằng một thẻ `<canvas>` đã render sẵn với tỉ lệ chuẩn ở mật độ điểm ảnh 2K (`2560x1440`).

### 5.2. Cách sử dụng bộ máy xuất file

#### Cách 1: Nút bấm trực tiếp trên giao diện Web (Browser HUD)
Trong giao diện presentation, thanh điều khiển nổi (Floating HUD) cung cấp sẵn 2 nút:
- **Nút "Xuất PPTX"**: Tạo trực tiếp file `.pptx` chuẩn 16:9 sắc nét, tải về máy tức thì.
- **Nút "Xuất PDF"**: Tạo tài liệu `.pdf` 2K Landscape chuẩn in ấn ấn tượng.

#### Cách 2: Tự động hóa qua Python CLI (Playwright Headless)
Chạy lệnh xuất tự động không cần mở trình duyệt thủ công:
```bash
python Slide_Agent_Framework/scripts/export_slides.py --url http://localhost:8000/Slide_Agent_Framework/boilerplate/index.html --out ./my_exports --name Thuyet_Trinh_DaiNam
```

---

## 6. Hướng dẫn nhanh dành cho AI Agent (Quick Start for Agents)

Khi được người dùng giao nhiệm vụ: *"Hãy tạo bài thuyết trình 10 slide về chủ đề XYZ theo chuẩn Đại học Đại Nam"*:

1. **Đọc Skill & Rules:**
   - Đọc tệp [SKILL.md](file:///c:/Users/Giang/Desktop/slide_new/Slide_Agent_Framework/SKILL.md) và [rules/RULES.md](file:///c:/Users/Giang/Desktop/slide_new/Slide_Agent_Framework/rules/RULES.md).
2. **Khởi tạo từ Boilerplate:**
   - Sao chép [boilerplate/index.html](file:///c:/Users/Giang/Desktop/slide_new/Slide_Agent_Framework/boilerplate/index.html) làm khung chính.
   - Giữ nguyên liên kết tới `../assets/styles-core.css` và `app.js`.
3. **Lắp ghép Layout từ Templates:**
   - Phân tích dàn ý chủ đề thành 10 slide.
   - Chọn layout phù hợp từ `templates/layout-*.html` cho từng slide.
   - Thay thế nội dung chữ, icon Lucide và số liệu.
4. **Kiểm tra Header & Footer:**
   - Đảm bảo đủ Slogan `"HỌC ĐỂ THAY ĐỔI"`, Logo Đại Nam, Timer, URL trường và số trang `XX / 10`.
5. **Chạy thử nghiệm & Xuất bản:**
   - Mở trình duyệt kiểm tra canvas 16:9 tự động co giãn.
   - Bấm nút xuất PPTX và PDF để kiểm tra độ sắc nét và tỉ lệ hình ảnh.
