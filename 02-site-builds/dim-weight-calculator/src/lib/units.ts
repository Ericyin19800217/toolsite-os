export { roundToTwo } from "./rounding";
import { roundToTwo } from "./rounding";

export function inchesToCm(inches: number): number {
  return roundToTwo(inches * 2.54);
}

export function cmToInches(centimeters: number): number {
  return roundToTwo(centimeters / 2.54);
}

export function lbToKg(pounds: number): number {
  return roundToTwo(pounds * 0.45359237);
}

export function kgToLb(kilograms: number): number {
  return roundToTwo(kilograms * 2.2046226218);
}
