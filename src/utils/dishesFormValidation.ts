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
export function validateDishesForm({ values }: Errors) {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must contain of 3 characters or more';
  }

  if (!values.preparation_time) {
    errors.preparation_time = 'Required';
  } else if (
    Number(
      values.preparation_time
        .replace(/[^\d]/g, '')
        .slice(2, 4)) >= 60
  ) {
    errors.preparation_time = 'Duration above 60 minutes must be converted to hours';
  } else if (
    Number(
      values.preparation_time
        .replace(/[^\d]/g, '')
        .slice(4, 6)) >= 60
  ) {
    errors.preparation_time = 'Duration above 60 seconds must be converted to hours';
  }

  if (!values.type) {
    errors.type = 'Required';
  }

  if (values.type === 'pizza') {
    if (!values.no_of_slices) {
      errors.no_of_slices = 'Required';
    } else if (isNaN(Number(values.no_of_slices))) {
      errors.no_of_slices = 'No of slices must be a number';
    } else if (!Number.isInteger(values.no_of_slices)) {
      errors.no_of_slices = 'No of slices must be an integer';
    } else if (Number(values.no_of_slices) < 2) {
      errors.no_of_slices = 'No of slices must be at least 1';
    }

    if (!values.diameter) {
      errors.diameter = 'Required';
    } else if (isNaN(Number(values.diameter))) {
      errors.diameter = 'Diameter must be a number';
    } else if (Number(values.diameter.toFixed(1)) !== Number(values.diameter)) {
      errors.diameter = 'Diameter must be rounded to one decimal place';
    }
  }

  if (values.type === 'soup') {
    if (!values.spiciness_scale) {
      errors.spiciness_scale = 'Required';
    }
  }

  if (values.type === 'sandwich') {
    if (!values.slices_of_bread) {
      errors.slices_of_bread = 'Required';
    } else if (isNaN(Number(values.slices_of_bread))) {
      errors.slices_of_bread = 'Slices of bread must be a number';
    } else if (!Number.isInteger(values.slices_of_bread)) {
      errors.slices_of_bread = 'No of slices of bread must be an integer';
    }
  }
  return errors;
}
