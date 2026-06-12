import React, { useMemo, useState } from "react";

import type { CarrierId } from "../content/formulaSources";
import {
  carrierFormulas,
  getFormulaByCarrier
} from "../content/formulaSources";
import { calculateDimensionalWeight } from "../lib/dimensionalWeight";
import { parsePositiveNumber } from "../lib/validation";
import VisualResults from "./VisualResults";
import LossCalculator from "./LossCalculator";

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

function getEffectiveDivisor(formula: ReturnType<typeof getFormulaByCarrier>) {
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

// Calculate results for all carriers at once
function calculateAllCarriers(state: CalculatorFormState) {
  const realCarriers = carrierFormulas.filter((f) => f.carrier !== "custom");
  return realCarriers.map((formula) => {
    try {
      const { divisor } = getEffectiveDivisor(formula);
      const result = calculateDimensionalWeight({
        length: parsePositiveNumber(state.length, "length"),
        width: parsePositiveNumber(state.width, "width"),
        height: parsePositiveNumber(state.height, "height"),
        actualWeight: parsePositiveNumber(state.actualWeight, "actual weight"),
        divisor,
        unitSystem: formula.unitSystem
      });
      return {
        carrier: formula.carrier,
        label: formula.label,
        dimWeight: result.dimensionalWeight,
        billableWeight: result.billableWeight,
        actualWeight: result.actualWeight,
        unitLabel: result.unitLabel,
        divisor,
      };
    } catch {
      return null;
    }
  }).filter(Boolean) as {
    carrier: string;
    label: string;
    dimWeight: number;
    billableWeight: number;
    actualWeight: number;
    unitLabel: string;
    divisor: number;
  }[];
}

export function AllCarriersCalculator() {
  const [formState, setFormState] = useState<CalculatorFormState>(defaultFormState);

  const selectedFormula = getFormulaByCarrier(formState.carrier);
  const isCustomCarrier = formState.carrier === "custom";
  const dimensionUnit = selectedFormula.unitSystem === "metric" ? "cm" : "in";
  const weightUnit = selectedFormula.unitSystem === "metric" ? "kg" : "lb";

  const { divisor: effectiveDivisor, isPending, daysUntil } =
    getEffectiveDivisor(selectedFormula);

  const allResults = useMemo(() => calculateAllCarriers(formState), [
    formState.length, formState.width, formState.height, formState.actualWeight
  ]);

  const singleResult = useMemo(() => {
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
          actualWeight: parsePositiveNumber(formState.actualWeight, "actual weight"),
          divisor,
          unitSystem: formula.unitSystem
        })
      };
    } catch {
      return { status: "invalid" as const, formula: getFormulaByCarrier(formState.carrier), value: null };
    }
  }, [formState, isCustomCarrier, effectiveDivisor]);

  const worstResult = allResults.reduce((w, r) => r.billableWeight > w.billableWeight ? r : w, allResults[0]);
  const bestResult = allResults.reduce((b, r) => r.billableWeight < b.billableWeight ? r : b, allResults[0]);
  const overchargePerPackage = worstResult && bestResult
    ? worstResult.billableWeight - bestResult.billableWeight
    : 0;
  const actualW = parseFloat(formState.actualWeight) || 0;
  const selectedOvercharge = singleResult.status === "valid" && singleResult.value
    ? singleResult.value.billableWeight - actualW
    : 0;

  const weightComparison =
    singleResult.status === "valid" && singleResult.value
      ? {
          dimensionalPercent: `${Math.max(5, Math.round((singleResult.value.dimensionalWeight / singleResult.value.billableWeight) * 100))}%`,
          actualPercent: `${Math.max(5, Math.round((singleResult.value.actualWeight / singleResult.value.billableWeight) * 100))}%`
        }
      : null;

  const billableBasis =
    singleResult.status === "valid" && singleResult.value
      ? singleResult.value.dimensionalWeight >= singleResult.value.actualWeight
        ? "Dimensional weight exceeds actual — volumetric pricing applies"
        : "Actual weight exceeds dimensional — scale weight pricing applies"
      : "";

  function updateField(field: keyof CalculatorFormState, value: string): void {
    setFormState((s) => ({ ...s, [field]: value }));
  }

  return (
    <div>
      {/* Calculator */}
      <section id="calculator" className="card">
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

        {isPending && (
          <div className="mx-5 mt-4 px-4 py-2.5 bg-[#eff6ff] border border-[#bfdbfe] rounded-[6px] text-[13px] text-[#1e40af]">
            USPS DIM divisor changes from {selectedFormula.divisor} to <strong>{selectedFormula.newDivisor}</strong> in {daysUntil} day{daysUntil !== 1 ? "s" : ""}. This calculator will switch automatically.
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_380px]">
          <form className="grid gap-5 p-5" onSubmit={(e) => e.preventDefault()}>
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
          >
            {singleResult.status === "valid" && singleResult.value ? (
              <div className="grid gap-5">
                <div>
                  <p className="section-label mb-2">Billable weight</p>
                  <p className="font-mono text-[64px] font-semibold leading-none tracking-tight text-[#0f172a]">
                    {singleResult.value.billableWeight}
                    <span className="text-2xl text-[#64748b] ml-2 font-medium">
                      {singleResult.value.unitLabel}
                    </span>
                  </p>
                  <p className="text-[13px] text-[#64748b] mt-2 leading-relaxed">
                    {billableBasis}
                  </p>
                </div>

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
                          {singleResult.value.dimensionalWeight} {singleResult.value.unitLabel}
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
                          {singleResult.value.actualWeight} {singleResult.value.unitLabel}
                        </span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill-secondary" style={{ width: weightComparison.actualPercent }} />
                      </div>
                    </div>
                  </div>
                )}

                <dl className="grid gap-0 border-t border-[#e2e8f0]">
                  {[
                    { label: "Dimensional weight", value: singleResult.value.dimensionalWeight },
                    { label: "Actual weight", value: singleResult.value.actualWeight },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-[#e2e8f0] text-[13px]">
                      <dt className="text-[#64748b]">{row.label}</dt>
                      <dd className="font-mono font-semibold">{row.value} {singleResult.value!.unitLabel}</dd>
                    </div>
                  ))}
                </dl>

                {singleResult.formula.sourceUrl && (
                  <a href={singleResult.formula.sourceUrl} target="_blank" rel="noreferrer" className="source-link inline-block w-fit">
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
                Estimate for planning only. Carrier rules, rounding, and surcharges may differ.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Visual Results */}
      <div style={{ paddingTop: "2rem" }}>
        <VisualResults
          results={allResults}
          dimensions={{ length: formState.length, width: formState.width, height: formState.height }}
          actualWeight={formState.actualWeight}
          unitLabel={allResults[0]?.unitLabel || "lb"}
        />
      </div>

      {/* Loss Calculator */}
      <div style={{ paddingTop: "2rem" }}>
        <LossCalculator
          overchargePerPackage={selectedOvercharge > 0 ? selectedOvercharge : overchargePerPackage}
          unitLabel={allResults[0]?.unitLabel || "lb"}
        />
      </div>
    </div>
  );
}

export default AllCarriersCalculator;
