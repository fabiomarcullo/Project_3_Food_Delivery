// 1. Use the D3 library to read in the JSON data
const file = "app.json";
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

function init() {
  // Grab a reference to the dropdown select elements
  var selector1 = d3.select("#selDatasetprovince");
  var selector2 = d3.select("#selDatasetcategory");
  var selector3 = d3.select("#selDatasetrating");

  // Use the data promise to populate the dropdown menus
  dataPromise.then((data) => {
    var addresses = Array.from(new Set(data.map((d) => d.address)));
    var categories = Array.from(new Set(data.map((d) => d.category)));
    var ratings = Array.from(new Set(data.map((d) => d.rating)));

    addresses.forEach((address) => {
      selector1.append("option").text(address).property("value", address);
    });

    categories.forEach((category) => {
      selector2.append("option").text(category).property("value", category);
    });

    ratings.forEach((rating) => {
      selector3.append("option").text(rating).property("value", rating);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = addresses[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}