import {observable, computed, ObservableMap, toJS} from 'mobx';

class Notifications{

    @observable list : Array<any> = [];

    constructor() {

    }

    pushNotification(data){
        this.list.push({
            title: 'You have recieved a prescription for ' + data.drug,
            type: 'success',
            id: data.prescriptionuuid
        });
        
    }
}

export const notifications = new Notifications();