new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor:"rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options:{...}
    
});










// fetch('appjson.json')
// .then(response => response.json())
// .then(data => 
//       data.forEach(itm => {

//       filter_ON = data.filter(item => item.province);
// filter_QC = text.filter(item => item.province === 'QC');
// filter_BC = text.filter(item => item.province === 'BC');
// filtere_AB = text.filter(item => item.province === 'AB');
// filtere_MB = text.filter(item => item.province === 'MB');
// filtere_SK = text.filter(item => item.province === 'SK');
// filtere_NS = text.filter(item => item.province === 'NS');
// filtere_NB = text.filter(item => item.province === 'NB');
// filtere_PE = text.filter(item => item.province === 'PE');
// filtere_NL = text.filter(item => item.province === 'NL');
// filtere_NT = text.filter(item => item.province === 'NT');
// filtere_YT = text.filter(item => item.province === 'YT');
// filtere_NU = text.filter(item => item.province === 'NU');
 










//   filteredData = data.filter(item => item.province === 'ON');
// })
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