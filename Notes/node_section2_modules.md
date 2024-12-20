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
