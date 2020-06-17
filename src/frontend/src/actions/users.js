import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {GET_USERS, BLOCK_USER, ADD_USER} from "./types";
import {tokenConfig} from "./helperFunctions";


// GET USERS
export const getUsers = () => (dispatch, getState) => {
    axios
        .get("/api/v1/accounts/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// LOCK USER
export const lockUser = username => (dispatch, getState) => {
    axios
        .post("/api/v1/accounts/lock-unlock-user/", {username: username}, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({lockUser: "Состояние пользователя было изменено!"}));
            dispatch({
                type: BLOCK_USER,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD USER
export const addUser = user => (dispatch, getState) => {
    axios
        .post("/api/v1/accounts/", user, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addUser: "Новый пользователь был добавлен!"}));
            dispatch({
                type: ADD_USER,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};