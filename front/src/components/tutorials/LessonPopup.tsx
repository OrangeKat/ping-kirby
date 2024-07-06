import React, { useState } from 'react';
import './LessonPopup.css';

interface LessonPopupProps {
    onClose: () => void; // Function to close the popup
    onAddLesson: (lesson: { path: string; name: string }) => void;
}

const LessonPopup: React.FC<LessonPopupProps> = ({ onClose, onAddLesson }) => {
    const [path, setPath] = useState('');
    const [name, setName] = useState('');
    const [showHelp, setShowHelp] = useState(false);

    const handleAddLesson = () => {
        if (path.trim() !== '' && name.trim() !== '') {
            onAddLesson({ path, name });
            onClose();
        } else {
            alert('Please enter both path and name.');
        }
    };

    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };

    return (
        <div className="lessonPopup">
            <div className="inputContainer">
                <label>Path:</label>
                <input type="text" value={path} onChange={(e) => setPath(e.target.value)} />
            </div>
            <div className="inputContainer">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="popupButtons">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleAddLesson}>Add</button>
            </div>
            <div className="helpButtonContainer">
                <button className="helpButton" onMouseEnter={toggleHelp} onMouseLeave={toggleHelp}>
                    ?
                </button>
                {showHelp && (
                    <div className="helpText">
                        <p>Path points to a zip file holding the text of the lesson and the exercises</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonPopup;
