import { PayloadAction, UnknownAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user/IUser";
// import { login, checkAuth, signUp } from "./ActionCreators";

interface UserState {
    user: IUser,
    isLoading: boolean,
    error: {
        message: string
    },
    isAuth: boolean,
    isCheckingAuth: boolean 
}

const initialState: UserState = {
    user: {
        email: '',
        isActivated: false,
        id: '',
        name: '',
        likedSongs: []
    },
    isLoading: false,
    error: { message: '' },
    isAuth: false,
    isCheckingAuth: true 
}

// if we don't specify startsWith("user"), when songs are fetched, they will be added to user state

function isUserPendingAction(action: UnknownAction) {
    return typeof action.type === 'string' && action.type.endsWith('/pending') && action.type.startsWith("user")
}
function isUserFulfilledAction(action: UnknownAction) {
    return typeof action.type === 'string' && action.type.endsWith('/fulfilled') && action.type.startsWith("user")
}
function isUserRejectedAction(action: UnknownAction) {
    return typeof action.type === 'string' && action.type.endsWith('/rejected') && action.type.startsWith("user")
}

// function isUserLogoutPendingAction(action: UnknownAction) {
//     return typeof action.type === 'string' && action.type.endsWith('logout/pending') && action.type.startsWith("user")
// }
function isUserLogoutFulfilledAction(action: UnknownAction) {
    // return typeof action.type === 'string' && action.type.endsWith('logout/fulfilled') && action.type.startsWith("user")
    return typeof action.type === 'string' && action.type.includes("logout")
}
// function isUserLogoutRejectedAction(action: UnknownAction) {
//     return typeof action.type === 'string' && action.type.endsWith('logout/rejected') && action.type.startsWith("user")
// }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // use addMatcher insted of myltiple .addCase
        builder
            .addMatcher(isUserFulfilledAction, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.error.message = '';
                state.user = action.payload;
                state.isAuth = true
                // state.isCheckingAuth = false
            })
            .addMatcher(isUserPendingAction, (state) => {
                state.isLoading = true;
                // state.isCheckingAuth = true
            })
            .addMatcher(isUserRejectedAction, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false;
                state.error = action.payload;
                // state.isCheckingAuth = false

            })
            .addMatcher(isUserLogoutFulfilledAction, (state) => {
                state.user = initialState.user
                state.isAuth = false
            })
    }
})

export default userSlice.reducer;
