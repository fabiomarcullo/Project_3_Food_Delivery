function init() {
  // Grab a reference to the dropdown select elements
  var selector1 = d3.select("#selDatasetprovince");
  var selector2 = d3.select("#selDatasetcategory");
  var selector3 = d3.select("#selDatasetrating");

  selector1.on("change", optionChanged);
  selector2.on("change", optionChanged);
  selector3.on("change", optionChanged);


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

function optionChanged() {
  var selectedProvince = d3.select("#selDatasetprovince").property("value");
  var selectedCategory = d3.select("#selDatasetcategory").property("value");
  var selectedRating = d3.select("#selDatasetrating").property("value");

  // Pass the selected values to the filter function
  filterData(selectedProvince, selectedCategory, selectedRating);
}


function filterData(province, category, rating) {
  d3.json("app.json").then((data) => {
    var filteredData = data;

    // Apply filters only if a value is selected
    if (province) {
      filteredData = filteredData.filter((d) => d.province === province);
    }

    if (category) {
      filteredData = filteredData.filter((d) => d.category === category);
    }

    if (rating) {
      filteredData = filteredData.filter((d) => d.rating === rating);
    }

    // Pass the filtered data to the visualization functions
    buildMetadata(filteredData);
    buildCharts(filteredData);
  });
}



// Restaurant Panel
// Filter by province 
// Restaurant Panel
// Filter by province 
// Restaurant Panel
// Filter by province 
// Restaurant Panel
// Filter by province 
function buildMetadata(filteredData) {
  var PANEL = d3.select("#sample-metadata");
  PANEL.html("");

  if (filteredData.length === 0) {
    PANEL.append("h6").text("No information available for this selection");
    return; // Exit the function if no match is found
  }

  // Create a table element
  var table = PANEL.append("table");

  // Create the table header row
  var thead = table.append("thead");
  var headerRow = thead.append("tr");

  // Add the column name to the table header row
  headerRow.append("th").text("Restaurant Name");

  // Create the table body
  var tbody = table.append("tbody");

  // Add rows and cells to the table body
  filteredData.forEach(function(row) {
    var dataRow = tbody.append("tr");

    // Add the restaurant name to the cell
    dataRow.append("td").text(row.restaurant_name);
  });
}


