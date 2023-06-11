let url = '/api'

d3.json(url).then((response) => {
  
  let newYorkCoords = [40.73, -74.0059];
  let mapZoomLevel = 12;

  let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let baseMaps = {
    "Street Map": streets
  }

  let stations = response.data.stations
  
  let bikeMarkers = []

  for (let i = 0; i < stations.length; i++) {
    let station = stations[i]
    let bikeCoords = [station.lat, station.lon]
    let bikeMarker = L.marker(bikeCoords).bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>")
    bikeMarkers.push(bikeMarker)
  }

  let bicycleStations = L.layerGroup(bikeMarkers)

  let overlayMaps = {
    "Bicycle Stations": bicycleStations
  }
  
  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streets, bicycleStations]
  })
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)

})


