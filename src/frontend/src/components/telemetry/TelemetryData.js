import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getTelemetryData} from "../../actions/telemetry";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {formatDatetimeForServer} from "../common/helperFunctions";
import TextField from "@material-ui/core/TextField/TextField";


export class TelemetryData extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        getTelemetryData: PropTypes.func.isRequired,
        dataWasReceived: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    state = {
        oilfield: "",
        wellCluster: "",
        wellNumber: "",
        timeFrom: null,
        timeTo: null
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {oilfield, wellCluster, wellNumber, timeFrom, timeTo} = this.state;
        const certainWell = {oilfield, wellCluster, wellNumber, timeFrom, timeTo};
        let rangeBE = {
            from: null,
            to: null
        };
        if (this.state.timeFrom && this.state.timeTo) {
            rangeBE = {
                to: formatDatetimeForServer(this.state.timeTo),
                from: formatDatetimeForServer(this.state.timeFrom)
            }
        } else if (this.state.timeFrom) {
            rangeBE = {
                to: null,
                from: formatDatetimeForServer(this.state.timeFrom)
            }
        } else if (this.state.timeTo) {
            rangeBE = {
                to: formatDatetimeForServer(this.state.timeFrom),
                from: null
            }
        }
        this.props.getTelemetryData(certainWell, rangeBE);
    };

    render() {
        if (this.props.dataWasReceived) {
            return <Redirect to="/visualization" />;
        }
        const {oilfield, wellCluster, wellNumber} = this.state;
        const {isAuthenticated} = this.props.auth;
        const authBody = (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Данные телеметрии</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Месторождение</label>
                            <input
                                className="form-control"
                                type="text"
                                name="oilfield"
                                onChange={this.onChange}
                                value={oilfield}
                            />
                        </div>
                        <div className="form-group">
                            <label>Куст скважины</label>
                            <input
                                className="form-control"
                                type="text"
                                name="wellCluster"
                                onChange={this.onChange}
                                value={wellCluster}
                            />
                        </div>
                        <div className="form-group">
                            <label>Номер скважины</label>
                            <input
                                className="form-control"
                                type="text"
                                name="wellNumber"
                                onChange={this.onChange}
                                value={wellNumber}
                            />
                        </div>
                        <div className="float-left mt-2">
                            <TextField
                                label="Начало диапазона"
                                name="timeFrom"
                                onChange={this.onChange}
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="float-left mt-4">
                            <TextField
                                label="Конец диапазона"
                                name="timeTo"
                                onChange={this.onChange}
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="form-group float-right mt-4">
                            <button type="submit" className="btn btn-primary">
                                Получить данные
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
        return (
            <Fragment>
                {isAuthenticated ? authBody : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isLoading: state.telemetry.isLoading,
    dataWasReceived: state.telemetry.dataWasReceived
});

export default connect(mapStateToProps, {getTelemetryData})(TelemetryData);