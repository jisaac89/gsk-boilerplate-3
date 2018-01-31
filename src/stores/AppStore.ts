import {observable, computed} from 'mobx';

import {IAppStore} from '../interfaces/stores/IAppStore';

import {patientStore} from './_GlobalStore';
import { PatientStore } from './PatientStore';
import { labResultsStore } from './LabResultsStore';
import { prescriptionsStore } from './PrescriptionsStore';
import { discountsStore } from './DiscountsStore';

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
        labResultsStore.init();
        prescriptionsStore.init()
        // prescriptionsStore.listenForNotifications();
    }

    toggleNightmode(){
        this.nightmode = !this.nightmode;
    }

    toggleMenu(){
        this.menu = !this.menu;
        discountsStore.resetStore();
    }

    toggleAuth(){
        this.auth = !this.auth;
        this.menu = !this.menu;
    }

    onMobile(isMobile){
        this.mobile = isMobile;
    }

}

export const appStore = new AppStore();