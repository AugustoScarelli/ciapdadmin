import * as actions from './actions'
import createReducer from '../create-reducer'

const initialState = {
  loading: false,
  error: null,
  info: {
    street: null,
    city: null,
    district: null,
  },
}

export default createReducer(initialState, {
  [actions.RESET]: () => initialState,
  [actions.FETCH_STARTED]: state => ({
    ...state,
    loading: true,
  }),
  [actions.FETCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error,
  }),
  [actions.FETCH_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    info: {
      street: action.payload.cepInfo.data.logradouro,
      city: action.payload.cepInfo.data.localidade,
      district: action.payload.cepInfo.data.uf,
    },
  }),
})
