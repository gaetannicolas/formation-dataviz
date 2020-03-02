import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'

const results = [];

fs.createReadStream(path.join(__dirname, '..', 'data', 'parole.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'parole.json'), JSON.stringify(results))
  });