# Dimensional Weight Calculator UI Polish Design

## Context

This design pass applies to:

```text
02-site-builds/dim-weight-calculator
```

The current MVP is functionally valid but visually thin. It reads more like an engineering demo than a trustworthy shipping calculator.

The goal is not to create a marketing landing page. The goal is to make the tool feel credible, fast, and understandable for ecommerce sellers, cross-border sellers, and shipping operators.

## Design Brief

Create a restrained product UI for a free multi-carrier dimensional weight calculator.

The page must help users do three things quickly:

1. Calculate billable weight.
2. Understand which carrier formula and divisor were used.
3. See the estimate boundary and source confidence.

## Non-goals

- Do not add shipping-price quote APIs.
- Do not add accounts, saved history, CSV upload, or packaging recommendations.
- Do not turn the page into a decorative SaaS landing page.
- Do not use purple-blue gradients, emoji icons, fake metrics, or unsupported claims.
- Do not change formula logic unless a test proves a bug.

## Approaches Considered

### Option A: Minimal Styling Patch

Only improve spacing, labels, and colors.

Pros:

- Fastest.
- Lowest implementation risk.

Cons:

- Still may feel generic.
- Does not fully solve trust and source visibility.

### Option B: Product Tool Shell

Add a compact top bar, stronger hero, refined calculator/result layout, clearer unit labels, source confidence panel, and better content sections.

Pros:

- Best match for current MVP.
- Improves trust without adding major scope.
- Creates reusable calculator-page pattern for future tools.

Cons:

- Requires touching layout and component styles.
- Needs desktop and mobile visual QA.

### Option C: Full Brand Direction

Create logo, brand system, stronger visual identity, and more content modules.

Pros:

- Stronger brand signal.

Cons:

- Too much for this stage.
- Delays deployment and SEO validation.

## Recommended Direction

Use Option B: Product Tool Shell.

This is the best tradeoff because ToolSite OS needs a reusable page pattern, not one-off decoration. The calculator should become the template for future formula-based tools.

## Page Structure

```text
top bar
→ hero and trust summary
→ calculator shell
→ formula source note
→ practical explanation sections
→ disclaimer
```

### Top Bar

Purpose:

- Make the page feel like a real product.
- Provide simple navigation anchors.

Content:

- Product mark text: `Shipping calculator`
- Links:
  - Calculator
  - Formula
  - Sources
  - Disclaimer

No account buttons or marketing CTA.

### Hero

Purpose:

- Clarify the exact task.
- Keep calculator visible without scrolling too far.

Content:

- H1: `Free Multi-Carrier Dimensional Weight Calculator`
- Supporting copy should be concise and specific.
- Add 2-3 trust cues:
  - UPS, FedEx, USPS, DHL presets.
  - Custom divisor support.
  - Public formula sources and confidence notes.

Avoid hero metrics and revenue claims.

### Calculator Shell

Layout:

- Desktop: two-column form and result panel.
- Mobile: stacked form, then result.

Required improvements:

- Labels must show units clearly:
  - `Length (in)`
  - `Width (in)`
  - `Height (in)`
  - `Actual weight (lb)`
  - Metric equivalents when selected carrier uses metric.
- Carrier selector must explain the preset, service scope, divisor, and source confidence.
- Custom divisor state must feel intentional, not like a disabled leftover field.

### Result Panel

Primary hierarchy:

1. Billable weight.
2. Dimensional weight vs actual weight comparison.
3. Formula and divisor.
4. Carrier caveat.

Visual rules:

- Use a strong dark result panel or high-contrast neutral panel.
- Amber may highlight the billable result, but should not dominate the full page.
- Do not use decorative glow.

### Formula Source Note

Current source note is useful but visually disconnected.

Improve it into a compact trust panel:

```text
Formula source
Carrier:
Formula:
Confidence:
Checked:
Caveat:
Source link
```

DHL low confidence and USPS caution should remain visible.

### Content Sections

Current content sections are acceptable but too card-like and repetitive.

Improve by:

- Using article-style sections with clear headings.
- Adding a simple comparison row or table when useful.
- Keeping paragraphs readable.
- Avoiding identical card grids.

## Visual System

Use `DESIGN.md` tokens as the source:

- Pure white background.
- Cool neutral surfaces.
- Deep ink text.
- Amber only for result emphasis and focus.
- Teal for source/system accents.

Cards:

- Radius 8px or less for repeated content.
- Calculator shell may use 12px maximum if it reads as a tool frame.
- Do not nest cards inside cards.

Typography:

- Fixed product UI scale.
- Strong H1, not oversized.
- Labels and helper text readable.

## Interaction States

Must cover:

- Focus states on inputs and select.
- Disabled divisor field when carrier is not custom.
- Invalid input state.
- Custom divisor enabled state.
- Immediate result updates.

No new complex animation in this pass.

## Responsive Requirements

Desktop:

- Calculator and result fit comfortably in first viewport at common laptop sizes.
- No text overlaps.

Tablet:

- Two-column layout can remain if readable, otherwise stack cleanly.

Mobile:

- Inputs stack.
- Result remains readable.
- No three-column input grid on narrow screens.
- Long formula/source text wraps without overflow.

## Acceptance Criteria

- Main route and four carrier routes still render.
- Calculator logic remains covered by existing tests.
- Unit labels are explicit.
- Formula/source confidence is visible.
- Page no longer reads as an unstyled engineering demo.
- Desktop, tablet, and mobile screenshots show no overlap or cramped controls.
- No purple-blue gradients, emoji icons, fake metrics, filler copy, or unsupported revenue claims.

## Verification

Run:

```text
npm run test
npm run build
```

Then run browser QA:

- `/dimensional-weight-calculator/`
- `/fedex-dimensional-weight-calculator/`
- `/ups-dimensional-weight-calculator/`
- `/usps-dimensional-weight-calculator/`
- `/dhl-volumetric-weight-calculator/`

Viewports:

- 1440 desktop.
- 768 tablet.
- 390 mobile.

Check:

- status 200.
- H1 visible.
- calculator visible.
- result panel visible.
- unit labels visible.
- no console errors.
- no overlapping text.
