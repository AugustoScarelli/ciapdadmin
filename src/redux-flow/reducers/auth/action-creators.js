import {firebase} from 'src'
import responses from './responses'
import {deleteFromImgur} from 'reducers/imgur/action-creators'
import imgurUtils from 'utils/imgur'
import * as actions from './actions'

export const login = (email, password) => dispatch => {
    dispatch(loginStarted())

    firebase.helperAuth.signInWithEmailAndPassword(email, password)
        .then(({user}) => {
            const {uid, emailVerified} = user
            const doc = firebase.helperFirestore.collection('accounts').doc(uid)
            doc.get()
                .then(res => {
                    if (!res.exists) {
                        dispatch(loginFailure(responses('firestore/user-not-found')))
                        return null
                    }

                    const data = res.data()
                    if (/deleted/.test(data.role)) {
                        dispatch(deleteFromImgur(imgurUtils.get(data.image).key))
                        doc.delete()
                        user.delete()
                        dispatch(loginFailure(responses('auth/user-not-found')))
                        return null
                    }

                    const {name, role, image} = data
                    if (!(/sudo/).test(role) && !(/admin/).test(role)) {
                        dispatch(loginFailure(responses('auth/missing-permissions')))
                        return null
                    }

                    if ((/disabled/.test(role))) {
                        dispatch(loginFailure(responses('auth/user-disabled')))
                        return null
                    }

                    if (!emailVerified) {
                        user.sendEmailVerification()
                        dispatch(loginFailure(responses('auth/email-not-verified')))
                        return null
                    }

                    firebase.helperAuth.signOut()
                    firebase.auth.signInWithEmailAndPassword(email, password)
                        .then(() => {
                            dispatch(loginSuccess({
                                uid,
                                name,
                                role,
                                image: imgurUtils.get(image).url,
                            }))
                        })
                        .catch(({code}) => {
                            dispatch(loginFailure(responses(code)))
                        })
                })
                .catch(() => {
                    dispatch(loginFailure(responses('firestore/unknown-error')))
                    firebase.helperAuth.signOut()
                })
        })
        .catch(({code}) => {
            dispatch(loginFailure(responses(code)))
        })
}

const loginStarted = () => ({
    type: actions.LOGIN_STARTED,
})

const loginFailure = err => dispatch => {
    dispatch({
        type: actions.LOGIN_FAILURE,
        payload: {err},
    })

    dispatch({
        type: actions.FAILURE_RESET,
    })
}

const loginSuccess = info => ({
    type: actions.LOGIN_SUCCESS,
    payload: {info},
})

export const logout = () => dispatch => {
    dispatch(logoutStarted())
    firebase.auth.signOut()
        .then(() => {
            dispatch(logoutSuccess())
        })
        .catch(() => {
            dispatch(logoutFailure(responses()))
        })
}

const logoutStarted = () => ({
    type: actions.LOGOUT_STARTED,
})

const logoutFailure = err => dispatch => {
    dispatch({
        type: actions.LOGOUT_FAILURE,
        payload: {err},
    })

    dispatch({
        type: actions.FAILURE_RESET,
    })
}

const logoutSuccess = () => ({
    type: actions.LOGOUT_SUCCESS,
})
