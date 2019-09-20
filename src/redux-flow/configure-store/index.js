import { createStore, applyMiddleware, compose } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import createEncryptor from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'

const secretKey = process.env.NODE_ENV === 'production'
  ? '1fb1ce61-2b3c-4bf5-9221-747d255068f3'
  : '385c0192-125f-445d-a2be-607dcc54e559'

const encryptor = createEncryptor({
  secretKey,
  onError: (err) => {
    console.error(err)
    alert('Erro na cryptografia dos dados.\nLimpe os dados de navegação de seu navegador.\nCaso o problema persista, contate o administrador .')
  },
})

const persistConfig = {
  key: 'wide',
  storage,
  transforms: [encryptor],
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default ({ initialState } = {}) => {
  const enhancer = compose(
    applyMiddleware(thunk),
    logger(),
  )

  const store = createStore(persistedReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  const persistor = persistStore(store)
  return { store, persistor }
}

const logger = () => (
  window.__REDUX_DEVTOOLS_EXTENSION__
    && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (x) => x
)
