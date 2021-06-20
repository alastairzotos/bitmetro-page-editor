import { Dictionary } from '../core';

import { Page, ThemeSettings } from './page';

export interface PageTree {
    page: Page;
    children: PageTree[];
}
export interface SiteSettings {
    themeName: string;
    versions: Dictionary<ThemeSettings>;
}

interface PageToTreeOptions<T> {
    populate?: (page: Page) => Partial<T>;
    filter?: (page: Page) => boolean;
}

export const pagesToTree = <T>(
    pages: Page[],
    options?: PageToTreeOptions<T>,
    parent?: Page
): PageTree[] => {
    options = {
        populate: () => ({}),
        filter: () => true,
        ...options
    };

    return pages
        .filter(page => (
            parent
                ? page.navigation.parentPage && page.navigation.parentPage.id === parent.id
                : !page.navigation.parentPage
        ))
        .filter(options.filter)
        .map(page => ({
            page,
            children: pagesToTree(pages, options, page),
            ...options.populate(page)
        }));
};
