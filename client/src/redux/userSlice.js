import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    name: "",
    phone: "",
    role: "",
    socketConnection: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action?.payload?._id
            state.name = action?.payload?.name
            state.phone = action?.payload?.phone
            state.role = action?.payload?.role
        },
        logout: (state, action) => {
            state._id = ""
            state.name = ""
            state.phone = ""
            state.role = ""
            state.socketConnection = null
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setUser, logout, setOnlineUser, setSocketConnection} = userSlice.actions

export default userSlice.reducer