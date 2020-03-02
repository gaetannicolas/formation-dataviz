import React, { useState } from 'react';
import './App.css';
import Party from './Party'
import { median } from 'd3-array'


const App = ({ months, allDeputes, deputesByMonths }) =>  {
  const deputesByPartybyMonth = {}

  Object.keys(deputesByMonths).forEach((month) => {
    deputesByPartybyMonth[month] = {}
    const groupeSet = new Set

    deputesByMonths[month].map((dep) => {
      groupeSet.add(dep.groupe)
      deputesByPartybyMonth[month] = {}
    })
    groupeSet.forEach((groupe) => {
      deputesByPartybyMonth[month][groupe] = {
        semaines_presence: [],
        commission_presences: [],
        hemicycle_interventions: []
      }
    })
    deputesByMonths[month].map((dep) => {
      deputesByPartybyMonth[month][dep.groupe].semaines_presence.push(dep.semaines_presence)
      deputesByPartybyMonth[month][dep.groupe].commission_presences.push(dep.commission_presences)
      deputesByPartybyMonth[month][dep.groupe].hemicycle_interventions.push(dep.hemicycle_interventions)
    })
  })

  const data = {}
  const partyData = {}
  console.log(deputesByPartybyMonth)

  Object.entries(deputesByPartybyMonth).forEach(([month, value]) => {
    Object.entries(value).forEach(([groupe, groupeValue]) => {
      data[groupe] = {
        months: [...months],
        semaines_presence: [],
        commission_presences: [],
        hemicycle_interventions: []
      }
      partyData[groupe] = []
    })
  })

  Object.entries(data).forEach(([party, values]) => {
    values.months.map((month) => {
      if (deputesByPartybyMonth[month][party]) {
        data[party].semaines_presence.push(median(deputesByPartybyMonth[month][party].semaines_presence))
        data[party].commission_presences.push(median(deputesByPartybyMonth[month][party].commission_presences))
        data[party].hemicycle_interventions.push(median(deputesByPartybyMonth[month][party].hemicycle_interventions))
      } else {
        data[party].semaines_presence.push(null)
        data[party].commission_presences.push(null)
        data[party].hemicycle_interventions.push(null)
      }
    })
  })

  return (
    <div className="App">
      <Party deputesByParty={data} />
    </div>
  );
}

export default App;
