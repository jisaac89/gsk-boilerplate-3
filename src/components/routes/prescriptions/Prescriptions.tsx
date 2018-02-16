
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { appStore, prescriptionsStore } from '../../../stores/_GlobalStore';

import { IPrescriptionsProps } from '../../../interfaces/components/routes/prescriptions/IPrescriptionsProps';

import SignatureCanvas from 'react-signature-canvas';

import { IPatient } from '../../../interfaces/data/IPatient';
import MobileTemplate from '../../../../recoil/src/components/DatePicker/MobileTemplate';

import RouterButton from '../../helpers/RouterButton';

@inject('appStore', 'prescriptionsStore', 'routerStore')
@observer
export default class Prescriptions extends React.Component<IPrescriptionsProps, {}> {

    goBack() {
        this.props.routerStore.push('/');
    }

    componentDidMount() {
        this.props.prescriptionsStore.gotoSlideIndex(0);
        this.props.appStore.menu = false;
    }

    gotoSlideIndex(n: number) {
        this.props.prescriptionsStore.gotoSlideIndex(n);
    }

    selectPrescription(prescription) {
        this.props.prescriptionsStore.selectPrescription(prescription);
        this.props.routerStore.push(`/prescriptions/${prescription.prescriptionuuid}`);
    }

    cancelSelectPrescription() {
        this.props.prescriptionsStore.selectPrescription({});
    }

    render() {

        let { prescriptionsStore } = this.props;
        let { selectedPrescription } = prescriptionsStore;

        let menuTemplate = (prescription, index) => {
            return (
                <Toolbar block key={index}>
                    <Button right theme="primary" onClick={this.selectPrescription.bind(this, prescription)} >Select</Button>
                </Toolbar>
            )
        }

        let mobileTemplate = (prescription, index) => {
            return (
                <Toolbar flex block key={index}>
                    <Button simple block onClick={this.selectPrescription.bind(this, prescription)} >{prescription.drug}</Button>
                    <Button icon="chevron-right" simple onClick={this.selectPrescription.bind(this, prescription)} ></Button>
                </Toolbar>
            )
        }

        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={prescriptionsStore.slideIndex}>
                        <Layer fill flexCenter>
                            {(() => {
                                if (prescriptionsStore.loading) {
                                    return (
                                        <Emerge enter="fadeIn" if={!appStore.menu}>
                                            <Layer className="p20">
                                                <i className="material-icons super-xl mb20 floatL">link</i>
                                                <h2 className="mb20">Loading Prescriptions</h2>
                                                <h1 className="mb20">
                                                    <small>Please wait...</small>
                                                </h1>
                                            </Layer>
                                        </Emerge>
                                    )
                                } else {
                                    return prescriptionsStore.prescriptions.length === 0 ?
                                        <Emerge enter="fadeIn" if={!appStore.menu}>
                                            <Layer className="p20">
                                                <i className="material-icons super-xl mb20 floatL">link</i>
                                                <h2 className="mb20">No Prescriptions Found</h2>
                                                <h1 className="mb20">
                                                    <small>Looks like you have nothing here.</small>
                                                </h1>

                                            </Layer>
                                        </Emerge>
                                        :
                                        <Emerge enter="fadeIn" if={true}>
                                            <Layer className="w500px center-width">
                                                <i className="material-icons super-xl mb20">link</i>
                                                <h2 className="mb20">Your Prescriptions</h2>
                                                <h1 className="mtb20">
                                                    Below is a list of recent prescriptions.
                                                </h1>
                                                <Layer className="text-left">
                                                    <Table className="w500px" searchableKeys={['drug']} searchTitle="Search by drug name or ID" columns={[{ template: mobileTemplate }]} hidePageSize pageSize={5} overflow dataSource={prescriptionsStore.prescriptions} />
                                                    <Toolbar textCenter vertical spacing block size="large" className="mt20 w500px center-width">
                                                        <Button onClick={this.goBack.bind(this)} simple icon="chevron-left" block >Go Back</Button>
                                                    </Toolbar>
                                                </Layer>
                                            </Layer>
                                        </Emerge>

                                }
                            })()}
                        </Layer>
                        <Layer flexCenter={!appStore.mobile} scrollY fill className={appStore.mobile ? "text-center" : "border-right"}>
                            <Layer enter="fadeIn" className="w500px center-width p20">
                                <img height={145} width={145} src="https://www.qrstuff.com/images/default_qrcode.png" />
                                <h2 className="mb20">Prescription: {prescriptionsStore.selectedPrescription.prescriptionuuid}</h2>
                                <h4 className="text-left">Rx</h4>
                                <hr />
                                <div className="border-all p10 mb20">
                                    <Toolbar flex noRadius block className="mb20">
                                        <Button outline block><strong>Patient:</strong> {selectedPrescription.owner}</Button>
                                    </Toolbar>
                                    <Toolbar flex block className="mb20">
                                        <Button outline block><strong>Prescription:</strong> {selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</Button>
                                    </Toolbar>
                                    <Toolbar flex block>
                                        <Button outline block><strong>Inscription:</strong>{selectedPrescription.inscription}</Button>
                                    </Toolbar>
                                </div>
                                <Toolbar textCenter vertical spacing block size="large" className="mt20 w500px center-width">
                                    <RouterButton icon="lock" theme="primary" block history={history} route={`/prescriptions/authorize/${selectedPrescription.prescriptionuuid}`} title="Authorize" />
                                    <Button disabled block>Request Advocacy</Button>
                                    <Button disabled block>Request Benefits Verification</Button>
                                    <Button disabled block>Send to Pharmacy</Button>
                                    <Button simple block onClick={this.cancelSelectPrescription.bind(this)} icon="chevron-left">Go Back</Button>
                                </Toolbar>
                            </Layer>
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}