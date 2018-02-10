import { IAppStore } from "../../stores/IAppStore";
import { IPrescriptionsStore } from "../../stores/IPrescriptionsStore";
import { ILabResultsStore } from "../../stores/ILabResultsStore";

export interface IMenuPaneProps{
    history?: Object;
    appStore?: IAppStore;
    labResultsStore?: ILabResultsStore;
    prescriptionsStore?: IPrescriptionsStore;
}