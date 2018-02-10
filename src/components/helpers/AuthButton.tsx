import * as React from "react";
import {withRouter} from "react-router-dom";

import { authStore } from '../../stores/_GlobalStore';

import { Button, IButtonProps } from '../../../recoil/src/index';

import AuthLogin from './AuthLogin';

export const AuthButton = withRouter(({ history }) => (
    authStore.isAuthenticated ? (
        <Button block onClick={() => {
            authStore.signout(() => history.push('/'))
        }}>Sign out</Button>
    ) : (
        <AuthLogin pathname={'/login'} location={history.location} />
    )
  ))