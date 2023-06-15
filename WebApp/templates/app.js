//STEP 1 - Fetch app.json and parse as jsonData
    fetch('app.json')
        .then(response => response.json())
        .then(jsonData => {
            //STEP 2 - Calculate average rating by cuisine
            const ratingByCuisine = {};
            const countByCuisine = {};
            jsonData.forEach(item => {
                if (item.category && item.rating) {
                    if (!ratingByCuisine[item.category]) {
                        ratingByCuisine[item.category] = 0;
                        countByCuisine[item.category] = 0;
                    }
                    ratingByCuisine[item.category] += parseFloat(item.rating);
                    countByCuisine[item.category]++;
                }
            });
            const chartData = [];
            for (const cuisine in ratingByCuisine) {
                const averageRating = ratingByCuisine[cuisine] / countByCuisine[cuisine];
                if (!isNaN(averageRating)) {
                    chartData.push({
                        "label": cuisine,
                        "value": averageRating.toFixed(1),
                    });
                }
            }

            //STEP 3 - Chart Configurations
            const chartConfig = {
                type: 'column2d',
                renderAt: 'chart-container',
                width: '100%',
                height: '400',
                dataFormat: 'json',
                dataSource: {
                    // Chart Configuration
                    "chart": {
                        "caption": "Average Restaurant Ratings",
                        "subCaption": "By Cuisine",
                        "xAxisName": "Cuisine",
                        "yAxisName": "Average Rating",
                        "numberSuffix": "",
                        "theme": "fusion",
                    },
                    // Chart Data
                    "data": chartData
                }
            };

            FusionCharts.ready(function(){
                var fusioncharts = new FusionCharts(chartConfig);
                fusioncharts.render();
            });
        })
        .catch(error => {
            console.error('Error loading app.json:', error);
        });
