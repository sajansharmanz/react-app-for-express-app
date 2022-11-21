import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    SuccessfulAvatarResponseBody,
    SuccessfulProfileResponseBody,
} from "types/api";

import { RootState } from "redux/store";
import { toast } from "react-toastify";

interface ProfileState {
    firstName: string | null;
    lastName: string | null;
    skinTone: string | null;
    avatar: string | null;
}

const initialState: ProfileState = {
    firstName: null,
    lastName: null,
    skinTone: null,
    avatar: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        createProfileSuccess: (
            state,
            action: PayloadAction<SuccessfulProfileResponseBody>
        ) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.skinTone = action.payload.skinTone;
        },
        fetchProfileSuccess: (
            state,
            action: PayloadAction<SuccessfulProfileResponseBody>
        ) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.skinTone = action.payload.skinTone;
        },
        updateProfileSuccess: (
            state,
            action: PayloadAction<SuccessfulProfileResponseBody>
        ) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.skinTone = action.payload.skinTone;
            toast.success("Profile updated successfully");
        },
        deleteProfileSuccess: (state, action: PayloadAction<undefined>) => {
            state.firstName = null;
            state.lastName = null;
            state.skinTone = null;
        },
        createAvatarSuccess: (
            state,
            action: PayloadAction<SuccessfulAvatarResponseBody>
        ) => {
            state.avatar = action.payload.avatar;
            toast.success("Avatar saved successfully");
        },
        fetchAvatarSuccess: (
            state,
            action: PayloadAction<SuccessfulAvatarResponseBody>
        ) => {
            if (action.payload.avatar.length > 0) {
                state.avatar = action.payload.avatar;
            }
        },
        updateAvatarSuccess: (
            state,
            action: PayloadAction<SuccessfulAvatarResponseBody>
        ) => {
            state.avatar = action.payload.avatar;
            toast.success("Avatar saved successfully");
        },
        deleteAvatarSuccess: (state, action: PayloadAction<undefined>) => {
            state.avatar = null;
            toast.success("Avatar deleted successfully");
        },
    },
});

export const {
    createProfileSuccess,
    fetchProfileSuccess,
    updateProfileSuccess,
    deleteProfileSuccess,
    createAvatarSuccess,
    fetchAvatarSuccess,
    updateAvatarSuccess,
    deleteAvatarSuccess,
} = profileSlice.actions;

export const selectFirstName = (state: RootState): string | null =>
    state.profile.firstName;
export const selectLastName = (state: RootState): string | null =>
    state.profile.lastName;
export const selectSkinTone = (state: RootState): string | null =>
    state.profile.skinTone;
export const selectAvatar = (state: RootState): string | null =>
    state.profile.avatar;

export default profileSlice.reducer;
