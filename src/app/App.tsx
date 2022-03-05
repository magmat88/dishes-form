import React from 'react';
// import { Values } from 'redux-form-website-template';
import DishesForm from '../components/DishesForm/DishesForm';
import './App.scss';

//use ajax

function handleSubmit(values: any) {
  // window.alert(JSON.stringify(values));
  // console.log(JSON.stringify(values));
  new Promise((resolve, reject) => {
    fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
      method: 'post',
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.hasOwnProperty('errors')) {
          reject(res.errors);
        } else {
          resolve(res.data);
        }
      });
  });
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
        />
      </section>
    </main>
  );
}
