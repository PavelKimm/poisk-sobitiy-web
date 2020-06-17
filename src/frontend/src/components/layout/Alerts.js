import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";


export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error, alert, message} = this.props;
        if (error !== prevProps.error) {
            if (error.msg.first_name) alert.error(`Имя: ${error.msg.first_name.join()}`);
            else if (error.msg.last_name) alert.error(`Фамилия: ${error.msg.last_name.join()}`);
            else if (error.msg.patronymic) alert.error(`Отчество: ${error.msg.patronymic.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
        }
        if (message !== prevProps.message) {
            if (message.lockUser) alert.success(message.lockUser);
            if (message.addUser) alert.success(message.addUser);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
