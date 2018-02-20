// handles user sign-in and registration

import { observable, computed, autorun, action, isObservable } from 'mobx';

import { appStore } from '../stores/_GlobalStore';

import { IAuthStore } from '../interfaces/stores/IAuthStore';

import * as passwordHash from 'password-hash';

import { IUser } from '../interfaces/data/IUser';

import userStore from './UserStore';

import api from '../api';

import {
    setAccessToken,
    getAccessToken,
    login,
    logout,
    isLoggedIn
} from '../utils/AuthService'


export class AuthStore {

    @observable user: IUser = {
        email: '',
        password: '',
        group: null,
        companyCode: ''
    }

    @observable isAuthenticated: boolean = false;

    @observable redirectToReferrer: boolean = false;
    @observable loading: boolean = false;

    @observable isRegistering: boolean = false;
    @observable isRegistered: boolean = false;

    authenticate() {
        login();
    }

    signout(cb?: () => void) {

    }

}

export const authStore = new AuthStore();