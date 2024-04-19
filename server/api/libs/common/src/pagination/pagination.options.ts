export interface PaginationOptions {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
}