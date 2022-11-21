import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loadingReducer from "redux/loading/loadingSlice";
import userReducer from "redux/user/userSlice";
import profileReducer from "redux/profile/profileSlice";
import postsReducer from "redux/posts/postsSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer,
    profile: profileReducer,
    posts: postsReducer,
});

export default persistReducer(persistConfig, rootReducer);
