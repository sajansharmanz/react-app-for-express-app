import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface LoadingState {
    loading: boolean;
}

const initialState: LoadingState = {
    loading: false,
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state: RootState): boolean =>
    state.loading.loading;

export default loadingSlice.reducer;
