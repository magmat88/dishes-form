import React from 'react';
import { SubmissionError } from 'redux-form';
import DishesForm from '../components/DishesForm/DishesForm';
import axios from 'axios';
import './App.scss';

function handleSubmit(event: any) {
  event.preventDefault();
  const data: any = {};
  for (let element of event.target) {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
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
    url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  })
    .then((response) => {
      console.log(`${response.data}`);
    })
    .catch((error: any) => {
      console.log(error.data);
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
          error={undefined}
        />
      </section>
    </main>
  );
}
