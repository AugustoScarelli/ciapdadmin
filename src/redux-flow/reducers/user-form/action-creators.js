import imgurUtils from 'utils/imgur'
import { getUsers } from 'reducers/firestore/action-creators'
import { deleteFromImgur, resetImgur, uploadSuccess } from 'reducers/imgur/action-creators'
import * as actions from './actions'

const defaultOptions = {
  type: null,
  steps: 1,
  edit: false,
  user: null
}

export const openForm = userOptions => dispatch => {
  const options = { ...defaultOptions, ...userOptions }
  if (options.edit) {
    const imgurInfo = imgurUtils.get(options.user.image)
    const imageInfo = {
      data: {
        data: {
          link: imgurInfo.url,
          deletehash: imgurInfo.key,
        },
      },
    }

    dispatch(uploadSuccess(imageInfo))
    options.user.password = 'default-password'
  }

  dispatch({
    type: actions.OPEN,
    payload: options,
  })
}

export const closeForm = () => (dispatch, getState) => {
  const state = getState()
  if (state.firestore.userCreated) {
    dispatch(getUsers({ role: `${state.userForm.type}-enabled` }))
  } else {
    const deleteKey = state.imgur.info.key
    if (deleteKey) {
      dispatch(deleteFromImgur(deleteKey, { reset: false }))
    }
  }

  dispatch(resetImgur())
  dispatch({ type: actions.CLOSE })
}

export const nextStep = () => ({
  type: actions.NEXT_STEP,
})

export const backStep = () => ({
  type: actions.BACK_STEP,
})
