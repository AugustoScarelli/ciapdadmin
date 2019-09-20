import axios from 'axios'
import * as actions from './actions'

export const fetchCep = cep => dispatch => {
    dispatch(resetCep())
    dispatch(fetchStarted())

    return axios({url: `https://viacep.com.br/ws/${cep}/json/`, method: 'GET'})
        .then(response => {
            if (response.data.erro) {
                dispatch(fetchFailure('Unknown CEP'))
            } else {
                dispatch(fetchSuccess(response))
            }
        })
        .catch(error => {
            dispatch(fetchFailure(error.message))
        })
}

export const resetCep = () => ({
    type: actions.RESET,
})

const fetchStarted = () => ({
    type: actions.FETCH_STARTED,
})

const fetchFailure = error => ({
    type: actions.FETCH_FAILURE,
    payload: {
        error,
    },
})

const fetchSuccess = cepInfo => ({
    type: actions.FETCH_SUCCESS,
    payload: {
        cepInfo,
    },
})
