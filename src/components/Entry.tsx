import * as React from 'react';

import {Recoil, Layer, Notifications, SlideIn} from '../../recoil/src/index';

import {observer, inject} from 'mobx-react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import {PrivateRoute} from './helpers/PrivateRoute';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import MenuPane from './navigation/MenuPane';
import AuthPane from './navigation/AuthPane';
import Dashboard from './routes/dashboard/Dashboard';
import Prescriptions from './routes/prescriptions/Prescriptions';
import LabResults from './routes/labResults/LabResults';
import Discounts from './routes/discounts/Discounts';

@inject('appStore', 'notificationStore', 'authStore')
@observer
export default class Entry extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.appStore.initializeApp();
    }

    onMobile(isMobile){
        this.props.appStore.onMobile(isMobile);
    }

    render() {

    let appStore = this.props.appStore;
    let notificationStore = this.props.notificationStore;
    let authStore = this.props.authStore;

    let isAuthenticated = this.props.authStore.isAuthenticated;
        
    let styles = {
        overflow : true,
        fill : true
    }

    return (
        <Router>
            <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                <Layer {...styles}>
                    <SlideIn className="z5" from="top" if={true}>
                        {notificationStore.list.length ? <Notifications className="notifications" dataSource={notificationStore.list} /> : null}
                    </SlideIn>
                    <Layer flex {...styles}>
                        <Header />
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/prescriptions" component={Prescriptions} />
                        <PrivateRoute path="/labResults" component={LabResults} />
                        <PrivateRoute path="/discounts" component={Discounts} />
                    </Layer>
                    {authStore.isAuthenticated ? <MenuPane history={this.props.history} /> : null }
                    <Route path="/login" component={AuthPane}/>
                </Layer>
            </Recoil>
        </Router>
        )
    } 
}