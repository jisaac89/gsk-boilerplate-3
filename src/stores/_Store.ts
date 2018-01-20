import {IStore} from '../interfaces/stores/IStore';

export default abstract class Store implements IStore {
    constructor(protected ref: string) { }
    abstract init() : void;
    abstract update(id : string, listItem: Object) : void;
    abstract del(id : string) : void;
    abstract clearAll() : void;
    abstract add() : void;
} 