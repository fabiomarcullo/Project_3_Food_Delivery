function init() {
  // Grab a reference to the dropdown select elements
  var selector1 = d3.select("#selDatasetprovince");
  var selector2 = d3.select("#selDatasetcategory");
  var selector3 = d3.select("#selDatasetrating");

  // Use the list of unique values from app.json to populate the select options
  d3.json("app.json").then((data) => {
    console.log(data);
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

    // Use the first sample from the list to build the initial plots
    var firstSample = provinces[0];
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

// Restaurant Panel
// Filter by province 
function buildMetadata(sample) {
  d3.json("app.json").then((data) => {
    var resultArray = data.filter((d) => d.province === sample);

    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");

    if (resultArray.length === 0) {
      PANEL.append("h6").text("No information available for this province");
      return; // Exit the function if no match is found
    }

    var result = resultArray[0];
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}




// VISUALISATION
