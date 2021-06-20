import { Dictionary } from '../../core';
import { PageItem } from '../pageItem';

const traverseList = (items: PageItem[], visitor: (item: PageItem) => void) =>
    items.forEach(item => {
        traverseList(item.children || [], visitor);

        if (item.slots) {
            traverseSlots(item.slots, visitor);
        }

        visitor(item);
    });

const traverseSlots = (slots: Dictionary<PageItem>, visitor: (item: PageItem) => void) => {
    for (const key of Object.keys(slots)) {
        const item = slots[key];

        traverseList(item.children || [], visitor);

        if (item.slots) {
            traverseSlots(item.slots, visitor);
        }

        visitor(item);
    }
};

export const traverse = (item: PageItem, visitor: (item: PageItem) => void) => {
    traverseList(item.children || [], visitor);

    if (item.slots) {
        traverseSlots(item.slots, visitor);
    }

    visitor(item);
};

export type IPathSeqType = 'child' | 'slot' | 'self';
export type IPathSeq = { type: IPathSeqType, index?: string | number; };

export const getPathToId = (item: PageItem, id: string, curPath: IPathSeq[] = []): IPathSeq[] => {
    if (id === item.id) {
        return [...curPath, { type: 'self' }];
    }

    if (item.children) {
        let index = 0;
        for (const child of item.children) {
            const path = getPathToId(child, id, [
                ...curPath,
                { type: 'child', index }
            ]);

            if (path) {
                return path;
            }

            index++;
        }
    }

    if (!!item.slots) {
        for (const key of Object.keys(item.slots)) {
            const path = getPathToId(item.slots[key], id, [
                ...curPath,
                { type: 'slot', index: key }
            ]);

            if (path) {
                return path;
            }
        }
    }

    return null;
};

const removeAtPath = (item: PageItem, path: IPathSeq[], id: string): PageItem => {
    if (path.length === 2 && path[0].type === 'child' && item.children) {
        return {
            ...item,
            children: item.children.filter(child => child.id !== id)
        } as PageItem;
    }

    if (path[0].type === 'child' && item.children) {
        return {
            ...item,
            children: item.children.map((child, index) => (
                index === path[0].index
                    ? removeAtPath(child, path.slice(1), id)
                    : child
            ))
        } as PageItem;
    }

    if (path[0].type === 'slot') {
        return {
            ...item,
            slots: {
                ...item.slots,
                [path[0].index]: removeAtPath(item.slots[path[0].index], path.slice(1), id)
            }
        };
    }

    return item;
};

const modifyAtPath = (item: PageItem, path: IPathSeq[], change: (i: PageItem) => PageItem): PageItem => {

    if (path[0].type === 'self') {
        return change(item);
    }

    if (path[0].type === 'child' && item.children) {
        return {
            ...item,
            children: item.children.map((child, index) => (
                index === path[0].index
                    ? modifyAtPath(child, path.slice(1), change)
                    : child
            ))
        } as PageItem;
    }

    if (path[0].type === 'slot') {
        return {
            ...item,
            slots: {
                ...item.slots,
                [path[0].index]: modifyAtPath(item.slots[path[0].index], path.slice(1), change)
            }
        };
    }

    return item;
};

export const modifyItemById = (container: PageItem, id: string, change: (i: PageItem) => PageItem) =>
    modifyAtPath(
        container,
        getPathToId(container, id),
        change
    ) as PageItem;

export const addChild = (container: PageItem, parentId: string, item: PageItem, index = -1) =>
    modifyItemById(container, parentId, (i: PageItem) => ({
        ...i,
        children: index === -1
            ? [...i.children, { ...item, parentId }]
            : [
                ...i.children.slice(0, index),
                { ...item, parentId },
                ...i.children.slice(index)
            ]
    } as PageItem));

export const addChildren = (container: PageItem, parentId: string, items: PageItem[], index = -1) =>
    modifyItemById(container, parentId, (i: PageItem) => ({
        ...i,
        children: index === -1
            ? [...i.children, ...items.map(item => ({ ...item, parentId }))]
            : [
                ...i.children.slice(0, index),
                ...items.map(item => ({ ...item, parentId })),
                ...i.children.slice(index)
            ]
    } as PageItem));

export const removeChild = (container: PageItem, id: string) => {
    const path = getPathToId(container, id);

    if (path) {
        return removeAtPath(container, path, id) as PageItem;
    }

    return container;
};

// const modifyItemsInList = (items: PageItem[], map: (item: PageItem) => PageItem): PageItem[] =>
//     items.map(i =>
//         isContainer(i)
//             ? map({
//                 ...i,
//                 children: modifyItemsInList(i.children, map)
//             } as PageContainer)
//             : map(i)
//     );

// export const modifyItems = (container: PageContainer, map: (item: PageItem) => PageItem): PageContainer => ({
//     ...container,
//     children: modifyItemsInList(container.children, map)
// });

const modifyItemsInList = (items: PageItem[], map: (item: PageItem) => PageItem): PageItem[] =>
    items.map(i => {
        if (i.children) {
            i = map({
                ...i,
                children: modifyItemsInList(i.children, map)
            } as PageItem);
        }

        if (i.slots) {
            i = map({
                ...i,
                slots: modifyItemsInSlots(i.slots, map)
            });
        }

        return map(i);
    });

const modifyItemsInSlots = (slots: Dictionary<PageItem>, map: (item: PageItem) => PageItem): Dictionary<PageItem> =>
    Object.keys(slots).reduce((acc, cur) => {
        let slot = slots[cur];

        if (slot.children) {
            slot = map({
                ...slot,
                children: modifyItemsInList(slot.children, map)
            } as PageItem);
        }

        if (slot.slots) {
            slot = map({
                ...slot,
                slots: modifyItemsInSlots(slot.slots, map)
            });
        }

        return {
            ...acc,
            [cur]: map(slot)
        };
    }, {});

export const modifyItems = (container: PageItem, map: (item: PageItem) => PageItem): PageItem =>
    map(({
        ...container,
        children: modifyItemsInList(container.children || [], map),
        slots: container.slots ? modifyItemsInSlots(container.slots, map) : null
    } as PageItem)) as PageItem;

const getAllChildrenInList = (
    items: PageItem[],
    predicate: (item: PageItem) => boolean = () => true
): PageItem[] => {
    const newItems = items.filter(predicate);

    for (const item of newItems) {
        if (item.children) {
            newItems.push(...getAllChildrenInList(item.children, predicate));
        }

        if (item.slots) {
            newItems.push(...getAllChildrenInSlots(item.slots, predicate));
        }
    }

    return newItems;
};

const getAllChildrenInSlots = (
    slots: Dictionary<PageItem>,
    predicate: (item: PageItem) => boolean = () => true
): PageItem[] =>
    getAllChildrenInList(
        Object.keys(slots).map(key => slots[key]),
        predicate
    );

export const getAllChildren = (
    container: PageItem,
    predicate: (item: PageItem) => boolean = () => true,
    includeSelf: boolean = false
): PageItem[] =>
    [
        includeSelf ? container : null,
        ...getAllChildrenInList(container.children || [], predicate),
        ...(container.slots ? getAllChildrenInSlots(container.slots, predicate) : [])
    ].filter(item => !!item);
