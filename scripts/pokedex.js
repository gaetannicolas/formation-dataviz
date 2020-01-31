console.log("Gotta catch'em all !");

const types = {}
const factor = 20
let total = 0;

document.addEventListener("DOMContentLoaded", function() {
  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/pokedex.json',
  )
    .then(resp => resp.json())
    .then(data => {
      getAllTypes(data)

      const chart = document.createElement('ul');
      chart.classList.add('chart');
      document.body.append(chart);

      total = data.length;
      
      Object.entries(types).sort((a, b) => a[1].length - b[1].length)
        .map((item) => createBar(item[0], item[1].length))
        .forEach(bar => chart.append(bar))
    });
})

const getAllTypes = (pokemonList) => {
  pokemonList.forEach((pokemon) => {
    if (types[pokemon['Type 1']]) {
      types[pokemon['Type 1']].push(pokemon)
    } else {
      types[pokemon['Type 1']] = [pokemon]
    }

    if (pokemon['Type 2'] !== 'None') {
      if (types[pokemon['Type 2']]) {
        types[pokemon['Type 2']].push(pokemon)
      } else {
        types[pokemon['Type 2']] = [pokemon]
      }
    }
  })
}

const createBar = (name, number) => {
  const li = document.createElement('li');

  li.textContent = name;
  li.classList.add('bar');
  li.style.height = `${(number / total) * 100 * factor}px`;

  return li;
}