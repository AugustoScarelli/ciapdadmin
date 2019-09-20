import * as actions from './actions'
import createReducer from '../create-reducer'

const initialState = {
  loading: false,
  error: null,
  info: {
    url: null,
    key: null,
  },
}

export default createReducer(initialState, {
  [actions.IMGUR_RESET]: () => initialState,
  [actions.UPLOAD_STARTED]: state => ({
    ...state,
    loading: true,
  }),
  [actions.UPLOAD_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error,
  }),
  [actions.UPLOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    info: {
      url: action.payload.imageInfo.data.data.link,
      key: action.payload.imageInfo.data.data.deletehash,
    },
  }),
  [actions.DELETE_STARTED]: state => ({
    ...state,
    loading: true,
  }),
  [actions.DELETE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error,
  }),
  [actions.DELETE_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
})
