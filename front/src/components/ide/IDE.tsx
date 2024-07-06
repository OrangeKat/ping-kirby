import JavaEditor from './Editor';
import { useNavigate } from 'react-router-dom';
import { RunButton } from '../scripts/ButtonApi';
import FileSelector from './Open'
import './IDE.css';

function IDE() {
    const navigate = useNavigate();
    return (
        <div className={'IDE'}>
            <div className={'NavigationIDE'}>
                <button id={'BackButtonIDE'} onClick={() => navigate(-1)}>{'<'}</button>
                <div id={'ExecButtons'}>
                    <button id={'RunButtonClosed'} onClick={RunButton}>RUN</button>
                </div>
                <div id="FileExplorer">
                    <FileSelector/>
                </div>
            </div>
            <div className={'EditorIDE'}>
                <div id={'Editor'}><JavaEditor/></div>
                <div id={'Output'}><div id={'OutputText'}></div></div>
            </div>
        </div>
    )
}

export default IDE;