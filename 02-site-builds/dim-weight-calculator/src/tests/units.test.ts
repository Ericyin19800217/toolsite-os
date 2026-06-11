import { describe, expect, it } from "vitest";
import { cmToInches, inchesToCm, kgToLb, lbToKg, roundToTwo } from "../lib/units";

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

  it("rounds half-cent values to two decimals consistently", () => {
    expect(roundToTwo(10.075)).toBe(10.08);
  });
});
