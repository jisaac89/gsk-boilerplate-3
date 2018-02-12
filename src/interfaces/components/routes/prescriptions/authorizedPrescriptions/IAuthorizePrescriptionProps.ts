import { IPrescriptionsStore } from "../../../../stores/IPrescriptionsStore";
import { IAppStore } from "../../../../stores/IAppStore";

export interface IAuthorizePrescriptionProps{
    prescriptionsStore: IPrescriptionsStore;
    appStore: IAppStore;
}