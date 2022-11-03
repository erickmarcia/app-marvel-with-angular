export interface MarvelResponse {
    attributionHTML: string;
    attributionText: string;
    code: number;
    copyright: string;
    data: MarvelData;
    etag: string;
    status: string;
     title: string;
}
export interface MarvelData {
    count: number;
    limit: number;
    offset: number;
    results: any[];
    total: number;
    title: string;
}
export interface MarvelCache {
    characters?: MarvelData;
    comics?: MarvelData;
    creators?: MarvelData;
    events?: MarvelData;
    series?: MarvelData;
    stories?: MarvelData;
}
