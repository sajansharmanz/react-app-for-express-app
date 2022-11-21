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
import { Id, toast } from "react-toastify";

// Hooks
import { useAppSelector } from "hooks/redux";
import useUser from "hooks/useUser";

// Selectors
import { selectLoading } from "redux/loading/loadingSlice";
import { signUpRequest } from "requests/user";
import cleanDeviceInfoObject from "utils/cleanDeviceInfoObject";
import useDeviceInfo from "hooks/useDeviceInfo";

const SignUpPage: React.FC = (): JSX.Element => {
    const loading = useAppSelector(selectLoading);
    const deviceInfo = useDeviceInfo();
    const { loggedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/", { replace: true });
        }
    }, [loggedIn]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<Id | undefined> => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();
        const confirmPassword = data.get("confirmPassword")?.toString();

        if (password !== confirmPassword) {
            return toast.error("Passwords must match");
        }

        await signUpRequest({
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
                Sign up
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
                    disabled={loading}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    disabled={loading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    Sign Up
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
                            Already have an account? Login
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default SignUpPage;
