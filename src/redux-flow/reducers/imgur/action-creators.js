import axios from 'axios'
import * as actions from './actions'

const url = 'https://api.imgur.com/3/image'
const headers = {
    'Authorization': 'Client-ID 55cca17999100f3',
}

export const resetImgur = () => ({
    type: actions.IMGUR_RESET,
})

export const uploadToImgur = (image, {reset} = {reset: true}) => dispatch => {
    if (reset) {
        dispatch(resetImgur())
    }

    dispatch(uploadStarted())
    const data = new FormData()
    data.append('image', image)

    return axios({url, headers, data, method: 'POST'})
        .then(response => {
            dispatch(uploadSuccess(response))
        })
        .catch(error => {
            dispatch(uploadFailure(error.message))
        })
}

const uploadStarted = () => ({
    type: actions.UPLOAD_STARTED,
})

const uploadFailure = error => ({
    type: actions.UPLOAD_FAILURE,
    payload: {
        error,
    },
})

export const uploadSuccess = imageInfo => ({
    type: actions.UPLOAD_SUCCESS,
    payload: {
        imageInfo,
    },
})

export const deleteFromImgur = (key, {reset} = {reset: true}) => dispatch => {
    if (reset) {
        dispatch(resetImgur())
    }

    dispatch(deleteStarted())
    return axios({url: `${url}/${key}`, headers, method: 'DELETE'})
        .then(() => {
            dispatch(deleteSuccess())
        })
        .catch(error => {
            dispatch(deleteFailure(error.message))
        })
}

const deleteStarted = () => ({
    type: actions.DELETE_STARTED,
})

const deleteFailure = error => ({
    type: actions.DELETE_FAILURE,
    payload: {
        error,
    },
})

const deleteSuccess = () => ({
    type: actions.DELETE_SUCCESS,
})
