import { IPrescriptionsStore } from "../../../stores/IPrescriptionsStore";
import { IAppStore } from "../../../stores/IAppStore";
import { IRouterStore } from "../../../stores/IRouterStore";



export interface IPrescriptionsProps {
    prescriptionsStore: IPrescriptionsStore;
    appStore: IAppStore;
    location?: { pathname: string };
    routerStore?: IRouterStore;
}