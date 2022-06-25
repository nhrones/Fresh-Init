import { join } from "https://deno.land/std@0.145.0/path/mod.ts";

// a folder that contains all `fresh` projects
const freshProjectPath = 'C:/Users/nhron/Documents/GitHub/Fresh';

// the name of this new project from the cammand line
const newProjectName = Deno.args[0];

// the folder that will contain this new project
const newProjectFolder = join(freshProjectPath, newProjectName);

// a deno process that calls `https://fresh.deno.dev` to init new project
const builder = Deno.run({ cwd: freshProjectPath,
    cmd: [
        "deno",
        "run",
        "--allow-all",
        "https://fresh.deno.dev", 
        newProjectName,
        "--twind=false",
    ]
});

// wait for the process to complete
await builder.status();

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

// install this `init` utility locally
// deno install -A -n init https://raw.githubusercontent.com/nhrones/init/master/init.ts

// Usage:
// from any terminal type ...
// > init newProjectName