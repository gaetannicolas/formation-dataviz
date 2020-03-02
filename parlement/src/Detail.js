import React from 'react'
import { Line } from 'react-chartjs-2'
import randomColor from 'randomcolor'

const Detail = ({ data, name, setDetail }) => {

  const utilsData = {
    semaines_presence: data.semaines_presence,
    commission_presences: data.commission_presences,
    hemicycle_interventions: data.hemicycle_interventions
  }

  const datasets = Object.entries(utilsData).map(([name, value]) => {
    return ({
      label: name,
      data: value,
      borderColor: randomColor(),
      pointRadius: 2,
      fill: false,
    })
  });

  return (
    <div>
      <button onClick={() => setDetail(null)}>Retour</button>
      <p>Detail {name} </p>
      <Line
        data={{
          labels: data.months,
          datasets
        }}
      />
    </div>
  )
}

export default Detail
