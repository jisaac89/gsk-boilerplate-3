import {observable, computed} from 'mobx';

import {IAppStore} from '../interfaces/stores/IAppStore';

import {patientStore} from './_GlobalStore';
import { PatientStore } from './PatientStore';

export class AppStore implements IAppStore {
    
    @observable nightmode = false;
    @observable mobile = false;
    @observable menu = false;
    @observable loading = false;
    @observable auth : boolean = true;

    constructor() {
        const self = this;
    }

    initializeApp() {
        patientStore.init();
    }

    toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

    toggleMenu(){
        this.menu = !this.menu;
    }

    toggleAuth(){
        this.auth = !this.auth;
        this.menu = !this.menu;
    }

}

export const appStore = new AppStore();