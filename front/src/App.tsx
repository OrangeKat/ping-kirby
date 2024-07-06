import Home from './components/home/Home.tsx'
import Editor from './components/ide/Editor.tsx'
import IDE from './components/ide/IDE.tsx'
import IDEOpen from './components/ide/IDEOpen.tsx'
import IDEGit from './components/ide/IDEGit.tsx'
import IDEMaven from './components/ide/IDEMaven.tsx'
import Tutorials from './components/tutorials/Tutorials.tsx'
import Exercises from './components/tutorials/exercises/Exercises.tsx'

import { Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/ide" element={<IDE/>}/>
                <Route path="/ide/open" element={<IDEOpen/>}></Route>
                <Route path="/ide/open/git" element={<IDEGit/>}></Route>
                <Route path="/ide/open/maven" element={<IDEMaven/>}></Route>
                <Route path="/tutorials" element={<Tutorials/>}/>
                <Route path="/tutorials/exercises" element={<Exercises/>}/>
            </Routes>
        </>
    )
}

export default App
