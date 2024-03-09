import { SessionOptions } from "iron-session";

export interface SessionData {
    userId?: string;
    username?: string;
    isAdmin?: boolean;
    isLoggedIn?: boolean;
}

export const defaultSession:SessionData = {
    isLoggedIn: false,
    isAdmin: false
}

export const sessionOptions: SessionOptions = {
    password: process.env.IRON_SECRET as string,
    cookieName: "session-id",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}