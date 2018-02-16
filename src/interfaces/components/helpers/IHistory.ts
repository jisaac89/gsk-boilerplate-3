export interface IHistory {
    location: {
        state: {
            from: string
        }
    },
    push: (location: string) => void
}