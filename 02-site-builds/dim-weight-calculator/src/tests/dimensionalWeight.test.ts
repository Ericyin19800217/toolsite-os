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

  it.each([
    ["length", 0],
    ["length", -1],
    ["length", Number.NaN],
    ["length", Number.POSITIVE_INFINITY],
    ["width", 0],
    ["width", -1],
    ["width", Number.NaN],
    ["width", Number.POSITIVE_INFINITY],
    ["height", 0],
    ["height", -1],
    ["height", Number.NaN],
    ["height", Number.POSITIVE_INFINITY],
    ["actualWeight", 0],
    ["actualWeight", -1],
    ["actualWeight", Number.NaN],
    ["actualWeight", Number.POSITIVE_INFINITY],
    ["divisor", 0],
    ["divisor", -1],
    ["divisor", Number.NaN],
    ["divisor", Number.POSITIVE_INFINITY]
  ] as const)("throws for invalid %s value %s", (field, value) => {
    expect(() =>
      calculateDimensionalWeight({
        length: field === "length" ? value : 20,
        width: field === "width" ? value : 12,
        height: field === "height" ? value : 10,
        actualWeight: field === "actualWeight" ? value : 12,
        divisor: field === "divisor" ? value : 139,
        unitSystem: "imperial"
      })
    ).toThrow(`${field} must be greater than 0`);
  });
});
