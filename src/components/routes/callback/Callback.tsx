import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { setIdToken, setAccessToken } from '../../../utils/AuthService';


@inject('authStore', 'appStore', 'routerStore')
@observer
class Callback extends React.Component<any, any> {

    componentDidMount() {
        setAccessToken();
        setIdToken();
        this.props.authStore.isAuthenticated = true;
        this.props.routerStore.push('/');
    }

    render() {
        return null;
    }
}

export default Callback;