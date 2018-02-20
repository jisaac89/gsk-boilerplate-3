import { IUser } from "../data/IUser";

export interface IAuthStore {
    isAuthenticated: boolean;
    authenticate(cb): void;
    signout(): void;
    redirectToReferrer: boolean;
    user?: any;
}