import * as React from 'react';
import { Redirect } from 'react-router-dom'

import { observer, inject } from 'mobx-react';

import { Button, IButtonProps, Toolbar, Input } from '../../../recoil/src/index';

import { IAuthLoginProps } from '../../interfaces/components/helpers/IAuthLoginProps';

import { setAccessToken, getAccessToken, isLoggedInUser, setIdToken, getIdToken, getUserInfo } from '../../../src/utils/AuthService'
import { authStore } from '../../stores/AuthStore';

@inject('authStore', 'appStore', 'routerStore')
@observer
export default class AuthLogin extends React.Component<any, {}>{

    componentWillMount() {
        this.checkIfUserLoggedIn();
    }

    login(token?: boolean, event?: React.MouseEvent<MouseEvent>) {
        event ? event.preventDefault() : null;
        this.props.authStore.authenticate();
        // fix firefox bug - much wow (basicallly form submit should return false to prevent full refresh)
        return false;
    }

    checkIfUserLoggedIn() {
        let context = this;
        this.props.appStore.loading = true;
        // check if user logged in here?
        getAccessToken();
        getIdToken();

        isLoggedInUser((user) => {
            context.props.authStore.user = user;
            context.props.appStore.initializeApp();
            context.props.appStore.menu = true;
            context.props.authStore.isAuthenticated = true;
            context.props.appStore.loading = false;
        }, () => {
            context.props.appStore.loading = false;
        })
    }

    render() {
        const authStore = this.props.authStore;
        const { from } = this.props.history.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = authStore;

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <Toolbar form textCenter block vertical spacing>
                <Button size="xlarge" icon="lock" submit theme="primary" className="mb20" block onClick={this.login.bind(this, false)}>Log in with Auth0</Button>
                <Button disabled block outline size="small">Forgot your password?</Button>
            </Toolbar>
        )
    }
}