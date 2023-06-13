
// Creating the map object
let myMap = L.map("map", {
        center: [43.6532, -79.3832], // Toronto GTA coordinates: [latitude, longitude]
        zoom: 10 // Adjust the zoom level as needed
      });
      
      // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);

    // cluster marker  
let markerCluster = L.markerClusterGroup();

// Load the restaurant data from app.json
fetch('restaurants.json')
  .then(response => response.json())
  .then(data => {
    // Process the retrieved restaurant data
    // Iterate over the data and create markers for each restaurant
    data.forEach(restaurant => {
      const marker = L.marker([restaurant.latitude, restaurant.longitude])
      .bindPopup(
        "<strong>" + restaurant.restaurant_name + "</strong><br />" +
        "Category: " + restaurant.category + "<br />" +
        "Rating: " + restaurant.rating + "/5"
      );

      markerCluster.addLayer(marker); // Add the marker to the marker cluster group
    });

    myMap.addLayer(markerCluster); // Add the marker cluster group to the map
  })

const provinceData = [
    {
        name: 'Ontario',
        coordinates: [
            [50.000000, -85.000000]
        ],    
    colour:'blue',
    opacity: 0.3,

},
{
        name:'Quebec',
        coordinates:[
            [53.000000, -70.000000]
    ],
    colour:'blue',
    opacity: 0.3,
}
];
provinceData.forEach(province => {
    const polygon = L.polygon(province.coordinates, {
      color: province.color,
      fillOpacity: province.fillOpacity
    });
    polygon.addTo(myMap);
    polygon.name = province.name;
  });
  const desiredProvince = 'Ontario';
  const polygons = myMap.getPane('overlayPane').children; 
  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i];
    if (polygon instanceof L.Polygon && polygon.name === desiredProvince) {
      polygon.addTo(myMap);
    } else {
      myMap.removeLayer(polygon);
    }
  }
// .catch(error => {
//   console.error('Error loading restaurant data:', error);
// });






// .catch(error => {
//     console.error('Error loading restaurant data:', error);
//   });

