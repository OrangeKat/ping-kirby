import React, { useState } from 'react';
import JavaEditor from './Editor';
import { useNavigate } from 'react-router-dom';
import { SaveButton } from '../scripts/ButtonApi'
import { MavenClean, MavenCompile, MavenExec, MavenInstall, MavenPackage, MavenTest, MavenTree } from '../scripts/FeatureHandler';
import './IDEMaven.css';

function IDEMaven() {
    const navigate = useNavigate();
    const [outputMessage] = useState<string>('');

    const setOutputTextMessage = (content : string) => {
        var output = document.getElementById("OutputText");
        if (output) {
            output.innerText = "Output: " + content;
        }
    }
    const handleMavenClean = async () => {
        try {
            await MavenClean();
            setOutputTextMessage('Maven clean executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven clean: ${error.message}`);
        }
    };

    const handleMavenCompile = async () => {
        try {
            await MavenCompile();
            setOutputTextMessage('Maven compile executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven compile: ${error.message}`);
        }
    };

    const handleMavenExec = async () => {
        try {
            await MavenExec();
            setOutputTextMessage('Maven exec executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven exec: ${error.message}`);
        }
    };

    const handleMavenInstall = async () => {
        try {
            await MavenInstall();
            setOutputTextMessage('Maven install executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven install: ${error.message}`);
        }
    };

    const handleMavenPackage = async () => {
        try {
            await MavenPackage();
            setOutputTextMessage('Maven package executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven package: ${error.message}`);
        }
    };

    const handleMavenTest = async () => {
        try {
            await MavenTest();
            setOutputTextMessage('Maven test executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven test: ${error.message}`);
        }
    };

    const handleMavenTree = async () => {
        try {
            await MavenTree();
            setOutputTextMessage('Maven tree executed successfully');
        } catch (error) {
            setOutputTextMessage(`Error executing maven tree: ${error.message}`);
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
                <div id={'MavenButtons'}>
                    <button className={'MavenButton'} id={'MavenClean'} onClick={handleMavenClean}>Maven Clean</button>
                    <button className={'MavenButton'} id={'MavenCompile'} onClick={handleMavenCompile}>Maven Compile</button>
                    <button className={'MavenButton'} id={'MavenExec'} onClick={handleMavenExec}>Maven Exec</button>
                    <button className={'MavenButton'} id={'MavenInstall'} onClick={handleMavenInstall}>Maven Install</button>
                    <button className={'MavenButton'} id={'MavenPackage'} onClick={handleMavenPackage}>Maven Package</button>
                    <button className={'MavenButton'} id={'MavenTest'} onClick={handleMavenTest}>Maven Test</button>
                    <button className={'MavenButton'} id={'MavenTree'} onClick={handleMavenTree}>Maven Tree</button>
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
        </div>
    );
}

export default IDEMaven;
