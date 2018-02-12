import {observable, computed, autorun, action} from 'mobx';

export class AuthorizePrescriptionStore {

    @observable slideIndex : number = 0;
    @observable findEntity : string = '';

    @action gotoSlideIndex(n: number) {
        this.slideIndex = n;
    }

    setFindEntity(entiryEmailOrId : string){
        this.findEntity = entiryEmailOrId;
    }
  
}

export const authorizePrescriptionStore = new AuthorizePrescriptionStore();