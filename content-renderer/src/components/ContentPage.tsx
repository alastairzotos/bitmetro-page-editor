import { PageItem } from '@bitmetro/cms-common';
import * as React from 'react';
import { ThemeProvider } from 'react-jss';

import { defaultTheme, defaultThemeSettings } from '../defaultTheme';
import { EditorTheme, EditorThemeContext, Slot, usePageItem } from '../theme';

import { RenderItem } from './RenderItem';
import { SlotRendererContext } from './SlotRenderer';

export interface ContentPageProps {
    content: PageItem;
    theme?: EditorTheme<any>;
    Wrapper?: React.FC;
}

const DefaultWrapper: React.FC = ({ children }) =>
    <ThemeProvider theme={defaultThemeSettings}>{children}</ThemeProvider>;

const RenderSlot: React.FC<{ slot: Slot }> = ({ slot }) => {
    const item = usePageItem();

    return (
        <>
            {
                item.slots[slot.id].children.map(child => (
                    <RenderItem key={child.id} item={child} />
                ))
            }
        </>
    );
};

export const ContentPage: React.FC<ContentPageProps> = ({
    content,
    theme = defaultTheme,
    Wrapper = DefaultWrapper
}) => {
    return (
        <EditorThemeContext.Provider value={theme}>
            <Wrapper>
                <SlotRendererContext.Provider value={RenderSlot}>
                    <RenderItem item={content} />
                </SlotRendererContext.Provider>
            </Wrapper>
        </EditorThemeContext.Provider>
    );
};
