# Design

## Product Context

ToolSite OS is a product workflow system for building useful SEO tool sites. The first implemented site is a free multi-carrier dimensional weight calculator.

The visual register is product UI, not a marketing landing page. The page should help a shipping user complete a calculation quickly and trust the result boundaries.

## Mood

Shipping desk at 4:30 p.m.: a seller is checking package dimensions before buying labels, under bright office light, with no patience for decoration.

## Color Strategy

Restrained product palette. Pure white and cool neutral surfaces carry the interface; amber is used sparingly for emphasis and result confidence; teal supports source, carrier, and system cues.

Use OKLCH tokens:

```css
:root {
  --color-bg: oklch(1 0 0);
  --color-surface: oklch(0.975 0.006 255);
  --color-surface-strong: oklch(0.94 0.012 255);
  --color-ink: oklch(0.22 0.035 255);
  --color-muted: oklch(0.47 0.03 255);
  --color-border: oklch(0.86 0.018 255);
  --color-primary: oklch(0.70 0.145 73);
  --color-primary-dark: oklch(0.42 0.105 73);
  --color-accent: oklch(0.50 0.115 205);
  --color-accent-soft: oklch(0.94 0.035 205);
  --color-success: oklch(0.50 0.12 155);
  --color-warning: oklch(0.72 0.14 75);
  --color-error: oklch(0.55 0.18 25);
}
```

Rules:

- Body background stays white or near-white, never warm beige.
- Primary amber should not dominate the page. Use it for result emphasis, focus, and one or two high-value accents.
- Avoid purple-blue gradient defaults.
- Text on saturated fills should be white.

## Typography

Use one product UI family:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Rules:

- No fluid viewport-scaled type.
- H1 should be strong but not oversized.
- Labels and helper text must stay legible.
- Body copy should stay within 65 to 75 characters where it explains formulas or policy.

Suggested scale:

- H1: 40px desktop, 32px mobile.
- H2: 24px.
- H3: 18px.
- Body: 16px.
- Small UI text: 14px.

## Layout

Primary page structure:

```text
compact top bar
→ trust-led hero with calculator visible
→ calculator and result panel
→ formula/source note
→ educational sections
→ disclaimer and update notes
```

Desktop:

- Use a two-column calculator layout.
- Left side: inputs.
- Right side: result, selected carrier, divisor, formula, confidence note.
- Keep result visually heavier than the form but not decorative.

Mobile:

- Calculator inputs stack first.
- Result follows immediately.
- Unit labels must remain visible.
- Avoid cramped three-column input rows on narrow screens.

## Components

### Top Bar

Simple product identity and page navigation. No marketing CTA needed in MVP.

### Calculator Form

Expected states:

- Default.
- Hover.
- Focus.
- Disabled divisor field when carrier is not custom.
- Invalid input.
- Custom divisor enabled.

Labels must include units or adjacent unit context.

### Result Panel

Should answer three questions:

1. What is the billable weight?
2. How does it compare with actual and dimensional weight?
3. Which formula and divisor produced the estimate?

Use strong hierarchy, not decorative glow.

### Source Note

Formula confidence is product trust. It should be visible and structured:

```text
carrier
formula
source date
confidence
important caveat
```

### Content Sections

Use clear section spacing. Avoid repeated identical cards when a simple article layout or comparison table is clearer.

## Interaction

The calculator should update immediately as the user edits inputs.

No animation is required for MVP. If motion is added, limit it to subtle focus or result-change feedback and respect reduced motion.

## Accessibility

- Every input has a visible label.
- Focus states must be clear.
- Muted text must remain readable.
- Result values must not rely on color alone.
- Mobile layout must prevent input/result overlap.

## Anti AI Design Checks

Before deployment, reject:

- Gradient hero text.
- Purple-blue decorative gradients.
- Emoji icons.
- Generic repeated icon cards.
- Fake metrics.
- Filler copy.
- Unsupported carrier or revenue claims.
- Text hidden behind decorative surfaces.

## Current MVP Polish Targets

1. Add product-level visual hierarchy so the page no longer feels like a raw engineering demo.
2. Make units explicit in labels and result context.
3. Improve result panel trust and scanability.
4. Add source confidence and disclaimer visibility without overwhelming the calculator.
5. Improve mobile spacing and form density.
