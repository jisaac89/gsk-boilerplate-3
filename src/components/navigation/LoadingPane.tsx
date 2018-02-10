import * as React from 'react';

import {Recoil, Table, Button, Toolbar, Input, Emerge, Layer, SlideIn, Loading, Open, Checkbox} from '../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

import {ILoadingPaneProps} from '../../interfaces/components/navigation/ILoadingPaneProps';

@inject('appStore')
@observer
export default class LoadingPane extends React.Component<ILoadingPaneProps, any> {
    render() {

        let appStore = this.props.appStore;

        return (
            <SlideIn className="z5" if={appStore.loading} from="bottom" fill>
                <Layer fill flexCenter theme="light">
                    <Loading size="xlarge" if={appStore.loading} />
                    <Button simple>loading...</Button>
                </Layer>
            </SlideIn>
        )
    } 
} 