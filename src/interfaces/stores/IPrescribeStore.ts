import { IPrescription } from "../data/IPrescription";

export interface IPrescribeStore{
    slideIndex: number;
    gotoSlideIndex(n: number) : void;
    selectPrescription(prescription: IPrescription): void;
    list : Array<any>;
    selectedPrescription: IPrescription;
}