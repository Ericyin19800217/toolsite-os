export type UnitSystem = "imperial" | "metric";
export type CarrierId = "fedex" | "ups" | "usps" | "dhl" | "custom";
export type FormulaConfidence = "high" | "medium" | "low";

export interface CarrierFormula {
  carrier: CarrierId;
  label: string;
  serviceScope: string;
  unitSystem: UnitSystem;
  divisor: number;
  formulaLabel: string;
  roundingNote: string;
  sourceUrl?: string;
  sourceDate?: string;
  confidence: FormulaConfidence;
  notes: string;
}

export const carrierFormulas: CarrierFormula[] = [
  {
    carrier: "fedex",
    label: "FedEx",
    serviceScope: "Common U.S. and international package dimensional weight",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "FedEx may round dimensions and weight according to service rules.",
    sourceUrl:
      "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf",
    sourceDate: "2026 FedEx Service Guide",
    confidence: "high",
    notes:
      "FedEx Service Guide supports 139 for common package dimensional weight. Some freight services may use different divisors."
  },
  {
    carrier: "ups",
    label: "UPS",
    serviceScope: "Package daily rates dimensional weight",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "UPS may round measurements and fractional pounds according to rate rules.",
    sourceUrl: "https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf",
    sourceDate: "UPS Rate and Service Guide checked 2026-06-10",
    confidence: "medium",
    notes:
      "UPS source should be checked again before launch for the latest year-specific rate guide."
  },
  {
    carrier: "usps",
    label: "USPS",
    serviceScope: "Priority Mail & Ground Advantage parcels over one cubic foot (effective July 12, 2026)",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "USPS rounds every fractional inch up to the next whole inch before calculating DIM weight.",
    sourceUrl: "https://www.supplychaindive.com/news/usps-to-align-dimensional-pricing-closer-to-fedex-ups/820305/",
    sourceDate: "USPS DIM divisor changing to 139 on July 12, 2026",
    confidence: "medium",
    notes:
      "USPS announced DIM divisor change from 166 to 139 effective July 12, 2026, aligning with FedEx/UPS. Applies only to packages over 1 cubic foot (1,728 in³). Flat Rate boxes are exempt. Fractional inch dimensions are rounded up to the next whole inch."
  },
  {
    carrier: "dhl",
    label: "DHL",
    serviceScope: "DHL Express international volumetric weight",
    unitSystem: "metric",
    divisor: 5000,
    formulaLabel: "Length x Width x Height / 5000",
    roundingNote: "DHL divisor can vary by service, region, and contract. DHL eCommerce uses 6000 in most markets.",
    sourceUrl: "https://www.dhl.com/discover/en-sg/ship-with-dhl/start-shipping/how-to-calculate-dhl-volumetric-weight",
    sourceDate: "DHL official, checked 2026-06-12",
    confidence: "medium",
    notes:
      "DHL Express standard divisor is 5000 cm³/kg for international shipments (confirmed on official DHL regional sites). DHL eCommerce uses 6000 in US/Canada/International markets. Confirm with your specific service agreement."
  },
  {
    carrier: "custom",
    label: "Custom",
    serviceScope: "User-provided DIM divisor",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / custom divisor",
    roundingNote: "Use the rounding rules from your carrier or contract.",
    confidence: "low",
    notes:
      "Custom divisor is useful for contract rates, regional carriers, freight services, and source conflicts."
  }
];

export function getFormulaByCarrier(carrier: CarrierId): CarrierFormula {
  const formula = carrierFormulas.find((item) => item.carrier === carrier);
  if (!formula) {
    throw new Error(`Unknown carrier: ${carrier}`);
  }
  return formula;
}
