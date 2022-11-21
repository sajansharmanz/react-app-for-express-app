import { request } from "config/axios";

import { store } from "redux/store";

import { setLoading } from "redux/loading/loadingSlice";
import {
    createAvatarSuccess,
    deleteAvatarSuccess,
    fetchAvatarSuccess,
    fetchProfileSuccess,
    updateAvatarSuccess,
    updateProfileSuccess,
} from "redux/profile/profileSlice";

import {
    SuccessfulAvatarResponseBody,
    SuccessfulProfileResponseBody,
    UpdateProfileRequestBody,
} from "types/api";

export const addAvatarRequest = async (
    blob: Blob,
    filename: string
): Promise<void> => {
    store.dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("avatar", blob, filename);

    const response = await request.post("/profile/avatar", formData);

    if (response.status === 200) {
        store.dispatch(
            createAvatarSuccess(response.data as SuccessfulAvatarResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const fetchAvatarRequest = async (): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.get("/profile/avatar");

    if (response.status === 200) {
        store.dispatch(
            fetchAvatarSuccess(response.data as SuccessfulAvatarResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const updateAvatarRequest = async (
    blob: Blob,
    filename: string
): Promise<void> => {
    store.dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("avatar", blob, filename);

    const response = await request.patch("/profile/avatar", formData);

    if (response.status === 200) {
        store.dispatch(
            updateAvatarSuccess(response.data as SuccessfulAvatarResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const deleteAvatarRequest = async (): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.delete("/profile/avatar");

    if (response.status === 204) {
        store.dispatch(deleteAvatarSuccess());
    }

    store.dispatch(setLoading(false));
};

export const fetchProfileRequest = async (): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.get("/profile");

    if (response.status === 200) {
        store.dispatch(
            fetchProfileSuccess(response.data as SuccessfulProfileResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const updateProfileRequest = async (
    body: UpdateProfileRequestBody
): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.patch("/profile", {
        ...body,
    });

    if (response.status === 200) {
        store.dispatch(
            updateProfileSuccess(response.data as SuccessfulProfileResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};
