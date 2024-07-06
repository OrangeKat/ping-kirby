import React, { useState } from 'react';
import { OpenFile, OpenFolder } from '../scripts/FileManips';
import { useNavigate } from 'react-router-dom';
import './Open.css';

const FileSelector: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'file' | 'folder' | null>(null);
    const [filePath, setFilePath] = useState('');
    const navigate = useNavigate();

    const openModal = (type: 'file' | 'folder') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setFilePath('');
    };

    const handleAdd = async () => {
        if (modalType === 'file') {
            const res = await OpenFile(filePath)
            if (!res) {
                alert("File was not found.");
                return;
            }
        } else {
            const res = await OpenFolder(filePath)
            if (!res) {
                alert("Folder was not found.")
                return;
            }
        }
        window.dispatchEvent(new Event('storage')); // Trigger storage event to update components
        closeModal();
        navigate('/ide/open'); // Rediriger vers IDEOpen
    };

    const handleBrowse = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = modalType === 'folder';
        input.onchange = (e: any) => {
            setFilePath(e.target.files[0].path);
        };
        input.click();
    };

    return (
        <div className="file-selector-container">
            <button id="open-file-btn" onClick={() => openModal('file')} className="file-selector-btn">Open File</button>
            <button id="open-folder-btn" onClick={() => openModal('folder')} className="file-selector-btn">Open Folder</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <p>Select the path:</p>
                        <div className="path-input-container">
                            <input
                                type="text"
                                id="path-input"
                                placeholder={`Enter ${modalType === 'file' ? 'file' : 'folder'} path here`}
                                value={filePath}
                                onChange={(e) => setFilePath(e.target.value)}
                                className="path-input"
                            />
                            <button onClick={handleBrowse} className="modal-btn browse-btn">Browse</button>
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleAdd} className="modal-btn add-btn">Add</button>
                            <button onClick={closeModal} className="modal-btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileSelector;
