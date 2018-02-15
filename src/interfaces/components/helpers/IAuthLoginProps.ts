import { IAuthStore } from "../../stores/IAuthStore";
import { IAppStore } from "../../stores/IAppStore";
import { IRouterStore } from "../../stores/IRouterStore";

export interface IAuthLoginProps {
    authStore?: IAuthStore;
    appStore?: IAppStore;
    history?: any;
    state?: any;
    pathname: any;
    routerStore?: IRouterStore;
}