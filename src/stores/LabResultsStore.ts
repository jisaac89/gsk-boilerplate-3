import {observable, computed, ObservableMap, toJS} from 'mobx';

import BaseStore from './BaseStore';
import { IPatient } from '../interfaces/data/IPatient';

import {notificationStore} from '../stores/NotificationStore';

function *pollForLabResults(){
  while(true){
    yield fetch('http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/cloud.aperio.viiv.viralLoadTest',{
      method: 'get'
    }).then(function(d){
      var json = d.json();
      return json;
    });
  }
}

export class LabResultsStore extends BaseStore {

  @observable slideIndex : number = 0;
  @observable currentDataSourceLength : number = 0;

  constructor(){
    super('viralLoadTest')
  }

  gotoSlideIndex(n: number){
    this.slideIndex = n;
  }

  addObject(){
    return null;
  }

  listenForNotifications(){
    setInterval(()=>{
        this.pollLabResults();
    }, 1000)
  }

  pollLabResults(){
      const context = this;
      function runPolling(generator ? : any){
          if(!generator){
            generator = pollForLabResults();
          }
        
          var p = generator.next();
          p.value.then(function(d){
            if(d.length > context.list.length){
              runPolling(generator);
              context.currentDataSourceLength = d.length;
              context.list = d;
              notificationStore.pushNotification(d.reverse()[d.length - 1], 'labresult');
            } else {
              // console.log(d);
            }
          });
        }
        runPolling();
  }

  afterAdd(){
    this.listenForNotifications();
  }

}

export const labResultsStore = new LabResultsStore();