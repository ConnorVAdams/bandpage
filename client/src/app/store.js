import { configureStore } from "@reduxjs/toolkit"
import artistReducer from '../features/artist/artistSlice'
import trackReducer from '../features/track/trackSlice'


export const store = configureStore({
    reducer: {
        artist: artistReducer,
        track: trackReducer
    },
    devTools: {trace: true}
})

