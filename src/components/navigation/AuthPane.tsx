import * as React from 'react';

import { Recoil, Table, Wizard, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import RouterButton from '../helpers/RouterButton';

@inject('appStore', 'prescriptionsStore','authStore')
@observer
export default class AuthPane extends React.Component<any, any> {
    toggleRegistering() {
        this.props.authStore.toggleRegistering();
    }
    setEmail(email){
        this.props.authStore.setEmail(email);
    }
    setPassword(password: string){
        this.props.authStore.setPassword(password);
    }

    registera(){
        this.props.authStore.registera();
    }
    render() {

        let { history } = this.props;
        let appStore = this.props.appStore;
        let authStore = this.props.authStore;

        return (
            <SlideIn className="z4" if={appStore.auth} from="top" fill>
                <Layer fill flex theme="e-NightMode">
                    <Wizard fill slideIndex={authStore.isRegistering ? 1 : 0}>
                        <Layer fill flex>
                            <Layer fill flex flexCenter className="text-center pt50">
                                <Emerge enter="fadeIn" if={appStore.auth}>
                                    <div className="p10">
                                        <Toolbar block className="w400px center-width" spacing vertical>
                                            <h1 className="mb10 text-left">Sign in to your account</h1>
                                            <RouterButton auth block size="xlarge" theme="primary" history={history} icon="facebook" route="/" title="Sign in" />
                                            <h2 className="mtb20">OR</h2>
                                            <Input size="large" block placeholder="Username/Email" />
                                            <Input size="large" block placeholder="Password" />

                                            <Button size="xlarge" block>Login</Button>
                                        </Toolbar>
                                    </div>
                                </Emerge>
                            </Layer>
                            <Toolbar textCenter block className="border-top p10">
                                <Button icon="chevron-right" onClick={this.toggleRegistering.bind(this)} outline size="large" block>First time? Register a new account.</Button>
                            </Toolbar>
                        </Layer>
                        <Layer flex fill theme="e-NightMode">
                            <Layer fill flexCenter className="text-center pt50">
                                <div className="p10">
                                    
                                    <Toolbar block className="w400px center-width" spacing vertical>
                                        <h1 className="mb10 text-left">Register a new account</h1>
                                        <Input onChange={this.setEmail.bind(this)} size="large" block placeholder="Email" />
                                        <Input onChange={this.setPassword.bind(this)} size="large" block placeholder="Password" />

                                        <Button onClick={this.registera.bind(this)} theme="primary" size="xlarge" block>Register</Button>
                                    </Toolbar>
                                </div>
                            </Layer>
                            <Toolbar textCenter block className="border-top p10">
                                <Button icon="chevron-left" onClick={this.toggleRegistering.bind(this)} outline size="large" block>Cancel</Button>
                            </Toolbar>
                        </Layer>
                    </Wizard>
                </Layer>
            </SlideIn>
        )
    }
}  