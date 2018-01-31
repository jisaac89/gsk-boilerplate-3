import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

import {notifications} from '../state/Notifications';

import {IPrescription} from '../interfaces/data/IPrescription';


function *pollForPrescriptions(){
    while(true){
      yield fetch('http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/cloud.aperio.viiv.Prescription',{
        method: 'get'
      }).then(function(d){
        var json = d.json();
        return json;
      });
    }
  }

export class PrescriptionsStore extends BaseStore {

    @observable slideIndex: number = 0;
    @observable selectedPrescription : IPrescription = {}

    @observable currentDataSourceLength : number = 0;
    
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

    listenForNotifications(){
        setInterval(()=>{
            this.pollPrescriptions();
        }, 1000)
    }

    pollPrescriptions(){
        const context = this;
        function runPolling(generator ? : any){
            if(!generator){
              generator = pollForPrescriptions();
            }
          
            var p = generator.next();
            p.value.then(function(d){
              if(d.length > context.list.length){
                runPolling(generator);
                context.currentDataSourceLength = d.length;
                context.list = d;
                notifications.pushNotification(d.reverse()[d.length - 1], 'prescription');
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

export const prescriptionsStore = new PrescriptionsStore();