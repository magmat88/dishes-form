import React from 'react';
import { SubmissionError } from 'redux-form';
import DishesForm from '../components/DishesForm/DishesForm';
import axios from 'axios';

import './App.scss';

function handleSubmit(event: any) {
  event.preventDefault();
  // window.alert(JSON.stringify(event));
  // console.log(JSON.stringify(event));
  const data: any = {};
  for (let element of event.target) {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
      data[element.name] = element.value;
    }
  }

  // console.log(data)
  // console.log(JSON.stringify(data))
  // const inputs = event.target.filter((element: any) => element.tagName === 'INPUT');
  // console.log(inputs);
  // const values = event.target.map((element: HTMLInputElement) => element.value);
  // console.log(values)
  axios({
    method: 'post',
    url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(data),
  })
    // .then((res: any) => res.json())
    // .catch((error: any) => {
    //   console.log(error);
    // });
    .then((response) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });

  // new Promise((resolve, reject) => {
  //   fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.hasOwnProperty('errors')) {
  //         reject(res.errors);
  //       } else {
  //         resolve(res.data);
  //       }
  //     });
  // reset form
}

function handleReset() {
  return;
}

export function App() {
  return (
    <main className="app">
      <section className="app__header">
        <h1 className="app__text--large">Select Your dish</h1>
        <ul className="app__dishList--unordered">
          <li>Pizza</li>
          <li>Soup</li>
          <li>Sandwich</li>
        </ul>
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
