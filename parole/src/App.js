import React, { useState } from 'react';
import './App.css';
import parole from './parole.json'
import { Line } from 'react-chartjs-2'
import randomColor from 'randomcolor'

const App = ({ data }) =>  {

  const [tv, setTv] = useState(true)
  const [radio, setRadio] = useState(true)
  const [openPublic, setOpenPublic] = useState(true)

  console.log('DATA France Culture', data['France Culture']);
  console.log('DATA France O', data['France O']);

  const datasets = Object.entries(data).map(([name, value]) => ({
    label: name,
    data: value.wers,
    borderColor: randomColor(),
    pointRadius: 2,
    fill: false,
  }));

  return (
    <div className="App">
      <Line
        data={{
          labels: data['France Culture'].years,
          // datasets: [
          //   {
          //     label: 'Nostalgie',
          //     data: data['Nostalgie'].wers,
          //     borderColor: randomColor(),
          //     pointRadius: 2,
          //     fill: false,
          //   },
          // ],
          datasets,
        }}
      />
      <button onClick={() => setTv(!tv)}>TV</button>
      <button onClick={() => setRadio(!radio)}>Radio</button>
      <button onClick={() => setOpenPublic(!openPublic)}>Public</button>
    </div>
  );
}

export default App;
