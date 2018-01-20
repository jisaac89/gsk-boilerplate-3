import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import BaseStore from './BaseStore';

interface IPatient {
}

export class PatientStore extends BaseStore {

    @observable patients : IPatient[] = this.list;

    constructor(){
        super('Patient');
    }
    
    addObject(){
        return null;
    }
}

export const patientStore = new PatientStore();