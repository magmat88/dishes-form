import {
  FIELD_NAME_DIAMETER,
  FIELD_NAME_NAME,
  FIELD_NAME_NO_OF_SLICES,
  FIELD_NAME_PREPARATION_TIME,
  FIELD_NAME_SLICES_OF_BREAD,
  WARNINGS_DIAMETER_TOO_LARGE_INFO,
  WARNINGS_DIAMETER_TOO_LARGE_NUM,
  WARNINGS_DIAMETER_TOO_SMALL_INFO,
  WARNINGS_DIAMETER_TOO_SMALL_NUM,
  WARNINGS_NAME_INFO,
  WARNINGS_NAME_LENGTH,
  WARNINGS_NO_OF_SLICES_TOO_MANY_INFO,
  WARNINGS_NO_OF_SLICES_TOO_MANY_NUM,
  WARNINGS_NO_OF_SLICES_TOO_SMALL_INFO,
  WARNINGS_NO_OF_SLICES_TOO_SMALL_NUM,
  WARNINGS_PREPARATION_TIME_INFO,
  WARNINGS_SLICES_OF_BREAD_TOO_MANY_INFO,
  WARNINGS_SLICES_OF_BREAD_TOO_MANY_NUM,
  WARNINGS_SLICES_OF_BREAD_TOO_SMALL_INFO,
  WARNINGS_SLICES_OF_BREAD_TOO_SMALL_NUM
} from '../config/constants';

interface WarningsProps {
  name?: string;
  preparation_time?: string;
  type?: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale?: string;
  slices_of_bread?: string;
}

interface ValuesProps {
  name?: string;
  preparation_time?: string;
  type?: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

export function showDishesFormWarnings(values: ValuesProps): WarningsProps {
  const warnings: WarningsProps = {};

  if (values?.name && values?.name.length > WARNINGS_NAME_LENGTH) {
    warnings[FIELD_NAME_NAME] = WARNINGS_NAME_INFO;
  }

  if (values.preparation_time && /00:00:\d{2}/.test(values.preparation_time)) {
    warnings[FIELD_NAME_PREPARATION_TIME] = WARNINGS_PREPARATION_TIME_INFO;
  }

  if (
    values?.no_of_slices &&
    values?.no_of_slices < WARNINGS_NO_OF_SLICES_TOO_SMALL_NUM
  ) {
    warnings[FIELD_NAME_NO_OF_SLICES] = WARNINGS_NO_OF_SLICES_TOO_SMALL_INFO;
  }

  if (
    values?.no_of_slices &&
    values?.no_of_slices > WARNINGS_NO_OF_SLICES_TOO_MANY_NUM
  ) {
    warnings[FIELD_NAME_NO_OF_SLICES] = WARNINGS_NO_OF_SLICES_TOO_MANY_INFO;
  }

  if (values?.diameter && values?.diameter < WARNINGS_DIAMETER_TOO_SMALL_NUM) {
    warnings[FIELD_NAME_DIAMETER] = WARNINGS_DIAMETER_TOO_SMALL_INFO;
  }

  if (values?.diameter && values?.diameter > WARNINGS_DIAMETER_TOO_LARGE_NUM) {
    warnings[FIELD_NAME_DIAMETER] = WARNINGS_DIAMETER_TOO_LARGE_INFO;
  }

  if (
    values?.slices_of_bread &&
    values?.slices_of_bread < WARNINGS_SLICES_OF_BREAD_TOO_SMALL_NUM
  ) {
    warnings[FIELD_NAME_SLICES_OF_BREAD] =
      WARNINGS_SLICES_OF_BREAD_TOO_SMALL_INFO;
  }

  if (
    values?.slices_of_bread &&
    values?.slices_of_bread > WARNINGS_SLICES_OF_BREAD_TOO_MANY_NUM
  ) {
    warnings[FIELD_NAME_SLICES_OF_BREAD] =
      WARNINGS_SLICES_OF_BREAD_TOO_MANY_INFO;
  }

  return warnings;
}
