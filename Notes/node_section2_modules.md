# Node.js Notes

## V8

## Modules

A module is an encapsulated and reusable chunk of code that has its own context in Node.js. Each module is treated as a separate module in Node.js.

### Types of Modules

1. **Local Modules** - Modules that we create in our application.
2. **Built-in Modules** - Modules that Node.js provides to us.
3. **Third-party Modules** - Modules written by other developers that we can use in our application.

## V9

### Local Modules

In Node.js, each file is a module that is isolated by default.

#### CommonJS

CommonJS is a standard that defines how a module should be structured and shared. Node.js adopted CommonJS when it started out, and it is what you will commonly see in codebases.

To load a module into another file, we use the `require` function.

```javascript
// Code example:
const module = require("./filePath");
```

- When `index.js` is executed, the code in the module is also executed.
- If the file we are requiring is a JavaScript file, we can skip specifying the extension, and Node.js will infer it on our behalf.

## V10

### Module Exports

By default, modules are isolated, but we can expose variables and functions of a particular module by using `module.exports`.

- `module.exports` is an empty object that every module contains.
- We can pass variables or functions into that object.

When we import a module from another file using the `require()` function, it will return the variables and functions placed in the `module.exports` object.

```javascript
// Example code:
// math.js
module.exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;

// app.js
const math = require("./math");
console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(5, 3)); // Output: 2
```

## V11

### Module Scope

Each module in Node.js has its own scope. Node.js achieves this using **IIFE** (Immediately Invoked Function Expression).

#### IIFE Example Code

```javascript
(function () {
  const privateVariable = "I am private";
  console.log("This is an IIFE");
})();
```

Before a module's code is executed, Node.js takes the entire code in the file, wraps it into an IIFE function, and executes it. So, each module has its own scope.

This prevents conflicts between variables and functions in different modules and maintains proper encapsulation and reusability.

## V12

### Module Wrapper

Every module in Node.js gets wrapped in an IIFE before being loaded.

- IIFE keeps top-level variables scoped to the module rather than the global object.
- The IIFE that wraps every module contains 5 parameters which are important for the module's functioning.

#### Node.js Module Wrapper

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Module code goes here
});
```

In Node.js, each module has access to 5 global variables:

1. **exports**
2. **require**
3. **module**
4. **\_\_filename** - The absolute path of the file being executed.
5. **\_\_dirname** - The directory name of the file being executed.

```javascript
// Example code:
console.log(__filename); // Outputs the file path
console.log(__dirname); // Outputs the directory path
```

### Debug Mode

You can debug Node.js modules effectively using tools like `console.log` or Node.js debugging tools.

## V13

### Module Caching

In Node.js, once a module is imported, it is cached. This means Node.js remembers the module's exports.

If you import the same module again, Node.js will reuse the cached module instead of re-executing it from scratch.

```javascript
// Example code:
// super-hero.js
console.log("Superhero module loaded");

// app.js
require("./super-hero");
require("./super-hero");

// Output:
// Superhero module loaded (only once)
```

## V14

### Import/Export Patterns

#### Default Exports and Imports using CommonJS

```javascript
// math.js
module.exports = (a, b) => a + b;

// app.js
const add = require("./math");
console.log(add(5, 3)); // Output: 8
```

#### Named Exports and Imports using CommonJS

```javascript
// math.js
module.exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;

// app.js
const { add, subtract } = require("./math");
console.log(add(5, 3)); // Output: 8
console.log(subtract(5, 3)); // Output: 2
```

#### Default Exports and Imports using ESM

```javascript
// math.mjs
export default (a, b) => a + b;

// app.mjs
import add from "./math.mjs";
console.log(add(5, 3)); // Output: 8
```

#### Named Exports and Imports using ESM

```javascript
// math.mjs
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// app.mjs
import { add, subtract } from "./math.mjs";
console.log(add(5, 3)); // Output: 8
console.log(subtract(5, 3)); // Output: 2
```

## V15

### Module.exports vs exports

#### Key Differences

- Node.js returns only `module.exports` from a module.
- `exports` is just a reference to `module.exports`.
- It is better to use `module.exports` directly for clarity and to avoid confusion.

#### Example Code

```javascript
// module.js
exports = { name: "Wrong Export" };
module.exports = { name: "Correct Export" };

