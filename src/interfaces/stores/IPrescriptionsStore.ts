import { IPrescription } from "../data/IPrescription";

export interface IPrescriptionsStore{
    slideIndex: number;
    gotoSlideIndex(n: number) : void;
    selectPrescription(prescription: IPrescription): void;
    list : Array<any>;
    selectedPrescription: IPrescription;
} 