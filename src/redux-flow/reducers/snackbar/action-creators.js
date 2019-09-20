import * as actions from './actions'

export const openSnackbar = (options) => ({
    type: actions.SNACKBAR_OPEN,
    payload: {
        open: true,
        ...options,
    },
})

export const closeSnackbar = () => ({
    type: actions.SNACKBAR_CLOSE,
})
