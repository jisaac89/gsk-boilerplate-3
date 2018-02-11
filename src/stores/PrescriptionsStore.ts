import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {notificationStore} from '../stores/NotificationStore';

import {IPrescription} from '../interfaces/data/IPrescription';

import api from '../api';
import Prescriptions from '../components/routes/prescriptions/Prescriptions';

export class PrescriptionsStore {

    @observable prescriptions: IPrescription[] = [];
    @observable slideIndex: number = 0;
    @observable selectedPrescription : IPrescription = {};

    init(){
      const context = this;
      return api.Prescriptions.all().then((data)=>{
          this.prescriptions = data;
          this.listenForNewPrescriptions();
      })
    }

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    selectPrescription(prescription : IPrescription){
        this.selectedPrescription = prescription;
    }

    listenForNewPrescriptions(){
        setInterval(()=>{
            this.pollPrescriptions();
        }, 1000)
    }

    pollPrescriptions(){
        api.Prescriptions.poll(this.prescriptions, (newDataSource : IPrescription[])=>{
          this.prescriptions = newDataSource;
          notificationStore.push('New ' + newDataSource[newDataSource.length - 1].drug + ' added.')
        });
    }

}

export const prescriptionsStore = new PrescriptionsStore();