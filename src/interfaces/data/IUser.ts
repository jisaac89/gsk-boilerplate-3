export interface IUser {
    id?: string;
    user_id?: string;
    family_Name?: string;
    displayName?: string;
    email?: string;
    group?: 'doctor' | 'admin' | null;
    companyCode?: string;
}