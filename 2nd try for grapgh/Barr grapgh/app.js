fetch('restaurant.json')
  .then(response => response.json())
  .then(data => { console.log(data)})

// filter_provinces = data.filter(item => item.province);
// filter_cuisines = data.filter(item => item.category)


// let trace1 = {
//   x: filter_provinces,
//   y: filter_cuisines,
//   text: labels_slicedData,
//   orientation: "h",
//   type: "bar"
// };


// let traceData = [trace1];

// let layout = {
//   title: "horizontal bar chart ",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }

// }


// Plotly.newPlot("bar", traceData, layout);
// })
// }