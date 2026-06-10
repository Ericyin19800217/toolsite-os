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

    expect(() =>
      calculateDimensionalWeight({
        length: -1,
        width: 12,
        height: 10,
        actualWeight: 12,
        divisor: 139,
        unitSystem: "imperial"
      })
    ).toThrow("length must be greater than 0");
  });
});
