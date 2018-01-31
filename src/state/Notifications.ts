import {observable, computed, ObservableMap, toJS} from 'mobx';

class Notifications{

    @observable list : Array<any> = [];

    constructor() {

    }

    pushNotification(data, type: 'prescription' | 'labresult'){
        
        if (type === 'prescription'){
            this.list.push({
                title: 'You have recieved a prescription for ' + data.drug,
                type: 'success',
                id: data.prescriptionuuid
            });
        } else {
            this.list.push({
                title: 'You have recieved a new labresult',
                type: 'success',
                id: data.owner
            }); 
        }
        
    }
}

export const notifications = new Notifications();