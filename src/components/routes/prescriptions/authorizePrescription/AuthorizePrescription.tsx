
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import SignatureCanvas from 'react-signature-canvas';

@inject('appStore', 'prescriptionsStore')
@observer
export default class AuthorizePrescription extends React.Component<any, {}> {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={0}>
                        <Layer fill flexCenter>
                            <Emerge if={true}>
                                <Layer className="p20">
                                    <i className="material-icons super-xl mb20 floatL">link</i>
                                    <h2 className="mb20">Authorize Prescription</h2>
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