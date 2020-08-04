import {
    GET_OILFIELDS,
    GET_WELL_CLUSTERS,
    GET_WELL_NUMBERS,
    DATA_LOADING,
    DATA_LOADED,
    DATA_WAS_VISUALIZED
} from "../actions/types";


const initialState = {
    oilfields: [],
    wellClusters: [],
    wellNumbers: [],
    telemetryData: [],
    oilfield: null,
    wellCluster: null,
    wellNumber: null,
    dataWasReceived: false,
    isLoading: false,
    excelFile: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATA_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                dataWasReceived: true,
                telemetryData: action.payload,
                oilfield: action.payload[0].oilfield,
                wellCluster: action.payload[0].well_cluster,
                wellNumber: action.payload[0].well_number,
                file: action.payload[0].file
            };
        case GET_OILFIELDS:
            return {
                ...state,
                isLoading: false,
                dataWasReceived: true,
                oilfields: action.payload
            };
        case GET_WELL_CLUSTERS:
            return {
                ...state,
                isLoading: false,
                dataWasReceived: true,
                wellClusters: action.payload
            };
        case GET_WELL_NUMBERS:
            return {
                ...state,
                isLoading: false,
                dataWasReceived: true,
                wellNumbers: action.payload
            };
        case DATA_WAS_VISUALIZED:
            return {
                ...state,
                dataWasReceived: false,
            };
        default:
            return state;
    }
}