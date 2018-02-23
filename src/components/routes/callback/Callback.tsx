import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { setIdToken, setAccessToken, isLoggedInUser } from '../../../utils/AuthService';

@inject('authStore', 'appStore', 'routerStore')
@observer
class Callback extends React.Component<any, any> {

    componentDidMount() {
        this.props.appStore.loading = true;
        setAccessToken();
        setIdToken();
        isLoggedInUser((user) => {
            this.props.authStore.loginUser(user);
            this.props.routerStore.push('/');
        }, () => {
            this.props.appStore.loading = false;
        });
    }

    render() {
        return null;
    }
}

export default Callback;