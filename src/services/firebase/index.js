import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { logout } from 'reducers/auth/action-creators'

const devConfig = {
  apiKey: 'AIzaSyDMYtnQSqSAqaOgf18HvaHo3KaHotmT_vc',
  authDomain: 'ciapddev.firebaseapp.com',
  databaseURL: 'https://ciapddev.firebaseio.com',
  projectId: 'ciapddev',
  storageBucket: 'ciapddev.appspot.com',
  messagingSenderId: '261046272445',
}

const prodConfig = {
  apiKey: 'AIzaSyBISjcljI5odKAL_1PNnx7OJJXuAJrJlKM',
  authDomain: 'ciapdprod.firebaseapp.com',
  databaseURL: 'https://ciapdprod.firebaseio.com',
  projectId: 'ciapdprod',
  storageBucket: 'ciapdprod.appspot.com',
  messagingSenderId: '763787832220',
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

class Firebase {
  constructor () {
    const main = firebase.initializeApp(config)
    this.auth = main.auth()
    this.auth.onAuthStateChanged(auth => auth ? null : logout())
    this.firestore = main.firestore()

    const helper = firebase.initializeApp(config, 'helper')
    this.helperAuth = helper.auth()
    this.helperFirestore = helper.firestore()
  }

}

export default Firebase
