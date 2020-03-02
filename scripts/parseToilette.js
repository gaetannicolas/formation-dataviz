import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'

const results = [];

fs.createReadStream(path.join(__dirname, '..', 'data', 'toilettes.csv'))
  .pipe(csv())
  .on('data', (data) => {
    return results.push({
      entityId: data.entityid,
      address: data.adresse,
      name: data.nom,
      topology: data.typologie,
      lat: data.y_lat,
      lng: data.x_long,
    })
  })
  .on('end', () => {
    // console.log(results);
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'toilettes.json'), JSON.stringify(results))
  });