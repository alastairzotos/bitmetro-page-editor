import { Dictionary } from '../core';

import { PageItem } from './pageItem';

type PrefabsExclude = 'id' | 'parentId' | 'children';

export type Prefab = Omit<PageItem, PrefabsExclude> & { children?: Prefab[] };
export type Prefabs = Dictionary<Prefab>;
