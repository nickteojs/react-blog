import { configureStore } from "@reduxjs/toolkit";
import blogsSlice from "./features/blogs/blogsSlice";
import authSlice from "./features/auth/authSlice";
import toastSlice from "./features/toast/toastSlice";

const store = configureStore({
    reducer: {
        blogsSlice,
        authSlice,
        toastSlice, 
    }
})

export default store;