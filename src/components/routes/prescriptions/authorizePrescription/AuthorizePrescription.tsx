
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Checkbox, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import SignatureCanvas from 'react-signature-canvas';

import RouterButton from '../../../helpers/RouterButton';

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
                        <Layer flexCenter fill>
                            <Emerge if={true}>
                                <Layer className="w500px center-width">
                                    <img height={145} width={145} src="https://www.qrstuff.com/images/default_qrcode.png" />
                                    <h2 className="mb20">Authorize: {prescriptionsStore.selectedPrescription.prescriptionuuid}</h2>
                                    <h1 className="mb20">
                                        <small>How Would you like to authorize this asset?</small>
                                    </h1>
                                    <h4 className="text-left">Rx</h4>
                                    <hr />
                                    <div className="border-all p10 mb20">
                                        <Toolbar flex noRadius block className="mb20">
                                            <Button outline block className="mr5"><strong>Patient:</strong> {selectedPrescription.owner}</Button>
                                            <Toolbar spacing flex>
                                                <Button>Read</Button>
                                                <Button checked advanced>Hide</Button>
                                            </Toolbar>
                                        </Toolbar>
                                        <Toolbar flex block className="mb20">
                                            <Button outline block className="mr5"><strong>Prescription:</strong> {selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</Button>
                                            <Toolbar spacing flex>
                                                <Button>Read</Button>
                                                <Button checked advanced>Hide</Button>
                                            </Toolbar>
                                        </Toolbar>
                                        <Toolbar flex block>
                                            <Button outline block className="mr5"><strong>Inscription:</strong>{selectedPrescription.inscription}</Button>
                                            <Toolbar spacing flex>
                                                <Button>Read</Button>
                                                <Button checked advanced>Hide</Button>
                                            </Toolbar>
                                        </Toolbar>
                                    </div>
                                    <Toolbar vertical spacing block className="mb20 text-left">
                                        <div className="mb20">
                                            <Checkbox icon="check" title="Allow this entity to re-share your asset." />
                                        </div>
                                        <Checkbox icon="check" title="Save these settings as a template." />
                                    </Toolbar>
                                    <Toolbar block size="large" vertical spacing className="mt20">
                                        <Button theme="primary" block>Continue</Button>
                                        <RouterButton block history={history} route={`/prescriptions/`} title="Cancel" />
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

{
    /* 
    <Toolbar vertical spacing textCenter block className="w500px center-width">
        <Input block placeholder="Search by email or id." />
        <Button disabled={true} block theme="primary">Authorize Entity</Button>
    </Toolbar> 
    */
}