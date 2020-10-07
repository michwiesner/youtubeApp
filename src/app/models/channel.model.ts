export interface ChannelResponse {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: Item[];
}

export interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}

export interface Snippet {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    thumbnails: Thumbnails;
    localized: Localized;
    country: string;
}

export interface Localized {
    title: string;
    description: string;
}

export interface Thumbnails {
    default: Default;
    medium: Default;
    high: Default;
}

export interface Default {
    url: string;
    width: number;
    height: number;
}

export interface PageInfo {
    resultsPerPage: number;
}
