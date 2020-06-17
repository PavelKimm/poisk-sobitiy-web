import React, {Component} from 'react';
import {connect} from "react-redux";
import {addUser} from "../../actions/users";


export class AddUser extends Component {
    state = {
        first_name: "",
        last_name: "",
        patronymic: "",
        email: "",
        is_staff: false
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    onClickIsAdmin = (e) => this.setState({is_staff: e.target.checked});

    onSubmit = (e) => {
        e.preventDefault();
        const {first_name, last_name, patronymic, email, is_staff} = this.state;
        const user = {first_name, last_name, patronymic, email, is_staff};
        this.props.addUser(user);
        this.setState({
            first_name: "",
            last_name: "",
            patronymic: "",
            email: "",
            is_staff: false
        });
    };

    render() {
        const {first_name, last_name, patronymic, email, is_staff} = this.state;

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Добавить пользователя</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Фамилия</label>
                            <input
                                className="form-control"
                                type="text"
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Имя</label>
                            <input
                                className="form-control"
                                type="text"
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Отчество</label>
                            <input
                                className="form-control"
                                type="text"
                                name="patronymic"
                                onChange={this.onChange}
                                value={patronymic}
                            />
                        </div>
                        <div className="form-group">
                            <label>Электронная почта</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Администратор?</label>
                            <span className="ml-3" />
                            <input
                                type="checkbox"
                                name="is_staff"
                                onClick={this.onClickIsAdmin}
                                value={is_staff}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addUser})(AddUser);