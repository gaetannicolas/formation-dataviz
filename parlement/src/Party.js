import React from 'react'
import { Line } from 'react-chartjs-2'
import randomColor from 'randomcolor'
import { median } from 'd3-array'
import GroupExplanation from "./GroupExplanation";

const Party = ({ deputesByParty }) => {

  const datasetsSemainesPresences = Object.entries(deputesByParty).map(([name, value]) => {
    return ({
      label: name,
      data: value.semaines_presence,
      borderColor: randomColor(),
      pointRadius: 2,
      fill: false,
    })
  });
  const datasetsCommissionPresences = Object.entries(deputesByParty).map(([name, value]) => {
    return ({
      label: name,
      data: value.commission_presences,
      borderColor: randomColor(),
      pointRadius: 2,
      fill: false,
    })
  });

  const datasetsHemicycleInterventions = Object.entries(deputesByParty).map(([name, value]) => {
    return ({
      label: name,
      data: value.hemicycle_interventions,
      borderColor: randomColor(),
      pointRadius: 2,
      fill: false,
    })
  });

  return (
    <div>
      <h1>Semaines Présences</h1>
      <a href='https://github.com/regardscitoyens/nosdeputes.fr/blob/master/doc/api.md#donn%C3%A9es-dactivit%C3%A9-des-parlementaires'>info</a>
      <Line
        data={{
          labels: deputesByParty['MODEM'].months,
          datasets: datasetsSemainesPresences,
        }}
      />
      <h1>Présences en commission</h1>
      <Line
        data={{
          labels: deputesByParty['MODEM'].months,
          datasets: datasetsCommissionPresences,
        }}
      />
      <h1>Interventions dans l'hemicycle</h1>
      <Line
        data={{
          labels: deputesByParty['MODEM'].months,
          datasets: datasetsHemicycleInterventions,
        }}
      />
      <div>
        <GroupExplanation />
      </div>
    </div>
  )
}

export default Party
