import React, { useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { normalizeDuration, normalizeNumberOfSlices, normalizeDiameter } from '../../utils/dishesFormNormalization';
import { validateDishesForm } from '../../utils/dishesFormValidation';
import { showDishesFormWarnings } from '../../utils/dishesFormWarnings';
import './DishesForm.scss';

interface DishesFormProps {
  handleSubmit: (values: any) => any;
  reset: () => any;
  pristine: any;
  submitting: any;
}

function RenderFormInput(field: any): any {
  return (
    <div>
      <label>{field.label}</label>
      <input
        {...field.input}
        type={field.type}
        placeholder={field?.placeholder}
        max={field?.max}
        min={field?.min}
        step={field?.step}
      />
      {field.meta.touched && <p className="text--danger">{field.meta.error}</p>}
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
              component={RenderFormInput}
              name="no_of_slices"
              placeholder="# of slices"
              type="text"
              normalize={normalizeNumberOfSlices}

            />

            <Field
              className="form__input"
              component={RenderFormInput}
              name="diameter"
              placeholder="diameter"
              type="text"
              normalize={normalizeDiameter}
            />
          </section>
        );
      case 'soup':
        return (
          <section>
            <Field
              className="form__input"
              component={RenderFormInput}
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
              component={RenderFormInput}
              name="slices_of_bread"
              label="Number of slices of bread required"
              type="text"
              normalize={normalizeNumberOfSlices}
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
}: DishesFormProps): any {
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
        component={RenderFormInput}
        name="name"
        label="Dish name"
        type="text"
      />

      <Field
        className="form__input"
        component={RenderFormInput}
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

// DishesForm = reduxForm({
//   form: 'dishesForm',
//   // validateDishesForm,
//   // showDishesFormWarnings,
//   // normalizeDuration
// })(DishesForm as any);

// export default DishesForm;

export default reduxForm<{}, DishesFormProps>({
  form: 'DishesForm',
  // validate: validateDishesForm,
  // warn: showDishesFormWarnings,
})(DishesForm);
