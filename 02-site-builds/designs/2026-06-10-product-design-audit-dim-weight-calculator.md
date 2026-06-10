# Product Design Audit: Dimensional Weight Calculator

Date: 2026-06-10

## Scope

Product surface:

```text
02-site-builds/dim-weight-calculator
```

Flow audited:

```text
Open the main dimensional weight calculator page
→ review initial desktop and mobile layout
→ enter realistic package values
→ review result and source-confidence presentation
```

Capture method:

```text
Product Design audit fallback: Playwright
```

Reason for fallback:

- Product Design skills are available.
- The Product Design `user_context_preflight.py` referenced by the skill was not present in the local plugin package.
- Browser / Chrome capture tools were not exposed in the current tool list.
- User approved Playwright fallback.

Local screenshot evidence:

```text
output/playwright/product-design-audit/screenshots/01-desktop-start.png
output/playwright/product-design-audit/screenshots/02-desktop-filled-result.png
output/playwright/product-design-audit/screenshots/03-mobile-start.png
output/playwright/product-design-audit/screenshots/04-mobile-filled-form.png
output/playwright/product-design-audit/screenshots/05-mobile-result-scrolled.png
```

## Overall Verdict

The current page is usable and materially better than an unstyled engineering demo, but it does **not yet meet** the previously recommended `Product Tool Shell` direction.

The earlier design optimization work is currently stronger as a design brief than as implemented UI. The page has a working calculator, result panel, and source note, but several acceptance criteria from the UI polish design are still missing or only partially implemented.

## Step Health

| Step | Description | Health |
|---|---|---|
| 1 | Desktop initial page | Fair |
| 2 | Desktop filled result | Fair |
| 3 | Mobile initial page | Fair |
| 4 | Mobile filled form | Fair |
| 5 | Mobile result after scroll | Good |

## Evidence Summary

Captured page metrics:

```text
title: Dimensional Weight Calculator for UPS, FedEx, USPS & DHL
h1: Free Multi-Carrier Dimensional Weight Calculator
hasHeader: false
hasNav: false
labels:
  - CarrierFedExUPSUSPSDHLCustom
  - Length
  - Width
  - Height
  - Actual weight
  - DIM divisor
mobile horizontal overflow: false
console warnings/errors: 0
```

## Strengths

1. The calculator is visible near the top on desktop.
2. The result panel has strong contrast and clear hierarchy for billable weight.
3. The form updates immediately after input changes.
4. The source note is present and includes confidence, source date, and a source link.
5. Mobile layout stacks cleanly with no horizontal overflow in the tested 390px viewport.
6. No console warnings or errors appeared during the audited flow.

## Findings

### 1. Product Tool Shell is not fully implemented

Evidence:

- `hasHeader: false`
- `hasNav: false`
- UI polish design required a compact top bar with Calculator / Formula / Sources / Disclaimer anchors.

Impact:

The page still feels closer to a styled calculator page than a complete product surface. The lack of top-level structure weakens product credibility and makes the educational sections feel less connected.

Recommendation:

Add a restrained top bar with product identity and anchor links. Keep it utilitarian; no account CTA or marketing banner.

### 2. Unit labels are still not explicit

Evidence:

Current labels are:

```text
Length
Width
Height
Actual weight
DIM divisor
```

The design brief required:

```text
Length (in)
Width (in)
Height (in)
Actual weight (lb)
```

Impact:

This is a trust and usability issue. Shipping beginners may not know whether values are imperial or metric, especially because DHL-style calculations can involve metric units.

Recommendation:

Show units in labels and result context. When carrier/unit system changes, labels should update or add helper text.

### 3. Desktop dimension inputs visually collide

Evidence:

In the desktop filled-result screenshot, the three dimension inputs sit in one row and their borders appear visually cramped, with vertical seams that read like overlapping controls.

Impact:

The form works, but the most important inputs do not feel polished. This is especially visible because the result panel is strong, making the form side look less refined.

Recommendation:

Increase column gap and ensure each input has stable width and clear boundaries. Consider grouping dimensions as a labeled row with `L / W / H` captions and unit chips.

### 4. Source confidence is present but visually disconnected

Evidence:

The source note appears as a separate amber panel after the calculator.

Impact:

The source note is useful, but it reads like a warning strip rather than an integrated trust panel. The result panel already contains the formula note, so the source panel feels duplicated and disconnected.

Recommendation:

Turn the source note into a compact structured trust panel:

```text
Formula source
Carrier
Formula
Confidence
Checked
Caveat
Source link
```

Keep it close to the result context or visually align it with the calculator shell.

### 5. Mobile first viewport prioritizes form over result

Evidence:

On 390px mobile, the initial filled-form screenshot shows the form and only begins to reach the divisor area. The result panel requires scrolling.

Impact:

This is acceptable for MVP, but it does not fully satisfy the design goal of helping users see the calculation and trust boundary quickly.

Recommendation:

After input on mobile, consider making the result panel visually tighter or adding a compact billable-weight summary above the full result panel.

### 6. Carrier preset explanation is too hidden

Evidence:

The selected carrier dropdown only shows `FedEx`. The divisor and service-scope explanation appears in the result panel after the user reads the result.

Impact:

Users selecting carriers do not immediately see what the preset means. This is important because divisors and service coverage vary.

Recommendation:

Add one line below the carrier selector:

```text
FedEx preset: imperial packages, divisor 139, high confidence source.
```

For DHL or low-confidence entries, the caveat should be visible before the user relies on the result.

## Accessibility Risks From Screenshots

- Inputs have visible labels.
- Focus state is visible on the active input.
- Result values do not rely only on color.
- Muted text appears readable in the captured screenshots.

Limits:

- Keyboard order was not fully tested in this audit.
- Screen-reader label quality was not fully tested.
- Color contrast was visually inspected but not measured with a contrast tool.

## Recommended Next Design Patch

Do one focused implementation pass before deployment:

1. Add compact top bar and anchor navigation.
2. Update labels to include units.
3. Add carrier preset helper text.
4. Refine dimension input spacing.
5. Convert source note into a structured trust panel.
6. Add a compact mobile result summary if it can be done without adding complexity.

Do not add:

- Account features.
- Shipping price APIs.
- CSV upload.
- Decorative hero art.
- Fake stats or revenue claims.

## Product Design Conclusion

Product Design should remain in the workflow now.

The current page is functional enough to continue, but it should not be treated as visually complete. The next best move is a small UI implementation pass based on the six recommended patches above, followed by another screenshot-based audit.
