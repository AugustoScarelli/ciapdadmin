import {firebase} from 'src/index'
import responses from './responses'
import * as actions from './actions'

const accountRoles = /^(admin-enabled|admin-disabled|admin-deleted|company-enabled|company-disabled|company-deleted|student-enabled|student-disabled|student-deleted)$/
const contentTypes = /^(job|culture|course|video|game)$/

const resetActions = () => ({
    type: actions.RESET_ACTIONS,
})

export const createUser = (values, {role}) => dispatch => {
    dispatch(createUserStarted())

    firebase.helperAuth.createUserWithEmailAndPassword(values.email, values.password)
        .then(({user}) => {
            if (!accountRoles.test(role)) {
                user.delete()
                dispatch(createUserFailure(responses('general/invalid-role')))
                return null
            }

            if (role === 'student-enabled') {
                if (!values.hasOwnProperty('voiceContext')) {
                    values.voiceContext = 'false'
                }

                if (!values.hasOwnProperty('voiceControl')) {
                    values.voiceControl = 'false'
                }

                if (!values.hasOwnProperty('others')) {
                    values.others = ''
                }
            }

            values.uid = user.uid
            values.role = role
            delete values.password
            firebase.firestore.collection('accounts').doc(values.uid).set({...values})
                .then(() => {
                    dispatch(createUserSuccess())
                    dispatch(resetActions())
                })
                .catch(() => {
                    user.delete()
                    dispatch(createUserFailure(responses()))
                })

            firebase.helperAuth.signOut()
        })
        .catch(({code}) => {
            dispatch(createUserFailure(responses(code)))
        })
}

const createUserStarted = () => ({
    type: actions.CREATE_USER_STARTED,
})

const createUserFailure = err => ({
    type: actions.CREATE_USER_FAILURE,
    payload: {err},
})

const createUserSuccess = () => ({
    type: actions.CREATE_USER_SUCCESS,
})

export const editUser = (values, {callbackRole}) => dispatch => {
    dispatch(editUserStarted())
    const {uid} = values
    delete values.uid
    delete values.role
    delete values.email
    delete values.password

    firebase.firestore.collection('accounts').doc(uid).update({...values})
        .then(() => {
            dispatch(editUserSuccess())
            dispatch(getUsers({role: callbackRole}))
            dispatch(resetActions())
        })
        .catch(() => {
            dispatch(editUserFailure(responses('firestore/unknown-error')))
        })
}

const editUserStarted = () => ({
    type: actions.EDIT_USER_STARTED,
})

const editUserFailure = err => ({
    type: actions.EDIT_USER_FAILURE,
    payload: {err},
})

const editUserSuccess = () => ({
    type: actions.EDIT_USER_SUCCESS,
})

export const getUsers = ({role}) => dispatch => {
    dispatch(getUsersStarted())
    if (!accountRoles.test(role)) {
        dispatch(getUsersFailure(responses('general/invalid-role')))
        return null
    }

    const collection = firebase.firestore.collection('accounts')
    const query = collection.where('role', '==', role)
    query.get()
        .then(snapshot => {
            const users = snapshot.docs.map(doc => doc.data())
            dispatch(getUsersSuccess(users))
        })
        .catch(() => {
            dispatch(getUsersFailure(responses()))
        })
}

export const filterUsers = query => (dispatch, getState) => {
    const state = getState()
    const filteredUsers = state.firestore.users.filter(user => (
        user.name.indexOf(query) !== -1
        || user.email.indexOf(query) !== -1
        || user.cpf.indexOf(query) !== -1 // Check if this throw a error on admin or company seach
    ))

    dispatch(filterUsersStarted(query, filteredUsers))
}

const getUsersStarted = () => ({
    type: actions.GET_USERS_STARTED,
})

const getUsersFailure = err => ({
    type: actions.GET_USERS_FAILURE,
    payload: {err},
})

const getUsersSuccess = users => (dispatch, getState) => {
    dispatch({
        type: actions.GET_USERS_SUCCESS,
        payload: {users},
    })

    const {firestore} = getState()
    if (firestore.filter) {
        dispatch(filterUsers(firestore.query))
    }
}

const filterUsersStarted = (query, filteredUsers) => ({
    type: actions.FILTER_USERS_FETCH,
    payload: {query, filteredUsers},
})

export const filterUsersSuccess = () => ({
    type: actions.FILTER_USERS_COMPLETED,
})

