import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { checkToken, getToken } from "../../utils/main";
import { fetchOneArtist } from "../artist/artistSlice";
// import { fetchOneFan } from "../fan/fanSlice"
export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

//

const initialState = {
    data: null,
    errors: [],
    loading: true
}


const register = () => {

}

const fetchMe = () => {
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({

    })
})

