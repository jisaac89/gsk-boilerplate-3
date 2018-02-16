import { IAppStore } from "../../stores/IAppStore";
import { IPrescriptionsStore } from "../../stores/IPrescriptionsStore";
import { ILabResultsStore } from "../../stores/ILabResultsStore";
import { IAuthStore } from "../../stores/IAuthStore";
import { IHistory } from "../helpers/IHistory";

export interface IMenuPaneProps {
    appStore?: IAppStore;
    authStore?: IAuthStore;
    labResultsStore?: ILabResultsStore;
    prescriptionsStore?: IPrescriptionsStore;
    history?: IHistory;
}