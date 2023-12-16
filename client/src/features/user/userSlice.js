import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { getToken, getRefreshToken, checkToken } from "../../utils/main";
// import { fetchOneArtist } from "../artist/artistSlice";
// import { fetchOneFan } from "../fan/fanSlice"
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

// Send user info and/or credentials from client to server

const initialState = {
    data: null,
    // type: null,
    // errors: [],
    // loading: true
}

const register =  async ({ url, values }) => {
    console.log(values)
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
            return data
        } else throw data.message
    } catch (error) {
        return error
    }
}

const fetchMe = async () => {
    try {
        const resp = await fetch("/me", {
            headers: {
                "Authorization": `Bearer ${getToken()}` 
            }
        })
        const data = await resp.json()
        if (resp.ok) {
            return {user: data, flag: "me"}
        } else {
            const response = await fetch("/refresh", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${getRefreshToken()}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                return {...data, flag: "refresh"}
            } else {
                throw data.msg
            }
        }
    } catch (error) {
        return error
    }
}

const deleteUser = async (id, asyncThunk) => {
    try {
        const respCheckToken = await checkToken()
        
        if (respCheckToken.ok) {
            const resp = await fetch(`/users/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
            if (resp.ok) { //! 204 NO CONTENT
            } else {
                const data = await resp.json()
                throw data.message || data.msg
            }
        } else {
            const data = await respCheckToken.json()
            throw data.message || data.msg
        }
    } catch (error) {
        return error
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({
        setUserType: create.reducer((state, action) => {
            if (action.payload.genres) {
                state.data.artist = action.payload
                state.loading = false
                state.errors = []
            } else {
                state.data.fan = action.payload
                state.loading = false
                state.errors = []
            }
        }),
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
        fetchCurrentUser: create.asyncThunk(
            fetchMe,
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
        ),
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
                        console.log(action.payload)
                        state.data = action.payload.user
                    }
                },
            }
        ),
        fetchDeleteUser: create.asyncThunk(
            deleteUser,
            {
                pending: (state) => {
                    state.errors = []
                    state.loading = true
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
                        state.data = null
                    }
                },
            }
        ),
    }),
    selectors: {
        selectUser(state){
        },
        selectErrors(state){
            return state.errors
        }
    }
})

export const {
    setUserType,
    setUser,
    logout,
    addError,
    clearErrors,
    fetchRegister,
    fetchCurrentUser,
    fetchPatchUser,
    fetchDeleteUser
} = userSlice.actions

export const {
    selectUser,
    selectErrors
} = userSlice.selectors

export default userSlice.reducer

