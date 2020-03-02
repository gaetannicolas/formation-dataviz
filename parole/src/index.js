import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

import paroles from './parole.json';

// Trier
paroles.sort((p1, p2) => p1.year - p2.year);

console.log('Parole', paroles);

const data = {};

// Récupérer tous les noms uniques
const nameSet = new Set(paroles.map(p => p.channel_name));
const names = [...nameSet];

names.forEach(name => {
  // Pour une radio, créer la donnée utile
  const nameData = paroles.filter(p => p.channel_name === name);

  const xy = nameData.map(c => ({ x: c.year, y: c.women_expression_rate }));
  const years = nameData.map(c => c.year);
  const wers = nameData.map(c => c.women_expression_rate);

  const dataObject = {
    xy,
    years,
    wers,
  };

  data[name] = dataObject;
});

function getAllYears(data) {
  return Object.values(data).reduce((acc, cur) => {
    return [...new Set([...acc, ...cur.years].sort())];
  }, []);
}

console.log('YEARS', getAllYears(data));

function harmonize(data) {
  const allYears = getAllYears(data);
  const newData = Object.entries(data).map(([name, value]) => {
    const newWers = allYears.map(year => {
      if (value.years.includes(year)) {
        const i = value.years.findIndex(y => y === year);
        return value.wers[i];
      }
      return null;
    });

    return [
      name,
      {
        years: allYears,
        wers: newWers,
      },
    ];
  });

  return Object.fromEntries(newData);
}

console.log('Data', data);
console.log('Harmonize Data', harmonize(data));

ReactDOM.render(<App data={harmonize(data)} />, document.getElementById('root'));
serviceWorker.unregister();
