
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Checkbox, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

@inject('appStore', 'discountsStore', 'labResultsStore')
@observer
export default class Discounts extends React.Component<any, {}> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.discountsStore.slideIndex = 0;
        this.props.appStore.menu = false;
    }

    gotoSlideIndex(n: number) {
        this.props.discountsStore.gotoSlideIndex(n);
    }

    submitSurvey(){
        this.props.discountsStore.submitSurvey();
    }

    render() {

        let appStore = this.props.appStore;
        let discountsStore = this.props.discountsStore;

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button theme="primary" right>Send Results</Button>
                </Toolbar>
            )
        }

        let surveyTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button onClick={this.gotoSlideIndex.bind(this, 1)} theme="error" right>Take Survey</Button>
                </Toolbar>
            )
        }

        let mobileTemplate = (item, index) => {
            return (
                <Layer className="p10 border-all">
                    <h1 className="mb10">{item.name}</h1>
                    <p>{item.description}</p>
                    <Toolbar textCenter className="mt10" block key={index}>
                        <Button onClick={this.gotoSlideIndex.bind(this, 1)} block theme="error" right>Take Survey</Button>
                    </Toolbar>
                </Layer>
            )
        }

        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={discountsStore.slideIndex}>
                        <Layer fill flexCenter>
                            <Emerge if={!appStore.menu}>
                                <Layer className="w80 center-width">
                                    <i className="material-icons super-xl mb20">star</i>
                                    <h2 className="mb20">Discounts</h2>

                                    <h1 className="mtb40">
                                        Take a functional survey to recieve discounts of from your co-pay.
                                    </h1>
                                    <Layer className="text-left">
                                        <Table hideHeader hidePageSize columns={appStore.mobile ? [{ template: mobileTemplate }] : [{ name: 'name', width: '200px' }, { name: 'description' }, { template: surveyTemplate }]} pageSize={5} overflow dataSource={[{ name: 'Personal Health', description: 'Take this anon survey and recieve 10% off copay' }]} />
                                    </Layer>
                                </Layer>
                            </Emerge>
                        </Layer>
                        <Layer fill flex scrollY>
                            <Layer  className="w600px center-width">
                                <Emerge if={discountsStore.slideIndex === 1}>
                                    <Layer className="w80 center-width">
                                        <h2 className="mb20 text-center">Personal Health Survey</h2>

                                        <h1 className="mtb40 text-center">
                                            Take this anon survey and recieve 10% off copay
                                        </h1>
                                        <Layer className="text-left center-width">
                                            <h3 className="mb20">Are you experiencing a headache in the morning?</h3>
                                            <Toggle array={['No', 'Yes']} />
                                            <h3 className="mtb20">What symptoms are you experiencing in the morning?</h3>
                                            <Toolbar block spacing className="mb20">
                                                <Checkbox title="Headache" />
                                                <Checkbox title="Stomach pain" />
                                                <Checkbox title="Flu like symptoms" />
                                            </Toolbar>
                                            <Toolbar block spacing>
                                                <Checkbox title="Motion sickness" />
                                                <Checkbox title="Blurry Vision" />
                                            </Toolbar>
                                            <h3 className="mtb20">Are you experiencing a headache in the evening?</h3>
                                            <Toggle array={['No', 'Yes']} />
                                            <h3 className="mtb20">What symptoms are you experiencing in the evening?</h3>
                                            <Toolbar block spacing className="mb20">
                                                <Checkbox title="Headache" />
                                                <Checkbox title="Stomach pain" />
                                                <Checkbox title="Flu like symptoms" />
                                            </Toolbar>
                                            <Toolbar block spacing>
                                                <Checkbox title="Motion sickness" />
                                                <Checkbox title="Blurry Vision" />
                                            </Toolbar>
                                            <Toolbar vertical spacing textCenter block size="large" className="mtb20">
                                                <Button onClick={this.submitSurvey.bind(this)} theme="error" block icon="star">Submit Survey for a discount</Button>
                                                <Button onClick={this.gotoSlideIndex.bind(this, 0)} block>Cancel</Button>
                                            </Toolbar>
                                        </Layer>
                                    </Layer>
                                </Emerge>
                            </Layer>
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
                                    <Button onClick={this.gotoSlideIndex.bind(this, 0)}>Go back</Button>
                                </Toolbar>
                            </div>
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}