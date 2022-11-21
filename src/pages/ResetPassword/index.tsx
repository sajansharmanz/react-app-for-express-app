import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { resetPasswordRequest } from "requests/user";

const ResetPasswordPage: React.FC<{}> = (): JSX.Element => {
    const loading = useAppSelector(selectLoading);

    const { loggedIn } = useUser();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [token, setToken] = useState<string | undefined>("");

    useEffect(() => {
        if (loggedIn) {
            navigate("/", { replace: true });
        }
    }, [loggedIn]);

    useEffect(() => {
        setToken(searchParams.get("token")?.toString());
    }, [searchParams]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<Id | undefined> => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const password = data.get("password")?.toString();
        const confirmPassword = data.get("confirmPassword")?.toString();

        if (password !== confirmPassword) {
            return toast.error("Passwords must match");
        }

        const success = await resetPasswordRequest({ token, password });

        if (success) {
            navigate("/login");
        }
    };

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset password
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
                    id="token"
                    label="Token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
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
                    autoFocus
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
                    Reset password
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
                            onClick={() => navigate("/forgotpassword")}
                            variant="body2"
                            sx={{ cursor: "pointer" }}
                        >
                            Token invalid or expired?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ResetPasswordPage;
