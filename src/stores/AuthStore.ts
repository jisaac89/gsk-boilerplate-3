// handles user sign-in and registration

import { observable, computed, autorun, action, isObservable } from 'mobx';

import { appStore, routerStore } from '../stores/_GlobalStore';

import { IAuthStore } from '../interfaces/stores/IAuthStore';

import * as passwordHash from 'password-hash';

import { IUser } from '../interfaces/data/IUser';

import userStore from './UserStore';

import api from '../api';

import { setAccessToken, getAccessToken, auth0login, logout, isLoggedIn } from '../utils/AuthService'

import { User } from '../model/UserModel';


export class AuthStore {

    @observable loading: boolean = false;
    @observable isAuthenticated: boolean = false;
    @observable user: IUser = User;
    @observable redirectToReferrer: boolean = false;

    authenticate() {
        auth0login();
    }

    loginUser(user?: IUser) {
        this.user = user;
        this.isAuthenticated = true;
        appStore.initializeApp();
    }

    signout(cb?: () => void) {
        this.isAuthenticated = false;
        logout();
    }

}

export const authStore = new AuthStore();