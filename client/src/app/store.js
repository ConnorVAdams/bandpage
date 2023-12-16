import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import artistReducer from '../features/artist/artistSlice';
import userReducer from '../features/user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ 
    user: userReducer,
    artist: artistReducer
    })
    
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    export const store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: [...getDefaultMiddleware(), thunk]
    })

export const persistor = persistStore(store);