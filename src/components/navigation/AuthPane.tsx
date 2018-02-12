import * as React from 'react';

import { Recoil, Table, Wizard, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import RouterButton from '../helpers/RouterButton';
import {AuthButton} from '../helpers/AuthButton';
import {IAuthPaneProps} from '../../interfaces/components/navigation/IAuthPaneProps';

@inject('appStore','authStore')
@observer
export default class AuthPane extends React.Component<IAuthPaneProps, any> {
    componentDidMount(){
        this.props.authStore.signout();
    }
    toggleRegistering() {
        this.props.authStore.toggleRegistering();
    }
    setEmail(email){
        this.props.authStore.setEmail(email);
    }
    setPassword(password: string){
        this.props.authStore.setPassword(password);
    }

    register(){
        this.props.authStore.register();
    }
    render() {

        let { history } = this.props;
        let appStore = this.props.appStore;
        let authStore = this.props.authStore;

        let {isRegistered} = authStore;

        return (
            <SlideIn className="z4" if={!authStore.isAuthenticated} from="top" fill>
                <Layer fill flex theme="e-NightMode">
                    <Wizard fill slideIndex={authStore.isRegistering ? 1 : 0}>
                        <Layer fill flex>
                            <Layer fill flex flexCenter className="text-center pt50">
                                <Emerge enter="fadeIn" if={appStore.auth}>
                                    <div className="p10">
                                        <Toolbar block className="w400px center-width" spacing vertical>
                                            <h1 className="mb10 text-left">Sign in to your account</h1>
                                            <RouterButton disabled auth block size="xlarge" theme="primary" history={history} icon="facebook" route="/" title="Sign in" />
                                            <h2 className="mtb20">OR</h2>
                                            <AuthButton />
                                        </Toolbar>
                                    </div>
                                </Emerge>
                            </Layer>
                            <Toolbar textCenter block className="border-top p10">
                                <Button icon="chevron-right" onClick={this.toggleRegistering.bind(this)} outline size="large" block>Register a new account.</Button>
                            </Toolbar>
                        </Layer>
                        <Layer flex fill theme="e-NightMode">
                            <Layer fill flexCenter className="text-center pt50">
                                <div className="p10">
                                    <Toolbar block className="w400px center-width" spacing vertical>
                                        <h1 className={!isRegistered ? "mb10 text-left" : "mb10 text-center"}>{!isRegistered ? "Register a new account" : "Please check your email"}</h1>
                                        {!isRegistered ? <Input onChange={this.setEmail.bind(this)} size="large" block placeholder="Email" />: null}
                                        {!isRegistered ? <Input onChange={this.setPassword.bind(this)} size="large" block placeholder="Password" />: null}
                                        {!isRegistered ? <Button theme="primary" onClick={this.register.bind(this)} size="xlarge" block>Register</Button> : null}
                                    </Toolbar>
                                </div>
                            </Layer>
                            <Toolbar textCenter block className="border-top p10">
                                <Button loading={authStore.loading} icon="chevron-left" onClick={this.toggleRegistering.bind(this)} outline size="large" block>Login</Button>
                            </Toolbar>
                        </Layer>
                    </Wizard>
                </Layer>
            </SlideIn>
        )
    }
}