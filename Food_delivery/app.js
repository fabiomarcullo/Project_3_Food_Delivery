// 1. Use the D3 library to read in the JSON data
const file = "app.json";
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

function init() {
  // Grab a reference to the dropdown select element
  var selector1 = d3.select("#selDatasetprovince");
  var selector2 = d3.select("#selDatasetcategory");
  var selector3 = d3.select("#selDatasetrating");

  // Use the list of sample names to populate the select options
  d3.json("app.json").then((data) => {
    console.log(data);
    var sampleData = data.data;

    sampleData.forEach((sample) => {
      selector1.append("option").text(sample.address).property("value", sample.address);
      selector2.append("option").text(sample.category).property("value", sample.category);
      selector3.append("option").text(sample.rating).property("value", sample.rating);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleData[0];
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

// Demographics Panel
function buildMetadata(sample) {
  d3.json("app.json").then((data) => {
    var metadata = data.data;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter((sampleObj) => sampleObj.address == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 1. Use d3.json to load and retrieve the app.json file
  d3.json("app.json").then((data) => {
    // 2. Create a variable that holds the samples array.
    console.log(data);
    var samplesArray = data.data;
    // 3. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesArray.filter((sampleObj) => sampleObj.address == sample);

    // 4. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.data;
    var resultMetadata = metadataArray.filter((sampleObj) => sampleObj.address == sample);

    // 5. Create a variable that holds the first sample in the array.
    var firstSample = resultArray[0];
    console.log(firstSample);

    // 6. Create a variable that holds the first sample in the metadata array.
    var firstMetadata = resultMetadata[0];
    console.log(firstMetadata);

    // 7. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;

    // 8. Create a variable that holds the washing frequency.
    var wFreq = parseFloat(firstMetadata.wfreq);

    // 9. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.
    var yticks = otuIds.slice(0, 10).map((id) => "OTU " + id + " ").reverse();

    // 10. Create the trace for the bar chart.
    var barData = [
      {
        x: sampleValues.slice(0, 10).reverse(),
        y: yticks,
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
          color: sampleValues.slice(0, 10).reverse(),
          colorscale: "Electric",
        },
      },
    ];
    // 11. Create the layout for the bar chart.
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
    };
    // 12. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        type: "scatter",
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "Earth",
        },
      },
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      margins: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
      },
      hovermode: "closest",
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wFreq,
        title: {
          text: "Belly Button Washing Frequency<br>Scrubs per Week",
          font: { size: 18 },
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {
            range: [0, 10],
            tickwidth: 1,
            tickcolor: "black",
          },
          bar: {
            color: "black",
          },
          steps: [
            { range: [0, 1], color: "rgba(255, 255, 255, 1)" }, // White
            { range: [2, 3], color: "rgba(200, 255, 200, 1)" }, // Light green
            { range: [4, 5], color: "rgba(100, 255, 100, 1)" },
            { range: [6, 7], color: "rgba(0, 200, 0, 1)" },
            { range: [8, 9], color: "rgba(0, 100, 0, 1)" }, // Dark green
          ],
        },
      },
    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 500,
      height: 400,
      margin: { t: 0, r: 0, l: 0, b: 0 },
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
