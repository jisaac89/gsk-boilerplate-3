import * as React from 'react';

import { Recoil, Layer, Notifications, SlideIn } from '../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import AuthPane from './navigation/AuthPane';
import Dashboard from './routes/dashboard/Dashboard';
import Prescriptions from './routes/prescriptions/Prescriptions';
import LabResults from './routes/labResults/LabResults';
import Discounts from './routes/discounts/Discounts';
import { MenuPaneRoute } from './navigation/MenuPane';
import { AuthorizePrescriptionRoute } from './routes/prescriptions/authorizePrescription/AuthorizePrescription';
import { SelectedPrescriptionRoute } from './routes/prescriptions/SelectedPrescription';
import { routerStore } from '../stores/RouterStore';
import { syncHistoryWithStore } from '../sync';
import createBrowserHistory from 'history/createBrowserHistory'

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);

import { IEntryProps } from '../interfaces/components/routes/IEntryProps';

@inject('appStore', 'notificationStore', 'authStore')
@observer
export default class Entry extends React.Component<IEntryProps, any> {

    onMobile(isMobile) {
        this.props.appStore.onMobile(isMobile);
    }

    render() {

        let { appStore, authStore, notificationStore } = this.props;
        let isAuthenticated = authStore.isAuthenticated;

        let styles = {
            overflow: true,
            fill: true
        }

        return (
            <Router history={history}>
                <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                    <Layer {...styles}>
                        <SlideIn className="z5" from="top" if={true}>
                            {notificationStore.list.length ? <Notifications className="notifications" dataSource={notificationStore.list} /> : null}
                        </SlideIn>
                        <Layer flex {...styles}>
                            <Header />
                            <PrivateRoute exact path="/" component={Dashboard} />
                            {/* Lab Test Results */}
                            <PrivateRoute path="/labResults" component={LabResults} />
                            {/* Prescriptions */}
                            <Switch>
                                <PrivateRoute exact path="/prescriptions" component={Prescriptions} />
                                <PrivateRoute path="/prescriptions/:id" component={SelectedPrescriptionRoute} />
                                <PrivateRoute path="/authorize/:id" component={AuthorizePrescriptionRoute} />
                            </Switch>
                            {/* Discoutns */}
                            <PrivateRoute path="/discounts" component={Discounts} />
                        </Layer>
                        {authStore.isAuthenticated ? <MenuPaneRoute /> : <Route path="/login" component={AuthPane} />}
                        <LoadingPane />
                    </Layer>
                </Recoil>
            </Router>
        )
    }
}