# Dimensional Weight Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first Astro-based MVP tool page: a free multi-carrier dimensional weight calculator with SEO content, carrier presets, source notes, and tested calculation logic.

**Architecture:** The site lives as a standalone Astro app under `02-site-builds/dim-weight-calculator/`. Calculation logic and carrier formula data stay in TypeScript modules under `src/lib` and `src/content`; Astro pages provide SEO-friendly static content; a React island provides the interactive calculator.

**Tech Stack:** Astro, React, TypeScript, Tailwind CSS, Vitest, Testing Library.

---

## File Structure

Create the app under:

```text
/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/
```

Files to create:

```text
02-site-builds/dim-weight-calculator/
  astro.config.mjs
  package.json
  tsconfig.json
  vitest.config.ts
  src/
    components/
      DimensionalWeightCalculator.tsx
      FormulaSourceNote.astro
      ToolLayout.astro
    content/
      carrierPages.ts
      formulaSources.ts
    lib/
      dimensionalWeight.ts
      units.ts
      validation.ts
    pages/
      dimensional-weight-calculator.astro
      fedex-dimensional-weight-calculator.astro
      ups-dimensional-weight-calculator.astro
      usps-dimensional-weight-calculator.astro
      dhl-volumetric-weight-calculator.astro
    styles/
      global.css
    tests/
      dimensionalWeight.test.ts
      units.test.ts
      validation.test.ts
```

---

### Task 1: Create Astro App Skeleton

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/package.json`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/astro.config.mjs`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/tsconfig.json`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/vitest.config.ts`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/styles/global.css`

- [ ] **Step 1: Create the app directories**

Run:

```bash
mkdir -p /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/{components,content,lib,pages,styles,tests}
```

Expected: directories exist with no command output.

- [ ] **Step 2: Create `package.json`**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/package.json`:

```json
{
  "name": "dim-weight-calculator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/react": "latest",
    "@tailwindcss/vite": "latest",
    "astro": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "latest"
  },
  "devDependencies": {
    "@astrojs/check": "latest",
    "@testing-library/react": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "jsdom": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 3: Create Astro and test config**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@content/*": ["src/content/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/tests/**/*.test.ts", "src/tests/**/*.test.tsx"]
  }
});
```

- [ ] **Step 4: Create global CSS**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/styles/global.css`:

```css
@import "tailwindcss";

