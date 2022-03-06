import { TAGNAME_INPUT, TAGNAME_SELECT } from '../config/constants';

export function checkIfFormField(element: any) {
  if (element.tagName === TAGNAME_INPUT || element.tagName === TAGNAME_SELECT) {
    return true;
  }
}
