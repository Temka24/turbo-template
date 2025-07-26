export type UserRole = "admin" | "host" | "client";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
