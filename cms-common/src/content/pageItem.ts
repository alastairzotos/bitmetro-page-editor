import { Dictionary } from '../core';

export interface PageItem {
    id: string;
    parentId: string | null;
    itemType: string;
    props?: any;
    slots?: Dictionary<PageItem>;
    children?: PageItem[];
}
