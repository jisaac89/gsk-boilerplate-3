import { IPrescription } from "../data/IPrescription";

export interface IPrescriptionsStore{
    slideIndex: number;
    gotoSlideIndex(n: number) : void;
    selectPrescription(prescription: IPrescription): void;
    prescriptions : IPrescription[];
    selectedPrescription: IPrescription;
    loading?: boolean;
} 