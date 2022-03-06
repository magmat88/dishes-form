export function normalizeRange(value: string): number | string | undefined {
    if (!value) {
      return value;
    }
    return Number(value);
  }