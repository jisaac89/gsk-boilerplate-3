import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { IDashboardProps } from '../../../interfaces/components/routes/dashboard/IDashboardProps'

@inject('appStore')
@observer
export default class Dashboard extends React.Component<IDashboardProps, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let appStore = this.props.appStore;
        appStore.menu = true;
    }

    render() {
        return null;
    }
} 