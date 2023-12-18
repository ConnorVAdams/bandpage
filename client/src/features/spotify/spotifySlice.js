// import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
// import { checkToken, getToken } from "../../utils/main";
// import { useDispatch } from "react-redux";
// import { fetchCurrentUser } from "../user/userSlice";
// export const createSlice = buildCreateSlice({
//     creators: { asyncThunk: asyncThunkCreator },
// })


// const initialState = {
//     data: null,
//     token: null,
//     // errors: [],
//     // loading: true
// }

// const fetchSpotifyProfile = async () => {
//     try {
//         const resp = await fetch("/me", {
//             headers: {
//                 "Authorization": `Bearer ${getToken()}` 
//             }
//         })
//         const data = await resp.json()
//         debugger
//         if (resp.ok) {
//             return {user: data, flag: "me"}
//         // } else {
//         //     const response = await fetch("/refresh", {
//         //         method: "POST",
//         //         headers: {
//         //             "Authorization": `Bearer ${getRefreshToken()}`
//         //         }
//         //     })
//         //     const data = await response.json()
//         //     if (response.ok) {
//         //         return {...data, flag: "refresh"}
//         //     } else {
//         //         throw data.msg
//         //     }
//         }
//     } catch (error) {
//         return error
//     }
// }

// const artistSlice = createSlice({
//     name: 'artist',
//     initialState,
//     reducers: (create) => ({
//         setArtist: create.reducer((state, action) => {
//             state.current = action.payload
//             state.loading = false
//             state.errors = []
//         }),
//         // setEditMode: create.reducer((state, action) => {
//         //     state.editMode = action.payload
//         //     state.loading = false
//         //     state.errors = []
//         // }),
//         // addError: create.reducer((state, action) => {
//         //     state.errors.push(action.payload)
//         //     state.loading = false
//         // }),
//         // clearErrors: create.reducer((state) => {
//         //     state.errors = []
//         //     state.loading = false
//         // }),
//         fetchAllArtists: create.asyncThunk(
//             fetchAll,
//             {
//                 pending: (state) => {
//                     state.loading = true
//                     state.errors = []
//                 },
//                 rejected: (state, action) => {
//                     state.loading = false
//                     state.errors.push(action.payload)
//                 },
//                 fulfilled: (state, action) => {
//                     state.loading = false
//                     state.data = action.payload
//                 },
//             }
//         ),
//         fetchOneArtist: create.asyncThunk(
//             fetchOne,
//             {
//                 pending: (state) => {
//                     state.errors = []
//                     state.loading = true
//                 },
//                 rejected: (state, action) => {
//                     state.loading = false
//                     state.errors.push(action.payload)
//                 },
//                 fulfilled: (state, action) => {
//                     state.loading = false
//                     if (!action.payload.id) {
//                         state.errors.push(action.payload)
//                     } else {
//                         state.current = action.payload
//                     }
//                 },
//             }
//         ),
//         fetchPostArtist: create.asyncThunk(
//             postArtist,
//             {
//                 pending: (state) => {
//                     state.errors = []
//                     state.loading = true
//                 },
//                 rejected: (state, action) => {
//                     state.loading = false
//                     state.errors.push(action.payload)
//                 },
//                 fulfilled: (state, action) => {
//                     state.loading = false
//                     if (!action.payload.id) {
//                         state.errors.push(action.payload)
//                     } 
//                     // else {
//                     //     state.data.push(action.payload)
//                     // }
//                 },
//             }
//         ),
//         fetchPatchArtist: create.asyncThunk(
//             patchArtist,
//             {
//                 pending: (state) => {
//                     state.errors = []
//                     state.loading = true
//                 },
//                 rejected: (state, action) => {
//                     state.loading = false
//                     state.errors.push(action.payload)
//                 },
//                 fulfilled: (state, action) => {
//                     state.loading = false
//                     if (!action.payload.id) {
//                         state.errors.push(action.payload)
//                     } else {
                        
//                     }
//                 },
//             }
//         ),
//         // fetchDeleteArtist: create.asyncThunk(
//         //     deleteArtist,
//         //     {
//         //         pending: (state) => {
//         //             state.errors = []
//         //             state.loading = true
//         //         },
//         //         rejected: (state, action) => {
//         //             state.loading = false
//         //             state.errors.push(action.payload)
//         //         },
//         //         fulfilled: (state, action) => {
//         //             state.loading = false

//         //             if (typeof action.payload === "string") {
//         //                 state.errors.push(action.payload)
//         //             } else {
//         //                 const idx = state.data.findIndex(artist => artist.id === parseInt(action.payload.prod_id))
//         //                 state.data.splice(idx, 1)
//         //                 state.spotlight = null
//         //             }
//         //         },
//         //     }
//         // ),
//     }),
//     selectors: {
//         selectArtists(state){
//             return state.data
//         },
//         selectArtistById: (state, artist_id) => {
//             return state.data.find(artist => artist.id === artist_id)
//         }
//     }
// })

// export const {
//     setArtist,
//     // setEditMode, 
//     // addError, 
//     // clearErrors, 
//     fetchAllArtists, 
//     fetchOneArtist,
//     fetchNewArtist,
//     fetchPostArtist, 
//     fetchPatchArtist, 
//     // fetchDeleteArtist
// } = artistSlice.actions
// export const { selectArtists, selectErrors } = artistSlice.selectors
// export default artistSlice.reducer