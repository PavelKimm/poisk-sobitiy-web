import axios from "axios";
import {returnErrors} from "./messages";
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from "./types";
import {tokenConfig} from "./helperFunctions";


// CHECK TOKEN & LOAD USER
export const loadUsers = () => (dispatch, getState) => {
    axios.get("/api/v1/accounts/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            if (err.response.status === 403) {
                console.log("Доступ запрещен!");
                dispatch({
                    type: USER_LOADED,
                    payload: err.data
                });
            } else {
                dispatch({
                    type: AUTH_ERROR
                });
            }
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
    // Заголовки запроса
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Тело запроса
    const body = JSON.stringify({username, password});

    axios.post("/api/v1/auth/token/login/", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios.post("/api/v1/auth/token/logout/", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
    });
};


