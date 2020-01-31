console.log('Good luck space cowboy !');


document.addEventListener("DOMContentLoaded", function() {


  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/population.json'
  )
  .then(res => res.json())
  .then(resData => dataViz(resData))
  // code
  const container = document.getElementById('container')

  const dataViz = (arrayData) => {
    arrayData.map((city) => {
      console.log(city)

      const item = document.createElement('div')
      const p = document.createElement('p')
      p.innerHTML = city.name
      
      item.setAttribute('style', `height: ${city.population / 5000}px` )
      item.classList.add('item')
      
      item.appendChild(p)
      container.appendChild(item)
    })
  }
});
