/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
import { toast } from "react-toastify";

import { store } from "redux/store";
import { forceSignOut } from "redux/user/userSlice";
import { IError } from "types/api";

window.axiosAbortController = new AbortController();

export const request = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

request.interceptors.request.use((config) => {
    const { user } = store.getState();
    const { token } = user;

    config.headers = {
        Authorization: `Bearer ${token}`,
    };

    config.signal = window.axiosAbortController?.signal;

    return config;
});

request.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response === null || error.response === undefined) {
            if (error.message !== "canceled") {
                toast.error(error.message);
            }

            return error;
        }

        const errArr: IError[] = error.response.data.errors;

        if (JSON.stringify(errArr).includes("Please login to continue")) {
            store.dispatch(forceSignOut());
            window.axiosAbortController?.abort();
        } else {
            errArr.forEach(({ message }) => {
                toast.error(message);
            });
        }

        return error;
    }
);
