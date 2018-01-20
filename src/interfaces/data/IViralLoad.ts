import {ILabTest} from './ILabTest';

export interface IViralLoad{
    labTestUUID ?: string;
    version ?: number;
    description ?: string;
    creatorReference ?: string;
    owner ?: string
    labtest ?: ILabTest;
}