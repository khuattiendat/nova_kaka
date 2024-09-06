import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    userName: "",
    accessToken: "",
    role: "",
    socketConnection: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action?.payload?._id
            state.userName = action?.payload?.userName
            state.role = action?.payload?.role
        },
        setAll: (state, action) => {
            state._id = action?.payload?._id
            state.userName = action?.payload.userName
            state.accessToken = action?.payload.accessToken
            state.role = action?.payload.role
            state.socketConnection = action?.payload.socketConnection
        },
        setToken: (state, action) => {
            state.accessToken = action.payload
        },
        logout: (state, action) => {
            state._id = ""
            state.userName = ""
            state.accessToken = ""
            state.role = ""
            state.socketConnection = null
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setUser, setAll, setToken, logout, setOnlineUser, setSocketConnection} = userSlice.actions

export default userSlice.reducer