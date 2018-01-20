import * as React from 'react';

import {Recoil, Layer} from '../../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../../../stores/_GlobalStore';

@observer
export default class Dashboard extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if (appStore.auth){
            appStore.auth = true;
        } else{
            appStore.menu = true;
        }
    }

    render() {
        return null;
    } 
} 