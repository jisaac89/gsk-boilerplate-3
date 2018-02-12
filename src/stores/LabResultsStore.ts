import {observable, computed, ObservableMap, toJS} from 'mobx';

import { IPatient } from '../interfaces/data/IPatient';

import {notificationStore} from '../stores/NotificationStore';

import {ILabResultsStore} from '../interfaces/stores/ILabResultsStore';

import api from '../api';
import { ILabTest } from '../interfaces/data/ILabTest';

export class LabResultsStore implements ILabResultsStore {

  @observable list = [];
  @observable slideIndex : number = 0;
  @observable currentDataSourceLength : number = 0;
  @observable loading : boolean = false;

  constructor(){
    this.init();
  }

  init(){
    this.loading = true;
    const context = this;
    return api.LabResults.all().then((data)=>{
        this.list = data;
        this.listenForNotifications();
        this.loading = false;
    })
  }

  gotoSlideIndex(n: number){
    this.slideIndex = n;
  }

  listenForNotifications(){
    setInterval(()=>{
        this.pollLabResults();
    }, 1000)
  }

  pollLabResults(){
      const context = this;
      api.LabResults.poll(this.list, (newDataSource : ILabTest[])=>{
        this.list = newDataSource;
        notificationStore.push('New ' + newDataSource[newDataSource.length - 1].description + ' added.')
      });
  }

}

export const labResultsStore = new LabResultsStore();