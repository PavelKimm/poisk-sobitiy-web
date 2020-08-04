import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getOilfields} from "../../actions/telemetry";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


export class Oilfields extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        getOilfields: PropTypes.func.isRequired,
        oilfields: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getOilfields();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authBody = (
            <div>
                <h2>Месторождения</h2>
                <table className="table table-striped">
                    <tbody>
                    {this.props.oilfields.map(oilfield => (
                        <tr key={oilfield}>
                            <td>
                                <Link to={`${this.props.location.pathname}/${oilfield}/well-clusters/`}>
                                    {oilfield}
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
    oilfields: state.telemetry.oilfields,
    // wellClusters: state.telemetry.wellClusters,
    // wellNumbers: state.telemetry.wellNumbers,
    // telemetryData: state.telemetry.telemetryData
});

export default connect(mapStateToProps, {getOilfields})(Oilfields);