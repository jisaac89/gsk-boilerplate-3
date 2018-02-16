import { IAppStore } from "../../stores/IAppStore";
import { IHistory } from "./IHistory";

export interface IRouterButtonProps {
    history?: IHistory;
    route: string;
    title?: string;
    auth?: boolean;
    appStore?: IAppStore;
    params?: any;
    match?: any;
}