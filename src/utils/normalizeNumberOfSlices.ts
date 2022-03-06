export function normalizeNumberOfSlices(value: number): number | undefined {
  if (value < 1) {
    return undefined;
  }
  return value;
}
