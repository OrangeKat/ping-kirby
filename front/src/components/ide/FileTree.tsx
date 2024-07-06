import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FileTree.css';

interface FileTreeProps {
    onFileSelect: (content: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ onFileSelect }) => {
    const [fileTree, setFileTree] = useState<any>(null);
    const [currentFile, setCurrentFile] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            const project = JSON.parse(localStorage.getItem('Project') || '{}');
            setFileTree(project.FileTree);
            setCurrentFile(project.CurrentFile || null);
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange();

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleClick = (item: any) => {
        if (item.isFile) {
            const project = localStorage.getItem('Project');
            if (project) {
                var json = JSON.parse(project);
                json.ListFile.forEach(file => {
                    var parentPath : string | null = file.parentPath;
                    if (file.name === json.CurrentFile.name && file.isFile && parentPath?.includes(item.parentPath)) {
                        file.content = json.CurrentFile.content;
                    }
                    return file;
                });

                json.ListFile.forEach(file => {
                    var parentPath : string | null = file.parentPath;
                    if (file.name === item.name && file.isFile && parentPath?.includes(item.parentPath)) {
                        localStorage.setItem('CurrentPath', file.parentPath);
                        json.CurrentFile.content = file.content;
                        json.CurrentFile.parentPath = file.parentPath;
                        json.CurrentFile.name = file.name;
                    }
                    return file;
                });
                localStorage.setItem('Project', JSON.stringify(json));
                setCurrentFile(item);
                navigate("/ide/open/");
            }
        }
        else {
            localStorage.setItem("CurrentPath", localStorage.getItem("ProjectPath") + item.parentPath + "/" + item.name);
        }
    };

    const updateFileContent = (node: any, currentFile: any) => {
        if (node.isFile && node.name === currentFile.name && node.parentPath === currentFile.parentPath) {
            return { ...node, content: currentFile.content };
        } else if (node.children) {
            return {
                ...node,
                children: node.children.map((child: any) => updateFileContent(child, currentFile))
            };
        }
        return node;
    };

    const hasGitFolder = (node: any) => {
        if (!node.name) return false;

        if (node.name === '.git') {
            return true;
        }
        return false;
    };

    const renderTree = (node: any) => {
        if (!node.name || node.name.startsWith('.') || node.parentPath.includes('.')) return null;

        if (node.isFile) {
            return (
                <li key={node.path} className={`file ${currentFile?.name === node.name && currentFile?.parentPath === node.parentPath ? 'selected' : ''}`} onClick={() => handleClick(node)}>
                    {node.name}
                </li>
            );
        } else {
            if (hasGitFolder(node)) {
                return null; // Skip rendering this node and its children
            }

            return (
                <li key={node.path} className="folder">
                    <span onClick={() => handleClick(node)}>{node.name}</span>
                    <ul>
                        {node.children && node.children.map((child: any) => renderTree(child))}
                    </ul>
                </li>
            );
        }
    };

    const buildFileTree = (nodes: any[], parentPath: string = '') => {
        const tree = nodes.map(node => {
            const nodePath = `${parentPath}/${node.name}`;
            if (node.isFile) {
                return { ...node, path: nodePath, parentPath };
            } else {
                return { ...node, path: nodePath, parentPath, children: buildFileTree(node.children || [], nodePath) };
            }
        });
        return tree;
    };

    const renderFileTree = (tree: any) => {
        if (!Array.isArray(tree)) return null;

        // Filter out files/folders starting with a dot and sort folders first
        const filteredTree = tree.filter((node: any) => node.name && !node.name.startsWith('.') && !node.parentPath.includes('.')).sort((a: any, b: any) => {
            if (a.isFile === b.isFile) {
                return a.name.localeCompare(b.name);
            }
            return a.isFile ? 1 : -1;
        });

        return (
            <>
                {filteredTree.map((node: any) => renderTree(node))}
            </>
        );
    };

    let treeData = [];
    if (fileTree) {
        treeData = buildFileTree([fileTree]);
    }

    return (
        <div className="file-tree-container">
            <div className="file-tree">
                <ul>
                    {renderFileTree(treeData)}
                </ul>
            </div>
        </div>
    );
};

export default FileTree;
