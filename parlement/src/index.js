import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

import deputesByMonths from './deputesByMonths.json';

const getAllDeputes = (data) => {
  const deputesSet = new Set

  Object.keys(deputesByMonths).forEach((month) => {
    data[month].map((dep) => {
      deputesSet.add(dep.nom)
    })
  })

  return [...deputesSet]
}

const months = Object.keys(deputesByMonths)
const allDeputes = getAllDeputes(deputesByMonths)

ReactDOM.render(<App months={months} allDeputes={allDeputes} deputesByMonths={deputesByMonths} />, document.getElementById('root'));
serviceWorker.unregister();
