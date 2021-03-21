import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './mainReducer.js'; // Root reducer
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage: storage, // define which storage to use
    stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const store = createStore(
    persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
    applyMiddleware() // add any middlewares here
)

const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor}
