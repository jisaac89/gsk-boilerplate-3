
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

    selectPrescription(prescription) {
        prescriptionsStore.selectPrescription(prescription);
        this.gotoSlideIndex(1);
    }

    cancelSelectPrescription(){
        prescriptionsStore.selectPrescription({});
        this.gotoSlideIndex(0);
    }

    render() {

        let {selectedPrescription} = prescriptionsStore;

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button theme="primary" right>Select</Button>
                </Toolbar>
            )
        }
        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={prescriptionsStore.slideIndex}>
                        <Layer fill flexCenter>
                                {prescriptionsStore.list.length === 0 ?
                                <Emerge if={!appStore.menu}>
                                    <Layer className="p20">
                                        <i className="material-icons super-xl mb20 floatL">link</i>
                                        <h2 className="mb20">No Prescriptions Found</h2>
                                        <h1 className="mb20">
                                            <small>Looks like you have nothing here.</small>
                                        </h1>

                                    </Layer>
                                </Emerge>
                                :
                                <Emerge if={!appStore.menu}>
                                    <Layer className="w80 center-width">
                                        <i className="material-icons super-xl mb20">link</i>
                                        <h2 className="mb20">Your Prescriptions</h2>
                                        <h1 className="mtb20">
                                            Below is a list of recent prescriptions.
                                        </h1>
                                        <Layer className="text-left">
                                            <Table rowIsSelectable="single" onRowSelect={this.selectPrescription.bind(this)} searchableKeys={['drug']} searchTitle="Search by drug name or ID" columns={[{ name: 'drug', width: '200px' }, { name: 'dose' }, { name: 'issueUnit' }, { template: menuTemplate }]}  hidePageSize pageSize={5} overflow dataSource={prescriptionsStore.list} />
                                        </Layer>
                                    </Layer>
                                </Emerge>
                            }
                        </Layer>
                        <Layer flexCenter fill className="border-right">
                            <Layer>
                                <img height={175} width={175} src="https://www.qrstuff.com/images/default_qrcode.png" />
                                <h2 className="mb20">Prescription ID : 0x210958102985108</h2>
                                <h1 className="mb20">
                                    <small>Patient: <strong>{selectedPrescription.owner}</strong></small>
                                </h1>
                                <h1 className="mb20">
                                    <small>Prescription: <strong>{selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</strong></small>
                                </h1>
                                <h1 className="mb20">
                                    <small>Inscription: <strong>{selectedPrescription.inscription}</strong></small>
                                </h1>
                                <Toolbar textCenter vertical spacing block size="large" className="mt20 w300px center-width">
                                    <Button theme="primary" block>Request Advocatey</Button>
                                    <Button theme="primary" block>Request Benefits Verifcication</Button>
                                    <Button theme="primary" block>Assign Pharmacy</Button>
                                    <Button block onClick={this.cancelSelectPrescription.bind(this)} icon="chevron-left">Go Back</Button>
                                </Toolbar>
                            </Layer>
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