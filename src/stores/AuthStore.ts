// handles user sign-in and registration

import { observable, computed, autorun, action } from 'mobx';

import { appStore } from '../stores/_GlobalStore';

import { IAuthStore } from '../interfaces/stores/IAuthStore';

import * as passwordHash from 'password-hash';

import { IUser } from '../interfaces/data/IUser';

import userStore from './UserStore';

import api from '../api';

import {
    setAccessToken,
    getAccessToken,
    getUserDetails,
    getTokenExpirationDate,
    logout,
    isLoggedIn
} from '../utils/AuthService'


export class AuthStore implements IAuthStore {

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

    authenticate(cb) {

        this.loading = true;

        // fake server call that we are waiting for.
        setTimeout(() => {

            appStore.menu = true;
            this.redirectToReferrer = true;
            this.loading = false;

            // mocking up fake jwt token
            setAccessToken().then(() => {
                localStorage.getItem('access_token');
                appStore.initializeApp();
                this.isAuthenticated = true;
                // run callback on view
                cb();

                // console.log(getUserDetails(localStorage.getItem('access_token')));
                // console.log(getTokenExpirationDate(localStorage.getItem('access_token')));
            });

        }, 1000);
    }

    signout(cb?: () => void) {
        logout().then(() => {
            this.isAuthenticated = false;
            this.user.email = '';
            this.user.password = '';
            cb ? setTimeout(cb, 100) : null;
        });
    }

    setCompanyCode(companyCode) {
        this.user.companyCode = companyCode;
    }

    setEmail(email) {
        this.user.email = email;
    }

    setPassword(password) {
        this.user.password = password;
    }

    // register

    toggleRegistering() {
        this.isRegistering = !this.isRegistering;
        this.resetRegisterUser();
    }

    resetRegisterUser() {
        this.user.email = '';
        this.user.password = '';
        this.isRegistered = false;
    }

    // 

    @action register() {
        this.loading = true;
        return api.Auth.register(this.user.email, this.user.password)
            //   .then(({ user }) => appStore.setToken(user.token))
            //   .then(() => userStore.pullUser())
            .catch(action((err) => {
                alert('Please check email or password.');
                this.loading = false;
                throw err;
            }))
            .then((data) => {
                if (data) {
                    this.loading = false;
                    this.isRegistered = true;
                } else {
                    this.loading = false;
                }
            });
    }

    async isLoggedIn() {
        return await isLoggedIn();
    }

}

export const authStore = new AuthStore();