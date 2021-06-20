import { v4 as uuidv4 } from 'uuid';

import { PageItem } from '../pageItem';
import { Prefab } from '../prefab';

export const hydratePrefab = (prefab: Prefab): PageItem => {
    const id = uuidv4();

    return {
        id,
        itemType: prefab.itemType,
        props: prefab.props,
        children: prefab.children.map(child => ({
            ...hydratePrefab(child),
            parentId: id
        }))
    } as PageItem;
};

export const toPrefabs = (items: PageItem[]): Prefab[] =>
    items.map(item => ({
        itemType: item.itemType,
        props: item.props,
        children: toPrefabs(item.children)
    } as Prefab));
