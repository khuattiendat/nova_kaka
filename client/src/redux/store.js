import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {combineReducers} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userReducer from './userSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1,
    autoMergeLevel2: autoMergeLevel2,
}
const rootReducers = combineReducers({
    user: userReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
setupListeners(store.dispatch)
export default store
