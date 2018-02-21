import * as React from 'react';

import { Recoil, Table, Wizard, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox } from '../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import RouterButton from '../helpers/RouterButton';
import { AuthButton } from '../helpers/AuthButton';
import { IAuthPaneProps } from '../../interfaces/components/navigation/IAuthPaneProps';

@inject('appStore', 'authStore')
@observer
export default class AuthPane extends React.Component<IAuthPaneProps, any> {


    render() {

        let { appStore, authStore } = this.props;
        let { history } = this.props;

        return (
            <SlideIn className="z4" if={!authStore.isAuthenticated} from="top" fill>
                <Layer fill flex theme="e-NightMode">
                    <Layer fill flex>
                        <Layer fill flex flexCenter className="text-center pt50">
                            <Emerge enter="fadeIn" if={appStore.auth}>
                                <div className="p10">
                                    <Toolbar block className="w400px center-width" spacing vertical>
                                        <h1 className="mb10 text-left">Sign in to your account</h1>
                                        <AuthButton />
                                    </Toolbar>
                                </div>
                            </Emerge>
                        </Layer>
                    </Layer>
                </Layer>
            </SlideIn>
        )
    }
}