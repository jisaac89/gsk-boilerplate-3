import {observable, computed, autorun} from 'mobx';

import {appStore, patientStore, prescriptionsStore} from '../stores/_GlobalStore';
import {IPrescribeStore} from '../interfaces/stores/IPrescribeStore';
import BaseStore from './BaseStore';


export class PrescribeStore extends BaseStore implements IPrescribeStore {
    
    @observable slideIndex : number = 0;

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    addObject(){
        return null;
    }

    constructor(){
        super('Prescription');
    }
}

export const prescribeStore = new PrescribeStore();