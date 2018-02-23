import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { setIdToken, setAccessToken, getUserInfo } from '../../../utils/AuthService';


@inject('authStore', 'appStore', 'routerStore')
@observer
class Callback extends React.Component<any, any> {

    componentDidMount() {
        // this.props.appStore.loading = true;
        // setAccessToken();
        // setIdToken();
        // getUserInfo((user) => {
        //     console.log(user);
        //     this.props.authStore.user = user;
        //     this.props.appStore.initializeApp();
        //     this.props.authStore.isAuthenticated = true;
        //     this.props.appStore.loading = false;
        //     this.props.routerStore.push('/');
        // });
        var myHeaders = new Headers();

        var myInit: any = {
            method: 'GET',
            headers: myHeaders,
            mode: 'no-cors',
        };

        var myRequest = new Request('/callback', myInit);
        fetch(myRequest) // fetch from Express.js server
            .then(response => {
                console.log(response.headers.get('user'));
            })
    }

    render() {
        return null;
    }
}

export default Callback;