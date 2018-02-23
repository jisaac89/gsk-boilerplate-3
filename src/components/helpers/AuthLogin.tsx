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
        let { authStore } = this.props;
        event ? event.preventDefault() : null;
        authStore.authenticate();
        return false;
    }

    checkIfUserLoggedIn() {
        let context = this;
        let { appStore, authStore, routerStore } = context.props;

        appStore.loading = true;

        getAccessToken();
        getIdToken();

        isLoggedInUser((user) => {
            authStore.loginUser(user);
            routerStore.push(routerStore.initialLocation);
        }, () => {
            appStore.loading = false;
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