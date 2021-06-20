import { v4 as uuidv4 } from 'uuid';

import { Dictionary } from '../../core';
import { PageItem } from '../pageItem';
import { Prefab } from '../prefab';

export const createItem = (
    itemType: string,
    props?: any,
    children?: PageItem[],
    slots?: Dictionary<PageItem>
): PageItem => ({
    id: uuidv4(),
    itemType,
    parentId: null,
    props,
    children,
    slots
} as PageItem);

export const PREFAB_CLASS = '__prefab__';

export const createPrefab = (...prefabs: Prefab[]): Prefab => ({
    itemType: PREFAB_CLASS,
    children: prefabs
});
