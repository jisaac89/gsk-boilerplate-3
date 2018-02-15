import { observable, computed, action, reaction } from 'mobx';

import { IAppStore } from '../interfaces/stores/IAppStore';

import { labResultsStore, prescriptionsStore, discountsStore } from './_GlobalStore';

import { getAccessToken, setAccessToken, logout } from '../utils/AuthService'
import { authStore } from './AuthStore';
var regexp = new RegExp('#([^\\s]*)', 'g');
export class AppStore implements IAppStore {

    @observable nightmode = false;
    @observable mobile = false;
    @observable menu = false;
    @observable loading = false;
    @observable auth: boolean = true;
    //
    @observable appName = 'Prescription Prototype';
    @observable appLoaded = false;
    @observable token = window.localStorage.getItem('access_token');


    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('access_token', token);
                } else {
                    window.localStorage.removeItem('access_token');
                }
            }
        );
    }

    @action setToken(token) {
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }

    //

    initializeApp() {
        labResultsStore.init();
        prescriptionsStore.init();


        //


    }

    toggleNightmode() {
        this.nightmode = !this.nightmode;
    }

    toggleMenu() {
        this.menu = !this.menu;
        discountsStore.resetStore();
    }

    toggleAuth() {
        this.auth = !this.auth;
        this.menu = !this.menu;
    }

    onMobile(isMobile) {
        this.mobile = isMobile;
    }

}

export const appStore = new AppStore();