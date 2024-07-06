import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveButton, RunButton } from '../scripts/ButtonApi';
import { CreateFile, CreateFolder } from '../scripts/FileManips'; // Import CreateFile and CreateFolder functions
import JavaEditor from './Editor';
import FileTree from './FileTree';
import './IDEOpen.css';

function updateFileTree(node, currentPath, newFile) {
    if (node.isFile) return;
    if (node.parentPath + "/" + node.name === currentPath) {
        node.children.push(newFile);
    } else {
        node.children.forEach(child => updateFileTree(child, currentPath, newFile));
    }
}

function IDEOpen() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [itemType, setItemType] = useState<'file' | 'folder' | null>(null);

    const openModal = (type: 'file' | 'folder') => {
        setItemType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFileName('');
        setItemType(null);
    };

    const handleAddItem = async () => {
        const currentPath = localStorage.getItem('CurrentPath') || '';
        if (currentPath && fileName) {
            const itemPath = `${currentPath}/${fileName}`;

            // Create the file or folder on the backend
            if (itemType === 'file') {
                await CreateFile(itemPath);
            } else if (itemType === 'folder') {
                await CreateFolder(itemPath);
            }

            // Update the Project JSON in localStorage
            const project = JSON.parse(localStorage.getItem('Project') || '{}');
            
            const newItem = {
                children: itemType === 'folder' ? [] : undefined,
                content: '',
                isFile: itemType === 'file',
                name: fileName,
                parentPath: currentPath
            };

            updateFileTree(project.FileTree, currentPath, newItem);

            project.ListFile.push(newItem);
            localStorage.setItem('Project', JSON.stringify(project));
            window.dispatchEvent(new Event('storage'));

            closeModal();
        }
    };

    return (
        <div className={'IDE'}>
            <div className={'NavigationIDE'}>
                <button id={'BackButtonIDE'} onClick={() => navigate('/')}>{'<'}</button>
                <div id={'ExecButtons'}>
                    <button id={'GitButton'} onClick={() => navigate('/ide/open/git')}>GIT</button>
                    <button id={'MavenButton'} onClick={() => navigate('/ide/open/maven')}>MVN</button>
                    <button id={'RunButton'} onClick={RunButton}>RUN</button>
                </div>
                <div id={'FileExplorerOpen'}>
                    <div id={'AddContainer'}>
                        <button id={'AddFile'} onClick={() => openModal('file')}>Add File</button>
                        <button id={'AddFolder'} onClick={() => openModal('folder')}>Add Folder</button>
                    </div>
                    <FileTree />
                </div>
            </div>
            <div className={'EditorIDE'}>
                <div id={'Editor'}>
                    <JavaEditor />
                </div>
                <div id={'Output'}>
                    <div id={'OutputText'}></div>
                </div>
            </div>
            <button id={'SaveEditor'} onClick={SaveButton}>Save</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <p>Enter the name of the new {itemType}:</p>
                        <div className="path-input-container">
                            <input
                                type="text"
                                id="item-name-input"
                                placeholder={`Enter ${itemType} name`}
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="path-input"
                            />
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleAddItem} className="modal-btn add-btn">Add</button>
                            <button onClick={closeModal} className="modal-btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IDEOpen;
