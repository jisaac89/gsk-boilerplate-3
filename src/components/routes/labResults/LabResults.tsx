
import * as React from 'react';

import { Layer, Open, Emerge, Stepper, Loading, Table, Button, Wizard, Toolbar, Dropdown, DatePicker, Toggle, Input } from '../../../../recoil/src/index';

import { observer } from 'mobx-react';

import { appStore, labResultsStore } from '../../../stores/_GlobalStore';


@observer
export default class LabResults extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    gotoSlideIndex(n: number) {
        labResultsStore.gotoSlideIndex(n);
    }

    render() {

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button theme="primary" right>Select Viral</Button>
                </Toolbar>
            )
        }

        let submitTestForDiscount = (item, index) =>{
            return (
                <Button right theme="error">Submit for discount</Button>
            )
        }

        return (
            <Layer fill flex>
                <Layer fill flex>
                    <Wizard fill flex slideIndex={labResultsStore.slideIndex}>
                        <Layer fill flexCenter>
                            {labResultsStore.list.length === 0 ?
                                <Emerge if={!appStore.menu}>
                                    <Layer className="p20">
                                        <i className="material-icons super-xl mb20 floatL">opacity</i>
                                        <h2 className="mb20">No Lab Results Found</h2>
                                        <h1 className="mb20">
                                            <small>Looks like you have nothing here.</small>
                                        </h1>

                                    </Layer>
                                </Emerge>
                                :
                                <Emerge if={!appStore.menu}>
                                    <Layer className="w80 center-width">
                                        <i className="material-icons super-xl mb20">opacity</i>
                                        <h2 className="mb20">Lab results</h2>
                                        <h1 className="mtb20">
                                            Below is a list of recently sent results.
                                        </h1>
                                        <Layer className="text-left">
                                            <Table columns={[{name:'description'},{name:'owner'}, {template:submitTestForDiscount}]}  hidePageSize pageSize={5} overflow dataSource={labResultsStore.list} />
                                        </Layer>
                                    </Layer>
                                </Emerge>
                            }
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}