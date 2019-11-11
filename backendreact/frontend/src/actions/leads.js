import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types';

// GET USERS

export const getLeads = () => (dispatch, getState) => {
    axios
        .get("/api/leads/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data

            });
        })
        .catch(err => dispatch(returnErrors(
            err.response.data, err.response.status)));
};

//DETELE USERS
export const deleteLead = id => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: "Persona Eliminada" }));
            dispatch({
                type: DELETE_LEAD,
                payload: id

            });
        })
        .catch(err => console.log(err));
};

//AÑADIR USERS
export const addLead = lead => (dispatch, getState) => {
    axios
        .post("/api/leads/", lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: "Persona Agregada" }));
            dispatch({
                type: ADD_LEAD,
                payload: res.data

            });
        })
        .catch(err => dispatch(returnErrors(
            err.response.data, err.response.status)));
};