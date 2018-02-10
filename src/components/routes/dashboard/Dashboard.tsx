import * as React from 'react';

import {observer, inject} from 'mobx-react';

@inject('appStore')
@observer
export default class Dashboard extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let appStore = this.props.appStore;
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