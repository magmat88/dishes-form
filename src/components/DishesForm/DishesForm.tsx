import React, { useState, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  normalizeDuration,
  normalizeNumberOfSlices,
  normalizeDiameter,
  normalizeRange,
} from '../../utils/dishesFormNormalization';
import { validateDishesForm } from '../../utils/dishesFormValidation';
import { showDishesFormWarnings } from '../../utils/dishesFormWarnings';
import './DishesForm.scss';

interface DishesFormProps {
  handleSubmit: (event: any) => any;
  reset: any;
  pristine: any;
  submitting: any;
}

function renderDishesFormInput(field: any): JSX.Element {
  return (
    <div className="dishesForm__field">
      <label
        className={`dishesForm__label ${
          field.type !== 'range' && field.meta.touched && field.meta.error
            ? 'dishesForm__label--alert'
            : field.type !== 'range' && field.meta.touched && field.meta.warning
            ? 'dishesForm__label--warning'
            : field.type !== 'range' &&
              field.meta.touched &&
              !field.meta.error &&
              !field.meta.warning
            ? 'dishesForm__label--valid'
            : field.type === 'range' && field.meta.touched
            ? 'dishesForm__label--valid'
            : null
        }`}
      >
        {field.label}
      </label>
      <input
        {...field.input}
        type={field.type}
        placeholder={field?.placeholder}
        max={field?.max}
        min={field?.min}
        step={field?.step}
        className={
          field.type !== 'range' && field.meta.touched && field.meta.error
            ? 'dishesForm__input dishesForm__input--standard dishesForm__input--alert'
            : field.type !== 'range' && field.meta.touched && field.meta.warning
            ? 'dishesForm__input dishesForm__input--standard dishesForm__input--warning'
            : field.type !== 'range' &&
              field.meta.touched &&
              !field.meta.error &&
              !field.meta.warning
            ? 'dishesForm__input dishesForm__input--standard dishesForm__input--valid'
            : field.type !== 'range'
            ? 'dishesForm__input dishesForm__input--standard'
            : null
        }
      />
      <article className="dishesForm__error">
        {field.meta.touched && (
          <p className="text--description text--alert">{field.meta.error}</p>
        )}
        {!field.meta.error && field.meta.touched && (
          <p className="text--description text--warning">
            {field.meta.warning}
          </p>
        )}
      </article>
    </div>
  );
}

function renderDishesFormSelect(field: any): JSX.Element {
  return (
    <div className="dishesForm__field">
      <label
        className={`dishesForm__label ${
          field.meta.touched && field.meta.error
            ? 'dishesForm__label--alert'
            : field.meta.touched && !field.meta.error
            ? 'dishesForm__label--valid'
            : null
        }`}
      >
        {field.label}
      </label>
      <select
        {...field.input}
        placeholder={field?.placeholder}
        className={`dishesForm__input ${
          field.meta.touched && field.meta.error
            ? 'dishesForm__input--alert'
            : field.meta.touched && !field.meta.error
            ? 'dishesForm__input--valid'
            : 'dishesForm__input--standard'
        }`}
      >
        <option value="">Select dish type</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>
      <article className="dishesForm__error">
        {field.meta.touched && (
          <p className="text--description text--alert">{field.meta.error}</p>
        )}
      </article>
    </div>
  );
}

function DishNoOfSlicesField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name="no_of_slices"
      placeholder="0"
      label="# of slices"
      type="number"
      normalize={normalizeNumberOfSlices}
    />
  );
}

function DishDiameterField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name="diameter"
      placeholder="0.0"
      label="Diameter"
      type="text"
      normalize={normalizeDiameter}
    />
  );
}

function DishSlicesOfBreadField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name="slices_of_bread"
      label="Number of slices of bread required"
      placeholder="0"
      type="number"
      normalize={normalizeNumberOfSlices}
    />
  );
}

function FormDetailsByDishType(dishType: string): JSX.Element {
  const [rangeVal, setRangeVal] = useState('no selection');

  function handleRangeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRangeVal(event.target.value);
  }

  switch (dishType) {
    case 'pizza':
      return (
        <section>
          <DishNoOfSlicesField />
          <DishDiameterField />
        </section>
      );
    case 'soup':
      return (
        <section>
          <Field
            component={renderDishesFormInput}
            max={10}
            min={1}
            name="spiciness_scale"
            step={1}
            label="Spiciness scale (1-10)"
            type="range"
            value={rangeVal}
            onChange={handleRangeInputChange}
            normalize={normalizeRange}
          />
          <div>Selected spiciness: {rangeVal}</div>
        </section>
      );
    case 'sandwich':
      return (
        <section>
          <DishSlicesOfBreadField />
        </section>
      );
  }
  return <Fragment></Fragment>;
}

function DishNameField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name="name"
      placeholder="Example name"
      label="Dish name"
      type="text"
    />
  );
}

function DishPreparationTimeField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name="preparation_time"
      label="Preparation time"
      type="text"
      pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
      placeholder="00:00:00"
      normalize={normalizeDuration}
    />
  );
}

function DishesForm({
  handleSubmit,
  reset,
  pristine,
  submitting,
}: DishesFormProps): JSX.Element {
  const [dishType, setDishType] = useState<string>('');

  function handleDishTypeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDishType(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="dishesForm">
      <section className="dishesForm__btns">
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
          className="btn btn--light"
        >
          Reset
        </button>
      </section>
      <section className="dishesForm__fields">
        <DishNameField />
        <DishPreparationTimeField />
        <Field
          component={renderDishesFormSelect}
          name="type"
          label="Select dish type"
          placeholder="No dish type selected"
          onChange={handleDishTypeInputChange}
        />

        {FormDetailsByDishType(dishType)}
      </section>
    </form>
  );
}

export default reduxForm<{}, DishesFormProps>({
  form: 'DishesForm',
  validate: validateDishesForm,
  warn: showDishesFormWarnings,
})(DishesForm);
