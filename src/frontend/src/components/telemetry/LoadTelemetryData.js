import React, {Component, useRef, useState} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {getTelemetryData, loadData} from "../../actions/telemetry";
import Dropzone from 'react-dropzone'


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};


export class LoadTelemetryData extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            oilfield: "",
            wellCluster: "",
            wellNumber: "",
            file: ""
        }
    }

    static file1 = null;

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    onChangeFile = (e) => {
        this.setState({[e.target.name]: e.target.value});
        LoadTelemetryData.file1 = e.target.files[0];

        // console.log(LoadTelemetryData.file1)
    };
    onClickHandler = () => {
        let excelFile = new FormData();
        excelFile.append("file", LoadTelemetryData.file1);

        let data = {
            oilfield: this.state.oilfield,
            wellCluster: this.state.wellCluster,
            wellNumber: this.state.wellNumber,
            file: excelFile
        };

        // let file = excelFile.get("file");
        console.log(this.state);

        this.props.loadData(data);
    };
    onSubmit = (e) => {
        e.preventDefault();
        sleep(7000).then(() => {
            this.setState({
                oilfield: "",
                wellCluster: "",
                wellNumber: "",
                file: ""
            });
        })
    };

    render() {
        const {oilfield, wellCluster, wellNumber, file} = this.state;
        const {isAuthenticated} = this.props.auth;
        const authBody = (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Загрузка данных</h2>
                    <div className="mb-3"/>
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
                        <div className="form-group">
                            <label>Excel файл:</label>
                            <input
                                className="btn btn-sm"
                                type="file"
                                name="file"
                                onChange={this.onChangeFile}
                                value={file}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={this.onClickHandler}>
                                Загрузить данные
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );

        return (
            <div>
                {isAuthenticated ? authBody : null}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {getTelemetryData, loadData: loadData})(LoadTelemetryData);