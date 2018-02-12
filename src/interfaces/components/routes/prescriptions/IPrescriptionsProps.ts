import { IPrescriptionsStore } from "../../../stores/IPrescriptionsStore";
import { IAppStore } from "../../../stores/IAppStore";

export interface IPrescriptionsProps{
    prescriptionsStore: IPrescriptionsStore;
    appStore: IAppStore;
}