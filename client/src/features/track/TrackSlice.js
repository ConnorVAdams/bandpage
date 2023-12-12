import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { checkToken, getToken } from "../../utils/main";
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

const initialState = {
    data: null,
    errors: [],
    editMode: false,
    loading: true
}
// // const fetchAll = async (asyncThunk) => {
// //     try {
// //         const resp = await fetch('/tracks')
// //         const data = await resp.json()
// //         if (resp.ok) {
// //             return data
// //         } else {
// //             throw data.message || data.msg
// //         }
// //     } catch (error) {
// //         return error
// //     }
// // }

// const getTracks = (artist) => {

// }

// const trackSlice = createSlice({
//     name: 'tracks',
//     initialState,
//     reducers: (create) => ({
//         setTracks: (state, action) => {
//             state.data = state.artist
//         }
//     }),
//     selectors: {
//         selectTracks(state){
//             return state.data
//         },
//     }
// })

// export const {
//     // setProduction,
//     // setEditMode, 
//     // addError, 
//     // clearErrors, 
//     setTracks, 
//     // fetchOneProduction, 
//     // fetchPostProduction, 
//     // fetchPatchProduction, 
//     // fetchDeleteProduction
// } = trackSlice.actions
// export const { selectTracks, selectErrors } = trackSlice.selectors
// export default trackSlice.reducer

const trackSlice = createSlice({
    name: 'tracks',
    initialState: {
        data: null,
        errors: [],
        editMode: false,
        loading: true
    },
    reducers: {
        setTracks: (state, action) => {
        state.data = action.payload; // Set the tracks into the state
        }
    }
});

export const { setTracks } = trackSlice.actions;

export default trackSlice.reducer;