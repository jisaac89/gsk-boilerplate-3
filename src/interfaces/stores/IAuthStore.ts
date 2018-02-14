import { IUser } from "../data/IUser";

export interface IAuthStore{
    isAuthenticated : boolean;
    authenticate(cb) : void;
    signout(cb) : void;
    toggleRegistering(): void;
    loading: boolean;
    //
    register() : void;
    isRegistered: boolean;
    isRegistering : boolean;
    setCompanyCode(companyCode: string) : void;
    
    //
    user : IUser;
    redirectToReferrer: boolean;
    setPassword(password: string);
    setEmail(email: string); 
    signout(): void;

    isLoggedIn(): any;

}