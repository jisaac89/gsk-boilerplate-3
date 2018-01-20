export interface IPrescribeStore{
    slideIndex: number;
    gotoSlideIndex(n: number) : void;
    gotoFormIndex(n: number) : void;
    selectDrug(drug : any): void;
    selectIssueUnit(issueUnit : any): void;
    selectStartDate(date: Date): void;
    toggleEndDate(): void;
    selectEndDate(date : Date): void;
    toggleRefill(): void;
    selectPatient(patient: any): void;
    gotoPrescribeIndex(index: number): void;
    updateInscription(inscription: string): void;
    confirmPrescription(): void;
    resetPrescriptionForm(): void;
}