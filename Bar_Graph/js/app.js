fetch('restaurant.json')
  .then(response => response.json())
  .then(data => createBarChart(data))
  .catch(error => console.error(error));

  console.log(restaurant)