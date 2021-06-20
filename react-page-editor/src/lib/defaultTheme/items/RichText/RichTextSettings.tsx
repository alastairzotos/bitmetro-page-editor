import { ItemEditorSettings } from '@bitmetro/content-renderer';
import { makeStyles } from '@material-ui/core';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { RichTextProps } from './RichText';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#ffffff',
        color: theme.palette.getContrastText('#ffffff')
    },
    editor: {
        padding: theme.spacing(1)
    }
}))

export const RichTextSettings: React.FC<ItemEditorSettings<RichTextProps>> = ({
    data,
    onUpdate
}) => {
    const classes = useStyles();

    const contentBlock = htmlToDraft(data.content);

    const [state, setState] = React.useState(
        !!data.content
        ? EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks))
        : EditorState.createEmpty()
    );

    const handleUpdate = (editorState: EditorState) => {
        setState(editorState);

        onUpdate({
            content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    };

    return (
        <Editor
            editorState={state}
            wrapperClassName={classes.root}
            editorClassName={classes.editor}
            onEditorStateChange={handleUpdate}
        />
    );
};
