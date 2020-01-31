console.log('Good luck space cowboy !');


document.addEventListener("DOMContentLoaded", function() {


  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/population.json'
  )
  .then(res => res.json())
  .then(resData => {
    dataViz(resData)

    var ctx = document.getElementById('myChart');

    const cityTab = resData.map((city) => (city.population))
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: resData.map((city) => (city.name)),
        datasets: [{
          data: cityTab
        }]
      }
    })
  })
  // code
  const container = document.getElementById('container')

  const dataViz = (arrayData) => {
    arrayData.map((city) => {
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
