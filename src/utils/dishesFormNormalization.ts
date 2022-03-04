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

export function normalizeNumberOfSlices(
  value: string,
  previousValue: string
): string {
  if (!value) {
    return value;
  }

  const onlyDigits: string = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    if (onlyDigits === '0') {
      return '';
    }
  }
  return onlyDigits;
}

export function normalizeDiameter(
  value: string,
  previousValue: string
): string {
  if (!value) {
    return value;
  }
  const floatNumber =value.replace(/[^0-9.]/g, '');
  const splitSections = floatNumber.split('.');

  if (splitSections[0] !== '0' && splitSections[0] !== '00') {
    splitSections[0] = splitSections[0].replace(/^0+/, '');
  } else {
    splitSections[0] = '0';
  }

  if (splitSections[1]) {
    return splitSections[0] + '.' + splitSections[1].slice(0, 2);
  } else if (floatNumber.indexOf('.') !== -1) {
    return splitSections[0] + '.';
  } else {
    return splitSections[0];
  }
}
