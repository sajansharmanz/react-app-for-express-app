/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import {
    Backdrop,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import ImageIcon from "@mui/icons-material/Image";

import styles from "./index.module.scss";
import { addPostRequest } from "requests/posts";

interface AddPostProps {
    show?: boolean;
}

const AddPost: React.FC<AddPostProps> = ({
    show = true,
}): JSX.Element | null => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imagesExist, setImagesExist] = useState<boolean>(false);

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const handleAdd = (): void => {
        setBackdropOpen(true);
    };

    const handleDiscard = (): void => {
        if (content.length > 0) {
            setAlertOpen(true);
        } else {
            setBackdropOpen(false);
        }
    };

    const handleGoBack = (): void => {
        setAlertOpen(false);
    };

    const handleContinue = (): void => {
        setContent("");
        setAlertOpen(false);
        setBackdropOpen(false);
    };

    const handleCreate = async (): Promise<void> => {
        await addPostRequest(content);

        setContent("");
        setAlertOpen(false);
        setBackdropOpen(false);
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <Backdrop
                open={backdropOpen}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Dialog
                    open={alertOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"If you continue, all your changes will be lost?"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleGoBack}>Go Back</Button>
                        <Button onClick={handleContinue} autoFocus>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ width: "90%", height: "90%" }}>
                    <Card
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardContent sx={{ flex: 1 }}>
                            <textarea
                                id="content"
                                name="post-content"
                                className={classNames({
                                    [styles.content]: true,
                                    [styles.imagesExist]: imagesExist,
                                })}
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                placeholder="Enter content"
                                ref={inputRef}
                            />
                        </CardContent>
                        <CardActions
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{/* <ImageIcon /> */}</span>
                            <span>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </Button>
                                <Button size="small" onClick={handleCreate}>
                                    Create
                                </Button>
                            </span>
                        </CardActions>
                    </Card>
                </Box>
            </Backdrop>
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 70, right: 16 }}
                onClick={handleAdd}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

AddPost.displayName = "Component:AddPost";

export default AddPost;
