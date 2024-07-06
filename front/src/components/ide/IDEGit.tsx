import React, { useState } from 'react';
import JavaEditor from './Editor';
import { useNavigate } from 'react-router-dom';
import { SaveButton } from '../scripts/ButtonApi'
import { GitAdd, GitCommit, GitPush, GitPull } from '../scripts/FeatureHandler';
import './IDEGit.css';

function IDEGit() {
    const navigate = useNavigate();
    const [outputMessage] = useState<string>('');

    const setOutputMessage = (content : string) => {
        var output = document.getElementById("OutputText");
        if (output) {
            output.innerText = "Output: " + content;
        }
    }

    const handleGitAdd = async () => {
        try {
            await GitAdd();
            setOutputMessage('Git add executed successfully');
        } catch (error) {
            setOutputMessage(`Error executing git add: ${error.message}`);
        }
    };

    const handleGitCommit = async () => {
        try {
            await GitCommit();
            setOutputMessage('Git commit executed successfully');
        } catch (error) {
            setOutputMessage(`Error executing git commit: ${error.message}`);
        }
    };

    const handleGitPush = async () => {
        try {
            await GitPush();
            setOutputMessage('Git push executed successfully');
        } catch (error) {
            setOutputMessage(`Error executing git push: ${error.message}`);
        }
    };

    const handleGitPull = async () => {
        try {
            await GitPull();
            setOutputMessage('Git pull executed successfully');
        } catch (error) {
            setOutputMessage(`Error executing git pull: ${error.message}`);
        }
    };

    return (
        <div className={'IDE'}>
            <div className={'NavigationIDE'}>
                <button id={'BackButtonIDE'} onClick={() => navigate('../ide/open')}>{'<'}</button>
                <div id={'ExecButtons'}>
                    <button id={'GitButton'} onClick={() => navigate('../ide/open/git')}>GIT</button>
                    <button id={'MavenButton'} onClick={() => navigate('../ide/open/maven')}>MVN</button>
                    <button id={'RunButton'}>RUN</button>
                </div>
                <div id={'GitButtons'}>
                    <button className={'GitButton'} id={'GitAdd'} onClick={handleGitAdd}>Git add</button>
                    <button className={'GitButton'} id={'GitCommit'} onClick={handleGitCommit}>Git commit</button>
                    <button className={'GitButton'} id={'GitPush'} onClick={handleGitPush}>Git push</button>
                    <button className={'GitButton'} id={'GitPull'} onClick={handleGitPull}>Git pull</button>
                </div>
            </div>
            <div className={'EditorIDE'}>
                <div id={'Editor'}>
                    <JavaEditor/>
                </div>
                <div id={'Output'}>
                    <div id={'OutputText'}></div>
                </div>
            </div>
            <button id={'SaveEditor'} onClick={SaveButton}>Save</button>
        </div>
    );
}

export default IDEGit;
