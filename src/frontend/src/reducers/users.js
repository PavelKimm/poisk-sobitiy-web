import {GET_USERS, BLOCK_USER, ADD_USER} from "../actions/types";


const initialState = {
    count: null,
    next: null,
    previous: null,
    results: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                count: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous,
                results: action.payload.results
            };
        case BLOCK_USER:
            return {
                ...state,
                count: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous,
                results: state.results
            };
        case ADD_USER:
            return {
                ...state,
                count: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous,
                results: [action.payload, ...state.results]
            };
        default:
            return state;
    }
}