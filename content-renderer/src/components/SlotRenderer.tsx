import * as React from 'react';

import { Slot } from '../theme';

export const SlotRendererContext = React.createContext<React.FC<{ slot: Slot }>>(null);

export const useSlotRenderer = () => React.useContext(SlotRendererContext);
