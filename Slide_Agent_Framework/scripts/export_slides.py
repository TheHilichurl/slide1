"""
Export Automation Script for Slide Agent Framework
Captures slides from local HTML presentation via headless Chromium at 2K resolution (2560x1440)
and packages them into pristine 16:9 PPTX and PDF files with preserved image aspect ratios.

Usage:
    python export_slides.py --url http://localhost:8000/Slide_Agent_Framework/boilerplate/index.html --out ./exports
"""

import argparse
import asyncio
import os
import sys
from playwright.async_api import async_playwright
from PIL import Image

try:
    from pptx import Presentation
    from pptx.util import Inches
    HAS_PPTX = True
except ImportError:
    HAS_PPTX = False

sys.stdout.reconfigure(encoding='utf-8')

async def capture_slides(url: str, output_dir: str):
    slides_img_dir = os.path.join(output_dir, "slide_images")
    os.makedirs(slides_img_dir, exist_ok=True)
    
    print(f"[1/3] Connecting to presentation at: {url}")
    image_paths = []

    # Locate available browser (Playwright default, Google Chrome, or Microsoft Edge)
    executable_path = None
    default_chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    default_edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    if os.path.exists(default_chrome):
        executable_path = default_chrome
    elif os.path.exists(default_edge):
        executable_path = default_edge

    async with async_playwright() as p:
        launch_kwargs = {"headless": True}
        if executable_path:
            launch_kwargs["executable_path"] = executable_path

        browser = await p.chromium.launch(**launch_kwargs)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            device_scale_factor=2560 / 1920
        )
        page = await context.new_page()
        await page.goto(url, wait_until='networkidle')
        await page.wait_for_timeout(1000)

        # Count slides
        total_slides = await page.evaluate("() => document.querySelectorAll('.slide').length")
        print(f"       Found {total_slides} slides in presentation.")

        # Apply exporting class to eliminate transition artifacts, timers, and HUD
        await page.evaluate("""() => {
            document.body.classList.add('exporting-2k');
            const hud = document.getElementById('control-hud');
            if (hud) hud.style.display = 'none';
        }""")
        await page.wait_for_timeout(200)

        for i in range(1, total_slides + 1):
            slide_id = f"slide-{i}"
            img_filename = f"slide_{i:02d}.png"
            img_path = os.path.join(slides_img_dir, img_filename)

            # Activate slide
            await page.evaluate(f"""() => {{
                document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
                const el = document.getElementById('{slide_id}') || document.querySelectorAll('.slide')[{i-1}];
                if (el) el.classList.add('active');
                if (window.lucide) window.lucide.createIcons();
            }}""")
            await page.wait_for_timeout(300)

            # Locate active slide
            locator = page.locator(".slide.active")
            await locator.screenshot(path=img_path)

            im = Image.open(img_path)
            print(f"       [Captured] Slide {i:02d}/{total_slides} -> {img_filename} ({im.size[0]}x{im.size[1]}px)")
            image_paths.append(img_path)

        await browser.close()

    return image_paths

def build_pptx(image_paths, output_path):
    if not HAS_PPTX:
        print("       [Warning] python-pptx not installed. Skipping PPTX generation.")
        return
    print(f"[2/3] Generating native 16:9 Presentation (.pptx)...")
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    for img_path in image_paths:
        slide = prs.slides.add_slide(blank_layout)
        slide.shapes.add_picture(
            img_path,
            Inches(0), Inches(0),
            width=prs.slide_width,
            height=prs.slide_height
        )

    prs.save(output_path)
    print(f"       [Success] Saved PPTX to: {output_path} ({os.path.getsize(output_path):,} bytes)")

def build_pdf(image_paths, output_path):
    print(f"[3/3] Generating 2K Landscape Document (.pdf)...")
    pil_images = []
    for path in image_paths:
        im = Image.open(path).convert('RGB')
        pil_images.append(im)

    if pil_images:
        pil_images[0].save(
            output_path,
            save_all=True,
            append_images=pil_images[1:],
            resolution=150.0
        )
        print(f"       [Success] Saved PDF to: {output_path} ({os.path.getsize(output_path):,} bytes)")

def main():
    parser = argparse.ArgumentParser(description="Slide Agent Framework 2K Exporter")
    parser.add_argument("--url", default="http://localhost:8000/Slide_Agent_Framework/boilerplate/index.html", help="URL of presentation")
    parser.add_argument("--out", default="./exports", help="Output directory")
    parser.add_argument("--name", default="Presentation_DaiNam", help="Base filename without extension")
    args = parser.parse_args()

    os.makedirs(args.out, exist_ok=True)
    pptx_path = os.path.join(args.out, f"{args.name}.pptx")
    pdf_path = os.path.join(args.out, f"{args.name}.pdf")

    images = asyncio.run(capture_slides(args.url, args.out))
    build_pptx(images, pptx_path)
    build_pdf(images, pdf_path)
    print("\n Export completed successfully!")

if __name__ == '__main__':
    main()
