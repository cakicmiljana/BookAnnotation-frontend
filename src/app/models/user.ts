export interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    bio?: string;
    avatarUrl?: string;
    createdAt: Date;
    deletedAt?: Date;
}