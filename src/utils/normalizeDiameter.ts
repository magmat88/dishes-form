export function normalizeDiameter(value: string): number | undefined | string {
    if (!value) {
      return value;
    }
  
    const floatNumber = value.replace(/[^0-9.]/g, '');
    const splitSections = floatNumber.split('.');
  
    if (splitSections[0] !== '0' && splitSections[0] !== '00') {
      splitSections[0] = splitSections[0].replace(/^0+/, '');
    } else {
      splitSections[0] = '0';
    }
  
    if (splitSections[1]) {
      return parseFloat(`${splitSections[0]}.${splitSections[1].slice(0, 1)}`);
    } else if (floatNumber.indexOf('.') !== -1) {
      return `${splitSections[0]}.`;
    } else {
      return splitSections[0];
    }
  }