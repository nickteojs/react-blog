import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { auth } from "../../firebase";

const authRef = firebase.firestore().collection("users");
const initialState = {
    user: null,
    loading: true,
    userInfo: {}
}

export const login = createAsyncThunk('/auth/login', async ({ email, password }) => {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        if (result.user.uid) {
            return "Success";
        }
        return result;
    } catch (error) {
        return error.message;
    }
})

export const register = createAsyncThunk('/auth/register', async (accountInfo) => {
    const { email, password, displayName, description } = accountInfo;
    try {
        return [
            await auth.createUserWithEmailAndPassword(email, password),
            displayName,
            description,
            email
        ]
    } catch (error) {
        return error;
    }
})

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        return await auth.signOut();
    } catch (error) {
        return error;
    }
})

export const setUserData = createAsyncThunk('/auth/setUserData', async (user) => {
    try {
        const data = await authRef.doc(user.uid).get();
        return data.data();
    } catch (error) {
        return error;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Registration
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const [user, displayName, bioName, email] = action.payload;
                    authRef.doc(user.user.uid).set({
                        displayName,
                        bio: bioName,
                        email
                    });       
                }
            })
            .addCase(register.rejected, state => {
                state.loading = false;
            })
            // Login
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
            })
            .addCase(login.rejected, state => {
                state.loading = true;
            })
            // Logout
            .addCase(logout.fulfilled, state => {
                state.user = null;
                state.userInfo = {};
            })
            // Set User Data
            .addCase(setUserData.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
    }
})

export const { setCurrentUser, setLoading } = authSlice.actions;
export default authSlice.reducer;