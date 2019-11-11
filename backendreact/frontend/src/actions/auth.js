import axios from 'axios';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

//VALIDA EL ESTADO DEL TOKEN Y CARGA EL USUARIO

export const loadUser = () => (dispatch, getState) => {
    //USUARIO CARGANDO
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//LOGIN USER

export const login = (username, password) => dispatch => {

    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //REQUEST BODY
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

//LOGOUT 
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
        });
};

// Configuracion con el token

export const tokenConfig = getState => {
    // OBTENER EL TOKEN DE STATE
    const token = getState().auth.token;

    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //SI EXISTE TOKEN AÑADE HEADERS CONFIG
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;

    }

    return config;
}

//REGISTER USER

export const register = ({ username, password, email }) => dispatch => {



    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //REQUEST BODY
    const body = JSON.stringify({ username, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data,
                err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};
