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
      countPokemonByType(data)

      const sortedTyped = sortObject(types)

      const chart = document.createElement('ul');
      chart.classList.add('chart');
      document.body.append(chart);

      total = data.length;

      for (let [key, value] of Object.entries(sortedTyped)) {
        const bar = createBar(key, value.length)
        chart.append(bar);
      }
    });
})

const getAllTypes = (pokemonList) => {
  pokemonList.forEach((pokemon) => {
    types[pokemon['Type 1']] = []
    if (pokemon['Type 2'] !== 'None') {
      types[pokemon['Type 2']] = []
    }
  })
}

const countPokemonByType = (pokemonList) => {
  pokemonList.forEach((pokemon) => {
    types[pokemon['Type 1']].push(pokemon.Name)
    if (pokemon['Type 2'] !== 'None') {
      types[pokemon['Type 2']].push(pokemon.Name)
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

const sortObject = (types) => {
  var sortable = [];
  for (var type in types) {
      sortable.push([type, types[type]]);
  }

  sortable.sort(function(a, b) {
      return a[1].length - b[1].length;
  });

  var objSorted = {}
  sortable.forEach(function(item){
      objSorted[item[0]]=item[1]
  })

  return objSorted
}