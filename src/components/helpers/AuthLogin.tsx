import * as React from 'react';
import { Redirect } from 'react-router-dom'

import { observer, inject } from 'mobx-react';

import { Button, IButtonProps, Toolbar, Input } from '../../../recoil/src/index';

import { IAuthLoginProps } from '../../interfaces/components/helpers/IAuthLoginProps';

import { setAccessToken, getAccessToken, getUserDetails, getTokenExpirationDate, isLoggedIn } from '../../../src/utils/AuthService'
import { authStore } from '../../stores/AuthStore';

@inject('authStore', 'appStore', 'routerStore')
@observer
export default class AuthLogin extends React.Component<IAuthLoginProps, {}>{

    componentDidMount() {
        this.checkIfUserLoggedIn();
    }

    login(token?: boolean, event?: React.MouseEvent<MouseEvent>) {
        event ? event.preventDefault() : null;
        const context = this;
        const appStore = context.props.appStore;
        const routerStore = context.props.routerStore;
        this.props.authStore.authenticate(() => {
            if (token) {
                context.props.appStore.loading = false;
            }
            routerStore.push(routerStore.initialLocation);
        });

        // fix firefox bug - much wow (basicallly form submit should return false to prevent full refresh)
        return false;
    }

    checkIfUserLoggedIn() {
        const authStore = this.props.authStore;
        const appStore = this.props.appStore;
        let context = this;

        appStore.loading = true;
        // get access token then set
        getAccessToken().then((token) => {
            if (token) {
                setAccessToken(token).then(() => {
                    if (authStore.isLoggedIn()) {
                        context.login(true);
                    }
                })
            } else {
                appStore.loading = false;
            }
        })
    }

    setEmail(value) {
        this.props.authStore.setEmail(value);
    }

    setPassword(password) {
        this.props.authStore.setPassword(password);
    }

    toggleRegistering() {
        this.props.authStore.toggleRegistering();
    }

    render() {
        const authStore = this.props.authStore;
        const { from } = this.props.history.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer, user } = authStore;

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <Toolbar form textCenter block vertical spacing>

                <Input focusOnMount advanced onChange={this.setEmail.bind(this)} block placeholder="Username" />
                <Input type="password" advanced required={user && user.email !== '' && user.password === ''} onChange={this.setPassword.bind(this)} block placeholder="Password" />

                <Button submit disabled={user && user.email === '' || user.password === ''} theme={user && user.email === '' || user.password === '' ? "default" : "primary"} className="mb20" loading={authStore.loading} block onClick={this.login.bind(this, false)}>Log in</Button>

                <Button disabled block outline size="small">Forgot your password?</Button>
                <Button onClick={this.toggleRegistering.bind(this)} block outline size="small">Not a member? Join Today</Button>
            </Toolbar>
        )
    }
}