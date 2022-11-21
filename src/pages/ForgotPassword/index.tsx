import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Hooks
import { useAppSelector } from "hooks/redux";
import useUser from "hooks/useUser";

// Selectors
import { selectLoading } from "redux/loading/loadingSlice";
import { forgotPasswordRequest } from "requests/user";

const ForgotPasswordPage: React.FC<{}> = (): JSX.Element => {
    const loading = useAppSelector(selectLoading);
    const { loggedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/", { replace: true });
        }
    }, [loggedIn]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const email = data.get("email")?.toString();

        await forgotPasswordRequest(email);
    };

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot password
            </Typography>
            <Box
                component="form"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    disabled={loading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    Submit
                </Button>
                <Grid
                    container
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs sx={{ textAlign: "center" }}>
                        <Link
                            onClick={() => navigate("/login")}
                            variant="body2"
                            sx={{ cursor: "pointer" }}
                        >
                            Return to login
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ForgotPasswordPage;
