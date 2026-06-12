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

function CarrierBadge({ carrier, active }: { carrier: string; active: boolean }) {
  return (
    <span
      className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1 ${
        active
          ? "badge-amber"
          : "badge-muted"
      }`}
    >
      {carrier}
    </span>
  );
}

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

  const divisorText = isCustomCarrier
    ? `DIVISOR ${formState.customDivisor || "—"}`
    : `DIVISOR ${effectiveDivisor}${isPending ? ` (→ ${selectedFormula.newDivisor} on Jul 12)` : ""}`;

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
  }, [formState, isCustomCarrier]);

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
        ? "DIM weight exceeds actual — volumetric pricing applies"
        : "Actual weight exceeds DIM — scale weight pricing applies"
      : "";

  function updateField(field: keyof CalculatorFormState, value: string): void {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value
    }));
  }

  return (
    <section
      id="calculator"
      className="card-shipping"
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e3048] px-5 py-4">
        <div>
          <p className="display-font text-2xl tracking-wider text-[#edf0f5]">
            BILLABLE WEIGHT
          </p>
          <p className="mt-0.5 text-xs font-medium tracking-widest uppercase text-[#566584]">
            {selectedFormula.label} &middot; {divisorText}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {carrierFormulas.map((f) => (
            <button
              key={f.carrier}
              type="button"
              onClick={() => updateField("carrier", f.carrier)}
            >
              <CarrierBadge
                carrier={f.label}
                active={formState.carrier === f.carrier}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile result preview */}
      {result.status === "valid" && result.value ? (
        <div className="border-b border-[#1e3048] bg-[#0d1524] px-5 py-4 md:hidden">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#566584] mb-2">
            Billable Estimate
          </p>
          <p className="font-mono text-4xl font-semibold text-[#f59e0b] tracking-tight">
            {result.value.billableWeight}
            <span className="text-lg text-[#8899b4] ml-1">{result.value.unitLabel}</span>
          </p>
        </div>
      ) : null}

      <div className="grid md:grid-cols-[1fr_420px]">
        {/* Form */}
        <form
          className="grid gap-6 p-5"
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Carrier select */}
          <label className="grid gap-2">
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#566584]">
              Carrier
            </span>
            <select
              className="select-logistics px-4 py-2.5 text-sm font-medium"
              value={formState.carrier}
              onChange={(event) =>
                updateField("carrier", event.target.value as CarrierId)
              }
            >
              {carrierFormulas.map((formula) => (
                <option key={formula.carrier} value={formula.carrier}>
                  {formula.label}
                </option>
              ))}
            </select>
          </label>

          {/* Carrier info strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-[#566584] border-l-2 border-[#1e3048] pl-3 py-1">
            <span>{selectedFormula.serviceScope}</span>
            <span className="font-mono text-[#8899b4]">{divisorText}</span>
            <span className="badge-muted text-[10px] px-2 py-0.5 tracking-wider">
              {selectedFormula.confidence}
            </span>
          </div>

          {/* USPS countdown */}
          {isPending && (
            <div className="flex items-center gap-3 bg-[#f59e0b]/5 border border-[#f59e0b]/20 px-4 py-3">
              <span className="text-lg" aria-hidden="true">&#9200;</span>
              <div>
                <p className="text-xs font-semibold text-[#fbbf24] tracking-wide uppercase">
                  Divisor changing in <Plural n={daysUntil} word="day" />
                </p>
                <p className="text-[11px] text-[#8899b4] mt-0.5">
                  USPS DIM divisor changes from {selectedFormula.divisor} to {selectedFormula.newDivisor} on July 12, 2026.
                  This calculator auto-switches on that date.
                </p>
              </div>
            </div>
          )}

          {/* Dimensions */}
          <div className="grid gap-5">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#1e3048]" aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#566584]">
                Package Dimensions
              </span>
              <div className="h-px flex-1 bg-[#1e3048]" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {(["length", "width", "height"] as const).map((field) => (
                <label key={field} className="grid gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#566584]">
                    {field}
                    <span className="text-[#566584] font-normal ml-1">
                      ({dimensionUnit})
                    </span>
                  </span>
                  <input
                    className="input-logistics px-4 py-2.5 text-sm font-mono font-medium"
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
          </div>

          {/* Weight & Divisor */}
          <div className="grid gap-5">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#1e3048]" aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#566584]">
                Weight &amp; Divisor
              </span>
              <div className="h-px flex-1 bg-[#1e3048]" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#566584]">
                  Actual Weight
                  <span className="text-[#566584] font-normal ml-1">
                    ({weightUnit})
                  </span>
                </span>
                <input
                  className="input-logistics px-4 py-2.5 text-sm font-mono font-medium"
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

              <label className="grid gap-2">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#566584]">
                  DIM Divisor
                </span>
                <input
                  className="input-logistics px-4 py-2.5 text-sm font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={!isCustomCarrier}
                  inputMode="decimal"
                  min="0.01"
                  step="any"
                  type="number"
                  value={
                    isCustomCarrier
                      ? formState.customDivisor
                      : String(selectedFormula.divisor)
                  }
                  onChange={(event) =>
                    updateField("customDivisor", event.target.value)
                  }
                />
              </label>
            </div>
          </div>
        </form>

        {/* Result Panel */}
        <aside className="border-l border-[#1e3048] bg-[#0d1524] p-6 flex flex-col">
          <div
            aria-label="Calculation result"
            aria-live="polite"
            role="status"
          >
            {result.status === "valid" && result.value ? (
              <div className="grid gap-6">
                {/* Big billable number */}
                <div className="text-center">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#566584] mb-3">
                    Billable Weight
                  </p>
                  <p className="font-mono text-6xl font-semibold text-[#f59e0b] tracking-tight leading-none">
                    {result.value.billableWeight}
                  </p>
                  <p className="mt-2 text-sm font-medium tracking-widest uppercase text-[#8899b4]">
                    {result.value.unitLabel}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#566584] max-w-xs mx-auto">
                    {billableBasis}
                  </p>
                </div>

                {/* Weight comparison bars */}
                {weightComparison ? (
                  <div className="grid gap-4 bg-[#0a101c] p-4">
                    <div className="flex items-center justify-between gap-4 text-[10px] tracking-[0.15em] uppercase">
                      <span className="font-semibold text-[#8899b4]">
                        Weight Comparison
                      </span>
                      <span className="text-[#566584] font-mono">
                        {formState.length || "0"}&times;{formState.width || "0"}&times;{formState.height || "0"} {dimensionUnit}
                      </span>
                    </div>

                    {/* DIM bar */}
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between gap-4 text-xs">
                        <span className="text-[#8899b4] font-medium">DIM</span>
                        <span className="font-mono font-semibold text-[#f59e0b] tabular-nums">
                          {result.value.dimensionalWeight} {result.value.unitLabel}
                        </span>
                      </div>
                      <div className="h-2 progress-track overflow-hidden">
                        <div
                          className="h-full progress-amber transition-all duration-500"
                          style={{ width: weightComparison.dimensionalPercent }}
                        />
                      </div>
                    </div>

                    {/* Actual bar */}
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between gap-4 text-xs">
                        <span className="text-[#8899b4] font-medium">Actual</span>
                        <span className="font-mono font-semibold text-[#14b8a6] tabular-nums">
                          {result.value.actualWeight} {result.value.unitLabel}
                        </span>
                      </div>
                      <div className="h-2 progress-track overflow-hidden">
                        <div
                          className="h-full progress-teal transition-all duration-500"
                          style={{ width: weightComparison.actualPercent }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Detail rows */}
                <dl className="grid gap-0 border-t border-[#1e3048]">
                  {[
                    { label: "Dimensional Weight", value: result.value.dimensionalWeight },
                    { label: "Actual Weight", value: result.value.actualWeight },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 py-3 border-b border-[#1e3048] text-xs">
                      <dt className="text-[#566584] font-medium tracking-wide">{row.label}</dt>
                      <dd className="font-mono font-semibold text-[#edf0f5] tabular-nums">
                        {row.value} {result.value!.unitLabel}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-4 py-3 border-b border-[#1e3048] text-xs">
                    <dt className="text-[#566584] font-medium tracking-wide">Formula</dt>
                    <dd className="font-mono font-semibold text-[#8899b4]">
                      {result.formula.formulaLabel}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3 text-xs">
                    <dt className="text-[#566584] font-medium tracking-wide">Confidence</dt>
                    <dd className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 ${
                        result.formula.confidence === "low" ? "badge-muted" :
                        result.formula.confidence === "medium" ? "badge-teal" :
                        "badge-amber"
                      }`}>
                        {result.formula.confidence}
                      </span>
                      {result.formula.sourceDate ? (
                        <span className="text-[#566584] font-mono text-[10px]">
                          {result.formula.sourceDate}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                </dl>

                {result.formula.notes ? (
                  <p className="text-[11px] leading-relaxed text-[#566584] border-l-2 border-[#1e3048] pl-3">
                    {result.formula.notes}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="grid min-h-48 place-items-center text-center">
                <div>
                  <p className="display-font text-3xl tracking-wider text-[#566584]">
                    CHECK INPUTS
                  </p>
                  <p className="mt-2 text-xs text-[#566584] tracking-wide uppercase">
                    Enter positive numbers for all fields
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom tag */}
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#566584]">
              <span className="h-2 w-2 bg-[#f59e0b]" aria-hidden="true" />
              Estimate only &mdash; not a carrier quote
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default DimensionalWeightCalculator;
