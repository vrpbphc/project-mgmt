import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth.js";

export default configureStore({
    reducer: {
        auth: authReducer
    }
});