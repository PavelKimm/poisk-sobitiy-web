import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import {dataWasVisualized, deletePoints} from "../../actions/telemetry";
import TextField from '@material-ui/core/TextField';
import {formatDatetimeForServer} from "../common/helperFunctions"


class Visualization extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        telemetryData: PropTypes.array.isRequired
    };

    state = {
        timestamps: [],
        pressureBefore: [],
        pressureAfter: [],
        temperatureBefore: [],
        consumptionBefore: [],
        timeFrom: "",
        timeTo: "",
        removeFromDB: false
    };

    constructor(props) {
        super(props);
        this.props.dataWasVisualized();
        this.props.telemetryData.map(obj => {
            this.state.timestamps.push(Object.values(obj)[4]);
            this.state.pressureBefore.push(Object.values(obj)[5]);
            this.state.pressureAfter.push(Object.values(obj)[6]);
            this.state.temperatureBefore.push(Object.values(obj)[7]);
            this.state.consumptionBefore.push(Object.values(obj)[8]);
        });
        this.state = {
            ...this.state,
            series: [{
                name: "Давление до УР",
                type: "line",
                data: this.state.pressureBefore
            }, {
                name: "Давление после УР",
                type: "line",
                data: this.state.pressureAfter
            }, {
                name: "Температура до УР",
                type: "line",
                data: this.state.temperatureBefore
            }, {
                name: "Расход до УР",
                type: "line",
                data: this.state.consumptionBefore
            }],
            options: {
                chart: {
                    type: "line",
                    stacked: false
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [1, 1, 1, 1]
                },
                title: {
                    text: "Показания телеметрии",
                    align: "center",
                    offsetX: -40
                },
                xaxis: {
                    categories: this.state.timestamps,
                },
                yaxis: [
                    {
                        seriesName: "Давление до УР",
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#008FFB'
                        },
                        labels: {
                            style: {
                                colors: '#008FFB',
                            }
                        },
                        title: {
                            text: "Давление до УР",
                            style: {
                                color: '#008FFB',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    {
                        seriesName: "Давление после УР",
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#67DF9C'
                        },
                        labels: {
                            style: {
                                colors: '#67DF9C',
                            }
                        },
                        title: {
                            text: "Давление после УР",
                            style: {
                                color: '#67DF9C',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    {
                        seriesName: "Температура до УР",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#F4B244'
                        },
                        labels: {
                            style: {
                                colors: '#F4B244',
                            }
                        },
                        title: {
                            text: "Температура до УР",
                            style: {
                                color: '#F4B244',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    {
                        seriesName: "Расход до УР",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#EC5564'
                        },
                        labels: {
                            style: {
                                colors: '#EC5564',
                            },
                        },
                        title: {
                            text: "Расход до УР",
                            style: {
                                color: '#EC5564',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                ],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: "bottomLeft", // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: 30,
                        offsetX: -150
                    },
                },
                legend: {
                    horizontalAlign: "left",
                    offsetX: 40
                }
            },

        };
    }

    deleteFromChart() {
        let timeFrom = new Date(this.state.timeFrom);
        let timeTo = new Date(this.state.timeTo);
        let count = 0;
        for (let i = 0; i <= this.state.timestamps.length; i++) {
            if (new Date(this.state.timestamps[i]) >= timeFrom && new Date(this.state.timestamps[i]) <= timeTo) {
                this.state.pressureBefore[i] = null;
                this.state.pressureAfter[i] = null;
                this.state.temperatureBefore[i] = null;
                this.state.consumptionBefore[i] = null;
                count = count + 1;
            }
        }
        console.log(count);

        this.setState({
            series: [{
                name: "Давление до УР",
                type: "line",
                data: this.state.pressureBefore
            }, {
                name: "Давление после УР",
                type: "line",
                data: this.state.pressureAfter
            }, {
                name: "Температура до УР",
                type: "line",
                data: this.state.temperatureBefore
            }, {
                name: "Расход до УР",
                type: "line",
                data: this.state.consumptionBefore
            }]
        });
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    onClickRemoval = (e) => this.setState({removeFromDB: e.target.checked});
    onSubmit = (e) => {
        e.preventDefault();
        const {removeFromDB} = this.state;
        let rangeBE = {
            from: formatDatetimeForServer(this.state.timeFrom),
            to: formatDatetimeForServer(this.state.timeTo)
        };
        if (removeFromDB) this.props.deletePoints(rangeBE);
    };

	render() {
	    const {removeFromDB} = this.state;
		return (
            <div>
                <div id="chart" >
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={450} />
                </div>


                <form onSubmit={this.onSubmit} noValidate>
                    <span className="float-left mr-5">
                        <TextField
                            id="timeFrom"
                            label="Начало диапазона"
                            name="timeFrom"
                            onChange={this.onChange}
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </span>
                    <span className="float-left ml-5 mr-5">
                        <TextField
                            id="timeTo"
                            label="Конец диапазона"
                            name="timeTo"
                            onChange={this.onChange}
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </span>
                    <span className="float-left ml-5 mr-5">
                            <label>Удалить из БД</label>
                            <span className="ml-3" />
                            <input
                                type="checkbox"
                                name="removeFromDB"
                                onClick={this.onClickRemoval}
                                value={removeFromDB}
                            />
                        </span>
                    <span className="float-left ml-5">
                        <button className="btn btn-danger float-right" onClick={() => {
                            this.deleteFromChart();
                        }}>
                            Удалить точки
                        </button>
                    </span>
                </form>


            </div>
		);
	}
}

const mapStateToProps = state => ({
    auth: state.auth,
    telemetryData: state.telemetry.telemetryData,
    oilfield: state.telemetry.oilfield,
    wellCluster: state.telemetry.wellCluster,
    wellNumber: state.telemetry.wellNumber,
});


export default connect(
    mapStateToProps, {
        deletePoints: deletePoints,
        dataWasVisualized: dataWasVisualized
    })(Visualization);