// app.js
const module = require("./module");
console.log(module.name); // Output: "Correct Export"
```

## Version 16: ES Modules

### CommonJS

- Each file is treated as a module.
- Variables, functions, classes, etc., are not accessible to other files by default.
- Explicitly specify which part of your code should be exported using `module.exports`.
- To import code into a file, use the `require()` function.

### ES Modules

- At the time Node.js was created, there was no built-in module system in JavaScript.
- Node.js defaulted to CommonJS as its module system.
- As of ES2015, JavaScript has a standardized module system as part of the language itself.
- That module system is called **EcmaScript Modules (ES Modules or ESM)**.

#### Key Points about ES Modules:

- ES modules should have `.mjs` as their file extension.
- **Default export and import**:

  - Example:

    ```javascript
    // Export
    export default function greet() {
      console.log("Hello, World!");
    }

    // Import
    import greet from "./greet.mjs";
    greet();
    ```

- **Named export and import**:

  - Example:

    ```javascript
    // Export
    export const add = (a, b) => a + b;
    export const subtract = (a, b) => a - b;

    // Import
    import { add, subtract } from "./math.mjs";
    console.log(add(5, 3));
    console.log(subtract(5, 3));
    ```

### Summary

- **ES Modules** is the ECMAScript standard for modules.
- It was introduced with **ES2015**.
- Node.js **14 and above** supports ES Modules.
- Differences from CommonJS:
  - Use the `export` keyword instead of `module.exports`.
  - Use `import` to bring in variables or functions.
  - For default exports, any name can be used when importing.
  - For named exports, the import name must match the export name.

---

## Version 17: Importing JSON and Watch Mode

### Importing JSON

- **Using CommonJS**:
  - The `require` function parses JSON data into a JavaScript object.
  - Example:
    ```javascript
    const data = require("./data.json");
    console.log(data);
    ```
- **Using ES Modules**:
  - JSON files can be imported using `import`.
  - Example:
    ```javascript
    import data from "./data.json" assert { type: "json" };
    console.log(data);
    ```

### Watch Mode

- Watch mode allows automatic re-execution of a file whenever changes are detected.
- **Command for CommonJS**:
  ```bash
  node --watch filename
  ```

---

## Section Summary

### What is a Module and What is the Need for Modules?

A **module** is a reusable block of code that can be imported into other files. It helps:

- Organize code into logical components.
- Promote code reusability.
- Avoid variable and function name conflicts.

### Types of Modules in Node.js

1. **Local Modules**:
   - Custom modules created in your project.
2. **Built-in Modules**:
   - Modules provided by Node.js (e.g., `fs`, `http`).
3. **Third-party Modules**:
   - Modules installed via npm (e.g., `express`).

### CommonJS Module Format

- CommonJS is the default module system in Node.js.
- Example:

  ```javascript
  // Export
  module.exports = function greet() {
    console.log("Hello");
  };

  // Import
  const greet = require("./greet");
  greet();
  ```

### Module Wrapper (IIFE)

- Every module in Node.js is wrapped in an Immediately Invoked Function Expression (IIFE).
- Example:
  ```javascript
  (function (exports, require, module, __filename, __dirname) {
    // Module code here
  });
  ```

### Module Caching

- When a module is required for the first time, it is cached.
- Subsequent `require` calls return the cached version unless the cache is cleared.

### Patterns for Importing and Exporting Modules

#### CommonJS

- Export: `module.exports`
- Import: `require()`

#### ES Modules

- Export: `export`, `export default`
- Import: `import`

### Importing JSON Data and Watch Mode

- Import JSON using `require` (CommonJS) or `import` (ESM).
- Use `node --watch filename` to enable watch mode for automatic file execution on changes.
