import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

import {IPrescription} from '../interfaces/data/IPrescription';

export class PrescriptionsStore {

    @observable slideIndex: number = 0;
    @observable selectedPrescription : IPrescription = {}
    @observable viewHistory : boolean = false;
  
    constructor(){
       
    }

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    selectPrescription(prescription){
        this.selectedPrescription = prescription;
        this.slideIndex = 1;
    }

    cancelSelectPrescription(){
        this.selectedPrescription = {};
        this.slideIndex = 0;
        this.viewHistory = false;
    }

    toggleViewHistory(){
        this.viewHistory = !this.viewHistory;
    }

}

export const prescriptionsStore = new PrescriptionsStore();