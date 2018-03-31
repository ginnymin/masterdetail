import React from 'react';
import Chart from 'chart.js';

export default class LineChart extends React.Component {

    constructor(props) {
        console.log('LineChart constructor()', props);
        super(props);
        this.chart = null;
    }

    render() {
        return (
            <div className="chart line-chart">
                <h3><span class="title">{this.props.title}</span><span class="line"></span></h3>
                <canvas id={this.props.chartId}></canvas>
            </div>
        );
    }

    componentDidMount() {
        this.populateChart();
    }

    componentDidUpdate() {
        this.populateChart();
    }

    populateChart() {
        if (this.chart) {
            this.chart.destroy();
        }

        let canvasEl = document.getElementById(this.props.chartId);
        this.chart = new Chart(canvasEl, {
            type: 'line',
            data: this.props.chartData,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 6
                        }
                    }]
                }
            }
        });
    }

}
