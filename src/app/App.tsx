import React from 'react';
// import { Values } from 'redux-form-website-template';
import DishesForm from '../components/DishesForm/DishesForm';
import './App.scss';

export function App() {
  return (
    <div className="app">
      <DishesForm handleSubmit={()=>console.log('on submit')} reset={()=>console.log('on reset')} pristine={undefined} submitting={undefined}/>
      {/* <Values form="dishesForm" /> */}
    </div>
  );
}
