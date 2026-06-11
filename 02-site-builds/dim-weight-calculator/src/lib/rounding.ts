export function roundToTwo(value: number): number {
  return Number(`${Math.round(Number(`${value}e2`))}e-2`);
}
