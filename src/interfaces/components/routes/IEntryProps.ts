import { IAppStore } from "../../stores/IAppStore";
import { IAuthStore } from "../../stores/IAuthStore";
import { INotifcationStore } from "../../stores/INotificationStore";

export interface IEntryProps {
    appStore?: IAppStore;
    authStore?: IAuthStore;
    notificationStore?: INotifcationStore;
}