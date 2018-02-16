import { observable, computed, ObservableMap, toJS } from 'mobx';

import { INotifcationStore } from '../interfaces/stores/INotificationStore';

class NotificationStore implements INotifcationStore {

    @observable list: Array<any> = [];

    push(message) {
        this.list.push({
            title: message,
            type: 'success'
        });
    }
}

export const notificationStore = new NotificationStore();