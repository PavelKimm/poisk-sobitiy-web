import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getWellClusters} from "../../actions/telemetry";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


export class WellClusters extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        getWellClusters: PropTypes.func.isRequired,
        oilfields: PropTypes.array.isRequired,
        wellClusters: PropTypes.array.isRequired,
        // wellNumbers: PropTypes.array.isRequired,
        // telemetryData: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getWellClusters();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authBody = (
            <div>
                <h2>Кусты скважин</h2>
                <table className="table table-striped">
                    <tbody>
                    {this.props.wellClusters.map(cluster => (
                        <tr key={cluster}>
                            <td>
                                <Link to={`${this.props.location.pathname}/${cluster}/well-numbers/`}>
                                    {cluster}
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
    wellClusters: state.telemetry.wellClusters,
    // wellNumbers: state.telemetry.wellNumbers,
    // telemetryData: state.telemetry.telemetryData
});

export default connect(mapStateToProps, {getWellClusters})(WellClusters);