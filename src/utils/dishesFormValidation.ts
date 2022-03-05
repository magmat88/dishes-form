interface Errors {
  name?: string;
  preparation_time?: string;
  type?: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale?: string;
  slices_of_bread?: string;
  values?: any;
}
export function validateDishesForm(values: Errors) {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must contain of 3 characters or more';
  }

  if (!values.preparation_time) {
    errors.preparation_time = 'Required';
  } else if (!/\d{2}:\d{2}:\d{2}/.test(values.preparation_time)) {
    errors.preparation_time =
      'Preparation time must be formatted like 00:00:00';
  } else if (
    Number(values.preparation_time.replace(/[^\d]/g, '').slice(2, 4)) >= 60
  ) {
    errors.preparation_time =
      'Preparation time above 60 minutes must be converted to hours';
  } else if (
    Number(values.preparation_time.replace(/[^\d]/g, '').slice(4, 6)) >= 60
  ) {
    errors.preparation_time =
      'Preparation time above 60 seconds must be converted to minutes';
  }
  
  if (!values.type) {
    errors.type = 'Required';
  }

  if (values.type === 'pizza') {
    if (!values.no_of_slices) {
      errors.no_of_slices = 'Required';
    }

    if (!values.diameter) {
      errors.diameter = 'Required';
    } else if (!/\d+\.\d/.test(values.diameter)) {
      errors.diameter =
        'Diameter must be a float number and must be rounded to one decimal place';
    }
  }

  if (values.type === 'sandwich') {
    if (!values.slices_of_bread) {
      errors.slices_of_bread = 'Required';
    }
  }
  return errors;
}
