import {
  FIELD_NAME_NAME,
  FIELD_NAME_PREPARATION_TIME,
  FIELD_NAME_TYPE,
} from '../config/constants';

export function checkIfStringValue(element: any) {
  if (
    element.name === FIELD_NAME_NAME ||
    element.name === FIELD_NAME_PREPARATION_TIME ||
    element.name === FIELD_NAME_TYPE
  ) {
    return true;
  }
}
