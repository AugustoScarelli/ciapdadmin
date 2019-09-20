import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import snackbar from './snackbar'
import auth from './auth'
import imgur from './imgur'
import cep from './cep'
import firestore from './firestore'
import userForm from './user-form'
import contentForm from './content-form'

export default combineReducers({
  snackbar,
  auth,
  imgur,
  cep,
  firestore,
  userForm,
  contentForm,
  form,
})
