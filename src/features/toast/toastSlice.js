import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../auth/authSlice";
import { addBlog, deleteBlog, editBlog, searchBlogs } from "../blogs/blogsSlice";

const initialState = {
    message: "",
    type: ""
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        resetToast: state => {
            state.message = "";
            state.type = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state = {
                    message: "",
                    type: ""
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.message = "Account created!";
                    state.type = 'success';
                } else {
                    // Non-network errors will still be fulfilled promises, these types of errors can be handled here.
                    state.message = action.payload.message;
                    state.type = 'error';
                } 
            })
            .addCase(register.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = 'error';
            })
            // Login
            .addCase(login.pending, (state) => {
                state.message = "";
                state.type = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload === 'Success') {
                    state.message = "Logged in!";
                    state.type = 'success';
                } else {
                    state.message = action.payload;
                    state.type = 'error';
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = "error";
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.message = "Logged out!";
                state.type = "success";
            })
            .addCase(logout.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = "error";
            })
            // Add Blog
            .addCase(addBlog.pending, state => {
                state.message = "";
                state.type = "";
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                if (action.payload === undefined) {
                    state.message = "Blog Added!";
                    state.type = "success";
                } else {
                    state.message = action.payload.message;
                    state.type = "error";
                }
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = "error";
            })
            // Delete Blog
            .addCase(deleteBlog.pending, state => {
                state.message = "";
                state.type = "";
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                if (action.payload === undefined) {
                    state.message = "Blog Deleted!";
                    state.type = "success";
                } else {
                    state.message = action.payload.message;
                    state.type = "error";
                }
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = "error";
            })
            // Edit Blog
            .addCase(editBlog.pending, state => {
                state.message = "";
                state.type = "";
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                if (action.payload === undefined) {
                    state.message = "Blog Edited!";
                    state.type = "success";
                } else {
                    state.message = action.payload.message;
                    state.type = "error";
                }
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = "error";
            })
            // Search Blog
            .addCase(searchBlogs.pending, state => {
                state.message = ""
                state.type = ""
            })
            .addCase(searchBlogs.fulfilled, (state, action) => {
                if (action.payload.length === 0) {
                    state.message = "No such blogs found!"
                    state.type = "error"
                }
            })
            .addCase(searchBlogs.rejected, (state, action) => {
                state.message = action.payload.message;
                state.type = "error";
            })
    }
})

export const { setToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;