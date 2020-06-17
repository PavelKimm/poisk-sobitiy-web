import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Users from "./users/Users";
import Login from "./accounts/Login";
import AddUser from "./accounts/AddUser";
import PrivateRoute from "./common/PrivateRoute";

import {Provider} from "react-redux";
import store from "../store";
import {loadUsers} from "../actions/auth";
import TelemetryData from "./telemetry/TelemetryData";
import Visualization from "./telemetry/Visualization";
import LoadTelemetryData from "./telemetry/LoadTelemetryData";


// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "top center"
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUsers());
    };

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <Route exact path="/users" component={Users} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/telemetry-data" component={TelemetryData} />
                                    <Route exact path="/load-data" component={LoadTelemetryData} />
                                    <Route exact path="/visualization" component={Visualization} />
                                    <PrivateRoute exact path="/add-user" component={AddUser} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
