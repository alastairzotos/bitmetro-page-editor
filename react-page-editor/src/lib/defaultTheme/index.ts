import {
    defaultTheme as defaultThemeCore,
    DefaultThemeSettings,
    EditorTheme,
    extendDefaultTheme as extendDefaultThemeCore,
    extendTheme,
} from '@bitmetro/content-renderer';

import {
    columnItem,
    richTextItem,
    rowItem
} from './items';

export const defaultTheme = extendDefaultThemeCore({
    name: 'Default',
    items: [
        ...defaultThemeCore.items,
        rowItem,
        columnItem,
        richTextItem
    ]
});

// Overwrite 'extendDefaultTheme' to use new one
export const extendDefaultTheme = <T extends DefaultThemeSettings, O extends EditorTheme<T>>(
    newTheme: O
) =>
    extendTheme<DefaultThemeSettings, T, O>(defaultTheme, newTheme);
