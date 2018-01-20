
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, patientStore, prescriptionsStore } from '../../../stores/_GlobalStore';

import { IPrescribeProps } from '../../../interfaces/views/IPrescribeProps';

import SignatureCanvas from 'react-signature-canvas';

import { IPatient } from '../../../interfaces/data/IPatient';

@observer
export default class SelectPrescription extends React.Component<IPrescribeProps, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number) {
        prescriptionsStore.gotoSlideIndex(n);
    }

    render() {

        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={prescriptionsStore.slideIndex}>
                        <Layer fill flexCenter>
                            <Emerge if={!appStore.menu}>
                                <Layer className="p20">
                                    <i className="material-icons super-xl mb20 floatL">link</i>
                                    <h2 className="mb20">No Prescriptions Found</h2>
                                    <h1 className="mb20">
                                        <small>Looks like you have nothing here.</small>
                                    </h1>

                                </Layer>
                            </Emerge>
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}


{/* <Toolbar block size="large" className="mt20">
<Button onClick={this.gotoSlideIndex.bind(this, 1)} icon="chevron-right" outline theme="error">Get Started</Button>
</Toolbar> */}