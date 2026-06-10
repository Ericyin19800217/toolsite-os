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
