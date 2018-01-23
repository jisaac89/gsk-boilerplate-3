
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, discountsStore, labResultsStore } from '../../../stores/_GlobalStore';


@observer
export default class Discounts extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number) {
        discountsStore.gotoSlideIndex(n);
    }

    render() {

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
                    <Button theme="error" right>Take Survey</Button>
                </Toolbar>
            )
        }

        let mobileTemplate = (item, index) => {
            return (
               <Layer className="p10 border-all">
                    <h1 className="mb10">{item.name}</h1>
                    <p>{item.description}</p>
                    <Toolbar textCenter className="mt10" block key={index}>
                        <Button block theme="error" right>Take Survey</Button>
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
                                    <Table hideHeader hidePageSize columns={appStore.mobile ? [{template:mobileTemplate}] : [{ name: 'name', width: '200px' }, { name: 'description' }, { template: surveyTemplate }]} pageSize={5} overflow dataSource={[{name:'Personal Health', description: 'Take this anon survey and recieve 10% off copay'}]} />
                                </Layer>
                            </Layer>
                        </Emerge>
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}

// <h1 className="mb20">
// Your results came in, send them out for extra benefits!
// </h1>
// <Layer className="text-left">
// <Table hideHeader hidePageSize columns={[{ name: 'labTestUUID', width: '200px' }, { name: 'description' }, { template: menuTemplate }]} pageSize={5} overflow dataSource={[labResultsStore.list[0]]} />
// </Layer>