import React, { useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import {normalizeDuration} from '../../utils/normalizeDuration';
import './DishesForm.scss';

interface DishesFormProps {
  handleSubmit: () => any;
  reset: () => any;
  pristine: any;
  submitting: any;
}

interface RenderTextOrNumberFieldProps {
  input: any;
  label: any;
  type: any;
  step: number;
  className: string;
  meta: { touched: any; error: any; warning: any };
}

interface RenderRangeFieldProps {
  input: any;
  label: any;
  type: any;
  step: number;
  className: string;
  max: number;
  min: number;
  meta: { touched: any; error: any; warning: any };
}

interface DishFormValidateProps {
  values: any;
}

interface WarnProps {
  values: any;
}

function renderTextOrNumberField({
  input,
  label,
  type,
  className,
  step,
  meta: { touched, error, warning },
}: RenderTextOrNumberFieldProps): JSX.Element {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={className}
          step={step}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
}

function renderRangeField({
  input,
  label,
  type,
  className,
  max,
  min,
  step,
  meta: { touched, error, warning },
}: RenderRangeFieldProps): JSX.Element {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={className}
          step={step}
          max={max}
          min={min}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
}

function dishFormValidate({ values }: any): any {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must contain of 3 characters or more';
  }
  // TODO: validate format of time 0:00:00
  if (!values.preparation_time) {
    errors.preparation_time = 'Required';
  } else if (isNaN(Number(values.preparation_time))) {
    errors.preparation_time = 'No of slices must be a number';
  } else if (!Number.isInteger(values.preparation_time)) {
    errors.preparation_time = 'No of slices must be an integer';
  } else if (Number(values.preparation_time) < 2) {
    errors.preparation_time = 'No of slices must be at least 1';
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

function warn({ values }: WarnProps): any {
  const warnings: any = {};
  // TODO - check if it is enough time - wytnij minuty ze stringu
  if (values.preparation_time) {
    warnings.preparation_time =
      'It seems to be not enough time to prepare a meal';
  }

  if (Number(values.diameter) < 15.0) {
    warnings.diameter = 'Diameter seems to be too small';
  }

  if (Number(values.diameter) > 50.0) {
    warnings.diameter = 'Diameter seems to be exceeding the width of the oven';
  }

  if (Number(values.slices_of_bread) < 2) {
    warnings.slices_of_bread =
      'It seems to be not enough slices of bread to prepare a sandwich';
  }

  if (Number(values.slices_of_bread) > 10) {
    warnings.slices_of_bread =
      'It seems to be too many slices of bread to prepare a single sandwich';
  }

  return warnings;
}

function renderFormFieldsByDishType(dishType: string): any {
  if (dishType) {
    switch (dishType) {
      case 'pizza':
        return (
          <section>
            <Field
              className="form__input"
              component={renderTextOrNumberField}
              name="no_of_slices"
              placeholder="# of slices"
              step="1"
              type="number"
            />

            <Field
              className="form__input"
              component={renderTextOrNumberField}
              name="diameter"
              placeholder="diameter"
              step="0.01"
              type="number"
            />
          </section>
        );
      case 'soup':
        return (
          <section>
            <Field
              className="form__input"
              component={renderRangeField}
              max="10"
              min="1"
              name="spiciness_scale"
              step="1"
              label="Spiciness scale (1-10)"
              type="range"
            />
          </section>
        );
      case 'sandwich':
        return (
          <section>
            <Field
              className="form__input"
              component={renderTextOrNumberField}
              name="slices_of_bread"
              label="Number of slices of bread required"
              step="1"
              type="number"
            />
          </section>
        );
    }
  }
}

function DishesForm({
  handleSubmit,
  reset,
  pristine,
  submitting,
}: DishesFormProps): JSX.Element {
  const [dishType, setDishType] = useState<string>('');
  // useEffect({}, [dishType]);

  function handleDishTypeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDishType(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field
        className="form__input"
        component={renderTextOrNumberField}
        name="name"
        label="Dish name"
        type="text"
      />

      <Field
        className="form__input"
        component="input"
        name="preparation_time"
        label="Preparation time"
        type="text"
        pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
        placeholder="00:00:00"
        normalize={normalizeDuration}
      />

      <Field
        className="form__input"
        component="select"
        name="type"
        onChange={handleDishTypeInputChange}
      >
        <option value="">Select dish type</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </Field>

      {renderFormFieldsByDishType(dishType)}
      
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn--contrast"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={pristine || submitting}
          className="btn btn--white"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

DishesForm = reduxForm({
  form: 'dishesForm',
})(DishesForm as any);

export default DishesForm;
