import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
    Container,
    Paper,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";

import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import useUser from "hooks/useUser";

const DashboardLayout: React.FC = (): JSX.Element => {
    const [value, setValue] = useState<string>();
    const { loggedIn } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn]);

    useEffect(() => {
        setValue(location.pathname);
    }, [location]);

    return (
        <Container>
            <Outlet />
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        navigate(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Feed"
                        value="/feed"
                        icon={<FeedOutlinedIcon />}
                    />
                    <BottomNavigationAction
                        label="Account"
                        value="/account"
                        icon={<AccountCircleOutlinedIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </Container>
    );
};

export default DashboardLayout;
