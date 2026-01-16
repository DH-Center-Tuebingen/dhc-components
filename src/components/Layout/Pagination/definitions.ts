export interface PaginationObject {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    to: number;
}

export interface PaginationProps {
    data: PaginationObject;
    displayCount?: number; // number of pages to display on each side of the current page
    hideCurrentPage?: boolean;
    hideNavigation?: boolean;
    hideMetadata?: boolean;
}