import {combineReducers} from "redux";
import users from "./users"
import errors from "./errors"
import messages from "./messages"
import auth from "./auth"
import telemetry from "./telemetry";


export default combineReducers({
    users,
    errors,
    messages,
    auth,
    telemetry
});
