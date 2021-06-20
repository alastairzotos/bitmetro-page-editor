import { createItem, PageItem } from '@bitmetro/cms-common';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useSlotRenderer } from '../../components';

export const SLOT_CLASS = '__slot__';

export class Slot {
    constructor(public id: string, ...items: PageItem[]) {
        this.items = items;
    }
    items: PageItem[];

    render = (): React.ReactNode => {
        const Renderer = useSlotRenderer();

        return <Renderer slot={this} />;
    };

    generateItem = (): PageItem => ({
        ...createItem(SLOT_CLASS),
        children: this.items.map(item => ({
            ...item,
            id: uuidv4()
        }))
    })
}
