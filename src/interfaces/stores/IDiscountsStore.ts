export interface IDiscountsStore {
    slideIndex?: number;
    gotoSlideIndex(n: number): void;
    submitSurvey(): void;
}