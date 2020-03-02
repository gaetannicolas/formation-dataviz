import React, { useState } from 'react';
import './App.css';
import Party from './Party'
import Detail from './Detail'
import { median } from 'd3-array'


const App = ({ months, allDeputes, deputesByMonths }) =>  {
  const [detail, setDetail] = useState(null)

  const deputesByPartybyMonth = {}
  const partyData = {}
  const data = {}
  const personData = {}

  allDeputes.forEach((depName) => {
    personData[depName] = {
      months: [],
      semaines_presence: [],
      commission_presences: [],
      hemicycle_interventions: []
    }

    Object.keys(deputesByMonths).forEach((month) => {
      const filteredDep = deputesByMonths[month].filter((depData) => depData.nom  === depName)
      personData[filteredDep[0].nom].months.push(month)
      personData[filteredDep[0].nom].semaines_presence.push(filteredDep[0].semaines_presence)
      personData[filteredDep[0].nom].commission_presences.push(filteredDep[0].commission_presences)
      personData[filteredDep[0].nom].hemicycle_interventions.push(filteredDep[0].hemicycle_interventions)
      
    })
  })

  Object.keys(deputesByMonths).forEach((month) => {
    deputesByPartybyMonth[month] = {}
    const groupeSet = new Set

    deputesByMonths[month].map((dep) => {
      groupeSet.add(dep.groupe)
      partyData[dep.groupe] = []
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
      partyData[dep.groupe].push(dep)
      deputesByPartybyMonth[month][dep.groupe].semaines_presence.push(dep.semaines_presence)
      deputesByPartybyMonth[month][dep.groupe].commission_presences.push(dep.commission_presences)
      deputesByPartybyMonth[month][dep.groupe].hemicycle_interventions.push(dep.hemicycle_interventions)
    })
  })

  Object.entries(deputesByPartybyMonth).forEach(([month, value]) => {
    Object.entries(value).forEach(([groupe, groupeValue]) => {
      data[groupe] = {
        months: [...months],
        semaines_presence: [],
        commission_presences: [],
        hemicycle_interventions: []
      }
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
      {!detail && <Party deputesByParty={data} partiesData={partyData} />}
      {detail && <Detail data={personData[detail]} name={detail} setDetail={setDetail} />}
      <div>
      {
        allDeputes.map((dep) => (
          <button onClick={() => setDetail(dep)}>{dep}</button>
        ))
      }
      </div>
    </div>
  );
}

export default App;
