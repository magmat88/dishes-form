import {
  FIELD_NAME_NO_OF_SLICES,
  FIELD_NAME_SLICES_OF_BREAD,
  FIELD_NAME_SPICINESS_SCALE,
} from '../config/constants';

export function checkIfNumberValue(element: any) {
  if (
    element.name === FIELD_NAME_NO_OF_SLICES ||
    element.name === FIELD_NAME_SLICES_OF_BREAD ||
    element.name === FIELD_NAME_SPICINESS_SCALE
  ) {
    return true;
  }
}
