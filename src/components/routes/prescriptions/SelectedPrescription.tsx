
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { appStore, prescriptionsStore } from '../../../stores/_GlobalStore';

import { IPrescriptionsProps } from '../../../interfaces/components/routes/prescriptions/IPrescriptionsProps';

import SignatureCanvas from 'react-signature-canvas';

import { IPatient } from '../../../interfaces/data/IPatient';
import MobileTemplate from '../../../../recoil/src/components/DatePicker/MobileTemplate';
import RouterButton from '../../helpers/RouterButton';

@inject('appStore', 'prescriptionsStore')
@observer
export default class SelectedPrescription extends React.Component<IPrescriptionsProps, {}> {

    componentDidMount() {
        this.props.appStore.menu = false;
        console.log(this.props);
    }

    gotoSlideIndex(n: number) {
        this.props.prescriptionsStore.gotoSlideIndex(n);
    }

    cancelSelectPrescription() {
        this.props.prescriptionsStore.selectPrescription({});
        this.gotoSlideIndex(0);
    }

    render() {

        let prescriptionsStore = this.props.prescriptionsStore;
        let { selectedPrescription } = prescriptionsStore;

        return (
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
                        <RouterButton icon="chevron-left" simple block history={history} route={`/prescriptions/`} title="Go back" />
                    </Toolbar>
                </Layer>
            </Layer>
        )
    }
}