/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useEffect, useRef } from "react";
import { Share } from "@capacitor/share";

import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { red } from "@mui/material/colors";

import { useAppSelector } from "hooks/redux";

import { selectPosts } from "redux/posts/postsSlice";

import { deletePostRequest, fetchPostsRequest } from "requests/posts";

import AddPost from "components/AddPost";
import { generatePostedDatetime } from "utils/date";
import { SuccessfulPostResponseBody } from "types/api";

const FeedPage: React.FC = (): JSX.Element => {
    const posts = useAppSelector(selectPosts);
    const [cardEl, setCardEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(cardEl);
    const likePressTimeout = useRef<NodeJS.Timeout | null>(null);
    const likePressCardId = useRef<string | null>(null);

    useEffect(() => {
        const fetchInitialData = async (): Promise<void> => {
            await fetchPostsRequest();
        };

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchInitialData();
    }, []);

    const handleOpenMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ): void => {
        setCardEl(event.currentTarget);
    };
    const handleCloseMenu = (): void => {
        setCardEl(null);
    };

    const handleDelete = async (id: string): Promise<void> => {
        setCardEl(null);
        await deletePostRequest(id);
    };

    const handleShare = async (
        post: SuccessfulPostResponseBody
    ): Promise<void> => {
        const { value } = await Share.canShare();

        if (value) {
            await Share.share({
                title: "Check out this post!",
                text: `${String(post.versions[0].content.slice(0, 10))}`,
                url: "",
            });
        }
    };

    const startLikePress = (): void => {
        likePressTimeout.current = setTimeout(() => {
            console.log("calling");
            alert("Clicked");
            likePressCardId.current = "1";
        }, 1000);
    };

    const cancelLikePress = (): void => {
        if (likePressTimeout.current !== null) {
            clearTimeout(likePressTimeout.current);
        }
    };

    if (posts.length === 0) {
        return (
            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                <Typography align="center" component="h1" variant="h3">
                    &#128039;
                </Typography>
                <Typography align="center" component="h2" variant="h4">
                    NO POSTS
                </Typography>

                <AddPost />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                mt: 3,
                paddingBottom: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                minHeight: "calc(100vh - 80px)",
            }}
        >
            {posts.map((post) => (
                <span key={`wrap-${String(post.id)}`} style={{ width: "100%" }}>
                    <Card
                        key={`card-${String(post.id)}`}
                        sx={{
                            marginBottom: 2,
                            border: "1px solid #ccc",
                            borderBottom: "none",
                            overflow: "visible",
                            width: "100%",
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    {post.authorId}
                                </Avatar>
                            }
                            action={
                                <IconButton
                                    aria-label="settings"
                                    onClick={handleOpenMenu}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="John Doe"
                            subheader={generatePostedDatetime(post.createdAt)}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                {post.versions[0].content}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="like"
                                onMouseDown={startLikePress}
                                onMouseUp={cancelLikePress}
                            >
                                <ThumbUpOffAltIcon />
                            </IconButton>
                            <IconButton aria-label="comment">
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Menu
                        key={`menu-${String(post.id)}`}
                        id="basic-menu"
                        anchorEl={cardEl}
                        open={open}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                        <MenuItem onClick={() => handleShare(post)}>
                            Share
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(post.id)}>
                            Delete
                        </MenuItem>
                    </Menu>
                </span>
            ))}

            <AddPost />
        </Box>
    );
};

export default FeedPage;
