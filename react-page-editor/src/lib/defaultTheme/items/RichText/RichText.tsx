import { DefaultItemProps } from '@bitmetro/content-renderer';
import * as React from 'react';

export interface RichTextProps extends DefaultItemProps {
    content: string;
};

export const RichText: React.FC<RichTextProps> = ({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: content }} />
)
