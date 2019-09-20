import * as actions from './actions'
import createReducer from '../create-reducer'

export const minSteps = 1
const initialState = {
  type: null,
  open: false,
  step: minSteps,
  steps: 1,
  edit: false,
  content: null,
}

export default createReducer(initialState, {
  [actions.OPEN]: (state, action) => ({
    ...state,
    open: true,
    ...action.payload,
  }),
  [actions.CLOSE]: () => initialState,
  [actions.NEXT_STEP]: state => ({
    ...state,
    step: state.step === state.steps ? state.steps : state.step + 1,
  }),
  [actions.BACK_STEP]: state => ({
    ...state,
    step: state.step === minSteps ? minSteps : state.step - 1,
  }),
})
