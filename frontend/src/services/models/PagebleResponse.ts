interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PageableResponse<T> {
    content: T;

    pageable: Pageable

    last: boolean;
    first: boolean;
    empty: boolean;
    numberOfElements: number;
    sort: any;
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}