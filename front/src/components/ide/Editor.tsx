import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

function JavaEditor() {
    const project = JSON.parse(localStorage.getItem('Project'));
    var content = project?.CurrentFile ? project.CurrentFile.content : "// Welcome to Kirby's favorite IDE!";
    const handleEditorChange = (content: string) => {
        const project = JSON.parse(localStorage.getItem('Project') || '{}');
        if (project.CurrentFile) {
            project.CurrentFile.content = content;
            localStorage.setItem('Project', JSON.stringify(project));
        }
        else {
            localStorage.setItem('TempFile', content);
        }
    };

    return (
        <div className={'JavaEditor'}>
            <Editor
                height={'100%'}
                width={'100%'}
                defaultLanguage={'java'}
                value={content}
                options={{ scrollBeyondLastLine: false, fontSize: 16 }}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default JavaEditor;
