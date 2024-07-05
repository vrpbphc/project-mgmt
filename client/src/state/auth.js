import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: 0,
        token: null
    },
    reducers: {
        setUserToken: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        }
    }
});

export const { setUserToken } = authSlice.actions;

export default authSlice.reducer;