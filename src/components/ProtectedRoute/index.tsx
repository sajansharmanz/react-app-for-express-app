import React from "react";
import useUser from "hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
}): JSX.Element => {
    const { loggedIn } = useUser();
    const location = useLocation();

    if (!loggedIn) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};

ProtectedRoute.displayName = "Components:ProtectedRoute";

export default ProtectedRoute;
