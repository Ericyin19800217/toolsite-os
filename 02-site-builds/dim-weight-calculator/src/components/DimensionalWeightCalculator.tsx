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
  const divisorText = isCustomCarrier
    ? `custom divisor ${formState.customDivisor || "not set"}`
    : `divisor ${selectedFormula.divisor}`;

  const result = useMemo(() => {
    try {
      const formula = getFormulaByCarrier(formState.carrier);
      const divisor = isCustomCarrier
        ? parsePositiveNumber(formState.customDivisor, "DIM divisor")
        : formula.divisor;

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
            10,
            Math.round(
              (result.value.dimensionalWeight / result.value.billableWeight) *
                100
            )
          )}%`,
          actualPercent: `${Math.max(
            10,
            Math.round(
              (result.value.actualWeight / result.value.billableWeight) * 100
            )
          )}%`
        }
      : null;
  const billableBasis =
    result.status === "valid" && result.value
      ? result.value.dimensionalWeight >= result.value.actualWeight
        ? "Dimensional weight is higher, so it drives the billable estimate."
        : "Actual weight is higher, so it drives the billable estimate."
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
      className="grid overflow-hidden rounded-lg border border-slate-300 bg-white shadow-[0_6px_8px_rgba(15,23,42,0.06)] md:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]"
    >
      <div className="grid gap-3 border-b border-slate-200 bg-slate-50 p-4 sm:p-5 md:col-span-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            Calculate billable weight
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Enter package size and actual weight. The result updates instantly.
          </p>
        </div>
        <div className="w-fit rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800">
          {selectedFormula.label} · {divisorText}
        </div>
      </div>

      {result.status === "valid" && result.value ? (
        <div className="m-4 rounded-md border border-amber-300 bg-amber-50 p-3 md:hidden">
          <p className="text-xs font-medium text-amber-900">
            Current billable estimate
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">
            {result.value.billableWeight} {result.value.unitLabel}
          </p>
        </div>
      ) : null}

      <form
        className="grid gap-5 p-4 sm:p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="grid gap-2 text-sm font-medium text-slate-800">
          Carrier
          <select
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
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
        <p className="rounded-md bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700">
          {selectedFormula.label} preset: {selectedFormula.serviceScope},{" "}
          {divisorText}, {selectedFormula.confidence} confidence.
        </p>

        <div className="grid gap-3 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-950">
            Package dimensions
          </p>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-800">
            Length ({dimensionUnit})
            <input
              className="w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              inputMode="decimal"
              min="0.01"
              step="any"
              type="number"
              value={formState.length}
              onChange={(event) => updateField("length", event.target.value)}
            />
          </label>

          <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-800">
            Width ({dimensionUnit})
            <input
              className="w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              inputMode="decimal"
              min="0.01"
              step="any"
              type="number"
              value={formState.width}
              onChange={(event) => updateField("width", event.target.value)}
            />
          </label>

          <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-800">
            Height ({dimensionUnit})
            <input
              className="w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              inputMode="decimal"
              min="0.01"
              step="any"
              type="number"
              value={formState.height}
              onChange={(event) => updateField("height", event.target.value)}
            />
          </label>
          </div>
        </div>

        <div className="grid gap-3 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-950">
            Weight and divisor
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-800">
            Actual weight ({weightUnit})
            <input
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
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

          <label className="grid gap-2 text-sm font-medium text-slate-800">
            DIM divisor
            <input
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
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

      <aside className="m-4 mt-0 rounded-lg border border-slate-200 bg-white p-5 text-slate-950 md:m-5 md:ml-0">
        <div
          aria-label="Calculation result"
          aria-live="polite"
          role="status"
        >
        {result.status === "valid" && result.value ? (
          <div className="grid gap-5">
            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-500">
                  Billable weight
                </p>
                <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-200">
                  Estimate
                </span>
              </div>
              <p className="text-5xl font-semibold tracking-normal text-slate-950">
                {result.value.billableWeight} {result.value.unitLabel}
              </p>
              <p className="max-w-sm text-sm leading-6 text-slate-600">
                {billableBasis}
              </p>
            </div>

            <div className="grid gap-4 rounded-md bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-950">
                  Weight comparison
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {formState.length || "0"} x {formState.width || "0"} x{" "}
                  {formState.height || "0"} {dimensionUnit}
                </p>
              </div>
              {weightComparison ? (
                <div className="grid gap-3 text-sm">
                  <div className="grid gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Dimensional</span>
                      <span className="font-medium">
                        {result.value.dimensionalWeight} {result.value.unitLabel}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: weightComparison.dimensionalPercent }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Actual</span>
                      <span className="font-medium">
                        {result.value.actualWeight} {result.value.unitLabel}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-teal-500"
                        style={{ width: weightComparison.actualPercent }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
                <dt className="text-slate-500">Dimensional weight</dt>
                <dd className="font-medium">
                  {result.value.dimensionalWeight} {result.value.unitLabel}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
                <dt className="text-slate-500">Actual weight</dt>
                <dd className="font-medium">
                  {result.value.actualWeight} {result.value.unitLabel}
                </dd>
              </div>
              <div className="grid gap-1 border-t border-slate-200 pt-3">
                <dt className="text-slate-500">Formula</dt>
                <dd className="font-medium">{result.formula.formulaLabel}</dd>
              </div>
              <div className="grid gap-1 border-t border-slate-200 pt-3">
                <dt className="text-slate-500">Source confidence</dt>
                <dd className="font-medium">
                  {result.formula.confidence}
                  {result.formula.sourceDate
                    ? ` · ${result.formula.sourceDate}`
                    : ""}
                </dd>
              </div>
            </dl>

            <p className="text-sm leading-6 text-slate-600">
              {result.formula.notes}
            </p>
          </div>
        ) : (
          <div className="grid min-h-48 place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold">Check inputs</p>
              <p className="mt-2 text-sm text-slate-600">
                Enter positive numbers for package size, weight, and divisor.
              </p>
            </div>
          </div>
        )}
        </div>
      </aside>
    </section>
  );
}

export default DimensionalWeightCalculator;
