# Product Design Patch QA: Dimensional Weight Calculator

Date: 2026-06-10

## Scope

This QA pass verifies the focused UI implementation patch that followed:

```text
02-site-builds/designs/2026-06-10-product-design-audit-dim-weight-calculator.md
```

Files changed:

```text
src/components/DimensionalWeightCalculator.tsx
src/components/FormulaSourceNote.astro
src/components/ToolLayout.astro
src/pages/dimensional-weight-calculator.astro
src/styles/global.css
```

## Changes Verified

| Audit issue | Patch status |
|---|---|
| Missing top bar / anchor nav | Fixed |
| Missing units in input labels | Fixed |
| Carrier preset explanation too hidden | Fixed |
| Desktop dimension inputs visually cramped | Fixed after adding `min-w-0` and `w-full` |
| Source confidence visually disconnected | Improved with structured page source note and dynamic result-panel confidence |
| Mobile result too far below form | Improved with mobile billable estimate summary |

## Evidence

Local screenshots:

```text
output/playwright/product-design-patch-qa/screenshots/01-desktop-after-patch.png
output/playwright/product-design-patch-qa/screenshots/02-desktop-filled-after-patch.png
output/playwright/product-design-patch-qa/screenshots/03-desktop-width-fix-after-patch.png
output/playwright/product-design-patch-qa/screenshots/04-mobile-after-patch.png
```

Captured structure check:

```text
hasHeader: true
hasNav: true
labels:
  - CarrierFedExUPSUSPSDHLCustom
  - Length (in)
  - Width (in)
  - Height (in)
  - Actual weight (lb)
  - DIM divisor
mobile horizontal overflow: false
mobileSummary: true
sourceConfidence: true
pageSourceNote: true
console warnings/errors: 0
```

## Verification

```text
npm run test
3 files passed, 30 tests passed

npm run build
20 files checked, 0 errors, 0 warnings, 0 hints
5 pages built
```

## 2026-06-10 Rerun Note

Fresh rerun in the final handoff pass:

```text
npm run test
3 files passed, 30 tests passed

npm run build
20 files checked, 0 errors, 0 warnings, 0 hints
5 pages built
```

Playwright CLI rerun was blocked by the local Chrome daemon closing during launch in the desktop sandbox. The screenshot and structure evidence above comes from the earlier successful patch QA pass in the same implementation cycle.

## Remaining Risks

- Keyboard order and screen reader behavior still need a dedicated accessibility pass before deployment.
- The standalone page source note is page-specific; the dynamic result panel now carries selected-carrier confidence, but a future enhancement could make the source note update with carrier selection too.
- Carrier source freshness still depends on manual source review before launch.

## Verdict

The Product Design audit findings have been materially addressed for this MVP stage. The page now reads more like a restrained product tool shell while preserving the calculator task, SEO content, and formula logic.
