var map = L.map('map').setView([56.1304, -106.3468], 4);

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.geoJson(statesData).addTo(map);

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}


// // Load the GeoJSON data.
let geoData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/ACS-ED_2014-2018_Economic_Characteristics_FL.geojson";

let geojson;

// // Get the data with d3.
// d3.json(geoData).then(function(data) {

//   console.log(data);

  // Create a new choropleth layer.

    // Define which property in the features to use.

    // Set the color scale.

    // The number of breaks in the step range

    // q for quartile, e for equidistant, k for k-means

    // Binding a popup to each layer

  // Set up the legend.

    // Add the minimum and maximum

  // Adding the legend to the map.

// });
