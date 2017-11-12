const chartColors = [
    {
        red: 35,
        green: 198,
        blue: 136
    }, {
        red: 35,
        green: 198,
        blue: 170
    }, {
        red: 35,
        green: 187,
        blue: 198
    }, {
        red: 35,
        green: 124,
        blue: 198
    }, {
        red: 35,
        green: 67,
        blue: 198
    }, {
        red: 73,
        green: 35,
        blue: 198
    }, {
        red: 138,
        green: 35,
        blue: 198
    }, {
        red: 198,
        green: 35,
        blue: 154
    }, {
        red: 198,
        green: 35,
        blue: 83
    }, {
        red: 198,
        green: 35,
        blue: 35
    }, {
        red: 198,
        green: 124,
        blue: 35
    }, {
        red: 195,
        green: 198,
        blue: 35
    }, {
        red: 151,
        green: 198,
        blue: 35
    }, {
        red: 113,
        green: 198,
        blue: 35
    }, {
        red: 35,
        green: 198,
        blue: 37
    }
];
var hue = function () {
    return {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256)
    };
}

function drawLineChart(element, data) {
    var ctx = document.getElementById(element);
    var datasets = data.datasets;
    var i = 0;
    datasets.map(function (item) {
        var color,
            border;
        if (chartColors.length > i) {
            color = chartColors[i];
        } else {
            color = hue();
        }
        border = {
            red: color.red - 23,
            green: color.green - 58,
            blue: color.blue - 60
        };
        item.backgroundColor = ['rgba(' + color.red + ',' + color.green + ',' + color.blue + ',0.7)']
        item.borderColor = ['rgba(' + border.red + ',' + border.green + ',' + border.blue + ',0.7)']
        item.borderWidth = 1;
        i++;

    })
    var totalMessagesChart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: data.labels,
            datasets: datasets
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });
}

drawLineChart('chart-msg-today', {
    labels: [
        '0', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'
    ],
    datasets: [
        {
            label: 'متن',
            data: [
                20,15,18,10,16,20,35,60,80,120,250,190,440,590,860,980,1112,700,650,780,490,420,320,350,280,220,190,80
                
            ]
        },
        {
            label: 'عکس',
            data: [
                15,1,3,5,1,2,7,8,10,14,17,19,30,54,89,90,21,140,250,170,190,60,13,145,153,189,300,230,234,432,190,30,20
            ]
        },
        {
            label: 'ویدیو',
            data: [
                2,60,40,12,5,90,12,43,321,52,523,2,1,4,143,5,23,21,532,52,42,23,235,65,75,43,42,123,53,12,31,41,23,51,4,2
            ]
        },
        {
            label: 'صوت',
            data: [
                12,213,43,32,521,5,23,42,234,24,324,4,2,34,4,4,3,4,5,34,324,342,33,23,324,34,234,42,65,76,8,68,667,546,54
            ]
        }
    ]
})
drawLineChart('chart-msg-thisweek', {
    labels: [
        'شنبه',
        'یکشنبه',
        'دوشنبه',
        'سه شنبه',
        'چهارشنبه',
        'پنجشنبه',
        'جمعه'
    ],
    datasets: [
        {
            label: 'متن',
            data: [
                2900,3500,7000,1245,1232,1234,5643,2322,
                
            ]
        },
        {
            label: 'عکس',
            data: [
                7000,1233,3244,6755,3443,5332,2344,6433
            ]
        },
        {
            label: 'ویدیو',
            data: [
                3213,4534,2322,7666,4544,2433,4243,5435
            ]
        },
        {
            label: 'صوت',
            data: [
                8774,2343,4232,5435,3453,3222,2444,5643,7654
            ]
        }
    ]
})