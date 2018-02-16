import * as React from 'react';

import { Button, Toolbar, Input, Emerge, Layer, SlideIn } from '../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import RouterButton from '../helpers/RouterButton';

import { IMenuPaneProps } from '../../interfaces/components/navigation/IMenuPaneProps';
import { clearAccessToken } from '../../utils/AuthService';

import { withRouter } from 'react-router-dom';

@inject('appStore', 'prescriptionsStore', 'labResultsStore', 'authStore')
@observer
class MenuPane extends React.Component<IMenuPaneProps, any> {

    signOut() {
        clearAccessToken().then(() => {
            this.props.authStore.signout();
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname === '/login' && this.props.authStore.isAuthenticated) {
            this.props.appStore.menu = true;
        }
    }

    render() {

        let { appStore, labResultsStore, prescriptionsStore } = this.props;
        let { history } = this.props;

        return (
            <SlideIn className="z3" if={appStore.menu} from="bottom" fill>
                <Layer fill flex>
                    <Layer scrollY id="main" flexCenter={!appStore.mobile} fill className="text-left pt50" theme="light">
                        <div className="p20 w500px center-width">
                            <img className="profile-pic pull-left mb40" src="https://www.lawlogix.com/wp-content/uploads/2015/05/LW-603-p28-partner-profile.jpg" />
                            <div className="pull-left dinblock mt20 ml20">
                                <h1>Welcome back,</h1>
                                <h2>Stokes</h2>
                            </div>
                            <Toolbar block className="center-width text-left" spacing vertical>
                                <Emerge enter="fadeIn" if={appStore.menu}>
                                    <div></div>
                                    <Toolbar block flush flex className="mb20">
                                        {labResultsStore.list.length ? <Button theme="error">{labResultsStore.list.length}</Button> : null}
                                        <RouterButton loading={labResultsStore.loading} tabIndex={-1} block size="large" history={history} route="/labResults" title="Lab Results" />
                                    </Toolbar>
                                    <Toolbar block flush flex className="mb20">
                                        {prescriptionsStore.prescriptions.length ? <Button theme="error">{prescriptionsStore.prescriptions.length}</Button> : null}
                                        <RouterButton loading={prescriptionsStore.loading} block size="large" history={history} route="/prescriptions" title="Prescriptions" />
                                    </Toolbar>
                                    <Toolbar block flush flex className="mb20">
                                        <Button theme="error">1</Button>
                                        <RouterButton block size="large" history={history} route="/discounts" title="Discounts" />
                                    </Toolbar>
                                    <RouterButton className="mb20" disabled block size="large" history={history} route="/" title="My Profile" />
                                    <RouterButton disabled block size="large" history={history} route="/" title="Settings" />
                                </Emerge>
                            </Toolbar>
                        </div>
                    </Layer>
                    <Layer theme="e-NightMode" className="text-center p10">
                        <Button icon="unlock" onClick={this.signOut.bind(this)} size="large" block>Sign Out</Button>
                    </Layer>
                </Layer>
            </SlideIn>
        )
    }
}

export const MenuPaneRoute = withRouter(props => <MenuPane {...props} />);