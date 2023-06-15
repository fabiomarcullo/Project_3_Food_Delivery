//STEP 2 - Fetch Chart Data
fetch('app.json')
    .then(response => response.json())
    .then(jsonData => {
        // Calculate average rate by cuisine
        const cuisineRatings = {};
        jsonData.forEach(item => {
            const cuisine = item.label;
            const rating = parseFloat(item.value);
            if (!isNaN(rating)) {
                if (!cuisineRatings[cuisine]) {
                    cuisineRatings[cuisine] = {
                        totalRating: 0,
                        count: 0
                    };
                }
                cuisineRatings[cuisine].totalRating += rating;
                cuisineRatings[cuisine].count++;
            }
        });

        const chartData = Object.keys(cuisineRatings).map(cuisine => {
            const averageRating = cuisineRatings[cuisine].totalRating / cuisineRatings[cuisine].count;
            return {
                "label": cuisine,
                "value": averageRating.toFixed(2),
            };
        });

        //STEP 3 - Chart Configurations
        const chartConfig = {
            type: 'column2d',
            renderAt: 'chart-container',
            width: '30%',
            height: '400',
            dataFormat: 'json',
            dataSource: {
                // Chart Configuration
                "chart": {
                    "caption": "Average Ratings by Cuisine",
                    "subCaption": "Based on User Reviews",
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
        console.error('Error loading chart data:', error);
    });
