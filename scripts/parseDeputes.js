import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'

const results = {};

const months = ['202001', '201912', '201911', '201910', '201909', '201908', '201907', '201906', '201905', '201904', '201903', '201902'];
// console.log(months.length, months)

// const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'parlement' , `nosdeputes.fr_201908_stats_deputes.json`))
// console.log(JSON.parse(data))
  
months.forEach((month) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'parlement', `nosdeputes.fr_${month}_stats_deputes.json`)))
  results[month] = data.deputes.map((dep) => {
    return {
      id: dep.depute.id,
      nom: dep.depute.nom,
      groupe: dep.depute.groupe,
      hemicycle_interventions: dep.depute.hemicycle_interventions + dep.depute.hemicycle_interventions_courtes,
      commission_presences: dep.depute.commission_presences,
      semaines_presence: dep.depute.semaines_presence,
    }
  })
})
console.log(results)
fs.writeFileSync(path.join(__dirname, '..', 'data', 'deputesByMonths.json'), JSON.stringify(results))