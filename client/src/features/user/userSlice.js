import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { checkToken, getToken } from "../../utils/main";
// import { fetchOneArtist } from "../artist/artistSlice";
// import { fetchOneFan } from "../fan/fanSlice"
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

// Send user info and/or credentials from client to server

const initialState = {
    data: null,
    type: null,
    errors: [],
    loading: true
}


const register =  async ({ url, values }) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const data = await resp.json()
        if (resp.ok) {
            console.log(data)
            return data
        } else throw data.message
    } catch (error) {
        return error
    }
}

// const fetchMe = () => {
    
// }

// On successful login or register, set logged in user to current user in store

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({
        setUser: create.reducer((state, action) => {
            state.data = action.payload
            state.loading = false
            state.errors = []
        }),
        logout: create.reducer((state) => {
            state.data = null
            state.errors = []
        }),
        addError: create.reducer((state, action) => {
            state.errors.push(action.payload)
        }),
        clearErrors: create.reducer((state) => {
            state.errors = []
        }),
        fetchRegister: create.asyncThunk(
            register,
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
                    if (typeof action.payload === "string") {
                        state.errors.push(action.payload)
                    } else {
                        state.data = action.payload.user
                    }
                },
            }
        )
    }),
    selectors: {
        selectUser(state){
            return state.data
        },
        selectErrors(state){
            return state.errors
        }
    }
})

export const {
    setUser,
    logout,
    addError,
    clearErrors,
    fetchRegister
} = userSlice.actions

export const {
    selectUser,
    selectErrors
} = userSlice.selectors

export default userSlice.reducer

