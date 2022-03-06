import React, { useState, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import {
  normalizeDuration,
  normalizeNumberOfSlices,
  normalizeDiameter,
  normalizeRange,
  showDishesFormWarnings,
  validateDishesForm,
} from "../../utils/utils";
import {
  BUTTON_TYPE_BUTTON,
  BUTTON_TYPE_SUBMIT,
  DISH_TYPE_PIZZA,
  DISH_TYPE_SANDWICH,
  DISH_TYPE_SOUP,
  FIELD_NAME_DIAMETER,
  FIELD_NAME_NAME,
  FIELD_NAME_NO_OF_SLICES,
  FIELD_NAME_PREPARATION_TIME,
  FIELD_NAME_SLICES_OF_BREAD,
  FIELD_NAME_SPICINESS_SCALE,
  FIELD_TYPE_NUMBER,
  FIELD_TYPE_RANGE,
  FIELD_TYPE_TEXT
} from "../../config/constants";
import "./DishesForm.scss";

interface DishesFormProps {
  handleSubmit: (event: any) => any;
  reset: any;
  pristine: any;
  submitting: any;
}

function renderDishesFormInput(field: any): JSX.Element {
  const labelStyle = `dishesForm__label ${
    field.type !== FIELD_TYPE_RANGE && field.meta.touched && field.meta.error
      ? "dishesForm__label--alert"
      : field.type !== FIELD_TYPE_RANGE &&
        field.meta.touched &&
        field.meta.warning
      ? "dishesForm__label--warning"
      : field.type !== FIELD_TYPE_RANGE &&
        field.meta.touched &&
        !field.meta.error &&
        !field.meta.warning
      ? "dishesForm__label--valid"
      : field.type === FIELD_TYPE_RANGE && field.meta.touched
      ? "dishesForm__label--valid"
      : ""
  }`;

  const inputStyle = `${
    field.type !== FIELD_TYPE_RANGE
      ? "dishesForm__input dishesForm__input--standard"
      : field.type === FIELD_TYPE_RANGE
      ? "rangeInput"
      : ""
  }`;

  return (
    <div className="dishesForm__field">
      <label className={labelStyle}>{field.label}</label>
      <input
        {...field.input}
        type={field.type}
        placeholder={field?.placeholder}
        max={field?.max}
        min={field?.min}
        step={field?.step}
        className={inputStyle}
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
  const selectLabelStyle = `dishesForm__label ${
    field.meta.touched && field.meta.error
      ? "dishesForm__label--alert"
      : field.meta.touched && !field.meta.error
      ? "dishesForm__label--valid"
      : ""
  }`;

  return (
    <div className="dishesForm__field">
      <label
        className={selectLabelStyle}
      >
        {field.label}
      </label>
      <select
        {...field.input}
        placeholder={field?.placeholder}
        className="dishesForm__input dishesForm__input--standard"
      >
        <option value="">select dish type</option>
        <option value={DISH_TYPE_PIZZA}>{DISH_TYPE_PIZZA}</option>
        <option value={DISH_TYPE_SOUP}>{DISH_TYPE_SOUP}</option>
        <option value={DISH_TYPE_SANDWICH}>{DISH_TYPE_SANDWICH}</option>
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
      name={FIELD_NAME_NO_OF_SLICES}
      placeholder="0"
      label="# of slices"
      type={FIELD_TYPE_NUMBER}
      normalize={normalizeNumberOfSlices}
    />
  );
}

function DishDiameterField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name={FIELD_NAME_DIAMETER}
      placeholder="0.0"
      label="Diameter"
      type={FIELD_TYPE_TEXT}
      normalize={normalizeDiameter}
    />
  );
}

function DishSlicesOfBreadField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name={FIELD_NAME_SLICES_OF_BREAD}
      label="Number of slices of bread required"
      placeholder="0"
      type={FIELD_TYPE_NUMBER}
      normalize={normalizeNumberOfSlices}
    />
  );
}

function FormDetailsByDishType(dishType: string): JSX.Element {
  const [rangeVal, setRangeVal] = useState("");

  function handleRangeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRangeVal(event.target.value);
  }

  switch (dishType) {
    case DISH_TYPE_PIZZA:
      return (
        <section>
          <DishNoOfSlicesField />
          <DishDiameterField />
        </section>
      );
    case DISH_TYPE_SOUP:
      return (
        <section className="dishesForm__rangeField">
          <Field
            component={renderDishesFormInput}
            max={10}
            min={1}
            name={FIELD_NAME_SPICINESS_SCALE}
            step={1}
            label="Spiciness scale (1-10)"
            type={FIELD_TYPE_RANGE}
            value={rangeVal}
            onChange={handleRangeInputChange}
            normalize={normalizeRange}
          />
          <article className="selectedSpiciness">
            <p>{rangeVal}</p>
          </article>
        </section>
      );
    case DISH_TYPE_SANDWICH:
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
      name={FIELD_NAME_NAME}
      placeholder="example name"
      label="Dish name"
      type={FIELD_TYPE_TEXT}
    />
  );
}

function DishPreparationTimeField(): JSX.Element {
  return (
    <Field
      component={renderDishesFormInput}
      name={FIELD_NAME_PREPARATION_TIME}
      label="Preparation time"
      type={FIELD_TYPE_TEXT}
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
  const [dishType, setDishType] = useState<string>("");

  function handleDishTypeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDishType(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="dishesForm">
      <section className="dishesForm__btns">
        <button
          type={BUTTON_TYPE_SUBMIT}
          disabled={submitting}
          className="btn btn--contrast"
        >
          Submit
        </button>
        <button
          type={BUTTON_TYPE_BUTTON}
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
  form: "DishesForm",
  validate: validateDishesForm,
  warn: showDishesFormWarnings,
})(DishesForm);
