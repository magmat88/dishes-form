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
      data[element.name] = element.value;
    }
  }

  axios({
    method: 'post',
    url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}

function handleReset() {
  return;
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
          reset={handleReset}
          pristine={undefined}
          submitting={undefined}
          error={undefined}
        />
      </section>
    </main>
  );
}
