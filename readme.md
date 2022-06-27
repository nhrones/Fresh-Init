# Init
This is a utility I use to initialize new `Fresh` projects.    
It first calls `Fresh.deno.dev` to init a new fresh project.    
Next, it creates a .vscode folder, adding a settings.json, and a tasks.json file.    
Finally, it opens the new project folder in vscode. 

Usage:
```js
// make a new project named `myProject` (no twind support)
deno run -A init.ts myProject

// make a new project named `myProject` (with twind support)
// the last arg `y` will create the project with `twind` support
deno run -A init.ts myProject y
```