import { join } from "https://deno.land/std@0.145.0/path/mod.ts";

// a folder that contains all `fresh` projects
const freshProjectPath = 'C:/Users/nhron/Documents/GitHub/Fresh';

// the name of this new project from the cammand line
// > init newProjectName
const newProjectName = Deno.args[0];
console.info('Deno.args ',Deno.args)
const useTwind = (Deno.args[1] === null) ? '--twind=false' : '--twind=true';
console.log('use twind: ', useTwind)

// the folder that will contain this new project
const newProjectFolder = join(freshProjectPath, newProjectName);

// a deno process that calls `https://fresh.deno.dev` to init a new project
const initProcess = Deno.run({ cwd: freshProjectPath,
    cmd: [
        "deno",
        "run",
        "--allow-all",
        "https://fresh.deno.dev", 
        newProjectName,
        useTwind,
    ]
});

// wait for the process to complete
await initProcess.status();

// move to the newly created folder
Deno.chdir(newProjectFolder)

// create a new `.vscode` folder
await Deno.mkdir('.vscode')

// create/write the `settings.json` file 
await Deno.writeTextFile(
    join(".vscode", "settings.json"),
    `{
    "deno.enable": true,
    "deno.lint": true,
    "deno.unstable": true
}`,
);

// create/write the `tasks.json` file
await Deno.writeTextFile(
    join(".vscode", "tasks.json"),
    `{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Deno Task Start",
            "type": "shell",
            "command": "deno task start",
            "problemMatcher": [
                "$deno"
            ]
        }
    ]
}`,
);

// open this new project in vscode
const startVsCode = Deno.run({
    cmd: [
        "C:/Users/nhron/AppData/Local/Programs/Microsoft VS Code/code.exe",
        ".",
    ]
});

// wait for the process to complete
await startVsCode.status();

// to install this `init` utility locally ...
// make a git repo, then ...
// deno install -A -f -n init https://raw.githubusercontent.com/nhrones/init/master/init.ts

// Usage:
// from any terminal type ...
// > init newProjectName
// VsCode will start in the new project folder