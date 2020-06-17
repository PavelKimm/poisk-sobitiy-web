import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getUsers, lockUser} from "../../actions/users"
import {Link} from "react-router-dom";


export class Users extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        results: PropTypes.array.isRequired,
        getUsers: PropTypes.func.isRequired,
        lockUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authBody = (
            <div>
                <h2>Пользователи</h2>
                <Link to="/add-user" className="mb-3 mt-1 ml-2 btn btn-success">
                    Добавить нового пользователя
                </Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Логин</th>
                            <th>Начальный пароль</th>
                            <th>Полное имя</th>
                            <th>Электронная почта</th>
                            <th>Роль</th>
                            <th>Состояние</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.results.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password_text}</td>
                            <td>{user.last_name} {user.first_name} {user.patronymic}</td>
                            <td>{user.email}</td>
                            <td>{user.is_staff ? "Администратор" : "Сотрудник"}</td>
                            <td>{user.is_active ? "Активен" : "Заблокирован"}</td>
                            <td>
                                <button
                                    onClick={this.props.lockUser.bind(this, user.username)}
                                    className="btn btn-warning btn-sm">{user.is_active ? "Заблокировать" : "Разблокировать"}</button>
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
    count: state.users.count,
    next: state.users.next,
    previous: state.users.previous,
    results: state.users.results
});

export default connect(mapStateToProps, {getUsers, lockUser: lockUser})(Users);