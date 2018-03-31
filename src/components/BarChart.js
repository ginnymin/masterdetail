import React from 'react';
import Chart from 'chart.js';

export default class BarChart extends React.Component {

    constructor(props) {
        console.log('BarChart constructor()', props);
        super(props);
        this.chart = null;
    }

    render() {
        return (
            <div className="chart bar-chart">
                <h3><span class="title">{this.props.title}</span><span class="line"></span></h3>
                <canvas id={this.props.chartId}></canvas>
            </div>
        );
    }

    componentDidMount() {
        let canvasEl = document.getElementById(this.props.chartId);
        this.chart = new Chart(canvasEl, {
            type: 'bar',
            data: this.props.chartData
        });
    }

    componentDidUpdate() {
        this.chart.destroy();
        this.componentDidMount();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.chartId === this.props.chartId) ? false : true;
    }

}
