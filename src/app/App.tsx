import React from 'react';
// import { Values } from 'redux-form-website-template';
import DishesForm from '../components/DishesForm/DishesForm';
import './App.scss';

function handleSubmit(values: any): any {
  // window.alert(JSON.stringify(values));
  console.log(JSON.stringify(values));

}

export function App() {
  return (
    <div className="app">
      <DishesForm
        handleSubmit={handleSubmit}
        reset={() => console.log('on reset')}
        pristine={undefined}
        submitting={undefined}
      />
      {/* <Values form="dishesForm" /> */}
    </div>
  );
}
