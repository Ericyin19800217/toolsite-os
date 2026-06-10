import { describe, expect, it } from "vitest";
import { parsePositiveNumber } from "../lib/validation";

describe("parsePositiveNumber", () => {
  it("parses a positive decimal value", () => {
    expect(parsePositiveNumber("12.5", "length")).toBe(12.5);
  });

  it("throws a required error for empty values", () => {
    expect(() => parsePositiveNumber("", "length")).toThrow(
      "length is required"
    );
  });

  it("throws a positive number error for negative values", () => {
    expect(() => parsePositiveNumber("-1", "length")).toThrow(
      "length must be greater than 0"
    );
  });
});
