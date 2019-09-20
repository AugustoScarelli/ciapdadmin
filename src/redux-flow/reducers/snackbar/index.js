import * as actions from './actions'
import createReducer from '../create-reducer'

const initialState = {
    open: false,
    type: null,
    content: null,
    duration: null,
}

export default createReducer(initialState, {
    [actions.SNACKBAR_OPEN]: (_, action) => action.payload,
    [actions.SNACKBAR_CLOSE]: () => initialState,
})
