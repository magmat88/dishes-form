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
      <label className="dishesForm__label dishesForm__label--standard">
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
          field.type !== 'range'
            ? `dishesForm__input dishesForm__input--standard`
            : null
        }
      />
      {field.meta.touched && <p className="text--danger">{field.meta.error}</p>}
      {!field.meta.error && field.meta.touched && (
        <p className="text--danger">{field.meta.warning}</p>
      )}
    </div>
  );
}

function renderDishesFormSelect(field: any): JSX.Element {
  return (
    <div className="dishesForm__field">
      <label className="dishesForm__label dishesForm__label--standard">
        {field.label}
      </label>
      <select
        {...field.input}
        placeholder={field?.placeholder}
        className="dishesForm__input dishesForm__input--standard"
      >
        <option value="">Select dish type</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>
      {field.meta.touched && <p className="text--danger">{field.meta.error}</p>}
      {!field.meta.error && field.meta.touched && (
        <p className="text--alert">{field.meta.warning}</p>
      )}
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
      <section className="dishesForm__btns">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn--contrast btn--hidden"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={pristine || submitting}
          className="btn btn--light btn--hidden"
        >
          Reset
        </button>
        <p id="response"></p>
      </section>
    </form>
  );
}

export default reduxForm<{}, DishesFormProps>({
  form: 'DishesForm',
  validate: validateDishesForm,
  warn: showDishesFormWarnings,
})(DishesForm);
