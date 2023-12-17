import { configureStore } from "@reduxjs/toolkit"
import artistReducer from '../features/artist/artistSlice'
import userReducer from '../features/user/userSlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'counter',
    storage,
};

const reducers = combineReducers({ counter: counterSlice });

export const store = configureStore({
    reducer: {
        artist: artistReducer,
        user: userReducer,
    },
    devTools: {trace: true}
})