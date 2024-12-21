## Version 18: Built-in Modules

### Built-in Modules Overview

- Modules provided by Node.js are called **built-in modules** (also known as core modules).
- These modules need to be imported before use.
- Common built-in modules include:
  - `path`
  - `events`
  - `fs`
  - `stream`
  - `http`

---

## Version 19: Path Module

### Overview

The `path` module provides utilities for working with file and directory paths.

### Most Used Methods from the Path Module

1. **`path.join()`**: Joins multiple path segments into a single path.
2. **`path.resolve()`**: Resolves a sequence of paths into an absolute path.
3. **`path.basename()`**: Returns the last portion (file name) of a path.
4. **`path.dirname()`**: Returns the directory name of a path.
5. **`path.extname()`**: Returns the file extension of a path.
6. **`path.parse()`**: Parses a path into an object containing its components.
7. **`path.format()`**: Constructs a path string from an object.
8. **`path.isAbsolute()`**: Checks if a path is absolute.

### Example Code for Path Module Methods

```javascript
const path = require("path");

// path.join()
console.log(path.join("users", "john", "docs", "file.txt"));

// path.resolve()
console.log(path.resolve("users", "john", "docs"));

// path.basename()
console.log(path.basename("/users/john/docs/file.txt"));

// path.dirname()
console.log(path.dirname("/users/john/docs/file.txt"));

// path.extname()
console.log(path.extname("/users/john/docs/file.txt"));

// path.parse()
console.log(path.parse("/users/john/docs/file.txt"));

// path.format()
console.log(path.format({ dir: "/users/john/docs", base: "file.txt" }));

// path.isAbsolute()
console.log(path.isAbsolute("/users/john/docs"));
```

---

## Version 20: Callbacks

### Overview

- In JavaScript, functions are first-class objects.
- Functions can be:
  - Passed as arguments to other functions.
  - Returned as values from other functions.

### Types of Callbacks

1. **Synchronous Callbacks**:
   - Executed immediately.
   - Example: Callbacks used in `sort`, `filter`, and `map`.
2. **Asynchronous Callbacks**:
   - Executed after an asynchronous operation completes.
   - Common in Node.js to prevent blocking execution.
   - Examples: Reading files, fetching data from a database, or handling network requests.

### Examples

#### Synchronous Callback

```javascript
const numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4, 5]
```

#### Asynchronous Callback

```javascript
const fs = require("fs");
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

### Asynchronous Behavior in Browser vs Node.js

- **Browser**: Asynchronous operations often involve UI events and network requests.
- **Node.js**: Focuses on non-blocking I/O operations like file system access and network handling.

---

## Version 21: Event Module

### Overview

- The `events` module allows working with events in Node.js.
- An **event** is an action or occurrence that can trigger a response in an application.
- Using the `events` module, we can:
  - Dispatch custom events.
  - Respond to custom events in a non-blocking way.

### Example Code with Parameters

```javascript
const EventEmitter = require("events");

const myEmitter = new EventEmitter();

// Event listener
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit event
myEmitter.emit("greet", "John");
```

---

## Version 22: Extending from EventEmitter

### Overview

- The `EventEmitter` class can be extended to create custom event-driven modules.

### Example Code

```javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("logged", { message });
  }
}

const myEmitter = new MyEmitter();

// Event listener
myEmitter.on("logged", (data) => {
  console.log("Listener received:", data);
});

// Trigger event
myEmitter.log("This is a custom event.");
```
