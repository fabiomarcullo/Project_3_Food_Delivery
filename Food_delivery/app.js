function init() {
  // Grab a reference to the dropdown select elements
  var selector1 = d3.select("#selDatasetprovince");
  var selector2 = d3.select("#selDatasetcategory");
  var selector3 = d3.select("#selDatasetrating");

  // Use the list of unique values from app.json to populate the select options
  d3.json("app.json").then((data) => {
    // console.log(data);
    var provinces = Array.from(new Set(data.map((d) => d.province))).sort();
    var categories = Array.from(new Set(data.map((d) => d.category))).sort();
    var ratings = Array.from(new Set(data.map((d) => d.rating))).sort();

    provinces.forEach((province) => {
      selector1.append("option").text(province).property("value", province);
    });

    categories.forEach((category) => {
      selector2.append("option").text(category).property("value", category);
    });

    ratings.forEach((rating) => {
      selector3.append("option").text(rating).property("value", rating);
    });
  });
}


// Initialize the dashboard
init();

function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildMetadata(newSample);
//   buildCharts(newSample);
 }

 // Restaurant Panel 

var selector1 = d3.select("#selDatasetprovince");
var selector2 = d3.select("#selDatasetcategory");
var selector3 = d3.select("#selDatasetrating");

selector1.on('change', RebuildMetadata)
selector2.on('change', RebuildMetadata)
selector3.on('change', RebuildMetadata)

function RebuildMetadata () {

  var value1 = d3.select("#selDatasetprovince").node().value;
  var value2 = d3.select("#selDatasetcategory").node().value;
  var value3 = d3.select("#selDatasetrating").node().value;
  console.log(value1, value2, value3)
  
  d3.json("app.json").then((data) => {
    

    const resultsArray = []
  
    for (let i = 0; i < data.length; i++) {
      let restaurant = data[i]

      if (restaurant.category == value2 & restaurant.rating == value3 & restaurant.province == value1) {

        resultsArray.push(restaurant)

      }
    }

    console.log(resultsArray);


    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");

    if (resultsArray.length === 0) {
      PANEL.append("h6").text("No information available for this province");
      return; // Exit the function if no match is found
    }

    var result = resultsArray[0];
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });

}
