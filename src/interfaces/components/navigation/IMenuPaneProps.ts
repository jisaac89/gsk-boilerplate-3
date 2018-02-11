import { IAppStore } from "../../stores/IAppStore";
import { IPrescriptionsStore } from "../../stores/IPrescriptionsStore";
import { ILabResultsStore } from "../../stores/ILabResultsStore";
import { IAuthStore } from "../../stores/IAuthStore";

export interface IMenuPaneProps{
    history?: Object;
    appStore?: IAppStore;
    labResultsStore?: ILabResultsStore;
    prescriptionsStore?: IPrescriptionsStore;
    authStore?: IAuthStore;
}