import * as actions from './actions'
import createReducer from '../create-reducer'

const initialState = {
  loading: false,
  error: null,
  login: false,
  info: {
    uid: null,
    name: null,
    role: null,
    image: null,
  }
}

export default createReducer(initialState, {
  [actions.FAILURE_RESET]: state => ({
    ...state,
    error: null,
  }),
  [actions.LOGIN_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [actions.LOGIN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    login: true,
    info: action.payload.info,
  }),
  [actions.LOGOUT_STARTED]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [actions.LOGOUT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.err,
  }),
  [actions.LOGOUT_SUCCESS]: () => initialState,
})
