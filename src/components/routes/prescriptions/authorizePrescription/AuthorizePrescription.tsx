
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import SignatureCanvas from 'react-signature-canvas';

import { IAuthorizePrescriptionProps } from '../../../../interfaces/components/routes/prescriptions/authorizedPrescriptions/IAuthorizePrescriptionProps'

@inject('appStore', 'prescriptionsStore')
@observer
export default class AuthorizePrescription extends React.Component<IAuthorizePrescriptionProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {

        const prescriptionsStore = this.props.prescriptionsStore;
        let { selectedPrescription } = prescriptionsStore;

        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={0}>
                        <Layer fill flexCenter>
                            <Emerge if={true}>
                                <Layer className="p20">
                                    <i className="material-icons super-xl mb20 floatL">opacity</i>
                                    <h2 className="mb20">Authorize Prescription: {prescriptionsStore.selectedPrescription.prescriptionuuid}</h2>
                                    <h1 className="mb20">
                                        <small>Who would you like to authorize this asset?</small>
                                    </h1>
                                    <Toolbar noRadius block className="mb20">
                                        <Button>Patient: {selectedPrescription.owner}</Button>
                                        <div className="dinblock">
                                            <Toggle simple type="strings" array={['Write', 'Read', 'Hide']} /> 
                                        </div>
                                    </Toolbar>
                                    <Toolbar block className="mb20">
                                        <Button>Prescription: {selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</Button>
                                        <div className="dinblock">
                                            <Toggle simple type="strings" array={['Write', 'Read', 'Hide']} /> 
                                        </div>
                                    </Toolbar>
                                    <Toolbar block className="mb20">
                                        <Button>Inscription:{selectedPrescription.inscription}</Button>
                                        <div className="dinblock">
                                            <Toggle simple type="strings" array={['Write', 'Read', 'Hide']} /> 
                                        </div>
                                    </Toolbar>
                                    <Toolbar vertical spacing textCenter block className="w500px center-width">
                                        <Input block placeholder="Search by email or id." />
                                        <Button disabled={true} block theme="primary">Authorize Entity</Button>
                                    </Toolbar>
                                </Layer>
                            </Emerge>
                        </Layer>
                        <Layer fill flex overflow>
                            <Layer fill overflow flexCenter>
                                <Loading if={true} size="xlarge" />
                                <h1 className="mt20">
                                    <Emerge delay={2500} enter={"fadeIn"}>
                                        <small className="mb20 dblock">Please wait...</small>
                                        <small className="mb20 dblock">Storing survey to private blockchain.</small>
                                        <small>Sending secure form to provider.</small>
                                    </Emerge>
                                </h1>
                            </Layer>
                        </Layer>
                        <Layer flexCenter fill>
                            <div className="w500px center-width">
                                <i className="material-icons super-xl mb20 floatL">done</i>

                                <h2 className="mb20 text-center">
                                    <small>Survey Sent!</small>
                                </h2>

                                <Toolbar block className="mb20 text-center" spacing>
                                    <Button>Go back</Button>
                                </Toolbar>
                            </div>
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}