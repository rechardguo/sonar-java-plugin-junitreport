import React from 'react';
import { Utils } from 'util'
var BarChart = require("react-chartjs").Bar;
var LineChart = require("react-chartjs").Line;
let charData = {
    labels: [],
    datasets: [{
        label: 'total test cases',
        fillColor: "green",
        backgroundColor: 'green',
        borderColor: 'green',
        pointStrokeColor: "#green",
        pointHighlightFill: "green",
        pointHighlightStroke: "green",
        data: [],
    },{
        label: 'fail test cases',
        fillColor: "red",
        strokeColor: "red",
        pointColor: "red",
        pointStrokeColor: "green",
        pointHighlightFill: "green",
        pointHighlightStroke: "green",
        data: [],
    }]
};
const config = {
    type: 'line',
    data:charData,
    options: {
        responsive: true,
        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        barShowStroke : true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
    }
};
export class PieShow extends React.PureComponent {


    componentWillReceiveProps(newProps) {
        charData.labels=[];
        charData.datasets.forEach(ds=> {
            ds.data = [];
        })
    }

    render() {
        if(this.props.data[0]){
            this.props.data[0].forEach(data=>{
                charData.labels.push(data.date)
                //total test cases
                charData.datasets[0].data.push(data.data.tests)
                //fail test cases
                charData.datasets[1].data.push(data.data.test_errors)
            })
        }
        return <BarChart data={config.data} options={config.options}/>
    }


}
