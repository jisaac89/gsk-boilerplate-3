export interface IAppStore{
    nightmode : boolean;
    mobile : boolean;
    menu : boolean;
    loading : boolean;
    token: string;
    toggleAuth(): void;
    toggleMenu(): void;
    auth?: boolean;
    initializeApp(): void;
}