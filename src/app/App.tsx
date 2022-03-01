import React from 'react';
import DishesForm from '../components/DishesForm/DishesForm';
import './App.scss';

export function App() {
  return (
    <div className="App">
      <DishesForm handleSubmit={()=>console.log('on submit')} reset={()=>console.log('on reset')} pristine={undefined} submitting={undefined}/>
    </div>
  );
}
