import * as React from "react";
import { Route, Redirect } from "react-router-dom";

import { authStore, routerStore } from '../../stores/_GlobalStore';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authStore.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)