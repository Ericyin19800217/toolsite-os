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
  return (
    <>
      {n} {word}
      {n !== 1 ? "s" : ""}
    </>
  );
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
          dimensionalPercent: `${Math.max(
            5,
            Math.round(
              (result.value.dimensionalWeight / result.value.billableWeight) *
                100
            )
          )}%`,
          actualPercent: `${Math.max(
            5,
            Math.round(
              (result.value.actualWeight / result.value.billableWeight) * 100
            )
          )}%`
        }
      : null;

  const billableBasis =
    result.status === "valid" && result.value
      ? result.value.dimensionalWeight >= result.value.actualWeight
        ? "Dimensional weight exceeds actual &mdash; volume-based pricing applies."
        : "Actual weight exceeds dimensional &mdash; scale pricing applies."
      : "";

  function updateField(field: keyof CalculatorFormState, value: string): void {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value
    }));
  }

  function confClass(c: string) {
    if (c === "high") return "conf-stamp-high";
    if (c === "medium") return "conf-stamp-medium";
    return "conf-stamp-low";
  }

  return (
    <section id="calculator" className="card-parcel">
      {/* Form header */}
      <div className="border-b border-dashed border-[#c4b5a2] px-6 py-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.1em] uppercase text-[#9b8c7c] font-semibold" style={{fontFamily:"'Courier Prime',monospace"}}>
            &#9993; Parcel Weight Manifest
          </p>
          <p className="text-lg italic text-[#5c4a3a] mt-0.5" style={{fontFamily:"Newsreader,serif"}}>
            {selectedFormula.label}
          </p>
        </div>
        <span className={`stamp ${confClass(selectedFormula.confidence)}`}>
          {selectedFormula.confidence} confidence
        </span>
      </div>

      {/* Carrier selector */}
      <div className="px-6 py-3 border-b border-dashed border-[#c4b5a2] flex flex-wrap gap-2">
        {carrierFormulas.map((f) => (
          <button
            key={f.carrier}
            type="button"
            onClick={() => updateField("carrier", f.carrier)}
            className={`badge-carrier px-3 py-1.5 ${
              formState.carrier === f.carrier ? "badge-carrier-active" : ""
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* USPS countdown */}
      {isPending && (
        <div className="mx-6 mt-4 px-4 py-3 bg-[#fdf2f2] border border-[#c41e3a]/20 text-sm text-[#5c4a3a] italic">
          &#9993; USPS DIM divisor changes from {selectedFormula.divisor} to <strong>{selectedFormula.newDivisor}</strong> in <Plural n={daysUntil} word="day" />. This calculator will switch automatically.
        </div>
      )}

      {/* Main layout */}
      <div className="grid lg:grid-cols-[1fr_380px]">
        {/* Input form */}
        <form
          className="grid gap-5 p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Dimensions */}
          <fieldset className="grid gap-4">
            <legend className="form-label">Package Dimensions ({dimensionUnit})</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["length", "width", "height"] as const).map((field) => (
                <label key={field} className="grid gap-1.5">
                  <span className="form-label">{field}</span>
                  <input
                    className="input-parcel px-3 py-2.5 w-full"
                    inputMode="decimal"
                    min="0.01"
                    step="any"
                    type="number"
                    value={formState[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <hr className="section-divider" />

          {/* Weight & Divisor */}
          <fieldset className="grid gap-4">
            <legend className="form-label">Weight &amp; DIM Divisor</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="form-label">Actual Weight ({weightUnit})</span>
                <input
                  className="input-parcel px-3 py-2.5 w-full"
                  inputMode="decimal"
                  min="0.01"
                  step="any"
                  type="number"
                  value={formState.actualWeight}
                  onChange={(event) =>
                    updateField("actualWeight", event.target.value)
                  }
                />
              </label>

              <label className="grid gap-1.5">
                <span className="form-label">
                  DIM Divisor
                  {isCustomCarrier ? "" : ` (${effectiveDivisor})`}
                </span>
                <input
                  className="input-parcel px-3 py-2.5 w-full disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={!isCustomCarrier}
                  inputMode="decimal"
                  min="0.01"
                  step="any"
                  type="number"
                  value={
                    isCustomCarrier
                      ? formState.customDivisor
                      : String(effectiveDivisor)
                  }
                  onChange={(event) =>
                    updateField("customDivisor", event.target.value)
                  }
                />
              </label>
            </div>
          </fieldset>

          {/* Carrier select */}
          <hr className="section-divider" />

          <label className="grid gap-1.5">
            <span className="form-label">Carrier Preset</span>
            <select
              className="select-parcel px-3 py-2.5 w-full"
              value={formState.carrier}
              onChange={(event) =>
                updateField("carrier", event.target.value as CarrierId)
              }
            >
              {carrierFormulas.map((formula) => (
                <option key={formula.carrier} value={formula.carrier}>
                  {formula.label} &mdash; {formula.formulaLabel}
                </option>
              ))}
            </select>
          </label>
        </form>

        {/* Result panel */}
        <aside
          className="border-l border-dashed border-[#c4b5a2] bg-[#faf7f0] p-6 flex flex-col"
          aria-label="Calculation result"
          aria-live="polite"
          role="status"
        >
          {result.status === "valid" && result.value ? (
            <div className="grid gap-6">
              {/* Big number */}
              <div className="text-center">
                <p className="form-label mb-4">Billable Weight</p>
                <p className="billable-number">
                  {result.value.billableWeight}
                </p>
                <p className="text-lg italic text-[#5c4a3a] mt-1">
                  {result.value.unitLabel}
                </p>
                <p
                  className="text-xs text-[#9b8c7c] mt-3 max-w-xs mx-auto leading-relaxed italic"
                  dangerouslySetInnerHTML={{ __html: billableBasis }}
                />
              </div>

              {/* Comparison */}
              {weightComparison ? (
                <div className="grid gap-4 bg-white/60 p-4 border border-[#d4c5b2]">
                  <p className="form-label">Weight Breakdown</p>

                  <div className="grid gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#5c4a3a]" style={{fontFamily:"'Courier Prime',monospace"}}>DIM</span>
                      <span className="font-semibold" style={{fontFamily:"'Courier Prime',monospace"}}>
                        {result.value.dimensionalWeight} {result.value.unitLabel}
                      </span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill-dim"
                        style={{ width: weightComparison.dimensionalPercent }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#5c4a3a]" style={{fontFamily:"'Courier Prime',monospace"}}>Actual</span>
                      <span className="font-semibold" style={{fontFamily:"'Courier Prime',monospace"}}>
                        {result.value.actualWeight} {result.value.unitLabel}
                      </span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill-actual"
                        style={{ width: weightComparison.actualPercent }}
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-[#9b8c7c] text-center italic">
                    {formState.length}&times;{formState.width}&times;{formState.height} {dimensionUnit}
                    &nbsp;&middot;&nbsp; vol {result.value.cubicSize} in&sup3;
                  </p>
                </div>
              ) : null}

              {/* Source stamp */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#5c4a3a] italic border-t border-dashed border-[#c4b5a2] pt-4">
                <span>Source: {result.formula.sourceDate ?? "see notes"}</span>
                {result.formula.sourceUrl ? (
                  <a
                    href={result.formula.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 decoration-[#d4c5b2] hover:decoration-[#c41e3a] transition-colors"
                  >
                    View &rarr;
                  </a>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex-1 grid place-items-center text-center">
              <div>
                <p className="text-4xl italic text-[#d4c5b2] mb-3">&para;</p>
                <p className="text-sm italic text-[#9b8c7c]">
                  Enter package dimensions<br />and weight above
                </p>
              </div>
            </div>
          )}

          {/* Bottom note */}
          <div className="mt-auto pt-4 border-t border-dashed border-[#c4b5a2]">
            <p className="text-[10px] text-[#9b8c7c] italic">
              This is an estimate for planning purposes. Carrier rules, rounding, and surcharges may differ. Confirm final charges with your carrier before purchasing postage.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default DimensionalWeightCalculator;
