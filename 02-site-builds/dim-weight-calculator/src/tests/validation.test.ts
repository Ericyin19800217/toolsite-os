import { describe, expect, it } from "vitest";
import { parsePositiveNumber } from "../lib/validation";

describe("parsePositiveNumber", () => {
  it("parses a positive decimal value", () => {
    expect(parsePositiveNumber("12.5", "length")).toBe(12.5);
  });

  it("parses a positive integer value", () => {
    expect(parsePositiveNumber("42", "width")).toBe(42);
  });

  it("throws a required error for empty values", () => {
    expect(() => parsePositiveNumber("", "length")).toThrow(
      "length is required"
    );
  });

  it("throws a required error for whitespace-only values", () => {
    expect(() => parsePositiveNumber("   ", "length")).toThrow(
      "length is required"
    );
  });

  it.each([
    ["zero", "0"],
    ["negative", "-1"],
    ["NaN", "abc"],
    ["Infinity", "Infinity"],
    ["negative Infinity", "-Infinity"],
  ] as const)("throws for %s value", (_, value) => {
    expect(() => parsePositiveNumber(value, "length")).toThrow(
      "length must be greater than 0"
    );
  });
});
