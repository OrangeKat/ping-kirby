import './Home.css'

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <div id={'Home'}>
            <div className={'TitleCard'}>
                <h1>KIRBY</h1>
                <h2>Made by FERT</h2>
            </div>
            <div className={'ButtonContainer'}>
                <button id={'TutorialButton'} onClick={() => navigate('tutorials')}>
                    Tutorials
                </button>
                <button id={'IdeButton'} onClick={() => navigate('ide')}>
                    IDE
                </button>
            </div>
            <div className={'Version'}>
                v1.0
            </div>
        </div>
    )
}

export default Home
