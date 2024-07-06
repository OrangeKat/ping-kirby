const baseUrl = "http://localhost:8080/api/"

export async function OpenFolder(path : string) {
    const form = { path: path };
    try {
        const res = await fetch(baseUrl + "open/project", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        if (!res.ok){
            return false;
        }

        const json = await res.text();
        localStorage.setItem('Project', json);
        console.log(res);
    }
    catch (error) {
        return false;
    }
    localStorage.setItem('ProjectPath', path);
    localStorage.setItem('CurrentPath', path);
    return true;
}

export async function OpenFile(path : string) {
    const form = { path: path };
    try {
        const res = await fetch(baseUrl + "open/file", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        if (!res.ok){
            return false;
        }

        const json = await res.text();
        localStorage.setItem('Project', json);
        console.log(res);
    }
    catch (error) {
        return false;
    }
    localStorage.setItem('ProjectPath', path);
    localStorage.setItem('CurrentPath', path)
    return true;
}

export async function CreateFolder(path : string) {
    const form = { path: path };
    try {
        const res = await fetch(baseUrl + "create/folder", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        console.log(res);
    }
    catch (error) {
    }
}

export async function CreateFile(path : string) {
    const form = { path: path };
    try {
        const res = await fetch(baseUrl + "create/file", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        console.log(res);
    }
    catch (error) {
    }

}

export async function DeleteFolder(path : string) {
    const form = { path: path };
    try {
        const res = await fetch(baseUrl + "delete/folder", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        console.log(res);
    }
    catch (error) {
    }
}

export async function DeleteFile(path : string) {
    const form = { path: path };
    try {
        const res = await fetch(baseUrl + "delete/file", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        console.log(res);
    }
    catch (error) {
    }
}

export async function UpdateFile(path : string,  content : string) {
    const form = { path: path, content: content };
    try {
        const res = await fetch(baseUrl + "update", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(form)
        });
        console.log(res);
    }
    catch (error) {
    }
}