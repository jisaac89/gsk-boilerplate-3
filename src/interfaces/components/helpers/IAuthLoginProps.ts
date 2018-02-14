import { IAuthStore } from "../../stores/IAuthStore";
import { IAppStore } from "../../stores/IAppStore";

export interface IAuthLoginProps{
    authStore ?: IAuthStore;
    appStore ?: IAppStore;
    history?: any;
    state ?: any;
    pathname: any;
    firstLocation?: string;
}