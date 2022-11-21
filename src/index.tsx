import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { persistor, store } from "redux/store";

import ProtectedRoute from "components/ProtectedRoute";

import AuthLayout from "layouts/Auth";
import DashboardLayout from "layouts/Dashboard";

import ErrorPage from "pages/Error";
import NotFoundPage from "pages/NotFound";
import LoginPage from "pages/Login";
import SignUpPage from "pages/SignUp";
import ForgotPasswordPage from "pages/ForgotPassword";
import ResetPasswordPage from "pages/ResetPassword";
import FeedPage from "pages/Feed";
import AccountPage from "pages/Account";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/feed" replace />,
        errorElement: <ErrorPage />,
    },
    {
        element: <DashboardLayout />,
        children: [
            {
                path: "/feed",
                element: (
                    <ProtectedRoute>
                        <FeedPage />
                    </ProtectedRoute>
                ),
                errorElement: <ErrorPage />,
            },
            {
                path: "/account",
                element: (
                    <ProtectedRoute>
                        <AccountPage />
                    </ProtectedRoute>
                ),
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/forgotpassword",
                element: <ForgotPasswordPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/resetpassword",
                element: <ResetPasswordPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/signup",
                element: <SignUpPage />,
                errorElement: <ErrorPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router} />
                <ToastContainer autoClose={3000} theme="colored" />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// Call the element loader after the app has been rendered the first time
// eslint-disable-next-line @typescript-eslint/no-floating-promises
defineCustomElements(window);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
