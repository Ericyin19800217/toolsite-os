import { useMemo, useState } from "react";

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

  function updateField(field: keyof CalculatorFormState, value: string): void {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value
    }));
  }

  return (
    <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
      <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 text-sm font-medium text-slate-800">
          Carrier
          <select
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950"
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

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium text-slate-800">
            Length
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950"
              inputMode="decimal"
              min="0"
              type="number"
              value={formState.length}
              onChange={(event) => updateField("length", event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-800">
            Width
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950"
              inputMode="decimal"
              min="0"
              type="number"
              value={formState.width}
              onChange={(event) => updateField("width", event.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-800">
            Height
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950"
              inputMode="decimal"
              min="0"
              type="number"
              value={formState.height}
              onChange={(event) => updateField("height", event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-800">
            Actual weight
            <input
              className="rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950"
              inputMode="decimal"
              min="0"
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
              className="rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950 disabled:bg-slate-100 disabled:text-slate-500"
              disabled={!isCustomCarrier}
              inputMode="decimal"
              min="0"
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
      </form>

      <aside className="rounded-lg bg-slate-950 p-5 text-white">
        {result.status === "valid" && result.value ? (
          <div className="grid gap-4">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Billable weight
              </p>
              <p className="text-4xl font-semibold tracking-normal">
                {result.value.billableWeight} {result.value.unitLabel}
              </p>
            </div>

            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
                <dt className="text-slate-300">Dimensional weight</dt>
                <dd className="font-medium">
                  {result.value.dimensionalWeight} {result.value.unitLabel}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
                <dt className="text-slate-300">Actual weight</dt>
                <dd className="font-medium">
                  {result.value.actualWeight} {result.value.unitLabel}
                </dd>
              </div>
              <div className="grid gap-1 border-t border-white/10 pt-3">
                <dt className="text-slate-300">Formula</dt>
                <dd className="font-medium">{result.formula.formulaLabel}</dd>
              </div>
            </dl>

            <p className="text-sm leading-6 text-slate-300">
              {result.formula.notes}
            </p>
          </div>
        ) : (
          <div className="grid min-h-48 place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold">Check inputs</p>
              <p className="mt-2 text-sm text-slate-300">
                Enter positive numbers for package size, weight, and divisor.
              </p>
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}

export default DimensionalWeightCalculator;
