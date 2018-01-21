import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

import {IPrescription} from '../interfaces/data/IPrescription';

export class PrescriptionsStore extends BaseStore {

    @observable slideIndex: number = 0;
    @observable selectedPrescription : IPrescription = {}
    
    constructor(){
       super('Prescription')
    }

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    addObject(){
        return null;
    }

    selectPrescription(prescription : IPrescription){
        this.selectedPrescription = prescription;
    }

}

export const prescriptionsStore = new PrescriptionsStore();