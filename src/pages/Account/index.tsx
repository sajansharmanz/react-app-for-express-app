/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { toast } from "react-toastify";
import {
    addAvatarRequest,
    deleteAvatarRequest,
    fetchAvatarRequest,
    fetchProfileRequest,
    updateAvatarRequest,
    updateProfileRequest,
} from "requests/profile";
import { useAppSelector } from "hooks/redux";
import {
    selectAvatar,
    selectFirstName,
    selectLastName,
    selectSkinTone,
} from "redux/profile/profileSlice";
import { SkinToneMapping } from "consts/SkinTone";
import { selectLoading } from "redux/loading/loadingSlice";
import { signOutRequest } from "requests/user";

const AccountPage: React.FC = (): JSX.Element => {
    const isFirstRender = useRef(true);
    const loading = useAppSelector(selectLoading);
    const avatar = useAppSelector(selectAvatar);
    const firstName = useAppSelector(selectFirstName);
    const lastName = useAppSelector(selectLastName);
    const skinTone = useAppSelector(selectSkinTone);

    const [fN, setFN] = useState<string>("");
    const [lN, setLN] = useState<string>("");
    const [sT, setST] = useState<string>("NONE");

    useEffect(() => {
        const fetchInitialData = async (): Promise<void> => {
            await fetchAvatarRequest();
            await fetchProfileRequest();
        };

        if (isFirstRender.current) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchInitialData();
            isFirstRender.current = false;
        }
    }, []);

    useEffect(() => {
        if (firstName !== null) {
            setFN(firstName);
        }

        if (lastName !== null) {
            setLN(lastName);
        }

        if (skinTone !== null) {
            setST(skinTone);
        }
    }, [firstName, lastName, skinTone]);

    const changeAvatar = async (): Promise<void> => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
            });

            if (cameraResult !== null) {
                let imagePath: string | undefined;

                const { webPath, path } = cameraResult;

                if (webPath !== undefined) {
                    imagePath = webPath;
                } else if (path !== undefined) {
                    imagePath = path;
                }

                if (imagePath !== undefined) {
                    const response = await fetch(imagePath);
                    const blob = await response.blob();
                    const filename = imagePath.substring(
                        imagePath.lastIndexOf("/") + 1
                    );

                    if (avatar === null) {
                        await addAvatarRequest(blob, filename);
                    } else {
                        await updateAvatarRequest(blob, filename);
                    }
                }
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const deleteAvatar = async (): Promise<void> => {
        await deleteAvatarRequest();
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        await updateProfileRequest({
            firstName: fN,
            lastName: lN,
            skinTone: sT,
        });
    };

    const handleLogout = async (): Promise<void> => {
        await signOutRequest();
    };

    return (
        <Container
            sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <Avatar
                    alt="avatar"
                    src={avatar !== null ? avatar : ""}
                    sx={{
                        width: "200px",
                        height: "200px",
                    }}
                />

                <IconButton
                    onClick={changeAvatar}
                    disableRipple
                    disableFocusRipple
                    sx={{
                        position: "absolute",
                        top: "60%",
                        left: "110%",
                        transform: "translateX(-110%) translateY(-60%)",
                        backgroundColor: "grey",
                    }}
                >
                    <EditIcon sx={{ fill: "white" }} />
                </IconButton>
                <IconButton
                    onClick={deleteAvatar}
                    disableRipple
                    disableFocusRipple
                    sx={{
                        position: "absolute",
                        top: "90%",
                        left: "100%",
                        transform: "translateX(-100%) translateY(-90%)",
                        backgroundColor: "red",
                    }}
                >
                    <DeleteIcon sx={{ fill: "white" }} />
                </IconButton>
            </Box>

            <Box
                component="form"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit}
                noValidate
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    value={fN}
                    onChange={(e) => setFN(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={lN}
                    onChange={(e) => setLN(e.target.value)}
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="profile-skintone-label">
                        Skin Tone
                    </InputLabel>
                    <Select
                        labelId="profile-skintone-label"
                        id="profile-skintone"
                        value={sT}
                        label="Skin Tone"
                        onChange={(e) => setST(e.target.value)}
                    >
                        {Object.entries(SkinToneMapping).map(
                            ([name, dec], idx) => (
                                <MenuItem key={idx} value={name}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: `&#128077;${dec}`,
                                        }}
                                    ></span>
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    Save
                </Button>
                <Box sx={{ textAlign: "center" }}>
                    <Link
                        onClick={handleLogout}
                        variant="body2"
                        sx={{ cursor: "pointer" }}
                    >
                        Logout
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default AccountPage;
