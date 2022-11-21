export enum UserStatus {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
    LOCKED = "LOCKED",
    BANNED = "BANNED",
}

export interface User {
    id: string;
    email: string;
    failedLoginAttempts: number;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}
