import { IAppStore } from "../../stores/IAppStore";

export interface IRouterButtonProps{
    history: any;
    route: string;
    title?: string;
    auth?: boolean;
    appStore?: IAppStore; 
    params?: any;
    match?: any;
}