import React, { useMemo, useState } from "react";

import type { CarrierId } from "../content/formulaSources";
import {
  carrierFormulas,
  getFormulaByCarrier
} from "../content/formulaSources";
import { calculateDimensionalWeight } from "../lib/dimensionalWeight";
import { parsePositiveNumber } from "../lib/validation";

interface DimensionalWeightCalculatorProps {
  defaultCarrier?: CarrierId;
}

interface CalculatorFormState {
  length: string;
  width: string;
  height: string;
  actualWeight: string;
  customDivisor: string;
  carrier: CarrierId;
}

const defaultFormState: CalculatorFormState = {
  length: "20",
  width: "12",
  height: "10",
  actualWeight: "12",
  customDivisor: "139",
  carrier: "fedex"
};

function getEffectiveDivisor(
  formula: ReturnType<typeof getFormulaByCarrier>
): { divisor: number; isPending: boolean; daysUntil: number } {
  if (formula.effectiveDate && formula.newDivisor) {
    const now = new Date();
    const effective = new Date(formula.effectiveDate + "T00:00:00");
    if (now >= effective) {
      return { divisor: formula.newDivisor, isPending: false, daysUntil: 0 };
    }
    const daysUntil = Math.ceil(
      (effective.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return { divisor: formula.divisor, isPending: true, daysUntil };
  }
  return { divisor: formula.divisor, isPending: false, daysUntil: 0 };
}

function Plural({ n, word }: { n: number; word: string }) {
  return <>{n} {word}{n !== 1 ? "s" : ""}</>;
}

export function DimensionalWeightCalculator({
  defaultCarrier
}: DimensionalWeightCalculatorProps) {
  const [formState, setFormState] = useState<CalculatorFormState>({
    ...defaultFormState,
    carrier: defaultCarrier ?? defaultFormState.carrier
  });

  const selectedFormula = getFormulaByCarrier(formState.carrier);
  const isCustomCarrier = formState.carrier === "custom";
  const dimensionUnit = selectedFormula.unitSystem === "metric" ? "cm" : "in";
  const weightUnit = selectedFormula.unitSystem === "metric" ? "kg" : "lb";

  const { divisor: effectiveDivisor, isPending, daysUntil } =
    getEffectiveDivisor(selectedFormula);

  const result = useMemo(() => {
    try {
      const formula = getFormulaByCarrier(formState.carrier);
      const divisor = isCustomCarrier
        ? parsePositiveNumber(formState.customDivisor, "DIM divisor")
        : effectiveDivisor;

      return {
        status: "valid" as const,
        formula,
        value: calculateDimensionalWeight({
          length: parsePositiveNumber(formState.length, "length"),
          width: parsePositiveNumber(formState.width, "width"),
          height: parsePositiveNumber(formState.height, "height"),
          actualWeight: parsePositiveNumber(
            formState.actualWeight,
            "actual weight"
          ),
          divisor,
          unitSystem: formula.unitSystem
        })
      };
    } catch {
      return {
        status: "invalid" as const,
        formula: getFormulaByCarrier(formState.carrier),
        value: null
      };
    }
  }, [formState, isCustomCarrier, effectiveDivisor]);

  const weightComparison =
    result.status === "valid" && result.value
      ? {
          dimensionalPercent: `${Math.max(5, Math.round((result.value.dimensionalWeight / result.value.billableWeight) * 100))}%`,
          actualPercent: `${Math.max(5, Math.round((result.value.actualWeight / result.value.billableWeight) * 100))}%`
        }
      : null;

  const billableBasis =
    result.status === "valid" && result.value
      ? result.value.dimensionalWeight >= result.value.actualWeight
        ? "Dimensional weight exceeds actual — volumetric pricing applies"
        : "Actual weight exceeds dimensional — scale weight pricing applies"
      : "";

  function updateField(field: keyof CalculatorFormState, value: string): void {
    setFormState((currentState) => ({ ...currentState, [field]: value }));
  }

  return (
    <section id="calculator" className="card">
      {/* Toolbar — carrier selector */}
      <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-[#e2e8f0] bg-[#f8fafc]/70">
        <span className="section-label mr-2">Carrier</span>
        {carrierFormulas.map((f) => (
          <button
            key={f.carrier}
            type="button"
            onClick={() => updateField("carrier", f.carrier)}
            className={`badge ${formState.carrier === f.carrier ? "badge-active" : "badge-neutral"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* USPS countdown */}
      {isPending && (
        <div className="mx-5 mt-4 px-4 py-2.5 bg-[#eff6ff] border border-[#bfdbfe] rounded-[6px] text-[13px] text-[#1e40af]">
          USPS DIM divisor changes from {selectedFormula.divisor} to <strong>{selectedFormula.newDivisor}</strong> in <Plural n={daysUntil} word="day" />. This calculator will switch automatically.
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_380px]">
        {/* Input form */}
        <form className="grid gap-5 p-5" onSubmit={(e) => e.preventDefault()}>
          {/* Carrier select */}
          <label className="grid gap-1.5">
            <span className="section-label">Carrier preset</span>
            <select
              className="select-field"
              value={formState.carrier}
              onChange={(e) => updateField("carrier", e.target.value as CarrierId)}
            >
              {carrierFormulas.map((f) => (
                <option key={f.carrier} value={f.carrier}>
                  {f.label} — {f.formulaLabel}
                </option>
              ))}
            </select>
          </label>

          {/* Dimensions */}
          <fieldset className="grid gap-3">
            <legend className="section-label">Dimensions ({dimensionUnit})</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["length", "width", "height"] as const).map((field) => (
                <label key={field} className="grid gap-1.5">
                  <span className="section-label">{field}</span>
                  <input
                    className="input-field font-mono"
                    inputMode="decimal"
                    min="0.01"
                    step="any"
                    type="number"
                    value={formState[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Weight & Divisor */}
          <fieldset className="grid gap-3">
            <legend className="section-label">Weight &amp; divisor</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="section-label">Actual weight ({weightUnit})</span>
                <input
                  className="input-field font-mono"
                  inputMode="decimal"
                  min="0.01"
                  step="any"
                  type="number"
                  value={formState.actualWeight}
                  onChange={(e) => updateField("actualWeight", e.target.value)}
                />
              </label>
              <label className="grid gap-1.5">
                <span className="section-label">
                  DIM divisor{!isCustomCarrier ? ` (${effectiveDivisor})` : ""}
                </span>
                <input
                  className="input-field font-mono"
                  disabled={!isCustomCarrier}
                  inputMode="decimal"
                  min="0.01"
                  step="any"
                  type="number"
                  value={isCustomCarrier ? formState.customDivisor : String(effectiveDivisor)}
                  onChange={(e) => updateField("customDivisor", e.target.value)}
                />
              </label>
            </div>
          </fieldset>
        </form>

        {/* Result panel */}
        <aside
          className="lg:border-l border-[#e2e8f0] bg-[#f8fafc]/50 p-6 flex flex-col"
          aria-label="Calculation result"
          aria-live="polite"
          role="status"
        >
          {result.status === "valid" && result.value ? (
            <div className="grid gap-5">
              {/* Billable weight — big number */}
              <div>
                <p className="section-label mb-2">Billable weight</p>
                <p className="font-mono text-[64px] font-semibold leading-none tracking-tight text-[#0f172a]">
                  {result.value.billableWeight}
                  <span className="text-2xl text-[#64748b] ml-2 font-medium">
                    {result.value.unitLabel}
                  </span>
                </p>
                <p className="text-[13px] text-[#64748b] mt-2 leading-relaxed">
                  {billableBasis}
                </p>
              </div>

              {/* Weight bars */}
              {weightComparison && (
                <div className="grid gap-3 bg-white border border-[#e2e8f0] rounded-[6px] p-4">
                  <div className="flex items-center justify-between">
                    <span className="section-label">Weight comparison</span>
                    <span className="font-mono text-[11px] text-[#64748b]">
                      {formState.length || "0"}&times;{formState.width || "0"}&times;{formState.height || "0"} {dimensionUnit}
                    </span>
                  </div>

                  <div className="grid gap-1">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#64748b]">Dimensional</span>
                      <span className="font-mono font-semibold text-[#2563eb]">
                        {result.value.dimensionalWeight} {result.value.unitLabel}
                      </span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill-primary" style={{ width: weightComparison.dimensionalPercent }} />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#64748b]">Actual</span>
                      <span className="font-mono font-semibold text-[#64748b]">
                        {result.value.actualWeight} {result.value.unitLabel}
                      </span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill-secondary" style={{ width: weightComparison.actualPercent }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Detail rows */}
              <dl className="grid gap-0 border-t border-[#e2e8f0]">
                {[
                  { label: "Dimensional weight", value: result.value.dimensionalWeight },
                  { label: "Actual weight", value: result.value.actualWeight },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-[#e2e8f0] text-[13px]">
                    <dt className="text-[#64748b]">{row.label}</dt>
                    <dd className="font-mono font-semibold">{row.value} {result.value!.unitLabel}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2.5 border-b border-[#e2e8f0] text-[13px]">
                  <dt className="text-[#64748b]">Formula</dt>
                  <dd className="font-mono text-[#64748b]">{result.formula.formulaLabel}</dd>
                </div>
                <div className="flex items-center justify-between py-2.5 text-[13px]">
                  <dt className="text-[#64748b]">Source confidence</dt>
                  <dd>
                    <span className={`badge ${result.formula.confidence === "high" ? "badge-active" : result.formula.confidence === "medium" ? "badge-neutral" : "badge-neutral"}`}>
                      {result.formula.confidence}
                    </span>
                  </dd>
                </div>
              </dl>

              {result.formula.sourceUrl && (
                <a href={result.formula.sourceUrl} target="_blank" rel="noreferrer" className="source-link inline-block w-fit">
                  View carrier source &rarr;
                </a>
              )}
            </div>
          ) : (
            <div className="flex-1 grid place-items-center text-center">
              <div>
                <p className="text-[64px] font-light text-[#e2e8f0] font-mono mb-3">&mdash;</p>
                <p className="text-[13px] text-[#64748b]">Enter dimensions and weight above</p>
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-[#e2e8f0]">
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              Estimate for planning only. Carrier rules, rounding, and surcharges may differ. Confirm final charges with your carrier.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default DimensionalWeightCalculator;
