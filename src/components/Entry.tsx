import * as React from 'react';

import {Recoil, Layer} from '../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../stores/_GlobalStore';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import MenuPane from './navigation/MenuPane';
import AuthPane from './navigation/AuthPane';

import Dashboard from './routes/dashboard/Dashboard';
import SelectPrescription from './routes/selectPrescription/SelectPrescription';

@observer
export default class Entry extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        appStore.initializeApp();
    }

    render() {
        
    let styles = {
        overflow : true,
        fill : true
    }

    return (
        <Router>
            <Recoil nightmode={appStore.nightmode} {...styles}>
                <Layer {...styles}>
                    <Layer flex {...styles}>
                        <Header />
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/prescribe" component={SelectPrescription} />
                    </Layer>
                    <MenuPane history={this.props.history} />
                    <AuthPane history={this.props.history} />
                    <LoadingPane />
                </Layer>
            </Recoil>
        </Router>
        )
    } 
}