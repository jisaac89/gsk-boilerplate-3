import {observable, computed, ObservableMap, toJS} from 'mobx';

class NotificationStore{

    @observable list : Array<any> = [];

    push(message){ 
        this.list.push({
            title: message,
            type: 'success'
        });
    }
}

export const notificationStore = new NotificationStore();