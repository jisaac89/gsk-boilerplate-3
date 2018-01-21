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
            <SlideIn className="z4" if={appStore.menu} from="bottom" fill>
                <Layer id="main" flexCenter={!appStore.mobile} fill className="text-left pt50" theme="light">
                        <div className="p20 w500px center-width">
                    
                            <img className="profile-pic pull-left mb40" src="data:image/jpeg;base64,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" />
                            <div className="pull-left dinblock mt20 ml20">
                                <h1>Welcome back,</h1>
                                <h2>Iveth Lujan</h2>
                            </div>
                            <Toolbar block className="center-width text-left" spacing vertical>
                            <Emerge enter="fadeIn" if={appStore.menu}>
                                <div></div>
                                <Toolbar block flush flex className="mb20">
                                    <Button theme="error">{labResultsStore.list.length}</Button>
                                    <RouterButton block size="large" history={history} route="/labResults" title="Lab Results" />
                                </Toolbar>                      
                                <Toolbar block flush flex className="mb20">
                                    <Button theme="error">{prescriptionsStore.list.length}</Button>
                                    <RouterButton block size="large" history={history} route="/selectPrescription" title="Prescriptions" />
                                </Toolbar>
                                <Toolbar block flush flex className="mb20">
                                    <Button theme="error">2</Button>
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