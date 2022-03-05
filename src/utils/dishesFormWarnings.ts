interface Warnings {
  name?: string;
  preparation_time?: string;
  type?: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale?: string;
  slices_of_bread?: string;
  values?: any;
}

export function showDishesFormWarnings(values: any): any {
  const warnings: Warnings = {};

  if (values.name) {
    if (values.name.length > 20) {
      warnings.name = 'Name seems to be too long';
    }
  }

  if (values.preparation_time) {
    if (/00:00:\d{2}/.test(values.preparation_time)) {
      warnings.preparation_time =
        'It seems to be not enough time to prepare a meal';
    }
  }

  if (values.no_of_slices) {
    if (values.no_of_slices < 2) {
      warnings.no_of_slices =
        'It seems to be not enough slices of bread to prepare a folded sandwich';
    }

    if (values.no_of_slices > 10) {
      warnings.no_of_slices =
        'It seems to be too many slices of bread to prepare a single sandwich';
    }
  }

  if (values.diameter) {
    if (values.diameter < 5.0) {
      warnings.diameter = 'Diameter seems to be too small';
    }

    if (values.diameter > 50.0) {
      warnings.diameter =
        'Diameter seems to be exceeding the width of the oven';
    }
  }

  if (values.slices_of_bread) {
    if (values.slices_of_bread < 2) {
      warnings.slices_of_bread =
        'It seems to be not enough slices of bread to prepare a sandwich';
    }

    if (values.slices_of_bread > 10) {
      warnings.slices_of_bread =
        'It seems to be too many slices of bread to prepare a single sandwich';
    }
  }

  return warnings;
}
