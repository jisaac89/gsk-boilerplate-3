import { IAppStore } from "../../stores/IAppStore";
import { IAuthStore } from "../../stores/IAuthStore";

export interface IAuthPaneProps{
    history: Object;
    route?: string;
    title?: string;
    appStore?: IAppStore;
    authStore?: IAuthStore; 
}