export enum CategoryType {
    CITY = "CITY",
    INTERESTS = "INTERESTS",
    TARGET = "TARGET",
    SKILL = "SKILL",
    CATEGORY = "CATEGORY"
}

export const categoryTypeList: Record<string, string> = {
    [CategoryType.CITY]: "Город",
    [CategoryType.INTERESTS]: "Интерес",
    [CategoryType.TARGET]: "Цель",
    [CategoryType.SKILL]: "Навык",
    [CategoryType.CATEGORY]: "Категория",
}

export interface Category {
    id: number;
    name: string;
    color: string;
    icon: string;

    isCustomize: boolean;

    type: CategoryType;
}