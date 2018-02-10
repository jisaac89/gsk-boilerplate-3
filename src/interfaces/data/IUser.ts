export interface IUser{
    email: string;
    password: string;
    group: 'doctor' | 'admin' | null;
    companyCode: string;
}