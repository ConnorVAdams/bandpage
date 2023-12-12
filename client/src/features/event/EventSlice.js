import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { checkToken, getToken } from "../../utils/main";
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

const initialState = {
    data: null,
    errors: [],
    editMode: false,
    current: null,
    loading: true
}
const fetchAll = async (asyncThunk) => {
    try {
        const resp = await fetch('/events')
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

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: (create) => ({
        fetchAllEvents: create.asyncThunk(
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
        selectEvents(state){
            return state.data
        },
    }
})

export const {
    // setProduction,
    // setEditMode, 
    // addError, 
    // clearErrors, 
    fetchAllEvents, 
    // fetchOneProduction, 
    // fetchPostProduction, 
    // fetchPatchProduction, 
    // fetchDeleteProduction
} = eventSlice.actions
export const { selectArtists, selectErrors } = eventSlice.selectors
export default eventSlice.reducer