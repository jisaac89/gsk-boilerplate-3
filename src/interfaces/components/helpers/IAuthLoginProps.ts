import { IAuthStore } from "../../stores/IAuthStore";

export interface IAuthLoginProps{
    authStore ?: IAuthStore;
    location?: any;
    state ?: any;
    pathname: any;
}