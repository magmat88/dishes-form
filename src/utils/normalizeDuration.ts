export function normalizeDuration(val: any, prevVal: any): any {
  if (!val) {
    return val;
  }

  const onlyDigits = val.replace(/[^\d]/g, '');
  if (!prevVal || val.length > prevVal.length) {
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
  )}:${onlyDigits.slice(4, 7)}`;
}
