import React from 'react';
import Chart from 'chart.js';

export default class DoughnutChart extends React.Component {

    constructor(props) {
        console.log('DoughnutChart constructor()', props);
        super(props);
        this.chart = null;
    }

    render() {
        return (
            <div className="chart doughnut-chart">
                <h3><span class="title">{this.props.title}</span><span class="line"></span></h3>
                <canvas id={this.props.chartId}></canvas>
            </div>
        );
    }

    componentDidMount() {
        let canvasEl = document.getElementById(this.props.chartId);
        this.chart = new Chart(canvasEl, {
            type: 'doughnut',
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
