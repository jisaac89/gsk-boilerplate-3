import {observable, computed, ObservableMap, toJS} from 'mobx';

import BaseStore from './BaseStore';
import { IPatient } from '../interfaces/data/IPatient';

export class LabResultsStore extends BaseStore {

  @observable slideIndex : number = 0;

  constructor(){
    super('viralLoadTest')
  }

  gotoSlideIndex(n: number){
    this.slideIndex = n;
  }

  addObject(){
    return null;
  }

}

export const labResultsStore = new LabResultsStore();