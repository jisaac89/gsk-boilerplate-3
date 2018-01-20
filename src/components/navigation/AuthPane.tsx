import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore, prescribeStore, prescriptionsStore} from '../../stores/_GlobalStore';

import RouterButton from '../helpers/RouterButton';

@observer
export default class AuthPane extends React.Component<any, any> {
    render() {

        let {history} = this.props;

        return (
            <SlideIn className="z5" if={appStore.auth} from="top" fill>
                <Layer flexCenter className="text-center pt50" fill theme="dark">
                    <Emerge enter="fadeIn" if={appStore.auth}>
                        <div className="p10">
                            <Toolbar block className="w300px center-width" spacing vertical>
                                <RouterButton auth block size="large" theme="primary" history={history} icon="facebook" route="/" title="Sign in with Facebook" />
                            </Toolbar>
                        </div>
                    </Emerge>
                </Layer>
            </SlideIn>
        )
    } 
}  