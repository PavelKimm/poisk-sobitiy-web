import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";


export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const {isAuthenticated} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/load-data" className="nav-link">
                        Работа с файлами
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/telemetry-data" className="nav-link">
                        Работа с данными
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/visualization" className="nav-link">
                        Визуализация
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        Пользователи
                    </Link>
                </li>
                <li className="nav-item">
                    <button onClick={this.props.logout} className="ml-3s nav-link btn btn-info btn-sm text-light">
                        Выйти
                    </button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Войти
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <a className="navbar-brand" href="#">Поиск событий</a>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Header);