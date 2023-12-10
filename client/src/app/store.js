import {configureStore} from "@reduxjs/toolkit"
import artistReducer from "../features/artist/artistSlice"
// import productionReducer from "../features/production/productionSlice"

export const store = configureStore({
    reducer: {
        artist: artistReducer
        // user: userReducer,
    },
    devTools: {trace: true}
})

