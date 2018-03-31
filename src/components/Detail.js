import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Components
import LineChart from './LineChart';
import BarChart from './BarChart';
import Doughnut from './Doughnut';
import ToggleButton from './ToggleButton';

export default class Detail extends React.Component {

    constructor(props) {
        console.log('Detail constructor()', props);
        super(props);

        this.setInitState(props);

        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <div id="detail">
                <div class="header">
                    <h2>{this.props.data.name}</h2>
                    <ul class="vitals">
                        <li>
                            <FontAwesomeIcon icon="weight" className="icon" />
                            <span className="label">
                                <span class="number">{this.props.data.weight}</span>
                                <span class="unit">lbs</span>
                            </span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon="heartbeat" className="icon" />
                            <span className="label">
                                <span class="number">{this.props.data.heartrate}</span>
                                <span class="unit">bpm</span>
                            </span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon="thermometer-three-quarters" className="icon" />
                            <span className="label">
                                <span class="number">{this.props.data.temperature}</span>
                                <span class="unit">&deg;F</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="data-container">
                    <div class="chart-container">
                        <LineChart title="Blood pressure" chartId={`lineChart${this.props.data.id}`} chartData={this.state.lineChartData} />
                        <ToggleButton data={this.state.toggles} toggle={this.toggle} />
                    </div>
                    <div class="chart-container">
                        <BarChart title="Thresholds/Incidents" chartId={`barChart${this.props.data.id}`} chartData={this.state.barChartData} />
                        <Doughnut title="Days without incidents" chartId={`doughnutChart${this.props.data.id}`} chartData={this.state.doughtnutData} />
                    </div>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setInitState(nextProps);
    }

    setInitState(props) {
        let toggles = [
            {
                type: 'month',
                label: '6 months',
                selected: true
            }, {
                type: 'week',
                label: '6 weeks',
                selected: false
            }, {
                type: 'day',
                label: '6 days',
                selected: false
            }
        ];

        let lineChartData = this.getLineChartData(props, 'month');
        let barChartData = this.getBarChartData(props);

        let state = {
            toggles: toggles,
            lineChartData: lineChartData,
            barChartData: barChartData,
            doughtnutData: {
                datasets: [{
                    data: [props.data.bloodPressure.length, props.data.incidents.reduce((total, num) => total + num)],
                    backgroundColor: ["#63bdf1", "#fda57d"]
                }]
            }
        };

        if (!this.state) {
            this.state = state;
        } else {
            this.setState(state);
        }
    }

    getBarChartData(props) {
        let monthTicks = [30, 60, 90, 120, 150, 180];
        let incidents = props.data.incidents;
        let bloodPressure = props.data.bloodPressure;

        let systolicThresholds = monthTicks.map(days => {
            let filtered = bloodPressure.filter(bp => (bp.systolic > 140 && bp.day < days && bp.day >= (days-30)));
            return filtered.length;
        });

        let diastolicThresholds = monthTicks.map(days => {
            let filtered = bloodPressure.filter(bp => (bp.diastolic > 90 && bp.day < days && bp.day >= (days-30)));
            return filtered.length;
        });

        return {
            labels: monthTicks.map(days => {
                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                let d = new Date();
                d.setDate(d.getDate() - days);
                return months[d.getMonth()];
            }),
            datasets: [
                {
                    label: "Sys > 140",
                    backgroundColor: "#fda57d",
                    data: systolicThresholds
                },
                {
                    label: "Dia > 90",
                    backgroundColor: "#63bdf1",
                    data: diastolicThresholds
                },
                {
                    label: "Incidents",
                    data: incidents
                }
            ]
        };
    }

    getLineChartData(props, type) {
        let filteredData = props.data.bloodPressure;

        if (type !== 'month') {
            filteredData = (type === 'week') ? props.data.bloodPressure.slice(0, 42) : props.data.bloodPressure.slice(0, 6);
        }

        return {
            labels: filteredData.map(bp => {
                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                let d = new Date();
                d.setDate(d.getDate() - bp.day);
                return months[d.getMonth()] + ' ' + d.getDate();
            }),
            datasets: [
                {
                    label: "Systolic",
                    borderColor: "#fda57d",
                    pointRadius: 1,
                    data: filteredData.map(bp => bp.systolic)
                },
                {
                    label: "Diastolic",
                    borderColor: "#63bdf1",
                    pointRadius: 1,
                    data: filteredData.map(bp => bp.diastolic)
                }
            ]
        };
    }

    toggle(type) {
        let newToggles = this.state.toggles.map((toggle) => {
            let t = toggle;
            t.selected = (t.type === type) ? true : false;
            return t;
        });
        let newLineChartData = this.getLineChartData(this.props, type);
        this.setState({ toggles: newToggles, lineChartData: newLineChartData });
    }

}
