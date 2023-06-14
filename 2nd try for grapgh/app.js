// const jsonString = fetch('appjsion.json')
// const data = JSON.parse(jsonString);
// const filteredData = data.filter(item => item.province === 'ON');
// console.log(filteredData);

fetch('appjson.json')
.then(response => response.json())
.then(data => { 
  filteredData = data.filter(item => item.province === 'ON');
})
//     otu_ids = data.samples.filter(itm => itm.id == sample_no)[0].otu_ids
//     otu_labels = data.samples.filter(itm => itm.id == sample_no)[0].otu_labels
//     slicedData = sample_values.slice(0, 10).reverse();
//     id_slicedData = otu_ids.slice(0, 10).reverse();
//     labels_slicedData = otu_labels.slice(0, 10).reverse();
  
// })
      // let barData = {
      //   x: slicedData,
      //   y: id_slicedData.map(item => `OTU${item}`),
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
  
      // }})