import { ThemeItem } from '@bitmetro/content-renderer';
import { RichText, RichTextProps } from '@bitmetro/content-renderer/dist/defaultTheme/items/RichText/RichText';

import { RichTextSettings } from './RichTextSettings';

export const richTextItem = new ThemeItem<RichTextProps>('RichText', {
    useInlineSettings: true,

    defaultProps: { content: 'Rich Text' },

    Component: RichText,
    Settings: RichTextSettings
});
