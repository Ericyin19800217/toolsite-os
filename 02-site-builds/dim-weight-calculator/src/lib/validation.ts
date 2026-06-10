export function parsePositiveNumber(
  rawValue: string,
  fieldName: string
): number {
  const trimmedValue = rawValue.trim();

  if (trimmedValue === "") {
    throw new Error(`${fieldName} is required`);
  }

  const parsedValue = Number(trimmedValue);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    throw new Error(`${fieldName} must be greater than 0`);
  }

  return parsedValue;
}
