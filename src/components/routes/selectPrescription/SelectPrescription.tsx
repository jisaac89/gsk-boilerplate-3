
import * as React from 'react';

import { Layer,Open, Emerge, Stepper,Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, prescribeStore, patientStore } from '../../../stores/_GlobalStore';

import {IPrescribeProps} from '../../../interfaces/views/IPrescribeProps';

import SignatureCanvas from 'react-signature-canvas';

import {IPatient} from '../../../interfaces/data/IPatient';

@observer
export default class SelectPrescription extends React.Component<IPrescribeProps, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number){
        prescribeStore.gotoSlideIndex(n);
    }

    render() {

          return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={prescribeStore.slideIndex}>
                        <Layer fill  flexCenter>
                            <Emerge if={!appStore.menu}>
                                <Layer className="p20">
                                    <i className="material-icons super-xl mb20 floatL">highlight</i>
                                    <h2 className="mb20">Selected Prescription</h2>
                                    <h1 className="mb20">
                                        <small>Selected Prescription.</small>
                                    </h1>
                                    
                                    <Toolbar block size="large" className="mt20">
                                        <Button onClick={this.gotoSlideIndex.bind(this, 1)} icon="chevron-right" outline theme="error">Get Started</Button>
                                    </Toolbar>
                                </Layer>
                            </Emerge>
                        </Layer>
                    </Wizard> 
                </Layer>
            </Layer>
        )
    }
} 
