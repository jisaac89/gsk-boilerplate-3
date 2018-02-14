import * as React from 'react';

import {Toolbar, Button, Layer, Emerge} from '../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

import {IHeaderProps} from '../../interfaces/components/navigation/IHeaderProps';

@inject('appStore')
@observer
export default class Header extends React.Component<IHeaderProps, any> {

    toggleMenu(){
        this.props.appStore.toggleMenu();
    }

    render() {

        let appStore = this.props.appStore;

        return (
            <Emerge enter="fadeIn" exit="fadeOut" if={!appStore.menu}>
                <Emerge if={!appStore.menu} className="z5">
                    <Toolbar block spacing className="p10 text-right">
                    <img height={32} width={32} src="https://www.lawlogix.com/wp-content/uploads/2015/05/LW-603-p28-partner-profile.jpg" />
                        <Button simple theme="primary" right materialIcon icon={"menu"} onClick={this.toggleMenu.bind(this)}> Stokes</Button>   
                    </Toolbar>                                                                                                                                                                                                                                                                                                                               
                </Emerge>
            </Emerge>
        )
     } 
}