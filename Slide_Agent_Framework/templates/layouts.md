# Catalogue of Standard Slide Layouts ("Đại Nam Style")

This catalogue provides the 8 core standardized layout templates for constructing complete academic and executive presentations.

---

## Overview Table

| Layout # | Name | Best For | Theme | Structure |
| :--- | :--- | :--- | :--- | :--- |
| **01** | [Hero Cover](./layout-01-hero-cover.html) | Title slide, team info, course intro | Dark | 1.15fr (Headline & Meta) : 0.85fr (Visual Card) |
| **02** | [Definition & Theory](./layout-02-definition-quote.html) | Concepts, core axioms, context photos | Light | 1fr (Quote + Photo Card) : 1fr (3-Card Stack) |
| **03** | [Four Pillars Grid](./layout-03-four-pillars.html) | 4 core domains, components, principles | Light | 4-column equal grid cards |
| **04** | [Dual Comparison](./layout-04-dual-comparison.html) | Side-by-side contrast (DBHB vs BLLĐ) | Light | 2 balanced columns with opposing accent tags |
| **05** | [Sequential Process Flow](./layout-05-process-flow.html) | Multi-step lifecycle, timeline, escalation | Light | 4 horizontal step cards + bottom synthesis + right visual |
| **06** | [Interactive Loop Diagram](./layout-06-interactive-loop.html) | Cyclic processes, feedback loops, case studies | Dark | SVG circle diagram + interactive case study modal |
| **07** | [2x2 Action Matrix](./layout-07-quad-matrix.html) | Student duties, 4 quadrants, action items | Light | 2x2 grid with colored icon wraps and check lists |
| **08** | [Closing & Quote Banner](./layout-08-closing-quote.html) | Historic conclusion, takeaway summary, Q&A | Dark | 16:9 photo + quote hero + 3 takeaway cards + Q&A bar |

---

## Detailed Specifications

### Layout 1: Hero / Cover Slide
- **Role**: First slide seen by audience and evaluators. Must deliver a massive visual punch.
- **Key Elements**:
  - `hero-badge-tag`: Uppercase tag with flame/star icon indicating presentation tier.
  - `hero-main-title`: 56px bold title with gradient highlight text.
  - `hero-sub-text`: Scannable subtitle (28–30px).
  - `hero-meta-grid`: 2 distinct cards showing Reporting Unit and Course Enrollment.
  - `hero-visual-card`: Media container with gradient overlay and headline badge.

### Layout 2: Definition & Theory
- **Role**: Establishing core concepts, authoritative quotes, and real-world context.
- **Key Elements**:
  - `definition-box`: Left container holding definition quote, key takeaway pill, and 16:9 photo preview (`.def-img-thumb`).
  - `characteristics-stack`: Right column with 3 stacked cards, each featuring a large Lucide icon and clear numbered points.

### Layout 3: Four Pillars Grid
- **Role**: Breaking down a complex strategy or system into 4 distinct dimensions (e.g. Political, Economic, Ideological, Cultural).
- **Key Elements**:
  - Top category eyebrow and main title.
  - 4 vertical cards (`grid-template-columns: repeat(4, 1fr)`).
  - Numbered header pill (01, 02, 03, 04) with accent color borders.
  - Bulleted key points with checkmark icons.

### Layout 4: Dual Comparison (2 Columns)
- **Role**: Analyzing two interconnected or contrasting phenomena (e.g., Peaceful Evolution vs Violent Overthrow).
- **Key Elements**:
  - 2 balanced columns with custom borders (e.g., Blue for Strategy 1, Crimson/Orange for Strategy 2).
  - Summary badges, definition callouts, and key tactical differences.

### Layout 5: Sequential Process Flow
- **Role**: Showing phased progression or escalation stages (Step 1 ➔ Step 2 ➔ Step 3 ➔ Step 4).
- **Key Elements**:
  - `flow-steps-wrapper`: 4 horizontal cards linked by chevron arrows.
  - `dialectic-synthesis-box`: Full-width banner below summarizing the dialectic relationship.
  - Right visual photo column with `object-fit: cover` aspect ratio integrity.

### Layout 6: Interactive Loop Diagram
- **Role**: Explaining recurring cycles, vicious loops, or self-reinforcing dynamics.
- **Key Elements**:
  - Central SVG loop showing circular transition arrows.
  - Floating action button opening an interactive case-study modal without leaving the slide.

### Layout 7: 2x2 Action Matrix
- **Role**: Action plans, responsibilities, student guidelines, or SWOT analysis.
- **Key Elements**:
  - 4 quadrant cards with soft pastel icon backgrounds (Emerald, Sky Blue, Coral, Purple).
  - High-contrast bullet items with green check icons.

### Layout 8: Closing Quote & Summary
- **Role**: Final memorable takeaway and transition into Q&A.
- **Key Elements**:
  - `quote-hero-banner`: 16:9 architectural/historical photo (`550x310px`) + authentic quote in 48px italic typography.
  - 3 closing takeaway cards.
  - Bottom Q&A action bar thanking the audience and inviting questions.
