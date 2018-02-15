import { IPrescription } from "../data/IPrescription";

export interface IPrescriptionsStore{
    slideIndex: number;
    gotoSlideIndex(n: number) : void;
    selectPrescription(prescription: IPrescription): void;
    prescriptions : IPrescription[];
    selectedPrescription: IPrescription;
    loading?: boolean;
    selectPrescriptionById(id?: string | number) : void;
    setPrescriptionId(id?: string | number) : any;
    initialized?: boolean;
} 