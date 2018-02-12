import { IAuthStore } from "../../stores/IAuthStore";

export interface IAuthLoginProps{
    authStore ?: IAuthStore;
    history?: any;
    state ?: any;
    pathname: any;
}