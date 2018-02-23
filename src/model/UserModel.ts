import { observable } from 'mobx';
import { IUser } from '../interfaces/data/IUser';

export const User: IUser = observable({
    id: '',
    user_id: '',
    family_Name: '',
    displayName: '',
    email: '',
    group: null,
    companyCode: ''
});