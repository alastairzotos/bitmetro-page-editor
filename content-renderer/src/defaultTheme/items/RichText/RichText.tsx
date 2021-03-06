import * as React from 'react';

import { DefaultItemProps } from '../../../theme';

export interface RichTextProps extends DefaultItemProps {
    content: string;
};

export const RichText: React.FC<RichTextProps> = ({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: content }} />
)