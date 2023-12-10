import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { checkToken, getToken } from "../../utils/main";
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

const initialState = {
    data: null,
    errors: [],
    editMode: false,
    spotlight: null,
    loading: true
}
const fetchAll = async (asyncThunk) => {
    try {
        const resp = await fetch('/tracks')
        const data = await resp.json()
        if (resp.ok) {
            return data
        } else {
            throw data.message || data.msg
        }
    } catch (error) {
        return error
    }
}

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: (create) => ({
        fetchAllTracks: create.asyncThunk(
            fetchAll,
            {
                pending: (state) => {
                    state.loading = true
                    state.errors = []
                },
                rejected: (state, action) => {
                    state.loading = false
                    state.errors.push(action.payload)
                },
                fulfilled: (state, action) => {
                    state.loading = false
                    state.data = action.payload
                },
            }
        ),
    }),
    selectors: {
        selectTracks(state){
            return state.data
        },
    }
})

export const {
    // setProduction,
    // setEditMode, 
    // addError, 
    // clearErrors, 
    fetchAllTracks, 
    // fetchOneProduction, 
    // fetchPostProduction, 
    // fetchPatchProduction, 
    // fetchDeleteProduction
} = trackSlice.actions
export const { selectTracks, selectErrors } = trackSlice.selectors
export default trackSlice.reducer