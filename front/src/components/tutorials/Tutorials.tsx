// Tutorials.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tutorials.css'
import LessonPopup from './LessonPopup';
import { useLessons } from './LessonState';

const Tutorials: React.FC = () => {
    const navigate = useNavigate();
    const { lessons, setLessons } = useLessons();

    const arrow = '<';

    const goToHome = () => {
        navigate('/');
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const addLesson = (newLesson: { name: string, path: string }) => {
        const newId = lessons.length ? lessons[lessons.length - 1].id + 1 : 1;
        const url = `exercises?tuto=${newId}`;
        const lessonWithId = { id: newId, name: newLesson.name, url, deletable: true, dirPath: newLesson.path };
        const updatedLessons = [...lessons, lessonWithId];
        setLessons(updatedLessons);
    };

    const deleteLesson = (id: number) => {
        const updatedLessons = lessons.filter((lesson) => lesson.id !== id);
        setLessons(updatedLessons);
    };

    const handleLessonClick = (url: string) => {
        navigate(url);
    };

    return (
        <div className={'container'}>
            <button id={'homeButton'} onClick={goToHome}>{arrow}</button>
            <ul className={'lessonGrid'}>
                {lessons.map((lesson) => (
                    <li key={lesson.id} className={'lessonItem'}>
                        <button className={'lesson'} onClick={() => handleLessonClick(lesson.url)}>
                            {lesson.name}
                            {lesson.deletable && (
                                <button className={'deleteButton'} onClick={(e) => {
                                    e.stopPropagation(); // Prevent the lesson button's onClick from firing
                                    deleteLesson(lesson.id);
                                }}>
                                    Delete
                                </button>
                            )}
                        </button>
                    </li>
                ))}
                <li id={'addbuttoncontainer'} className={'lessonItem'}>
                    <button className={'addLesson'} onClick={togglePopup}>+</button>
                </li>
            </ul>
            {showPopup && (
                <LessonPopup onClose={closePopup} onAddLesson={addLesson} />
            )}
        </div>
    );
};

export default Tutorials;
