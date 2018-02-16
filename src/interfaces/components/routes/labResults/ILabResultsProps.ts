import { IRouterStore } from "../../../stores/IRouterStore";
import { IAppStore } from "../../../stores/IAppStore";
import { ILabResultsStore } from "../../../stores/ILabResultsStore";

export interface ILabResultsProps {
    routerStore?: IRouterStore;
    appStore?: IAppStore;
    labResultsStore?: ILabResultsStore
}