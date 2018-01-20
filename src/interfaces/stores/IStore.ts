export interface IStore{
    init(): void;
    update(id : string, listItem: Object): void;
    del(id): void;
    clearAll(): void;
}