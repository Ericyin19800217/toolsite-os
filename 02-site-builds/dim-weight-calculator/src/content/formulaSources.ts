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
  /** Date when a new divisor takes effect (YYYY-MM-DD). Only for carriers with pending changes. */
  effectiveDate?: string;
  /** The divisor that takes effect on effectiveDate. */
  newDivisor?: number;
}

export const carrierFormulas: CarrierFormula[] = [
  {
    carrier: "fedex",
    label: "FedEx",
    serviceScope: "U.S. and international package dimensional weight",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "FedEx rounds each dimension to the nearest whole inch, then rounds DIM weight up to the next whole pound.",
    sourceUrl:
      "https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf",
    sourceDate: "2026 FedEx Service Guide",
    confidence: "high",
    notes:
      "FedEx Service Guide confirms divisor 139 for standard package DIM weight. Freight and specialty services may use different divisors. Dimensions rounded to nearest whole inch before calculation."
  },
  {
    carrier: "ups",
    label: "UPS",
    serviceScope: "Daily Rates (account holders). Retail Rates use divisor 166 — select Custom to enter 166 if you ship at retail rates.",
    unitSystem: "imperial",
    divisor: 139,
    formulaLabel: "Length x Width x Height / 139",
    roundingNote: "UPS rounds each dimension to the nearest whole inch, then rounds DIM weight up to the next whole pound.",
    sourceUrl: "https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf",
    sourceDate: "UPS Rate & Service Guide; vmeasure.ai cross-check 2026-06-12",
    confidence: "medium",
    notes:
      "UPS uses divisor 139 for Daily Rates (account/contract holders) and divisor 166 for Retail Rates (walk-in/UPS Store). This calculator defaults to Daily Rates 139. If you ship at retail rates, switch to Custom and enter 166. Always confirm with your specific UPS agreement."
  },
  {
    carrier: "usps",
    label: "USPS",
    serviceScope: "Priority Mail, Priority Mail Express, Ground Advantage, Parcel Select — packages over 1 cubic foot",
    unitSystem: "imperial",
    divisor: 166,
    formulaLabel: "Length x Width x Height / 166",
    roundingNote: "USPS rounds every fractional inch up to the next whole inch (e.g. 12.2″ → 13″) before calculating DIM weight.",
    sourceUrl: "https://pe.usps.com/dmmAdvisory/Show?dmmAdvisory=DMMAdvisory051226.html&year=2026",
    sourceDate: "USPS DMM Advisory May 12, 2026; Docket CP2026-8",
    confidence: "medium",
    notes:
      "Current USPS DIM divisor is 166. On July 12, 2026, divisor changes to 139 per PRC Docket CP2026-8. Applies to packages over 1 cubic foot (1,728 in³). Flat Rate boxes exempt.",
    effectiveDate: "2026-07-12",
    newDivisor: 139,
  },
  {
    carrier: "dhl",
    label: "DHL",
    serviceScope: "DHL Express international volumetric weight (cm³/kg)",
    unitSystem: "metric",
    divisor: 5000,
    formulaLabel: "Length x Width x Height / 5000",
    roundingNote: "DHL Express divisor is 5000 cm³/kg for international shipments. DHL eCommerce uses 6000 in most markets. Confirm with your contract.",
    sourceUrl: "https://www.dhl.com/discover/en-sg/ship-with-dhl/start-shipping/how-to-calculate-dhl-volumetric-weight",
    sourceDate: "DHL official Discover page; 2026 Service & Rate Guide cross-check; checked 2026-06-12",
    confidence: "medium",
    notes:
      "DHL Express standard volumetric divisor confirmed as 5000 cm³/kg across official DHL regional sites (SG, JP, TR, AT). Official 2026 Service & Rate Guide PDF available via mydhlplus.dhl.com. DHL eCommerce uses 6000 in US/Canada markets. Divisor may be negotiable for high-volume contract shippers."
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
