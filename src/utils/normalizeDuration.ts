export function normalizeDuration(
    value: string,
    previousValue: string
  ): string {
    if (!value) {
      return value;
    }
  
    const onlyDigits: string = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
      if (onlyDigits.length === 2) {
        return `${onlyDigits}:`;
      }
      if (onlyDigits.length === 4) {
        return `${onlyDigits.slice(0, 2)}:${onlyDigits.slice(2)}:`;
      }
    }
    if (onlyDigits.length <= 2) {
      return onlyDigits;
    }
    if (onlyDigits.length <= 4) {
      return `${onlyDigits.slice(0, 2)}:${onlyDigits.slice(2)}`;
    }
    return `${onlyDigits.slice(0, 2)}:${onlyDigits.slice(
      2,
      4
    )}:${onlyDigits.slice(4, 6)}`;
  }