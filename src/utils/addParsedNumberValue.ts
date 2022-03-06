import { checkIfFormField, checkIfNumberValue } from './utils';

export function addParsedNumberValue(element: any) {
  let data: any = {};
  if (checkIfFormField(element) && checkIfNumberValue(element)) {
    data[element.name] = parseInt(element.value);
  }
  return data;
}
