import { DeviceInfo } from "@capacitor/device";
import { User } from "types/user";

export interface IError {
    message: string;
    field?: string;
}

export interface IErrorResponseBody {
    errors: IError[];
}

export interface SignInSignUpRequestBody {
    email?: string;
    password?: string;
    deviceInfo?: DeviceInfo | null;
}

export interface SuccessfulAuthResponseBody {
    user: User;
    token: string;
}

export interface ChangePasswordRequestBody {
    password: string | undefined;
    token: string | undefined;
}

export interface UpdateProfileRequestBody {
    firstName: string | undefined;
    lastName: string | undefined;
    skinTone: string | undefined;
}

export interface SuccessfulProfileResponseBody {
    firstName: string | null;
    lastName: string | null;
    skinTone: string | null;
}

export interface SuccessfulAvatarResponseBody {
    avatar: string;
}

export interface SuccessfulPostResponseBody {
    id: string;
    authorId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    versions: PostVersion[];
}

export interface PostVersion {
    id: string;
    content: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}
