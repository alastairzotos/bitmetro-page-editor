import { ThemeItem } from '../../../theme';

import { RichText, RichTextProps } from './RichText';

export const richTextItem = new ThemeItem<RichTextProps>('RichText', {
    useInlineSettings: true,

    defaultProps: { content: 'Rich text' },

    Component: RichText,
    Settings: undefined
});
