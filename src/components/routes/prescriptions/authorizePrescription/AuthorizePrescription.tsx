
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Checkbox, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import SignatureCanvas from 'react-signature-canvas';

import RouterButton from '../../../helpers/RouterButton';

import { withRouter } from 'react-router-dom';

import { IAuthorizePrescriptionProps } from '../../../../interfaces/components/routes/prescriptions/authorizedPrescriptions/IAuthorizePrescriptionProps'

@inject('appStore', 'prescriptionsStore', 'authorizePrescriptionStore', 'routerStore')
@observer
class AuthorizePrescription extends React.Component<IAuthorizePrescriptionProps, {}> {

    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.routerStore.goBack();
    }

    componentDidMount() {
        let prescriptionId = this.props.location.pathname.replace("/authorize/", '')
        this.props.prescriptionsStore.setPrescriptionId(prescriptionId);

        this.props.appStore.menu = false;

        this.props.authorizePrescriptionStore.gotoSlideIndex(0);
        this.props.authorizePrescriptionStore.setFindEntity('');
    }

    // check if really needed
    componentWillReceiveProps(nextProps) {
        let prescriptionId = nextProps.location.pathname.replace("/prescriptions/authorize/", '')
        this.props.prescriptionsStore.setPrescriptionId(prescriptionId);
    }

    gotoSlideIndex(n: number) {
        this.props.authorizePrescriptionStore.gotoSlideIndex(n)
    }

    setFindEntity(s: string) {
        this.props.authorizePrescriptionStore.setFindEntity(s);
    }

    render() {

        const prescriptionsStore = this.props.prescriptionsStore;
        const authorizePrescriptionStore = this.props.authorizePrescriptionStore;
        let { selectedPrescription } = prescriptionsStore;
        let mobile = this.props.appStore.mobile;

        return (
            <Layer fill flex>
                <Layer fill flex className="p20" scrollY>
                    <Wizard fill flex slideIndex={authorizePrescriptionStore.slideIndex}>
                        <Layer flexCenter fill>
                            <Emerge enter="fadeIn" if={authorizePrescriptionStore.slideIndex === 0}>
                                <Layer className="w500px center-width">

                                    <Toolbar block textCenter className="center-width">
                                        <i className="material-icons super-xl mb20 floatL">lock</i>
                                    </Toolbar>

                                    <h2 className="mb20">Authorize Asset</h2>
                                    <h1 className="mb20">
                                        <small>This wizard will take you through the steps to authorize your asset.</small>
                                    </h1>
                                    <h4 className="text-left">Rx</h4>
                                    <hr />
                                    <div className="border-all p10 mb20">
                                        <Toolbar flex block>
                                            <Button outline block><strong>Prescription:</strong> {selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</Button>
                                        </Toolbar>
                                    </div>
                                    <Toolbar block size="large" vertical spacing className="mt20">
                                        <Button onClick={this.gotoSlideIndex.bind(this, 1)} icon="chevron-right" theme="primary" block>Continue</Button>
                                        <Button simple icon="chevron-left" block onClick={this.goBack.bind(this)} >Go back</Button>
                                    </Toolbar>
                                </Layer>
                            </Emerge>
                        </Layer>
                        <Layer flexCenter fill>
                            <Layer className="w500px center-width">
                                <i className="material-icons super-xl mb20 floatL">person</i>
                                <h2 className="mb20">Find Entity to Authorize</h2>
                                <h1 className="mb20">
                                    <small>Lets start by looking for the entity you would like to authorize.</small>
                                </h1>
                                <Toolbar block>
                                    <Input focusOnMount onChange={this.setFindEntity.bind(this)} block placeholder="Search by email or ID." />
                                </Toolbar>
                                <Open openToHeight={'45px'} if={authorizePrescriptionStore.findEntity !== ''}>
                                    <Toolbar block className="mt10">
                                        <Button icon="check" simple loading={authorizePrescriptionStore.findEntity === 'viiv-test' ? false : true}>{authorizePrescriptionStore.findEntity === 'viiv-test' ? "ViiV - Location, Scottsdale, Arizona" : "Searching"}</Button>
                                    </Toolbar>
                                </Open>
                                <Toolbar block size="large" vertical spacing className="mt20">
                                    <Button disabled={authorizePrescriptionStore.findEntity !== 'viiv-test'} onClick={this.gotoSlideIndex.bind(this, 2)} icon="chevron-right" theme="primary" block>Continue</Button>
                                    <Button onClick={this.gotoSlideIndex.bind(this, 0)} simple icon="chevron-left" block>Go back</Button>
                                </Toolbar>
                            </Layer>

                        </Layer>
                        <Layer flexCenter fill>
                            <Layer className="w500px center-width">
                                <h2 className="mb20">Authorize: ViiV-test</h2>
                                <h1 className="mb20">
                                    <small>How would you like to authorize this asset?</small>
                                </h1>
                                <h4 className="text-left">Rx</h4>
                                <hr />
                                <div className="border-all p10 mb20">
                                    <Toolbar flex noRadius block className="mb20">
                                        <Button outline block className="mr5"><strong>{!mobile ? "Patient:" : null}</strong> {selectedPrescription.owner}</Button>
                                        <Toolbar spacing flex>
                                            <Button>Read</Button>
                                            <Button checked advanced>Hide</Button>
                                        </Toolbar>
                                    </Toolbar>
                                    <Toolbar flex block className="mb20">
                                        <Button outline block className="mr5"><strong>{!mobile ? "Prescription:" : null}</strong> {selectedPrescription.drug} {selectedPrescription.dose} {selectedPrescription.issueUnit}</Button>
                                        <Toolbar spacing flex>
                                            <Button checked advanced>Read</Button>
                                            <Button>Hide</Button>
                                        </Toolbar>
                                    </Toolbar>
                                    <Toolbar flex block>
                                        <Button outline block className="mr5"><strong>{!mobile ? "Inscription:" : null}</strong>{selectedPrescription.inscription}</Button>
                                        <Toolbar spacing flex>
                                            <Button>Read</Button>
                                            <Button checked advanced>Hide</Button>
                                        </Toolbar>
                                    </Toolbar>
                                </div>
                                <Toolbar vertical spacing block className="mb20 text-left">
                                    <Toolbar flush flex block>
                                        <Button outline block>Contract expiration:</Button>
                                        <DatePicker selectTime />
                                    </Toolbar>
                                    <div className="mtb20">
                                        <Checkbox icon="check" title="Allow this entity to re-share your asset." />
                                    </div>
                                    <Checkbox icon="check" title="Save these settings as a template." />
                                </Toolbar>
                                <Toolbar block size="large" vertical spacing className="mt20">
                                    <Button onClick={this.gotoSlideIndex.bind(this, 3)} icon="lock" theme="error" block>Authorize</Button>
                                    <Button onClick={this.gotoSlideIndex.bind(this, 1)} simple icon="chevron-left" block>Go back</Button>
                                </Toolbar>
                            </Layer>
                        </Layer>
                        <Layer fill flex overflow>
                            <Layer fill overflow flexCenter>
                                <Loading if={true} size="xlarge" />
                                <h1 className="mt20">
                                    <Emerge delay={2500} enter={"fadeIn"}>
                                        <small className="mb20 dblock">Please wait...</small>
                                        <small className="mb20 dblock">Generating permission based smart contract.</small>
                                        <small className="mb20 dblock">Authorizing asset to entity through private blockchain.</small>
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
            </Layer >
        )
    }
}

export const AuthorizePrescriptionRoute = withRouter(props => <AuthorizePrescription {...props} />)