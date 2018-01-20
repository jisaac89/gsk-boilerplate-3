import {observable, computed, autorun} from 'mobx';

import {appStore, patientStore, prescriptionsStore} from '../stores/_GlobalStore';
import {IPrescribeStore} from '../interfaces/stores/IPrescribeStore';
import BaseStore from './BaseStore';


export class PrescribeStore extends BaseStore implements IPrescribeStore {
    
    @observable slideIndex : number = 0;
    @observable formIndex : number = 0;
    @observable prescribeIndex : number = 0;

    //Inscription Object

    @observable selectedDrug : any = null;
    @observable selectedDose : string = '';
    @observable selectedIssueUnit : any = null;
    @observable selectedStartDate : Date = null;
    @observable selectedEndDate : Date = null;
    @observable hasEndDate : boolean = false;
    @observable refill : boolean = false;
    @observable selectedPatient : string = '';
    @observable selectedInscription : string = '';

    //

    // @observable prescriptions : Prescription[] = [];
    @observable prescriptionComplete: boolean = false;
    @observable selectStartDateOpen : boolean = false;

    test = autorun(()=>{
        if (!!this.selectedDrug && !this.selectedIssueUnit) {
            this.formIndex = 1;
        } else if (!!this.selectedDrug && !!this.selectedIssueUnit){
            this.formIndex = 2;
        } else {
            this.formIndex = 0
        }
    })

    gotoSlideIndex(n: number){
        this.slideIndex = n;
    }

    gotoFormIndex(n: number){
        this.formIndex = n;
    }

    selectDrug(drug){
        this.selectedDrug = drug;
    }

    selectIssueUnit(issueUnit){
        this.selectedIssueUnit = issueUnit;
    }

    selectStartDate(date) {
        this.selectedStartDate = date;
        setTimeout(() => {
            this.selectStartDateOpen = false;         
        }, 300);
    }

    selectEndDate(date) {
        this.selectedEndDate = date;
    }

    toggleEndDate(){
        this.hasEndDate = !this.hasEndDate;
    }

    toggleRefill(){
        this.refill = !this.refill;
    }

    selectPatient(patient) {
        this.selectedPatient = patient;
    }

    gotoPrescribeIndex(index : number) {
        this.prescribeIndex = index;
    }

    updateInscription(inscription){
        this.selectedInscription = inscription;
    }

    confirmPrescription(){

        const self = this;

        this.gotoSlideIndex(3);

        // let prescription = {
        //     drug : this.selectedDrug,
        //     dose: this.selectedDose,
        //     issueUnit: this.selectedIssueUnit,
        //     startDate: this.selectedStartDate.toDateString(),
        //     endDate: this.selectedEndDate.toDateString(),
        //     refill : this.refill,
        //     patient : this.selectedPatient,
        //     inscription : this.selectedInscription
        // }

        // prescriptionsStore.prescriptions.push(prescription);

        setTimeout(() => {
            self.prescriptionComplete = true;
            this.gotoSlideIndex(4);
            this.gotoPrescribeIndex(0);
            this.gotoFormIndex(0);
        }, 8000);

        prescribeStore.add();

        // console.log(prescriptionsStore.prescriptions);

    }

    resetPrescriptionForm(){
        this.selectedDrug = '';
        this.selectedIssueUnit = '';
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.hasEndDate = false;
        this.refill = false;
        this.selectedPatient = '';
        this.selectedInscription = '';
        this.selectedDose = '';
        this.prescribeIndex = 0;
        this.formIndex = 0;
        this.slideIndex = 0;
    }

    toggleStartDateDropdown(){
        this.selectStartDateOpen = !this.selectStartDateOpen;
    }

    selectDose(value: string){
        this.selectedDose = value;
    }

    addObject(){

        let generatedId = Math.random().toString();
        
        let prescription = {
            prescriptionuuid: generatedId, 
            drug : this.selectedDrug,
            dose: this.selectedDose,
            issueUnit: this.selectedIssueUnit,
            creationdate: this.selectedStartDate,
            expirationdate: this.selectedStartDate,
            refill : this.refill,
            owner : this.selectedPatient,
            prescriber: 'Iveth',
            inscription : this.selectedInscription,

            "$class": 'cloud.aperio.viiv.Prescription',
            "description": 'asfasf',
            "creatorreferencenumber": 'asfasf',
            "pharmaitemuuid": '`' + generatedId + '`',
            "refillinstructions": 's',
            "substitutions": 'asfasf',
            "notes": 'asfasf',
            "electronicsignature": 'asfasf'
        }

        return prescription;
    }

    constructor(){
        super('Prescription');
        this.getPrescriptionHistory();
    }

    getPrescriptionHistory(){
        fetch('http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/system/historian').then(function(response) {
            if (response){
                response.json().then((data)=>{
                   console.log(data);
                })
            }
        });
    }
}

export const prescribeStore = new PrescribeStore();