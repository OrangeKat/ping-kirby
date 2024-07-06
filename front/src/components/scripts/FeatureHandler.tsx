// src/scripts/FeaturesHandler.tsx
const baseUrl = "http://localhost:8080/api/";

export async function GitAdd() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "ADD", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing git add', error);
        throw error;
    }
}

export async function GitCommit() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "COMMIT", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing git commit', error);
        throw error;
    }
}

export async function GitPush() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "PUSH", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing git push', error);
        throw error;
    }
}

export async function GitPull() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "PULL", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing git pull', error);
        throw error;
    }
}

export async function MavenClean() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "CLEAN", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven clean', error);
        throw error;
    }
}

export async function MavenCompile() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "COMPILE", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven compile', error);
        throw error;
    }
}

export async function MavenExec() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "EXEC", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven exec', error);
        throw error;
    }
}

export async function MavenInstall() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "INSTALL", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven install', error);
        throw error;
    }
}

export async function MavenPackage() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "PACKAGE", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven package', error);
        throw error;
    }
}

export async function MavenTest() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "TEST", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven test', error);
        throw error;
    }
}

export async function MavenTree() {
    const path = localStorage.getItem('ProjectPath');
    const form = { project: path, feature: "TREE", params: [] };
    try {
        const res = await fetch(baseUrl + "execFeature", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const value = await res.json();
        return value;
    } catch (error) {
        console.error('Error executing maven tree', error);
        throw error;
    }
}

export async function AnyExec(path : string, params : string, isFile : boolean) {
    const form = { project: path, feature: "RUN", params: [params] };
    if (isFile) {
        try {
            const res = await fetch(baseUrl + "run/file", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const value = await res.json();
            return value;
        } catch (error) {
            console.error('Error running the code' , error);
            throw error;
        }
    }
    else {
        try {
            const res = await fetch(baseUrl + "run/folder", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const value = await res.json();
            return value;
        } catch (error) {
            console.error('Error running the code' , error);
            throw error;
        }
    }
}