:root {
  color-scheme: light;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  background: #f7f8fb;
  color: #18202f;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
input,
select {
  font: inherit;
}
```

- [ ] **Step 5: Install dependencies**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm install
```

Expected: `node_modules/` and `package-lock.json` are created, with no install errors.

- [ ] **Step 6: Commit scaffold**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator
git commit -m "feat: scaffold dimensional weight calculator app"
```

Expected: Git creates a commit.

---

### Task 2: Add Formula Source Data

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/content/formulaSources.ts`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/content/carrierPages.ts`

- [ ] **Step 1: Create carrier formula source data**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/content/formulaSources.ts`:

```ts
export type UnitSystem = "imperial" | "metric";
export type CarrierId = "fedex" | "ups" | "usps" | "dhl" | "custom";
export type FormulaConfidence = "high" | "medium" | "low";

export interface CarrierFormula {
  carrier: CarrierId;
  label: string;
  serviceScope: string;
  unitSystem: UnitSystem;
  divisor: number;
  formulaLabel: string;
  roundingNote: string;
  sourceUrl?: string;
  sourceDate?: string;
  confidence: FormulaConfidence;
  notes: string;
}

export const carrierFormulas: CarrierFormula[] = [
  {
    carrier: "fedex",
    label: "FedEx",
    serviceScope: "Common U.S. and international package dimensional weight",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "FedEx may round dimensions and weight according to service rules.",
    sourceUrl:
      "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf",
    sourceDate: "2026 FedEx Service Guide",
    confidence: "high",
    notes:
      "FedEx Service Guide supports 139 for common package dimensional weight. Some freight services may use different divisors."
  },
  {
    carrier: "ups",
    label: "UPS",
    serviceScope: "Package daily rates dimensional weight",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "UPS may round measurements and fractional pounds according to rate rules.",
    sourceUrl: "https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf",
    sourceDate: "UPS Rate and Service Guide checked 2026-06-10",
    confidence: "medium",
    notes:
      "UPS source should be checked again before launch for the latest year-specific rate guide."
  },
  {
    carrier: "usps",
    label: "USPS",
    serviceScope: "Priority Mail retail parcels over one cubic foot",
    unitSystem: "imperial",
    divisor: 166,
    formulaLabel: "Length x Width x Height / 166",
    roundingNote: "USPS DMM indicates rounding dimensions and rounding weight up.",
    sourceUrl: "https://pe.usps.com/text/dmm300/123.htm",
    sourceDate: "USPS DMM checked 2026-06-10",
    confidence: "medium",
    notes:
      "USPS DMM currently shows 166, while 2026 third-party signals mention possible divisor changes. Verify before launch."
  },
  {
    carrier: "dhl",
    label: "DHL",
    serviceScope: "Common international metric volumetric formula",
    unitSystem: "metric",
    divisor: 5000,
    formulaLabel: "Length x Width x Height / 5000",
    roundingNote: "DHL divisor can vary by service and region.",
    confidence: "low",
    notes:
      "Use as a common international estimate only until a stable DHL official source is added."
  },
  {
    carrier: "custom",
    label: "Custom",
    serviceScope: "User-provided DIM divisor",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / custom divisor",
    roundingNote: "Use the rounding rules from your carrier or contract.",
    confidence: "low",
    notes:
      "Custom divisor is useful for contract rates, regional carriers, freight services, and source conflicts."
  }
];

export function getFormulaByCarrier(carrier: CarrierId): CarrierFormula {
  const formula = carrierFormulas.find((item) => item.carrier === carrier);
  if (!formula) {
    throw new Error(`Unknown carrier: ${carrier}`);
  }
  return formula;
}
```

- [ ] **Step 2: Create carrier page data**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/content/carrierPages.ts`:

```ts
import type { CarrierId } from "./formulaSources";

export interface CarrierPage {
  carrier: CarrierId;
  path: string;
  title: string;
  description: string;
  h1: string;
}

export const carrierPages: CarrierPage[] = [
  {
    carrier: "fedex",
    path: "/fedex-dimensional-weight-calculator/",
    title: "FedEx Dimensional Weight Calculator",
    description:
      "Estimate FedEx dimensional weight and billable weight using package dimensions, actual weight, and DIM factor notes.",
    h1: "FedEx Dimensional Weight Calculator"
  },
  {
    carrier: "ups",
    path: "/ups-dimensional-weight-calculator/",
    title: "UPS Dimensional Weight Calculator",
    description:
      "Estimate UPS dimensional weight and billable weight with inches, pounds, and custom DIM factor support.",
    h1: "UPS Dimensional Weight Calculator"
  },
  {
    carrier: "usps",
    path: "/usps-dimensional-weight-calculator/",
    title: "USPS Dimensional Weight Calculator",
    description:
      "Estimate USPS dimensional weight and billable weight, with source notes for current USPS divisor rules.",
    h1: "USPS Dimensional Weight Calculator"
  },
  {
    carrier: "dhl",
    path: "/dhl-volumetric-weight-calculator/",
    title: "DHL Volumetric Weight Calculator",
    description:
      "Estimate DHL volumetric weight with metric dimensions, actual weight, and custom divisor support.",
    h1: "DHL Volumetric Weight Calculator"
  }
];
```

- [ ] **Step 3: Run type check**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run build
```

Expected: build fails only if no Astro page exists yet. TypeScript syntax in content files must not produce type errors.

- [ ] **Step 4: Commit formula data**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/content
git commit -m "feat: add carrier formula source data"
```

Expected: Git creates a commit.

---

### Task 3: Implement Calculation Logic With Tests

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/lib/dimensionalWeight.ts`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/tests/dimensionalWeight.test.ts`

- [ ] **Step 1: Write failing tests**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/tests/dimensionalWeight.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { calculateDimensionalWeight } from "../lib/dimensionalWeight";

describe("calculateDimensionalWeight", () => {
  it("calculates dimensional weight and billable weight for imperial inputs", () => {
    const result = calculateDimensionalWeight({
      length: 20,
      width: 12,
      height: 10,
      actualWeight: 12,
      divisor: 139,
      unitSystem: "imperial"
    });

    expect(result.cubicSize).toBe(2400);
    expect(result.dimensionalWeight).toBe(17.27);
    expect(result.actualWeight).toBe(12);
    expect(result.billableWeight).toBe(17.27);
    expect(result.unitLabel).toBe("lb");
  });

  it("uses actual weight when actual weight is greater", () => {
    const result = calculateDimensionalWeight({
      length: 10,
      width: 10,
      height: 10,
      actualWeight: 20,
      divisor: 139,
      unitSystem: "imperial"
    });

    expect(result.dimensionalWeight).toBe(7.19);
    expect(result.billableWeight).toBe(20);
  });

  it("returns kg labels for metric inputs", () => {
    const result = calculateDimensionalWeight({
      length: 50,
      width: 40,
      height: 30,
      actualWeight: 8,
      divisor: 5000,
      unitSystem: "metric"
    });

    expect(result.dimensionalWeight).toBe(12);
    expect(result.billableWeight).toBe(12);
    expect(result.unitLabel).toBe("kg");
  });

  it("throws for zero or negative values", () => {
    expect(() =>
      calculateDimensionalWeight({
        length: 0,
        width: 12,
        height: 10,
        actualWeight: 12,
        divisor: 139,
        unitSystem: "imperial"
      })
    ).toThrow("length must be greater than 0");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run test -- src/tests/dimensionalWeight.test.ts
```

Expected: FAIL because `../lib/dimensionalWeight` does not exist.

- [ ] **Step 3: Implement calculation logic**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/lib/dimensionalWeight.ts`:

```ts
import type { UnitSystem } from "../content/formulaSources";

export interface DimensionalWeightInput {
  length: number;
  width: number;
  height: number;
  actualWeight: number;
  divisor: number;
  unitSystem: UnitSystem;
}

export interface DimensionalWeightResult {
  dimensionalWeight: number;
  actualWeight: number;
  billableWeight: number;
  cubicSize: number;
  divisor: number;
  unitLabel: "lb" | "kg";
}

const numericFields: Array<keyof Omit<DimensionalWeightInput, "unitSystem">> = [
  "length",
  "width",
  "height",
  "actualWeight",
  "divisor"
];

function assertPositiveNumber(field: string, value: number): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${field} must be greater than 0`);
  }
}

function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateDimensionalWeight(
  input: DimensionalWeightInput
): DimensionalWeightResult {
  for (const field of numericFields) {
    assertPositiveNumber(field, input[field]);
  }

  const cubicSize = input.length * input.width * input.height;
  const dimensionalWeight = roundToTwo(cubicSize / input.divisor);
  const actualWeight = roundToTwo(input.actualWeight);
  const billableWeight = Math.max(dimensionalWeight, actualWeight);

  return {
    dimensionalWeight,
    actualWeight,
    billableWeight,
    cubicSize: roundToTwo(cubicSize),
    divisor: input.divisor,
    unitLabel: input.unitSystem === "metric" ? "kg" : "lb"
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run test -- src/tests/dimensionalWeight.test.ts
```

Expected: PASS for all tests in `dimensionalWeight.test.ts`.

- [ ] **Step 5: Commit calculation logic**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/lib/dimensionalWeight.ts 02-site-builds/dim-weight-calculator/src/tests/dimensionalWeight.test.ts
git commit -m "feat: add dimensional weight calculation logic"
```

Expected: Git creates a commit.

---

### Task 4: Implement Unit Conversion and Validation

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/lib/units.ts`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/lib/validation.ts`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/tests/units.test.ts`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/tests/validation.test.ts`

- [ ] **Step 1: Write unit tests**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/tests/units.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cmToInches, inchesToCm, kgToLb, lbToKg } from "../lib/units";

describe("unit conversions", () => {
  it("converts inches to centimeters", () => {
    expect(inchesToCm(10)).toBe(25.4);
  });

  it("converts centimeters to inches", () => {
    expect(cmToInches(25.4)).toBe(10);
  });

  it("converts pounds to kilograms", () => {
    expect(lbToKg(10)).toBe(4.54);
  });

  it("converts kilograms to pounds", () => {
    expect(kgToLb(4.54)).toBe(10.01);
  });
});
```

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/tests/validation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { parsePositiveNumber } from "../lib/validation";

describe("parsePositiveNumber", () => {
  it("parses positive numeric strings", () => {
    expect(parsePositiveNumber("12.5", "length")).toBe(12.5);
  });

  it("returns an error for empty values", () => {
    expect(() => parsePositiveNumber("", "length")).toThrow("length is required");
  });

  it("returns an error for non-positive values", () => {
    expect(() => parsePositiveNumber("-1", "length")).toThrow(
      "length must be greater than 0"
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run test -- src/tests/units.test.ts src/tests/validation.test.ts
```

Expected: FAIL because `units.ts` and `validation.ts` do not exist.

- [ ] **Step 3: Implement units and validation**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/lib/units.ts`:

```ts
function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function inchesToCm(value: number): number {
  return roundToTwo(value * 2.54);
}

export function cmToInches(value: number): number {
  return roundToTwo(value / 2.54);
}

export function lbToKg(value: number): number {
  return roundToTwo(value * 0.45359237);
}

export function kgToLb(value: number): number {
  return roundToTwo(value / 0.45359237);
}
```

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/lib/validation.ts`:

```ts
export function parsePositiveNumber(rawValue: string, fieldName: string): number {
  const trimmedValue = rawValue.trim();
  if (trimmedValue.length === 0) {
    throw new Error(`${fieldName} is required`);
  }

  const value = Number(trimmedValue);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${fieldName} must be greater than 0`);
  }

  return value;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run test -- src/tests/units.test.ts src/tests/validation.test.ts
```

Expected: PASS for all unit and validation tests.

- [ ] **Step 5: Commit unit helpers**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/lib/units.ts 02-site-builds/dim-weight-calculator/src/lib/validation.ts 02-site-builds/dim-weight-calculator/src/tests/units.test.ts 02-site-builds/dim-weight-calculator/src/tests/validation.test.ts
git commit -m "feat: add unit conversion and validation helpers"
```

Expected: Git creates a commit.

---

### Task 5: Build Calculator React Island

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/components/DimensionalWeightCalculator.tsx`

- [ ] **Step 1: Create calculator component**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/components/DimensionalWeightCalculator.tsx`:

```tsx
import { useMemo, useState } from "react";
import type { CarrierId } from "../content/formulaSources";
import { carrierFormulas, getFormulaByCarrier } from "../content/formulaSources";
import { calculateDimensionalWeight } from "../lib/dimensionalWeight";
import { parsePositiveNumber } from "../lib/validation";

interface CalculatorProps {
  defaultCarrier?: CarrierId;
}

interface FormState {
  length: string;
  width: string;
  height: string;
  actualWeight: string;
  customDivisor: string;
  carrier: CarrierId;
}

const defaultState: FormState = {
  length: "20",
  width: "12",
  height: "10",
  actualWeight: "12",
  customDivisor: "139",
  carrier: "fedex"
};

export function DimensionalWeightCalculator({
  defaultCarrier = "fedex"
}: CalculatorProps) {
  const [formState, setFormState] = useState<FormState>({
    ...defaultState,
    carrier: defaultCarrier
  });

  const selectedFormula = getFormulaByCarrier(formState.carrier);
  const divisor =
    formState.carrier === "custom"
      ? Number(formState.customDivisor)
      : selectedFormula.divisor;

  const result = useMemo(() => {
    try {
      return calculateDimensionalWeight({
        length: parsePositiveNumber(formState.length, "length"),
        width: parsePositiveNumber(formState.width, "width"),
        height: parsePositiveNumber(formState.height, "height"),
        actualWeight: parsePositiveNumber(formState.actualWeight, "actual weight"),
        divisor,
        unitSystem: selectedFormula.unitSystem
      });
    } catch {
      return null;
    }
  }, [divisor, formState, selectedFormula.unitSystem]);

  function updateField(field: keyof FormState, value: string): void {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  return (
    <section className="grid gap-5 rounded border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.1fr_0.9fr]">
      <form className="grid gap-4" aria-label="Dimensional weight calculator">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="carrier">
            Carrier preset
          </label>
          <select
            id="carrier"
            value={formState.carrier}
            onChange={(event) => updateField("carrier", event.target.value as CarrierId)}
            className="rounded border border-slate-300 px-3 py-2"
          >
            {carrierFormulas.map((formula) => (
              <option key={formula.carrier} value={formula.carrier}>
                {formula.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {(["length", "width", "height"] as const).map((field) => (
            <div className="grid gap-2" key={field}>
              <label className="text-sm font-medium capitalize text-slate-700" htmlFor={field}>
                {field}
              </label>
              <input
                id={field}
                min="0"
                step="0.01"
                type="number"
                value={formState[field]}
                onChange={(event) => updateField(field, event.target.value)}
                className="rounded border border-slate-300 px-3 py-2"
              />
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="actualWeight">
              Actual weight
            </label>
            <input
              id="actualWeight"
              min="0"
              step="0.01"
              type="number"
              value={formState.actualWeight}
              onChange={(event) => updateField("actualWeight", event.target.value)}
              className="rounded border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="customDivisor">
              DIM divisor
            </label>
            <input
              id="customDivisor"
              min="1"
              step="1"
              type="number"
              value={formState.carrier === "custom" ? formState.customDivisor : String(divisor)}
              disabled={formState.carrier !== "custom"}
              onChange={(event) => updateField("customDivisor", event.target.value)}
              className="rounded border border-slate-300 px-3 py-2 disabled:bg-slate-100"
            />
          </div>
        </div>
      </form>

      <div className="grid content-start gap-3 rounded bg-slate-950 p-4 text-white">
        <p className="text-sm text-slate-300">Estimated billable weight</p>
        <p className="text-4xl font-semibold">
          {result ? `${result.billableWeight} ${result.unitLabel}` : "Check inputs"}
        </p>
        <dl className="grid gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-300">Dimensional weight</dt>
            <dd>{result ? `${result.dimensionalWeight} ${result.unitLabel}` : "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-300">Actual weight</dt>
            <dd>{result ? `${result.actualWeight} ${result.unitLabel}` : "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-300">Formula</dt>
            <dd>{selectedFormula.formulaLabel}</dd>
          </div>
        </dl>
        <p className="text-xs leading-5 text-slate-300">{selectedFormula.notes}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run type check**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run build
```

Expected: build fails only if pages are still missing. Component TypeScript errors must be fixed before continuing.

- [ ] **Step 3: Commit calculator component**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/components/DimensionalWeightCalculator.tsx
git commit -m "feat: add dimensional weight calculator island"
```

Expected: Git creates a commit.

---

### Task 6: Add Layout and Source Note Components

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/components/ToolLayout.astro`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/components/FormulaSourceNote.astro`

- [ ] **Step 1: Create layout**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/components/ToolLayout.astro`:

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <main class="mx-auto grid max-w-5xl gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 2: Create source note component**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/components/FormulaSourceNote.astro`:

```astro
---
import type { CarrierFormula } from "../content/formulaSources";

interface Props {
  formula: CarrierFormula;
}

const { formula } = Astro.props;
---

<aside class="rounded border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
  <p class="font-semibold">Formula source note</p>
  <p>{formula.roundingNote}</p>
  <p>
    Confidence: <strong>{formula.confidence}</strong>
    {formula.sourceDate ? ` · Source: ${formula.sourceDate}` : ""}
  </p>
  {
    formula.sourceUrl && (
      <a class="font-medium underline" href={formula.sourceUrl} rel="noreferrer" target="_blank">
        View source
      </a>
    )
  }
</aside>
```

- [ ] **Step 3: Commit layout components**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/components/ToolLayout.astro 02-site-builds/dim-weight-calculator/src/components/FormulaSourceNote.astro
git commit -m "feat: add tool layout and formula source note"
```

Expected: Git creates a commit.

---

### Task 7: Add Main Tool Page

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/dimensional-weight-calculator.astro`

- [ ] **Step 1: Create main page**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/dimensional-weight-calculator.astro`:

```astro
---
import { DimensionalWeightCalculator } from "../components/DimensionalWeightCalculator";
import FormulaSourceNote from "../components/FormulaSourceNote.astro";
import ToolLayout from "../components/ToolLayout.astro";
import { getFormulaByCarrier } from "../content/formulaSources";

const fedexFormula = getFormulaByCarrier("fedex");
---

<ToolLayout
  title="Dimensional Weight Calculator for UPS, FedEx, USPS & DHL"
  description="Calculate dimensional weight and billable weight for UPS, FedEx, USPS, DHL, and custom DIM factors. Supports inches/lbs and cm/kg."
>
  <section class="grid gap-4">
    <p class="text-sm font-medium uppercase tracking-wide text-slate-500">Shipping calculator</p>
    <h1 class="max-w-3xl text-4xl font-semibold tracking-normal text-slate-950">
      Free Multi-Carrier Dimensional Weight Calculator
    </h1>
    <p class="max-w-3xl text-lg leading-8 text-slate-700">
      Estimate dimensional weight, actual weight, and billable weight for common carrier formulas.
      This calculator supports carrier presets and custom DIM factors.
    </p>
  </section>

  <DimensionalWeightCalculator client:load defaultCarrier="fedex" />

  <FormulaSourceNote formula={fedexFormula} />

  <section class="grid gap-4 rounded border border-slate-200 bg-white p-5 leading-7 text-slate-700">
    <h2 class="text-2xl font-semibold text-slate-950">What is dimensional weight?</h2>
    <p>
      Dimensional weight is an estimated shipping weight based on package volume. Carriers often
      compare dimensional weight with actual scale weight and bill the greater value.
    </p>

    <h2 class="text-2xl font-semibold text-slate-950">Dimensional weight formula</h2>
    <p>
      The common formula is length x width x height divided by a carrier DIM divisor. The divisor
      can vary by carrier, service, region, and contract.
    </p>

    <h2 class="text-2xl font-semibold text-slate-950">Disclaimer</h2>
    <p>
      This calculator provides an estimate based on publicly available dimensional weight formulas.
      Carrier rules, rates, rounding methods, and contract terms may change. Always verify final
      billable weight and shipping cost with your carrier.
    </p>
  </section>
</ToolLayout>
```

- [ ] **Step 2: Run build**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run build
```

Expected: Astro builds at least the main page successfully.

- [ ] **Step 3: Commit main page**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/pages/dimensional-weight-calculator.astro
git commit -m "feat: add dimensional weight calculator page"
```

Expected: Git creates a commit.

---

### Task 8: Add Carrier Long-Tail Pages

**Files:**
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/fedex-dimensional-weight-calculator.astro`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/ups-dimensional-weight-calculator.astro`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/usps-dimensional-weight-calculator.astro`
- Create: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/dhl-volumetric-weight-calculator.astro`

- [ ] **Step 1: Create FedEx page**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/fedex-dimensional-weight-calculator.astro`:

```astro
---
import { DimensionalWeightCalculator } from "../components/DimensionalWeightCalculator";
import FormulaSourceNote from "../components/FormulaSourceNote.astro";
import ToolLayout from "../components/ToolLayout.astro";
import { getFormulaByCarrier } from "../content/formulaSources";

const formula = getFormulaByCarrier("fedex");
---

<ToolLayout title="FedEx Dimensional Weight Calculator" description="Estimate FedEx dimensional weight and billable weight using package dimensions, actual weight, and DIM factor notes.">
  <h1 class="text-4xl font-semibold text-slate-950">FedEx Dimensional Weight Calculator</h1>
  <DimensionalWeightCalculator client:load defaultCarrier="fedex" />
  <FormulaSourceNote formula={formula} />
</ToolLayout>
```

- [ ] **Step 2: Create UPS, USPS, and DHL pages**

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/ups-dimensional-weight-calculator.astro`:

```astro
---
import { DimensionalWeightCalculator } from "../components/DimensionalWeightCalculator";
import FormulaSourceNote from "../components/FormulaSourceNote.astro";
import ToolLayout from "../components/ToolLayout.astro";
import { getFormulaByCarrier } from "../content/formulaSources";

const formula = getFormulaByCarrier("ups");
---

<ToolLayout title="UPS Dimensional Weight Calculator" description="Estimate UPS dimensional weight and billable weight with inches, pounds, and custom DIM factor support.">
  <h1 class="text-4xl font-semibold text-slate-950">UPS Dimensional Weight Calculator</h1>
  <DimensionalWeightCalculator client:load defaultCarrier="ups" />
  <FormulaSourceNote formula={formula} />
</ToolLayout>
```

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/usps-dimensional-weight-calculator.astro`:

```astro
---
import { DimensionalWeightCalculator } from "../components/DimensionalWeightCalculator";
import FormulaSourceNote from "../components/FormulaSourceNote.astro";
import ToolLayout from "../components/ToolLayout.astro";
import { getFormulaByCarrier } from "../content/formulaSources";

const formula = getFormulaByCarrier("usps");
---

<ToolLayout title="USPS Dimensional Weight Calculator" description="Estimate USPS dimensional weight and billable weight, with source notes for current USPS divisor rules.">
  <h1 class="text-4xl font-semibold text-slate-950">USPS Dimensional Weight Calculator</h1>
  <DimensionalWeightCalculator client:load defaultCarrier="usps" />
  <FormulaSourceNote formula={formula} />
</ToolLayout>
```

Create `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/src/pages/dhl-volumetric-weight-calculator.astro`:

```astro
---
import { DimensionalWeightCalculator } from "../components/DimensionalWeightCalculator";
import FormulaSourceNote from "../components/FormulaSourceNote.astro";
import ToolLayout from "../components/ToolLayout.astro";
import { getFormulaByCarrier } from "../content/formulaSources";

const formula = getFormulaByCarrier("dhl");
---

<ToolLayout title="DHL Volumetric Weight Calculator" description="Estimate DHL volumetric weight with metric dimensions, actual weight, and custom divisor support.">
  <h1 class="text-4xl font-semibold text-slate-950">DHL Volumetric Weight Calculator</h1>
  <DimensionalWeightCalculator client:load defaultCarrier="dhl" />
  <FormulaSourceNote formula={formula} />
</ToolLayout>
```

- [ ] **Step 3: Run build**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run build
```

Expected: Astro builds all five pages successfully.

- [ ] **Step 4: Commit long-tail pages**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator/src/pages
git commit -m "feat: add carrier dimensional weight pages"
```

Expected: Git creates a commit.

---

### Task 9: Final Verification

**Files:**
- Modify: `/Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator/package.json` if scripts need correction after tool output.
- Modify: `/Users/yinbing/Documents/ToolSite-OS/08-knowledge/obsidian-sync/ToolSite OS 项目复盘日志.md` after verification.

- [ ] **Step 1: Run full tests**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run test
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run build
```

Expected: Astro check and build complete successfully.

- [ ] **Step 3: Start local dev server**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run dev -- --host 127.0.0.1
```

Expected: local Astro dev server starts and prints a localhost URL.

- [ ] **Step 4: Browser QA**

Open the local URL and verify:

```text
/dimensional-weight-calculator/
/fedex-dimensional-weight-calculator/
/ups-dimensional-weight-calculator/
/usps-dimensional-weight-calculator/
/dhl-volumetric-weight-calculator/
```

Check desktop width `1440`, tablet width `768`, and mobile width `390`.

Expected:

- Calculator renders.
- Carrier preset changes divisor.
- Invalid values show `Check inputs`.
- Result panel does not overlap input fields.
- Page title and meta description exist.

- [ ] **Step 5: Update review log**

Append a short node to `/Users/yinbing/Documents/ToolSite-OS/08-knowledge/obsidian-sync/ToolSite OS 项目复盘日志.md` with:

```text
2026-06-10：第一个工具站 MVP 实现复盘

- 完成 Astro 工具站主页面和承运商长尾页面。
- 完成公式、单位、输入校验测试。
- 记录依赖安装、构建、浏览器 QA 中遇到的问题。
- 记录下一步：部署、Search Console、收录跟踪。
```

- [ ] **Step 6: Commit final MVP implementation**

Run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git add 02-site-builds/dim-weight-calculator 08-knowledge/obsidian-sync/ToolSite\ OS\ 项目复盘日志.md
git commit -m "feat: implement dimensional weight calculator mvp"
```

Expected: Git creates a commit.

---

## Verification Checklist

Before calling the MVP implementation complete, run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS/02-site-builds/dim-weight-calculator
npm run test
npm run build
```

Then run:

```bash
cd /Users/yinbing/Documents/ToolSite-OS
git status --short --branch
```

Expected:

- Tests pass.
- Build passes.
- Git status shows a clean `main` branch or only intentional uncommitted changes that are explained.

## Execution Choice

Recommended execution mode:

```text
Subagent-Driven
```

Reason:

- The work naturally splits into formula logic, UI island, Astro pages, and verification.
- Each task is small enough to review after completion.
- Formula correctness deserves focused review before UI polish.