export const changeRole = (uid, newRole, {callbackRole}) => dispatch => {
    dispatch(changeRoleStarted())
    if (!accountRoles.test(newRole)) {
        dispatch(getUsersFailure(responses('general/invalid-role')))
        return null
    }

    firebase.firestore.collection('accounts').doc(uid).update({role: newRole})
        .then(() => {
            dispatch(changeRoleSuccess())
            dispatch(getUsers({role: callbackRole}))
            dispatch(resetActions())
        })
        .catch(() => {
            dispatch(changeRoleFailure(responses('firestore/unknown-error')))
        })
}

const changeRoleStarted = () => ({
    type: actions.CHANGE_ROLE_STARTED,
})

const changeRoleFailure = err => ({
    type: actions.CHANGE_ROLE_FAILURE,
    payload: {err},
})

const changeRoleSuccess = () => ({
    type: actions.CHANGE_ROLE_SUCCESS,
})

export const createContent = (values, {type}) => dispatch => {
    dispatch(createContentStarted())
    if (!contentTypes.test(type)) {
        dispatch(createContentFailure(responses('general/invalid-type')))
        return null
    }

    values.type = type
    const newContentRef = firebase.firestore.collection('contents').doc()
    values.uid = newContentRef.id
    newContentRef.set(values)
        .then(() => {
            dispatch(createContentSuccess())
            dispatch(getContent({type}))
            dispatch(resetActions())
        })
        .catch(() => {
            dispatch(createContentFailure(responses('firestore/unknown-error')))
        })
}

const createContentStarted = () => ({
    type: actions.CREATE_CONTENT_STARTED,
})

const createContentFailure = err => ({
    type: actions.CREATE_CONTENT_FAILURE,
    payload: {err},
})

const createContentSuccess = () => ({
    type: actions.CREATE_CONTENT_SUCCESS,
})

export const editContent = (values, {callbackType}) => dispatch => {
    dispatch(editContentStarted())
    const {uid} = values
    delete values.uid
    delete values.type
    firebase.firestore.collection('contents').doc(uid).update(values)
        .then(() => {
            dispatch(editContentSuccess())
            dispatch(getContent({type: callbackType}))
            dispatch(resetActions())
        })
        .catch(() => {
            dispatch(editContentFailure(responses('firestore/unknown-error')))
        })
}

const editContentStarted = () => ({
    type: actions.EDIT_CONTENT_STARTED,
})

const editContentFailure = err => ({
    type: actions.EDIT_CONTENT_FAILURE,
    payload: {err},
})

const editContentSuccess = () => ({
    type: actions.EDIT_CONTENT_SUCCESS,
})


export const getContent = ({type}) => dispatch => {
    dispatch(getContentStarted())
    if (!contentTypes.test(type)) {
        dispatch(getContentFailure(responses('general/invalid-type')))
        return null
    }

    const collection = firebase.firestore.collection('contents')
    const query = collection.where('type', '==', type)
    query.get()
        .then(snapshot => {
            const contents = snapshot.docs.map(doc => doc.data())
            dispatch(getContentSuccess(contents))
        })
        .catch(() => {
            dispatch(getContentFailure(responses()))
        })
}

export const filterContent = query => (dispatch, getState) => {
    const state = getState()
    const filteredContent = state.firestore.contents.filter(content => (
        content.name.indexOf(query) !== -1
        || content.date.indexOf(query) !== -1
    ))

    dispatch(filterContentStarted(query, filteredContent))
}

const getContentStarted = () => ({
    type: actions.GET_CONTENTS_STARTED,
})

const getContentFailure = err => ({
    type: actions.GET_CONTENTS_FAILURE,
    payload: {err},
})

const getContentSuccess = contents => (dispatch, getState) => {
    dispatch({
        type: actions.GET_CONTENTS_SUCCESS,
        payload: {contents},
    })

    const {firestore} = getState()
    if (firestore.filter) {
        dispatch(filterContent(firestore.query))
    }
}

const filterContentStarted = (query, filteredContent) => ({
    type: actions.FILTER_CONTENTS_FETCH,
    payload: {query, filteredContent},
})

export const filterContentSuccess = () => ({
    type: actions.FILTER_CONTENTS_COMPLETED,
})


export const deleteContent = (uid, {callbackType}) => dispatch => {
    dispatch(deleteContentStarted())
    firebase.firestore.collection('contents').doc(uid).delete().then(() => {
        dispatch(deleteContentSuccess())
        dispatch(getContent({type: callbackType}))
        dispatch(resetActions())
    }).catch(() => {
        dispatch(deleteContentFailure(responses('firestore/unknown-error')))
    })
}

const deleteContentStarted = () => ({
    type: actions.DELETE_CONTENT_STARTED,
})

const deleteContentFailure = err => ({
    type: actions.DELETE_CONTENT_FAILURE,
    payload: {err},
})

const deleteContentSuccess = () => ({
    type: actions.DELETE_CONTENT_SUCCESS,
})