import { IRouterStore } from "../../../stores/IRouterStore";
import { IDiscountsStore } from "../../../stores/IDiscountsStore";
import { IAppStore } from "../../../stores/IAppStore";

export interface IDiscountsProps {
    routerStore?: IRouterStore;
    discountsStore?: IDiscountsStore;
    appStore?: IAppStore;
}