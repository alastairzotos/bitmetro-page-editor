import { Dictionary } from '../core';

import { PageItem } from './pageItem';
import { PageTree } from './pageTree';

export const PAGE_ID = '__page__';

export interface NavigationInfo {
    parentPage: Page;
    selected: boolean;
}

export type ThemePageData = Dictionary<any>;

export interface Page {
    id: string;
    title: string;
    description: string;
    path: string;
    content: PageItem;
    publishedContent: PageItem;
    published: boolean;
    navigation: NavigationInfo;
    themeData: Dictionary<ThemePageData>;
}

export type ThemeSettings = Dictionary<any>;

export interface StaticPageData extends Page {
    themeName: string;
    themeVersion: ThemeSettings;
    pageTree: PageTree[];
}
