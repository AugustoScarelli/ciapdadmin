import './bootstrap' // Remove at Material UI v4
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import configureStore from './redux-flow/configure-store'
import { PersistGate } from 'redux-persist/integration/react'

import { BrowserRouter as Router } from 'react-router-dom'
import Firebase from 'services/firebase'

import { ThemeProvider } from '@material-ui/styles'
import theme from 'utils/material-ui/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto'

import App from './App'
import Snackbar from 'components/Snackbar'

export const firebase = new Firebase()
const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ThemeProvider theme={theme}>
          <Fragment>
            <CssBaseline />
            <App />
            <Snackbar />
          </Fragment>
        </ThemeProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// Check if this project require serviceWorker
serviceWorker.register()
