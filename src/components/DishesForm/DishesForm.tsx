import React, { useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { normalizeDuration } from '../../utils/dishesFormNormalization';
import { validateDishesForm } from '../../utils/dishesFormValidation';
import { showDishesFormWarnings } from '../../utils/dishesFormWarnings';
import './DishesForm.scss';

interface DishesFormProps {
  handleSubmit: (values: any) => any;
  reset: () => any;
  pristine: any;
  submitting: any;
}

interface RenderTextOrNumberFieldProps {
  input: any;
  label: any;
  type: any;
  max: number | undefined;
  min: number | undefined;
  step: number | undefined;  
  className: string;
  meta: { touched: any; error: any; warning: any };
}

interface RenderRangeFieldProps {
  input: any;
  label: any;
  type: any;
  step: number | undefined;
  className: string;
  max: number | undefined;
  min: number | undefined;
  meta: { touched: any; error: any; warning: any };
}

function renderTextOrNumberField({
  input,
  label,
  type,
  className,
  step=undefined,
  max=undefined,
  min=undefined,
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
  // validateDishesForm,
  // showDishesFormWarnings,
  // normalizeDuration
})(DishesForm as any);

export default DishesForm;

// export default reduxForm({
//   form: 'dishesForm',
//   // validateDishesForm,
//   // showDishesFormWarnings,
//   // normalizeDuration
// })(DishesForm)