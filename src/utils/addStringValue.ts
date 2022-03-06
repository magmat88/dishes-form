import { checkIfStringValue } from './utils';

export function addStringValue(element: any) {
  let data: any = {};
  if (checkIfStringValue(element)) {
    data[element.name] = element.value;
  }
  return data;
}
