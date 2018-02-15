import { observable, computed, autorun, reaction } from 'mobx';

import { appStore } from '../stores/_GlobalStore';

import { notificationStore } from '../stores/NotificationStore';

import { IPrescription } from '../interfaces/data/IPrescription';

import api from '../api';
import Prescriptions from '../components/routes/prescriptions/Prescriptions';

export class PrescriptionsStore {

    @observable initialized: boolean = false;

    @observable prescriptions: IPrescription[] = [];
    @observable slideIndex: number = 0;
    @observable selectedPrescription: IPrescription = {};
    @observable loading: boolean = false;
    @observable prescriptionId = '';

    constructor() {
        const self = this;
        //
        if (!self.initialized) {
            reaction(
                () => self.initialized,
                initialized => {
                    if (initialized && self.prescriptionId) {
                        self.selectPrescriptionById(this.prescriptionId);
                    }
                }
            );
        } else {
            reaction(
                () => this.prescriptionId,
                prescriptionId => {
                    if (prescriptionId) {
                        this.selectPrescriptionById(prescriptionId);
                    }
                }
            );
        }


    }


    init() {
        const context = this;
        this.loading = true;
        return api.Prescriptions.all().then((data) => {
            this.prescriptions = data;
            this.loading = false;
            this.initialized = true;
            this.listenForNewPrescriptions();
        })
    }

    gotoSlideIndex(n: number) {
        this.slideIndex = n;
    }

    selectPrescription(prescription: IPrescription) {
        this.selectedPrescription = prescription;
    }

    listenForNewPrescriptions() {
        setInterval(() => {
            this.pollPrescriptions();
        }, 1000)
    }

    pollPrescriptions() {
        api.Prescriptions.poll(this.prescriptions, (newDataSource: IPrescription[]) => {
            this.prescriptions = newDataSource;
            notificationStore.push('New ' + newDataSource[newDataSource.length - 1].drug + ' added.')
        });
    }

    selectPrescriptionById(prescriptionId?: string | number) {
        let selectedPrescription = this.prescriptions.filter((item) => item.prescriptionuuid === prescriptionId);

        this.selectPrescription(selectedPrescription[0]);
    }

    async setPrescriptionId(id) {
        this.prescriptionId = id;
        return await id;
    }

}

export const prescriptionsStore = new PrescriptionsStore();