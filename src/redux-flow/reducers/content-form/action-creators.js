import imgurUtils from 'utils/imgur'
import { getContent } from 'reducers/firestore/action-creators'
import { deleteFromImgur, resetImgur, uploadSuccess } from 'reducers/imgur/action-creators'
import * as actions from './actions'

const defaultOptions = {
  type: null,
  steps: 1,
  edit: false,
  content: null
}

export const openForm = contentOptions => dispatch => {
  const options = { ...defaultOptions, ...contentOptions }
  if (options.edit) {
    const imgurInfo = imgurUtils.get(options.content.image)
    const imageInfo = {
      data: {
        data: {
          link: imgurInfo.url,
          deletehash: imgurInfo.key,
        },
      },
    }

    dispatch(uploadSuccess(imageInfo))
  }

  dispatch({
    type: actions.OPEN,
    payload: options,
  })
}

export const closeForm = () => (dispatch, getState) => {
  const state = getState()
  if (state.firestore.contentCreated) {
    dispatch(getContent({ type: state.contentForm.type }))
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
