
import * as React from 'react';

import { Layer, Emerge, Table, Button, Wizard, Toolbar } from '../../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { ILabResultsProps } from '../../../interfaces/components/routes/labResults/ILabResultsProps';

@inject('appStore', 'labResultsStore', 'routerStore')
@observer
export default class LabResults extends React.Component<ILabResultsProps, {}> {

    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.routerStore.push('/');
    }

    componentDidMount() {
        this.props.appStore.menu = false;
    }

    gotoSlideIndex(n: number) {
        this.props.labResultsStore.gotoSlideIndex(n);
    }

    render() {

        let { appStore, labResultsStore } = this.props;

        let menuTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button theme="primary" right>Select Viral</Button>
                </Toolbar>
            )
        }

        let submitTestForDiscount = (item, index) => {
            return (
                <Button right theme="primary"></Button>
            )
        }


        let mobileTemplate = (item, index) => {
            return (
                <Toolbar block key={index}>
                    <Button simple >{item.description}</Button>
                    <Button right iconLocation="right" icon="chevron-right" simple></Button>
                </Toolbar>
            )

            // Submit for discount
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
                                <Layer className="w500px center-width">
                                    <i className="material-icons super-xl mb20">opacity</i>
                                    <h2 className="mb20">Lab results</h2>
                                    <h1 className="mtb20">
                                        Below is a list of recently sent results.
                                        </h1>
                                    <Layer className="text-left">
                                        <Table columns={[{ template: mobileTemplate }]} hidePageSize pageSize={5} overflow dataSource={labResultsStore.list} />
                                        <Toolbar textCenter vertical spacing block size="large" className="mt20 w500px center-width">
                                            <Button onClick={this.goBack.bind(this)} simple icon="chevron-left" block >Go Back</Button>
                                        </Toolbar>
                                    </Layer>
                                </Layer>
                            }
                        </Layer>
                    </Wizard>
                </Layer>
            </Layer>
        )
    }
}