export interface ILabResultsStore {
    list?: Array<any>;
    loading?: boolean;
    slideIndex?: number;
    gotoSlideIndex(n: number): void;
}