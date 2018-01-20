import {IPrescription} from '../data/IPrescription';

export interface IPrescribeStore{
    slideIndex: number;
    prescriptions: IPrescription[];
    gotoSlideIndex(n: number) : void;
}