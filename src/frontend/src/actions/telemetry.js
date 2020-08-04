import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {
    GET_OILFIELDS,
    GET_WELL_CLUSTERS,
    GET_WELL_NUMBERS,
    DATA_LOADED, DATA_WAS_VISUALIZED
} from "./types";
import {tokenConfig} from "./helperFunctions";


// GET OILFIELDS
export const getOilfields = () => (dispatch, getState) => {
    axios
        .get("/api/v1/sensors-data/oilfields/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_OILFIELDS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET WELL CLUSTERS
export const getWellClusters = (oilfield) => (dispatch, getState) => {
    axios
        .get(`/api/v1/sensors-data/oilfields/${oilfield}/well-clusters/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_WELL_CLUSTERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET WELL NUMBERS
export const getWellNumbers = (oilfield, wellCluster) => (dispatch, getState) => {
    axios
        .get(`/api/v1/sensors-data/oilfields/${oilfield}/` +
            `well-clusters/${wellCluster}/well-numbers/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_WELL_NUMBERS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET TELEMETRY DATA
export const getTelemetryData = (certainWell, rangeBE) => (dispatch, getState) => {
    axios
        .get(`/api/v1/sensors-data/oilfields/${certainWell.oilfield}/` +
            `well-clusters/${certainWell.wellCluster}/well-numbers/${certainWell.wellNumber}/` +
            `?time_from=${rangeBE.from}&time_to=${rangeBE.to}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DATA_LOADED,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



// DELETE POINTS
export const deletePoints = (rangeBE) => (dispatch, getState) => {
    axios
        .put("/api/v1/sensors-data/delete/",
            {
                oilfield: getState().telemetry.oilfield,
                well_cluster: getState().telemetry.wellCluster,
                well_number: getState().telemetry.wellNumber,
                time_from: rangeBE.from,
                time_to: rangeBE.to
            }, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deletePoints: "Данные были удалены!"}));
            console.log(res);
            dispatch({
                payload: res
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// LOAD DATA
export const loadData = (data) => (dispatch, getState) => {
    axios
        .post("/api/v1/sensors-data/load/", {
            oilfield: data.oilfield,
            well_cluster: data.wellCluster,
            well_number: data.wellNumber,
            file: data.file
        }, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({loadData: "Данные были загружены!"}));
            dispatch({
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const dataWasVisualized = () => (dispatch) => {
    dispatch({
        type: DATA_WAS_VISUALIZED
    });
};
