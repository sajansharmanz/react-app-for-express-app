import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import useDeviceInfo from "hooks/useDeviceInfo";
import useUser from "hooks/useUser";
import { useAppSelector } from "hooks/redux";

// Selectors
import { selectLoading } from "redux/loading/loadingSlice";

// Requests
import { signInRequest } from "requests/user";

// Utils
import cleanDeviceInfoObject from "utils/cleanDeviceInfoObject";

const LoginPage: React.FC<{}> = (): JSX.Element => {
    const loading = useAppSelector(selectLoading);

    const deviceInfo = useDeviceInfo();
    const { loggedIn } = useUser();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loggedIn) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            const origin = location.state?.from?.pathname || "/";
            navigate(origin, { replace: true });
        }
    }, [loggedIn]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();

        await signInRequest({
            email,
            password,
            deviceInfo: cleanDeviceInfoObject(deviceInfo),
        });
    };

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={loading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link
                            onClick={() => navigate("/forgotpassword")}
                            variant="body2"
                            sx={{ cursor: "pointer" }}
                        >
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link
                            onClick={() => navigate("/signup")}
                            variant="body2"
                            sx={{ cursor: "pointer" }}
                        >
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default LoginPage;
