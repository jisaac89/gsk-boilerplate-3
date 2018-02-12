export interface IAuthorizePrescriptionStore{
    slideIndex: number;
    findEntity: string;
    gotoSlideIndex(n:number) : void;
    setFindEntity(s: string) : void;
}