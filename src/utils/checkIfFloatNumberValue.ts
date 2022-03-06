import { FIELD_NAME_DIAMETER } from '../config/constants';

export function checkIfFloatNumberValue(element: any) {
  if (element.name === FIELD_NAME_DIAMETER) {
    return true;
  }
}
