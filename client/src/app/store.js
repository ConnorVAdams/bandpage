import { configureStore } from "@reduxjs/toolkit"
import artistReducer from '../features/artist/artistSlice'
import trackReducer from '../features/track/trackSlice'
import eventReducer from '../features/event/eventSlice'

export const store = configureStore({
    reducer: {
        artist: artistReducer,
        tracks: trackReducer,
        events: eventReducer
    },
    devTools: {trace: true}
})

