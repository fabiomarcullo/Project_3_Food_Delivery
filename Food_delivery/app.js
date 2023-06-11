// 1. Use the D3 library to read in the JSON data
const file = "app.json";
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

// Create bar chart, pie chart, and table with dropdown menus
