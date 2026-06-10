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
    serviceScope: "Priority Mail retail parcels over one cubic foot",
    unitSystem: "imperial",
    divisor: 166,
    formulaLabel: "Length x Width x Height / 166",
    roundingNote: "USPS DMM indicates rounding dimensions and rounding weight up.",
    sourceUrl: "https://pe.usps.com/text/dmm300/123.htm",
    sourceDate: "USPS DMM checked 2026-06-10",
    confidence: "medium",
    notes:
      "USPS DMM currently shows 166, while 2026 third-party signals mention possible divisor changes. Verify before launch."
  },
  {
    carrier: "dhl",
    label: "DHL",
    serviceScope: "Common international metric volumetric formula",
    unitSystem: "metric",
    divisor: 5000,
    formulaLabel: "Length x Width x Height / 5000",
    roundingNote: "DHL divisor can vary by service and region.",
    confidence: "low",
    notes:
      "Use as a common international estimate only until a stable DHL official source is added."
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
