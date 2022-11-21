import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography align="center" component="h1" variant="h3">
                    <strong>OOPS! &#128533;</strong>
                </Typography>
                <Typography align="center" component="h2" variant="h4">
                    PAGE NOT FOUND
                </Typography>
                <br />
                <Button
                    onClick={() => navigate("/")}
                    color="primary"
                    variant="contained"
                >
                    Return to home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
