import { ThemeItem } from '@bitmetro/content-renderer';

import { createRichTextContent } from './createContent';
import { RichText, RichTextProps } from './RichText';
import { RichTextSettings } from './RichTextSettings';

export const richTextItem = new ThemeItem<RichTextProps>('RichText', {
    useInlineSettings: true,

    defaultProps: createRichTextContent('<p><strong>Rich</strong> text 2</p>'),

    Component: RichText,
    Settings: RichTextSettings
});
