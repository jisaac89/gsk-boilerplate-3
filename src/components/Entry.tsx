import * as React from 'react';

import {Recoil, Layer, Notifications, SlideIn} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../stores/_GlobalStore';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import MenuPane from './navigation/MenuPane';
import AuthPane from './navigation/AuthPane';

import Dashboard from './routes/dashboard/Dashboard';
import SelectPrescription from './routes/selectPrescription/SelectPrescription';
import LabResults from './routes/labResults/LabResults';
import Discounts from './routes/discounts/Discounts';
import { notifications } from '../state/Notifications';

@observer
export default class Entry extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        appStore.initializeApp();
    }

    onMobile(isMobile){
        appStore.onMobile(isMobile);
    }

    render() {
        
    let styles = {
        overflow : true,
        fill : true
    }

    return (
        <Router>
            <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                <Layer {...styles}>
                    <SlideIn className="z5" from="top" if={true}>
                        {notifications.list.length ? <Notifications className="notifications" dataSource={notifications.list} /> : null}
                    </SlideIn>
                    <Layer flex {...styles}>
                        <Header />
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/selectPrescription" component={SelectPrescription} />
                        <Route path="/labResults" component={LabResults} />
                        <Route path="/discounts" component={Discounts} />
                    </Layer>
                    <MenuPane history={this.props.history} />
                    <AuthPane history={this.props.history} />
                </Layer>
            </Recoil>
        </Router>
        )
    } 
}