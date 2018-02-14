import * as React from 'react';

import { Recoil, Layer, Notifications, SlideIn } from '../../recoil/src/index';

import { observer, inject } from 'mobx-react';

// BrowserRouter not working on firefox and IE will need to debug - maybe browser method issue, good for SEO and server side paging.
//
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import MenuPane from './navigation/MenuPane';
import AuthPane from './navigation/AuthPane';
import Dashboard from './routes/dashboard/Dashboard';
import Prescriptions from './routes/prescriptions/Prescriptions';
import LabResults from './routes/labResults/LabResults';
import Discounts from './routes/discounts/Discounts';

import AuthorizePrescription from './routes/prescriptions/authorizePrescription/AuthorizePrescription';

@inject('appStore', 'notificationStore', 'authStore')
@observer
export default class Entry extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    onMobile(isMobile) {
        this.props.appStore.onMobile(isMobile);
    }

    render() {

        let appStore = this.props.appStore;
        let notificationStore = this.props.notificationStore;
        let authStore = this.props.authStore;

        let isAuthenticated = this.props.authStore.isAuthenticated;

        let styles = {
            overflow: true,
            fill: true
        }

        return (
            <HashRouter>
                <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                    <Layer {...styles}>
                        <SlideIn className="z5" from="top" if={true}>
                            {notificationStore.list.length ? <Notifications className="notifications" dataSource={notificationStore.list} /> : null}
                        </SlideIn>
                        <Layer flex {...styles}>
                            <Header />
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute path="/labResults" component={LabResults} />
                            <PrivateRoute path="/discounts" component={Discounts} />
                            <Switch>
                                <PrivateRoute exact path="/prescriptions" component={Prescriptions} />
                                <PrivateRoute path="/prescriptions/authorize/:id" component={AuthorizePrescription} />
                            </Switch>
                        </Layer>
                        {authStore.isAuthenticated ? <MenuPane history={this.props.history} /> : <Route path="/login" component={AuthPane} />}
                        <LoadingPane />
                    </Layer>
                </Recoil>
            </HashRouter>
        )
    }
}