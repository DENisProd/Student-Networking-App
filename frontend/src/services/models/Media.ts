export enum MediaSize {
    SMALL = "SMALL",
    // MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    // XLARGE = "xlarge",
}

export interface Media {
    id: number;
    filename: string;
    size: string;
}