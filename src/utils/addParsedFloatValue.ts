import { checkIfFormField, checkIfFloatNumberValue } from './utils';

export function addParsedFloatValue(element: any) {
  let data: any = {};
  if (checkIfFormField(element) && checkIfFloatNumberValue(element)) {
    data[element.name] = parseFloat(element.value);
  }
  return data;
}
