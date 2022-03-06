import React from 'react';
import axios from 'axios';
import { HEADERS, METHOD, URL } from '../config/constants';
import {
  addStringValue,
  addParsedFloatValue,
  addParsedNumberValue,
  showMessageOnSuccess,
} from '../utils/utils';
import DishesForm from '../components/DishesForm/DishesForm';
import './App.scss';

function handleSubmit(event: any) {
  event.preventDefault();
  let allData: any = {};

  for (let element of event.target) {
    allData = {
      ...allData,
      ...addParsedNumberValue(element),
      ...addParsedFloatValue(element),
      ...addStringValue(element),
    };
  }

  axios({
    method: METHOD,
    url: URL,
    headers: HEADERS,
    data: allData,
  })
    .then((response) => {
      alert(showMessageOnSuccess(response));
    })
    .catch((error) => {
      alert(error.message);
    });
}

//source of image: https://pixabay.com/pl/photos/pizza-wz%c3%b3r-tekstura-t%c5%82o-pomidor-5143513/
function ImgHeader() {
  return (
    <figure className="app__img--large">
      <img
        src={require('../images/headerImg.jpg')}
        alt="pizza"
        className="img--fitted"
      />
    </figure>
  );
}

export function App() {
  return (
    <section className="app">
      <ImgHeader />
      <article className="app__dishesForm">
        <DishesForm
          handleSubmit={handleSubmit}
          reset={undefined}
          pristine={undefined}
          submitting={undefined}
        />
      </article>
    </section>
  );
}
