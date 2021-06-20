import { PAGE_ID } from '../page';
import { PageItem } from '../pageItem';

export const PAGE_CLASS = 'Page';

export const createPage = (children: PageItem[] = []): PageItem => ({
    id: PAGE_ID,
    parentId: null,
    itemType: PAGE_CLASS,
    children
});
