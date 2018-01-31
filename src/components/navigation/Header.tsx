import * as React from 'react';

import {Toolbar, Button, Layer, Emerge} from '../../../recoil/src/index';

import {observer} from 'mobx-react';

import {appStore} from '../../stores/_GlobalStore';

@observer
export default class Header extends React.Component<any, any> {

    toggleMenu(){
        appStore.toggleMenu();
    }

    render() {
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