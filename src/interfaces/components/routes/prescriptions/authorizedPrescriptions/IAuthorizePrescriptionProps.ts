import { IPrescriptionsStore } from "../../../../stores/IPrescriptionsStore";
import { IAppStore } from "../../../../stores/IAppStore";
import { IAuthorizePrescriptionStore } from "../../../../stores/IAuthorizePrescriptionStore";
import { IRouterStore } from "../../../../stores/IRouterStore";

export interface IAuthorizePrescriptionProps {
    prescriptionsStore: IPrescriptionsStore;
    appStore: IAppStore;
    authorizePrescriptionStore: IAuthorizePrescriptionStore;
    location?: { pathname: string };
    routerStore?: IRouterStore;
}