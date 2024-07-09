export interface Auth {
    ok: boolean;
    user: User;
    token: string;
}

export interface User {
    id: string;
    email: string;
}
