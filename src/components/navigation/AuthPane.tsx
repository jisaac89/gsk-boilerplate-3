import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, prescriptionsStore} from '../../stores/_GlobalStore';

import RouterButton from '../helpers/RouterButton';

@observer
export default class AuthPane extends React.Component<any, any> {
    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z4" if={appStore.auth} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="e-NightMode">
                    <Emerge enter="fadeIn" if={appStore.auth}>
                        <div className="p10">
                            <Toolbar block className="w400px center-width" spacing vertical>
                                <RouterButton auth block size="xlarge" theme="primary" history={history} icon="facebook" route="/" title="Sign in with Facebook" />
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  