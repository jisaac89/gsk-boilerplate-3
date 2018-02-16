export interface INotifcationStore {
    list?: Array<any>;
    push(message: { title?: string; type?: string }): void;
}