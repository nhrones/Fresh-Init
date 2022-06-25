import { join } from "https://deno.land/std@0.128.0/path/mod.ts";

const freshProjectPath = 'C:/Users/nhron/Documents/GitHub/Fresh'
const newProjectName = Deno.args[0]
const newProjectFolder = join(freshProjectPath, newProjectName);

const p = Deno.run({
    cwd: freshProjectPath,
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
await p.status();

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
const c = Deno.run({
    cmd: [
        "C:/Users/nhron/AppData/Local/Programs/Microsoft VS Code/code.exe",
        ".",
    ]
});

// wait for the process to complete
await c.status();

// deno task start <name>