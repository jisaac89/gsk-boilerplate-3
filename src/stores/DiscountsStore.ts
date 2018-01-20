import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

function *pollForLabResults(){
    while(true){
      yield fetch('url',{
        method: 'get'
      }).then(function(d){
        var json = d.json();
        return json;
      });
    }
  }

export class DiscountsStore {

    @observable slideIndex : number = 0;

    gotoSlideIndex(n: number) {
        this.slideIndex = n;
    }

    pollDiscounts(){
        function runPolling(generator ? : any){
            if(!generator){
              generator = pollForLabResults();
            }
          
            var p = generator.next();
            p.value.then(function(d){
              if(!d[0].description){
                runPolling(generator);
              } else {
                console.log(d);
              }
            });
          }
          
          runPolling();
    }
}

export const discountsStore = new DiscountsStore();