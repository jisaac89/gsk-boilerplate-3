import { IAppStore } from "../../stores/IAppStore";
import { IAuthStore } from "../../stores/IAuthStore";
import { IHistory } from "../helpers/IHistory";

export interface IAuthPaneProps {
    appStore?: IAppStore;
    authStore?: IAuthStore;
    history: IHistory;
    route?: string;
    title?: string;
}