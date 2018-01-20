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
                <Layer className="z5">
                    <Toolbar block spacing className="p10 text-right">
                        <Button right materialIcon simple icon={"menu"} onClick={this.toggleMenu.bind(this)}></Button>   
                    </Toolbar>
                </Layer>
            </Emerge>
        )
     } 
}