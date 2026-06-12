import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { DimensionalWeightCalculator } from "../components/DimensionalWeightCalculator";

describe("DimensionalWeightCalculator", () => {
  it("matches positive-number HTML constraints to validation rules", () => {
    render(<DimensionalWeightCalculator defaultCarrier="fedex" />);

    for (const label of [
      /length/i,
      /width/i,
      /height/i,
      /actual weight/i,
      /dim divisor/i,
    ]) {
      const input = screen.getByLabelText(label);

      expect(input.getAttribute("min")).toBe("0.01");
      expect(input.getAttribute("step")).toBe("any");
    }
  });

  it("announces recalculated results to assistive technology", () => {
    render(<DimensionalWeightCalculator defaultCarrier="fedex" />);

    const resultRegion = screen.getByRole("status", {
      name: "Calculation result"
    });

    expect(resultRegion.getAttribute("aria-live")).toBe("polite");
  });
});
