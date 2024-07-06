import { UpdateFile, CreateFile, DeleteFile } from './FileManips.tsx';
import { AnyExec } from "./FeatureHandler.tsx";

export async function SaveButton() {
    const localProject = localStorage.getItem('Project')
    const project = JSON.parse( localProject ? localProject : '' )
    if (project === null || project.CurrentFile === null) {
        return;
    }
    UpdateFile(project.CurrentFile.parentPath + '/' + project.CurrentFile.name, project.CurrentFile.content);
}

export  async  function RunButton(){
    const project = localStorage.getItem("Project");
    var data = null;
    if (project) {
        const json = JSON.parse(project)
        if (json.FileTree) {
                var path = localStorage.getItem("CurrentPath");
                if (!path) {
                    path = '';
                }
                const currFile = json.CurrentFile.parentPath + "/" + json.CurrentFile.name;
                data = await AnyExec(path, currFile, false);
        }
        else {
            const currFile = json.CurrentFile.parentPath + "/" + json.CurrentFile.name;
            data = await AnyExec(currFile, currFile, true);
        }
    }
    else {
        const tempFile = localStorage.getItem("TempFile");
        if (tempFile) {
            const currFile = "/Users/thomas/Dev/ping/Main.java";
            await CreateFile(currFile);
            await UpdateFile(currFile, tempFile);
            data = await AnyExec(currFile, currFile, true);
            await DeleteFile(currFile);
        }
    }
    localStorage.setItem('Output', data.success.output);
    var output = document.getElementById("OutputText");
    if (output) {
        output.innerText = "Output: " + data.success.output;
    }
}