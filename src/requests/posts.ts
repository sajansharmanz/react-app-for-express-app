import { request } from "config/axios";
import { setLoading } from "redux/loading/loadingSlice";
import {
    addPostSuccess,
    deletePostSuccess,
    fetchPostsSuccess,
} from "redux/posts/postsSlice";
import { store } from "redux/store";
import { SuccessfulPostResponseBody } from "types/api";

export const fetchPostsRequest = async (): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.get("/posts");

    if (response.status === 200) {
        store.dispatch(
            fetchPostsSuccess(response.data as SuccessfulPostResponseBody[])
        );
    }

    store.dispatch(setLoading(false));
};

export const addPostRequest = async (content: string): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.post("/posts", {
        content,
    });

    if (response.status === 201) {
        store.dispatch(
            addPostSuccess(response.data as SuccessfulPostResponseBody)
        );
    }

    store.dispatch(setLoading(false));
};

export const deletePostRequest = async (id: string): Promise<void> => {
    store.dispatch(setLoading(true));

    const response = await request.delete(`/posts/${id}`);

    if (response.status === 204) {
        store.dispatch(deletePostSuccess(id));
    }

    store.dispatch(setLoading(false));
};
