import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { SuccessfulAuthResponseBody } from "types/api";
import { User } from "types/user";

import { RootState } from "redux/store";

interface UserState {
    user: User | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInSuccess: (
            state,
            action: PayloadAction<SuccessfulAuthResponseBody>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        signUpSuccess: (
            state,
            action: PayloadAction<SuccessfulAuthResponseBody>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        signOutSuccess: (state, action: PayloadAction<undefined>) => {
            state.user = null;
            state.token = null;
            toast.success("Logged out successfully");
        },
        forgotPasswordSuccess: (state, action: PayloadAction<undefined>) => {
            toast.success("Forgot password submitted");
            toast.info("You will receive an email with further instructions");
        },
        resetPasswordSuccess: (state, action: PayloadAction<undefined>) => {
            toast.success("Password reset successfully");
        },
        forceSignOut: (state, action: PayloadAction<undefined>) => {
            state.user = null;
            state.token = null;
            toast.error("You must sign in to continue");

            setTimeout(() => {
                window.axiosAbortController = new AbortController();
            }, 1000);
        },
    },
});

export const {
    signInSuccess,
    signUpSuccess,
    signOutSuccess,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    forceSignOut,
} = userSlice.actions;

export const selectUser = (state: RootState): User | null => state.user.user;
export const selectToken = (state: RootState): string | null =>
    state.user.token;

export default userSlice.reducer;
