import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";

const AuthLayout: React.FC<{}> = (): JSX.Element => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Outlet />
            </Box>
        </Container>
    );
};

export default AuthLayout;
