import {
  DISH_TYPE_PIZZA,
  DISH_TYPE_SANDWICH,
  DISH_TYPE_SOUP,
  DURATION_REGEX,
  ERROR_DURATION_CONVERT_MINUTES,
  ERROR_DURATION_CONVERT_SECONDS,
  ERROR_DURATION_FORMAT,
  ERROR_NAME_TOO_SHORT_NUM,
  ERROR_NAME_TOO_SHORT,
  ERROR_REQUIRED,
  FIELD_NAME_DIAMETER,
  FIELD_NAME_NAME,
  FIELD_NAME_NO_OF_SLICES,
  FIELD_NAME_PREPARATION_TIME,
  FIELD_NAME_SLICES_OF_BREAD,
  FIELD_NAME_SPICINESS_SCALE,
  FIELD_NAME_TYPE,
} from '../config/constants';
import {
  validateDurationMinutes,
  validateDurationSeconds,
} from '../utils/utils';

interface ErrorsProps {
  diameter?: string;
  name?: string;
  no_of_slices?: string;
  preparation_time?: string;
  slices_of_bread?: string;
  spiciness_scale?: string;
  type?: string;
}

interface ValuesProps {
  diameter?: string;
  name?: string;
  no_of_slices?: number;
  preparation_time?: string;
  slices_of_bread?: number;
  spiciness_scale?: string;
  type?: string;
}

export function validateDishesForm(values: ValuesProps): ErrorsProps {
  const errors: ErrorsProps = {};

  if (!values.name) {
    errors.name = ERROR_REQUIRED;
  } else if (values.name.length < ERROR_NAME_TOO_SHORT_NUM) {
    errors[FIELD_NAME_NAME] = ERROR_NAME_TOO_SHORT;
  }

  if (!values.preparation_time) {
    errors[FIELD_NAME_PREPARATION_TIME] = ERROR_REQUIRED;
  } else if (!DURATION_REGEX.test(values.preparation_time)) {
    errors[FIELD_NAME_PREPARATION_TIME] = ERROR_DURATION_FORMAT;
  } else if (validateDurationMinutes(values.preparation_time)) {
    errors[FIELD_NAME_PREPARATION_TIME] = ERROR_DURATION_CONVERT_MINUTES;
  } else if (validateDurationSeconds(values.preparation_time)) {
    errors[FIELD_NAME_PREPARATION_TIME] = ERROR_DURATION_CONVERT_SECONDS;
  }

  if (!values.type) {
    errors[FIELD_NAME_TYPE] = ERROR_REQUIRED;
  }

  if (values?.type === DISH_TYPE_PIZZA && !values?.no_of_slices) {
    errors[FIELD_NAME_NO_OF_SLICES] = ERROR_REQUIRED;
  }

  if (values?.type === DISH_TYPE_PIZZA && !values?.diameter) {
    errors[FIELD_NAME_DIAMETER] = ERROR_REQUIRED;
  }

  if (values?.type === DISH_TYPE_SOUP && !values?.spiciness_scale) {
    errors[FIELD_NAME_SPICINESS_SCALE] = ERROR_REQUIRED;
  }

  if (values?.type === DISH_TYPE_SANDWICH && !values?.slices_of_bread) {
    errors[FIELD_NAME_SLICES_OF_BREAD] = ERROR_REQUIRED;
  }

  return errors;
}
