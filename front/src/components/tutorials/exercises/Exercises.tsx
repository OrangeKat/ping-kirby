import React, { useEffect, useState } from 'react';
import JavaEditor from './Editor.tsx';
import HTMLContent from './HTMLContent';
import { useNavigate, useLocation } from 'react-router-dom';
import './Exercises.css';
import { UpdateFile } from '../../scripts/FileManips';
import { MavenTest } from '../../scripts/FeatureHandler';
import { useLessons } from '../LessonState'; // Import the hook

interface Lesson {
    id: number;
    name: string;
    url: string;
    deletable: boolean;
    dirPath: string;
}

const Exercises: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lessons } = useLessons(); // Use the hook to access the lessons array
    const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string>('');
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [exoContent, setExoContent] = useState<string>('');
    const [progressPercentage, setProgressPercentage] = useState<number>(0);
    const [testResults, setTestResults] = useState<string>('');

    const ExoPath: string = "../vite/src/components/tutorials/exercises/KirbyTests/src/main/java/ping/Main.java";
    const TestPath: string = "../vite/src/components/tutorials/exercises/KirbyTests/src/test/java/ping/KirbyTest.java";

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const lessonId = searchParams.get('tuto');
        if (lessonId) {
            const lesson = getLessonById(Number(lessonId));
            setLesson(lesson);
            if (lesson) {
                fetchHtmlContent(`${lesson.dirPath}/tuto.html`);
                initExo(lesson.dirPath);
                initTest(lesson.dirPath);
                localStorage.setItem("ProjectPath", "../vite/src/components/tutorials/exercises/KirbyTests");
            }
        }
    }, [location.search, lessons]);

    const getLessonById = (id: number): Lesson | undefined => {
        return lessons.find(lesson => lesson.id === id);
    };

    const getNextLesson = (id: number): Lesson | undefined => {
        return lessons.find(lesson => lesson.id > id);
    };

    const fetchFileContent = async (path: string) => {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const content = await response.text();
                return content;
            } else {
                console.error('Failed to fetch file content:', response.statusText);
                return "error";
            }
        } catch (error) {
            console.error('Error fetching file content:', error);
            return "error";
        }
    };

    const initTuto = async (path: string): Promise<void> => {
        const tuto = await fetchFileContent(`${path}/tuto.html`);
        setFileContent(tuto);
    }

    const fetchHtmlContent = async (path: string) => {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const content = await response.text();
                setHtmlContent(content);
            } else {
                console.error('Failed to fetch HTML content:', response.statusText);
                setHtmlContent('<p>Failed to load content.</p>');
            }
        } catch (error) {
            console.error('Error fetching HTML content:', error);
            setHtmlContent('<p>Error loading content.</p>');
        }
    };

    const initExo = async (path: string): Promise<void> => {
        const exo = await fetchFileContent(`${path}/exo.java`);
        setExoContent(exo);
        UpdateFile(ExoPath, exo);
    }

    const initTest = async (path: string): Promise<void> => {
        const suite = await fetchFileContent(`${path}/test.java`);
        UpdateFile(TestPath, suite);
    }

    const handleSave = () => {
        UpdateFile(ExoPath, exoContent);
        UpdateFile(`../vite${lesson.dirPath}/exo.java`, exoContent);
        alert('Code saved!');
    };

    const handleRestore = () => {
        const saved = localStorage.getItem('savedCode');
        if (saved) {
            setExoContent(saved);
            alert('Code restored!');
        } else {
            alert('No saved code found!');
        }
    };

    const handleRun = async () => {
        await UpdateFile(ExoPath, exoContent);
        await UpdateFile(`../vite${lesson.dirPath}/exo.java`, exoContent);
        const result = await MavenTest();
        const output = result.success.output;

        // Parse the test results from the output
        const testResults = parseTestResults(output);

        const totalTests = testResults.testsRun;
        const successfulTests = totalTests - testResults.failures - testResults.errors - testResults.skipped;
        const progress = (successfulTests / totalTests) * 100;

        setProgressPercentage(progress);

        let resultString = `
Tests Run: ${testResults.testsRun}
Failures: ${testResults.failures}
Errors: ${testResults.errors}
Skipped: ${testResults.skipped}
`;
        if (result.success.isSuccess) {
            resultString += `\n Well done!`;
        }

        setTestResults(resultString);
    };

    const parseTestResults = (output: string) => {
        const result = {
            testsRun: 0,
            failures: 0,
            errors: 0,
            skipped: 0
        };

        const testsRunMatch = output.match(/Tests run: (\d+)/);
        const failuresMatch = output.match(/Failures: (\d+)/);
        const errorsMatch = output.match(/Errors: (\d+)/);
        const skippedMatch = output.match(/Skipped: (\d+)/);

        if (testsRunMatch) {
            result.testsRun = parseInt(testsRunMatch[1]);
        }
        if (failuresMatch) {
            result.failures = parseInt(failuresMatch[1]);
        }
        if (errorsMatch) {
            result.errors = parseInt(errorsMatch[1]);
        }
        if (skippedMatch) {
            result.skipped = parseInt(skippedMatch[1]);
        }

        return result;
    };

    return (
        <div className={'Tuto'}>
            <div className={'NavigationTutorial'}>
                <button id={'HomeButton'} onClick={() => navigate('../tutorials')}>{'HOME'}</button>
                <button id={'NextButton'} onClick={() => navigate(`/tutorials/exercises?tuto=${getNextLesson(lesson.id).id}`)}>{'>'}</button>
                <div id={'Tutorial'}>
                    <div id={'TutorialName'}>{lesson?.name || 'Tutorial'}</div>
                    <div id={'TutorialText'}>
                        <HTMLContent htmlContent={htmlContent} />
                    </div>
                </div>
            </div>
            <div className={'EditorTuto'}>
                <div id={'ProgressBarContainer'}>
                    <div id={'ProgressBar'}>
                        <div id={'ProgressBarInner'} style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <div id={'EditorTuto'}>
                    <JavaEditor codeContent={exoContent} onChange={setExoContent} />
                </div>
                <div id={'Test'}>{testResults}</div>
            </div>
            <button id={'SaveTuto'} onClick={handleSave}>Save</button>
            <button id={'RestoreEditor'} onClick={handleRestore}>RESTORE</button>
            <button id={'RunTest'} onClick={handleRun}>RUN</button>
        </div>
    );
};

export default Exercises;
