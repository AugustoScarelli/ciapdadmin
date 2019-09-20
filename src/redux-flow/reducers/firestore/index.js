import * as actions from './actions'
import createReducer from '../create-reducer'

const initialState = {
  loading: false,
  error: null,
  filter: false,
  query: null,
  userCreated: false,
  userEdited: false,
  roleChanged: false,
  contentCreated: false,
  contentEdited: false,
  contentDeleted: false,
  users: [],
  filteredUsers: [],
  contents: [],
  filteredContent: [],
}

export default createReducer(initialState, {
  [actions.RESET_ACTIONS]: state => ({
    ...state,
    userCreated: false,
    userEdited: false,
    roleChanged: false,
    contentCreated: false,
    contentEdited: false,
    contentDeleted: false,
  }),
  [actions.CREATE_USER_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
    userCreated: false,
  }),
  [actions.CREATE_USER_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.CREATE_USER_SUCCESS]: state => ({
    ...state,
    loading: false,
    error: null,
    userCreated: true,
  }),
  [actions.EDIT_USER_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
    userEdited: false,
  }),
  [actions.EDIT_USER_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.EDIT_USER_SUCCESS]: state => ({
    ...state,
    loading: false,
    error: null,
    userEdited: true,
  }),
  [actions.GET_USERS_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [actions.GET_USERS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    users: action.payload.users,
  }),
  [actions.FILTER_USERS_FETCH]: (state, action) => ({
    ...state,
    filter: true,
    query: action.payload.query,
    filteredUsers: action.payload.filteredUsers,
  }),
  [actions.FILTER_USERS_COMPLETED]: state => ({
    ...state,
    filter: false,
  }),
  [actions.CHANGE_ROLE_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
    roleChanged: false,
  }),
  [actions.CHANGE_ROLE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.CHANGE_ROLE_SUCCESS]: state => ({
    ...state,
    loading: false,
    error: null,
    roleChanged: true,
  }),
  [actions.CREATE_CONTENT_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
    contentCreated: false,
  }),
  [actions.CREATE_CONTENT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.CREATE_CONTENT_SUCCESS]: state => ({
    ...state,
    loading: false,
    error: null,
    contentCreated: true,
  }),
  [actions.EDIT_CONTENT_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
    contentEdited: false,
  }),
  [actions.EDIT_CONTENT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.EDIT_CONTENT_SUCCESS]: state => ({
    ...state,
    loading: false,
    error: null,
    contentEdited: true,
  }),
  [actions.GET_CONTENTS_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [actions.GET_CONTENTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.GET_CONTENTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    contents: action.payload.contents,
  }),
  [actions.FILTER_CONTENTS_FETCH]: (state, action) => ({
    ...state,
    filter: true,
    query: action.payload.query,
    filteredContent: action.payload.filteredContent,
  }),
  [actions.FILTER_CONTENTS_COMPLETED]: state => ({
    ...state,
    filter: false,
  }),
  [actions.DELETE_CONTENT_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
    contentDeleted: false,
  }),
  [actions.DELETE_CONTENT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.DELETE_CONTENT_SUCCESS]: state => ({
    ...state,
    loading: false,
    error: null,
    contentDeleted: true,
  }),
})
