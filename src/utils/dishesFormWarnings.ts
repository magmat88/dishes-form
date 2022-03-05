export function showDishesFormWarnings({ values }: any): any {
  const warnings: any = {};
  if (
    Number(values?.preparation_time.replace(/[^\d]/g, '').slice(0, 2)) === 0 &&
    Number(values?.preparation_time.replace(/[^\d]/g, '').slice(2, 4)) < 5
  ) {
    warnings.preparation_time =
      'It seems to be not enough time to prepare a meal';
  }

  if (Number(values?.diameter) < 15.0) {
    warnings.diameter = 'Diameter seems to be too small';
  }

  if (Number(values?.diameter) > 50.0) {
    warnings.diameter = 'Diameter seems to be exceeding the width of the oven';
  }

  if (Number(values?.slices_of_bread) < 2) {
    warnings.slices_of_bread =
      'It seems to be not enough slices of bread to prepare a sandwich';
  }

  if (Number(values?.slices_of_bread) > 10) {
    warnings.slices_of_bread =
      'It seems to be too many slices of bread to prepare a single sandwich';
  }

  return warnings;
}
