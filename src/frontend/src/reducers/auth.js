import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
    auth_token: localStorage.getItem("auth_token"),
    isAuthenticated: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("auth_token", action.payload.auth_token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("auth_token");
            return {
                ...state,
                auth_token: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}