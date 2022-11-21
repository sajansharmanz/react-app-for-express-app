import { request } from "config/axios";

import { setLoading } from "redux/loading/loadingSlice";
import { store } from "redux/store";

import {
    forgotPasswordSuccess,
    resetPasswordSuccess,
    signInSuccess,
    signOutSuccess,
    signUpSuccess,
} from "redux/user/userSlice";

import {
    ChangePasswordRequestBody,
    SuccessfulAuthResponseBody,
    SignInSignUpRequestBody,
} from "types/api";

export const signInRequest = async (
    body: SignInSignUpRequestBody
): Promise<void> => {
    store.dispatch(setLoading(true));
    const response = await request.post("/user/login", {
        ...body,
    });

    if (response.status === 200) {
        store.dispatch(
            signInSuccess(response.data as SuccessfulAuthResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const signUpRequest = async (
    body: SignInSignUpRequestBody
): Promise<void> => {
    store.dispatch(setLoading(true));
    const response = await request.post("/user/signup", {
        ...body,
    });

    if (response.status === 201) {
        store.dispatch(
            signUpSuccess(response.data as SuccessfulAuthResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const signOutRequest = async (): Promise<void> => {
    store.dispatch(setLoading(true));
    const response = await request.post("/user/logout");

    if (response.status === 204) {
        store.dispatch(signOutSuccess());
    }

    store.dispatch(setLoading(false));
};

export const forgotPasswordRequest = async (
    email: string | undefined
): Promise<void> => {
    store.dispatch(setLoading(true));
    const response = await request.post("/user/forgotpassword", {
        email,
    });

    if (response.status === 204) {
        store.dispatch(forgotPasswordSuccess());
    }

    store.dispatch(setLoading(false));
};

export const resetPasswordRequest = async (
    body: ChangePasswordRequestBody
): Promise<boolean> => {
    store.dispatch(setLoading(true));
    const response = await request.post("/user/resetpassword", {
        ...body,
    });

    if (response.status === 204) {
        store.dispatch(resetPasswordSuccess());
    }

    store.dispatch(setLoading(false));
    return response.status === 204;
};
