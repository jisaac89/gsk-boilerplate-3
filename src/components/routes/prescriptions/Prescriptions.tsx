
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { appStore, prescriptionsStore } from '../../../stores/_GlobalStore';

import { IPrescriptionsProps } from '../../../interfaces/components/routes/prescriptions/IPrescriptionsProps';

import SignatureCanvas from 'react-signature-canvas';

import { IPatient } from '../../../interfaces/data/IPatient';
import MobileTemplate from '../../../../recoil/src/components/DatePicker/MobileTemplate';


import RouterButton from '../../helpers/RouterButton';

@inject('appStore','prescriptionsStore')
@observer
export default class Prescriptions extends React.Component<IPrescriptionsProps, {}> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.prescriptionsStore.gotoSlideIndex(0);
        this.props.appStore.menu = false;
    }

    gotoSlideIndex(n: number) {
        this.props.prescriptionsStore.gotoSlideIndex(n);
    }

    selectPrescription(prescription) {
        this.props.prescriptionsStore.selectPrescription(prescription);
        this.gotoSlideIndex(1);
    }

    cancelSelectPrescription() {
        this.props.prescriptionsStore.selectPrescription({});
        this.gotoSlideIndex(0);
    }

    render() {

        let prescriptionsStore = this.props.prescriptionsStore;
        let { selectedPrescription } = prescriptionsStore;

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button theme="primary" right>Select</Button>
                </Toolbar>
            )
        }

        let mobileTemplate = (item, index) => {
            return (
                <div>
                    <p>{item.drug + ' ' + item.dose + ' ' + item.issueUnit}</p>
                </div>
            )
        }
        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={prescriptionsStore.slideIndex}>
                        <Layer fill flexCenter>
                            {prescriptionsStore.prescriptions.length === 0 ?
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
                                            <Table rowIsSelectable="single" onRowSelect={this.selectPrescription.bind(this)} searchableKeys={['drug']} searchTitle="Search by drug name or ID" columns={appStore.mobile ? [{ template: mobileTemplate }, { template: menuTemplate }] : [{ name: 'drug', width: '200px' }, { name: 'dose' }, { name: 'issueUnit' }, { template: menuTemplate }]} hidePageSize pageSize={5} overflow dataSource={prescriptionsStore.prescriptions} />
                                        </Layer>
                                    </Layer>
                                </Emerge>
                            }
                        </Layer>
                        <Layer flexCenter={!appStore.mobile} scrollY fill className={appStore.mobile ? "text-center" : "border-right"}>
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
                                    <RouterButton theme="primary" block history={history} route={`/prescriptions/authorize/${selectedPrescription.prescriptionuuid}`} title="Authorize" />
                                    <Button theme="primary" block>Request Advocacy</Button>
                                    <Button theme="primary" block>Request Benefits Verification</Button>
                                    <Button theme="primary" block>Send to Pharmacy</Button>
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