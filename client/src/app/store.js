import { configureStore } from "@reduxjs/toolkit"
import artistReducer from '../features/artist/artistSlice'

export const store = configureStore({
    reducer: {
        artist: artistReducer
    },
    devTools: {trace: true}
})

