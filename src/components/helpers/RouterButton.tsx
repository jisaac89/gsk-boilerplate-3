import * as React from "react";
import {withRouter} from "react-router-dom";

import { Button } from '../../../recoil/src/index';
import { observer, inject } from 'mobx-react';

import {IAppStore} from '../../interfaces/stores/IAppStore';

interface IRouterButton{
    history: any;
    route: string;
    title?: string;
    auth?: boolean;
    appStore?: IAppStore; 
}

@inject('appStore')
@observer
class RouterButton extends React.Component<IRouterButton, any> {

  gotoRoute(route) {
    if(this.props.auth){
      this.props.appStore.toggleAuth();
    } else{
      this.props.appStore.menu = false;
    }
    this.props.history.push(route);
  }
  render(){
      const {route, title} = this.props;
      return (
          <Button {...this.props}  onClick={this.gotoRoute.bind(this, route)}>
            {title}
          </Button>
      )
  }
}
export default withRouter(RouterButton);
