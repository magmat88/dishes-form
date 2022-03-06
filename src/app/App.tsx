import React from 'react';
import DishesForm from '../components/DishesForm/DishesForm';
import { TAGNAME_INPUT, TAGNAME_SELECT, URL } from '../config/constants';
import axios from 'axios';
import './App.scss';

function handleSubmit(event: any) {
  //check if there are no Validation errors

  event.preventDefault();
  const data: any = {};
  for (let element of event.target) {
    if (element.tagName === TAGNAME_INPUT || element.tagName === TAGNAME_SELECT) {
      if (
        element.name === 'no_of_slices' ||
        element.name === 'slices_of_bread' ||
        element.name === 'spiciness_scale'
      ) {
        data[element.name] = parseInt(element.value);
      } else if (element.name === 'diameter') {
        data[element.name] = parseFloat(element.value);
      } else if (
        element.name === 'name' ||
        element.name === 'preparation_time' ||
        'type'
      ) {
        data[element.name] = element.value;
      }
    }
  }

  axios({
    method: 'post',
    url: URL,
    headers: { 'Content-Type': 'application/json' },
    data: data,
  })
    .then((response) => {
      let details = '';

      if (response.data.type === 'pizza') {
        details = `no of slices: ${response.data.no_of_slices}
      diameter: ${response.data.diameter}`;
      } else if (response.data.type === 'soup') {
        details = `spiciness scale: ${response.data.spiciness_scale}`;
      } else if (response.data.type === 'sandwich') {
        details = `no of slices of bread: ${response.data.slices_of_bread}`;
      }

      const message = `
      Submitted successfully.

      Selected dish:

      id: ${response.data.id}
      name: ${response.data.name}
      preparation time: ${response.data.preparation_time}
      dish type: ${response.data.type}
      ${details}
      `;
      alert(message);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export function App() {
  return (
    <main className="app">
      <section className="app__header">
        <h1 className="app__text--large">Select Your dish</h1>
        {'here will be a photo'}
      </section>
      <section className="app__dishesForm">
        <DishesForm
          handleSubmit={handleSubmit}
          reset={undefined}
          pristine={undefined}
          submitting={undefined}
        />
      </section>
    </main>
  );
}
