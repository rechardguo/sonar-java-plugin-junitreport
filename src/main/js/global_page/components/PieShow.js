import React from 'react';
import { Utils } from 'util'
var BarChart = require("react-chartjs").Bar;
var LineChart = require("react-chartjs").Line;

export class PieShow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.charData = {
            labels: [],
            datasets: [{
                label: 'total test cases',
                fillColor: "green",
                strokeColor: "green",
                // backgroundColor: 'green',
                // borderColor: 'green',
                pointStrokeColor: "green",
                pointHighlightFill: "green",
                pointHighlightStroke: "green",
                //borderWidth:1,
                data: [],
            },{
                label: 'fail test cases',
                fillColor: "red",
                strokeColor: "red",
                pointColor: "red",
                pointStrokeColor: "red",
                pointHighlightFill: "red",
                pointHighlightStroke: "red",
                // borderWidth:1,
                data: [],
            }]
        };
        this.config = {
            data:this.charData,
            options: {
                responsive: true,
                // Array - Array of string names to attach tooltip events
                barShowStroke : true,
                tooltips:{
                    //intersect: false   鼠标不放在数据点的时候，也会提示信息
                    intersect:false,
                    // model  显示模式
                    mode:'index'
                }

            }
        };
    }

    componentWillReceiveProps(newProps) {
        this.charData.labels=[];
        this.charData.datasets.forEach(ds=> {
            ds.data = [];
        })
    }

    render() {
        if(this.props.data[0]){
            this.props.data[0].forEach(data=>{
                this.charData.labels.push(data.date)
                //total test cases
                this.charData.datasets[0].data.push(data.data.tests)
                //fail test cases
                this.charData.datasets[1].data.push(data.data.test_failures)
            })
        }
        return <BarChart data={this.config.data} options={this.config.options}/>
    }


}
