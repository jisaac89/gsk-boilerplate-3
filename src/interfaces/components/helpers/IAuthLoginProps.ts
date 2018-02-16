import { IAuthStore } from "../../stores/IAuthStore";
import { IAppStore } from "../../stores/IAppStore";
import { IRouterStore } from "../../stores/IRouterStore";
import { IHistory } from "./IHistory";

export interface IAuthLoginProps {
    authStore?: IAuthStore;
    appStore?: IAppStore;
    history?: IHistory;
    routerStore?: IRouterStore;
    pathname: string;
}