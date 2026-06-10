import type { CarrierId } from "./formulaSources";

export interface CarrierPage {
  carrier: CarrierId;
  path: string;
  title: string;
  description: string;
  h1: string;
}

export const carrierPages: CarrierPage[] = [
  {
    carrier: "fedex",
    path: "/fedex-dimensional-weight-calculator/",
    title: "FedEx Dimensional Weight Calculator",
    description:
      "Estimate FedEx dimensional weight and billable weight using package dimensions, actual weight, and DIM factor notes.",
    h1: "FedEx Dimensional Weight Calculator"
  },
  {
    carrier: "ups",
    path: "/ups-dimensional-weight-calculator/",
    title: "UPS Dimensional Weight Calculator",
    description:
      "Estimate UPS dimensional weight and billable weight with inches, pounds, and custom DIM factor support.",
    h1: "UPS Dimensional Weight Calculator"
  },
  {
    carrier: "usps",
    path: "/usps-dimensional-weight-calculator/",
    title: "USPS Dimensional Weight Calculator",
    description:
      "Estimate USPS dimensional weight and billable weight, with source notes for current USPS divisor rules.",
    h1: "USPS Dimensional Weight Calculator"
  },
  {
    carrier: "dhl",
    path: "/dhl-volumetric-weight-calculator/",
    title: "DHL Volumetric Weight Calculator",
    description:
      "Estimate DHL volumetric weight with metric dimensions, actual weight, and custom divisor support.",
    h1: "DHL Volumetric Weight Calculator"
  }
];
