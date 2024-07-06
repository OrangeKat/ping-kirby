// Editor.tsx
import React from 'react';
import './Exercises.css';
import Editor from '@monaco-editor/react';

interface EditorProps {
    codeContent: string;
    onChange: (value: string) => void;
}

const JavaEditor: React.FC<EditorProps> = ({ codeContent, onChange }) => {
    return (
        <div className={'JavaEditor'}>
            <Editor
                height={'100%'}
                width={'100%'}
                defaultLanguage={'java'}
                value={codeContent}
                options={{ scrollBeyondLastLine: false, fontSize: 16, minimap: { enabled: false } }}
                onChange={(value) => onChange(value || '')}
            />
        </div>
    );
};

export default JavaEditor;
