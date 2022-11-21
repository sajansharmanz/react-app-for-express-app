import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "redux/store";
import { SuccessfulPostResponseBody } from "types/api";

interface PostState {
    posts: SuccessfulPostResponseBody[];
}

const initialState: PostState = {
    posts: [],
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        fetchPostsSuccess: (
            state,
            action: PayloadAction<SuccessfulPostResponseBody[]>
        ) => {
            state.posts = action.payload;
        },
        addPostSuccess: (
            state,
            action: PayloadAction<SuccessfulPostResponseBody>
        ) => {
            state.posts = [action.payload, ...state.posts];
            toast.success("Post added successfully");
        },
        deletePostSuccess: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
            toast.success("Post deleted successfully");
        },
    },
});

export const { fetchPostsSuccess, addPostSuccess, deletePostSuccess } =
    postsSlice.actions;

export const selectPosts = (state: RootState): SuccessfulPostResponseBody[] =>
    state.posts.posts;

export default postsSlice.reducer;
