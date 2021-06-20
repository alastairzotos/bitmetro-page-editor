import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ContentEditor, ContentPage, createPage } from '../lib';

const App = () => {
    const [content, setContent] = React.useState(createPage());
    const [preview, setPreview] = React.useState(false);

    return (
        <div style={{ height: '100vh' }}>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>

            {
                preview
                    ? <ContentPage content={content} />
                    : <ContentEditor content={content} onChange={setContent} />
            }
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
