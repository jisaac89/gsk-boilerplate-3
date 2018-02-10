import * as React from 'react';

import {Toolbar, Button, Layer, Emerge} from '../../../recoil/src/index';

import {observer, inject} from 'mobx-react';

@inject('appStore')
@observer
export default class Header extends React.Component<any, any> {

    toggleMenu(){
        this.props.appStore.toggleMenu();
    }

    render() {

        let appStore = this.props.appStore;

        return (
            <Emerge enter="fadeIn" exit="fadeOut" if={!appStore.menu}>
                <Emerge if={!appStore.menu} className="z5">
                    <Toolbar block spacing className="p10 text-right">
                        <Button right materialIcon icon={"menu"} onClick={this.toggleMenu.bind(this)}> Dashboard</Button>   
                    </Toolbar>                                                                                                                                                                                                                                                                                                                               
                </Emerge>
            </Emerge>
        )
     } 
}