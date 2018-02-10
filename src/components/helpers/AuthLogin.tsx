import * as React from 'react';
import { Redirect } from 'react-router-dom'

import {observer, inject} from 'mobx-react';

import { Button, IButtonProps, Toolbar, Input } from '../../../recoil/src/index';

import {IAuthStore} from '../../interfaces/stores/IAuthStore';

interface IAuthProps{
    authStore ?: IAuthStore;
    location?: any;
    state ?: any;
    pathname: any;
}

@inject('authStore')
@observer
export default class AuthLogin extends React.Component<IAuthProps, {}>{

    login = () => {
        this.props.authStore.authenticate(() => {
            this.props.authStore.redirectToReferrer = true;
        })
    }

    setEmail(value){
        this.props.authStore.setEmail(value);
    }

    setPassword(password){
        this.props.authStore.setPassword(password);
    }

    toggleRegistering(){
        this.props.authStore.toggleRegistering();
    }

    render() {
        const authStore = this.props.authStore;
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer, user } = authStore;

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <Toolbar textCenter block vertical spacing>

                <Input advanced onChange={this.setEmail.bind(this)} block placeholder="Username" />
                <Input type="password" advanced required={user && user.email !== '' && user.password === ''} onChange={this.setPassword.bind(this)} block placeholder="Password" />

                <Button disabled={user && user.email === '' || user.password === ''} theme={user && user.email === '' || user.password === '' ? "default" : "primary"} className="mb20" loading={authStore.loading} block onClick={this.login}>Log in</Button>

                <Button disabled block outline size="small">Forgot your password?</Button>
                <Button onClick={this.toggleRegistering.bind(this)} block outline size="small">Not a member? Join Today</Button>

            </Toolbar>
        )
    }
}