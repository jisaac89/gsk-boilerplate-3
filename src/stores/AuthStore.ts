import { observable, computed, autorun, action } from 'mobx';

import { appStore } from '../stores/_GlobalStore';

import { IAuthStore } from '../interfaces/stores/IAuthStore';

import * as passwordHash from 'password-hash';

import { IUser } from '../interfaces/data/IUser';

import userStore from './UserStore';

import api from '../api';

export class AuthStore implements IAuthStore {

    @observable user: IUser = {
        email: '',
        password: '',
        group: null,
        companyCode: ''
    }

    //

    @observable isAuthenticated: boolean = false;
    @observable redirectToReferrer: boolean = false;
    @observable loading: boolean = false;

    // register

    @observable isRegistering: boolean = false;
    @observable isRegistered: boolean = false;

    authenticate(cb) {

        this.loading = true;

        setTimeout(() => {
            this.isAuthenticated = true;
            this.loading = false;
            cb();
            appStore.menu = true;
        }, 1000);
    }

    signout(cb?: () => void) {
        this.isAuthenticated = false
        this.user.email = '';
        this.user.password = '';

        cb ? setTimeout(cb, 100) : null;
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

    onChangeCompanyCode(companyCode) {
        this.user.companyCode = companyCode;
    }

    onChangeEmail(email) {
        this.user.email = email;
    }

    onChangePassword(password) {
        this.user.password = password;
    }

    // 

    @action logina() {
        this.loading = true;
        return api.Auth.login(this.user.email, this.user.password)
            .then(({ user }) => appStore.setToken(user.token))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                throw err;
            }))
            .finally(action(() => { this.loading = false; }));
    }

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

    @action logouta() {
        appStore.setToken(undefined);
        userStore.forgetUser();
        return Promise.resolve();
    }

}

export const authStore = new AuthStore();