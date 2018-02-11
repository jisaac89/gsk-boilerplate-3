import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

export class DiscountsStore {

    @observable slideIndex : number = 0;

    gotoSlideIndex(n: number) {
        this.slideIndex = n;
    }

    resetStore(){
      this.slideIndex = 0;
    }

    submitSurvey(){
      this.slideIndex = 2;
      setTimeout(()=>{
        this.slideIndex = 3
      }, 6000)
    }
}

export const discountsStore = new DiscountsStore();