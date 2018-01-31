import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, prescriptionsStore, labResultsStore} from '../../stores/_GlobalStore';

import RouterButton from '../helpers/RouterButton';
import { _$ } from '../../../recoil/src/components/OOCSS/StepThrough';

@observer
export default class MenuPane extends React.Component<any, any> {
    signOut(){
        appStore.toggleAuth();
    }
    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z3" if={appStore.menu} from="bottom" fill>
                <Layer id="main" flexCenter={!appStore.mobile} fill className="text-left pt50" theme="light">
                        <div className="p20 w500px center-width">
                    
                            <img className="profile-pic pull-left mb40" src="https://www.lawlogix.com/wp-content/uploads/2015/05/LW-603-p28-partner-profile.jpg" />
                            <div className="pull-left dinblock mt20 ml20">
                                <h1>Welcome back,</h1>
                                <h2>Stokes</h2>
                            </div>
                            <Toolbar block className="center-width text-left" spacing vertical>
                            <Emerge enter="fadeIn" if={appStore.menu}>
                                <div></div>
                                <Toolbar block flush flex className="mb20">
                                    {labResultsStore.list.length ? <Button theme="error">{labResultsStore.list.length}</Button> : null}
                                    <RouterButton block size="large" history={history} route="/labResults" title="Lab Results" />
                                </Toolbar>                      
                                <Toolbar block flush flex className="mb20">
                                    {prescriptionsStore.list.length ? <Button theme="error">{prescriptionsStore.list.length}</Button> : null}
                                    <RouterButton block size="large" history={history} route="/selectPrescription" title="Prescriptions" />
                                </Toolbar>
                                <Toolbar block flush flex className="mb20">
                                    <Button theme="error">1</Button>
                                    <RouterButton block size="large" history={history} route="/discounts" title="Discounts" />
                                </Toolbar>
                                <RouterButton className="mb20" disabled block size="large" history={history} route="/" title="My Profile" />
                                <RouterButton disabled block size="large" history={history} route="/" title="Settings" />
                                </Emerge>
                            </Toolbar>
                        </div>
                    <SlideIn if={true} from="bottom">
                        <Layer theme="e-NightMode" className="border-top text-center p10">
                            <Button onClick={this.signOut.bind(this)} size="large" block>Sign Out</Button>
                        </Layer>
                    </SlideIn>
                </Layer>
            </SlideIn>
        )
    } 
}  