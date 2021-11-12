# Node.js

- Runtime Environment for executing javascript outside of browser.
- Built on Chrome's V8 javascript Engine
- In 2009, Ryan Dahl rewrite v8 engine using c++ called Node.exe
- Node is not a programming language or a framework

## Short brief about Node.js

<details>
<summary>View contents</summary>

#### Used for

- Highly-scalable, data-intensive and real-time apps

#### Node Architecture

```
JS CODE ----> JS ENGINE ----> MACHINE CODE

edge - Chakra
Firefox - SpiderMonkey
Chrome - v8
```

#### How Node works?

- Node.js is non-blocking asynchronous (single threaded)

#### Good for <sup>[ref](https://stackoverflow.com/questions/61421370/what-is-the-meaning-of-i-o-intensive-in-node-js)</sup>

Node.js is ideal for I/O-intensive apps. Node.js performs best when your application is not CPU intensive and instead spends most of its time doing I/O (input/output) tasks such as reading/writing to a database, read/writing from files, reading/sending network data and so on.

Web server's primary job is responding to http requests which are usually requests for data, most web servers spend most of their time fetching things, reading and writing things and sending things which are all I/O tasks. In the node.js design, all these I/O tasks happen asynchronously in a non-blocking fashion and they use events to signal when those operations complete. This is where the phrase "event-driven design" comes from when describing node.js. It so happens that this makes node.js very efficient at handling things that involve primarily I/O. This is what a simple implementation of node.js does best. And, it generally does it better than a purely threaded server design that devotes an OS thread to every currently in-flight I/O operation (the original design for many server frameworks).

If you do have CPU intensive things (major calculations, image processing, heavy crypto operations, etc...) and you do them very often or they take very long, then you will be best served if you put those tasks in a Worker Thread or in another process and communicate back and forth between the main process in node.js and this worker to get that CPU-intensive work done. It used to be that node.js didn't have Worker Threads which made this task a little more complicated where you often had to use one or more additional processes (either via clustering or additional dedicated processes) in order to handle this CPU-intensive work, but now you can use Worker Threads which can be a bit more convenient.

For example, I have a server task that requires a very heavy amount of crypto (performing a billion crypto operations). If I put that in the main node.js thread, that essentially blocks the event loop so my server can't process other requests while that heavy duty crypto operation is running which would ruin the responsiveness of my server.

But, I was able to move the crypto work to a worker thread (actually to several worker threads) and then can crunch away on the crypto while my main thread stays nice and lively to handle other, unrelated incoming requests in a timely fashion.

</details>

## Node.js CLI

```bash
> node -v # check node version
> node # open node cli
> node app.js # execute node app
```

## Global objects <sup>[ref](https://nodejs.org/api/globals.html)

<details>
<summary>View contents</summary>

These global objects are available in all modules.

- **\_\_dirname**

<details>
<summary>View contents</summary>

The directory name of the current module. This is the same as the path.dirname() of the `__filename`.

Example: running node example.js from /Users/mjr

```js
console.log(__dirname);
// Prints: /Users/mjr
console.log(path.dirname(__filename));
// Prints: /Users/mjr
```

</details>

- **\_\_filename**

<details>
<summary>View contents</summary>

The file name of the current module. This is the current module file's absolute path with symlinks resolved.

Example:

Running node example.js from /Users/mjr

```js
console.log(__filename);
// Prints: /Users/mjr/example.js
console.log(__dirname);
// Prints: /Users/mjr
```

</details>

- **exports**

<details>
<summary>View contents</summary>

The exports variable is available within a module's file-level scope, and is assigned the value of module.exports before the module is evaluated.

```js
module.exports.hello = true; // Exported from require of module
exports = { hello: false }; // Not exported, only available in the module
module.exports = exports = function Constructor() {}; // reassign exports
```

</details>

- **module**

<details>
<summary>View contents</summary>

A reference to the current module. In particular, module.exports is used for defining what a module exports and makes available through require().

</details>

- **require**

<details>
<summary>View contents</summary>

Used to import modules, JSON, and local files. Modules can be imported from node_modules. Local modules and JSON files can be imported using a relative path (e.g. ./, ./foo, ./bar/baz, ../foo) that will be resolved against the directory named by `__dirname` (if defined) or the current working directory.

```js
// Importing a local module with a path relative to the `__dirname` or current
// working directory. (On Windows, this would resolve to .\path\myLocalModule.)
const myLocalModule = require("./path/myLocalModule");

// Importing a JSON file:
const jsonData = require("./path/filename.json");

// Importing a module from node_modules or Node.js built-in module:
const crypto = require("crypto");
```

</details>

- **process**: info about env where the program is being executed.

</details>

## Modules: CommonJS modules

<details>
<summary>View contents</summary>

In the Node.js module system, each file is treated as a separate module.

Example:

`circle.js`

```js
// Local variable
const { PI } = Math;

const area = (r) => PI * r ** 2;
exports.area = area;
exports.circumference = (r) => 2 * PI * r;

// Shareable variable
exports.variable = "hello";
// module.exports = { area, circumference, variable };
```

`app.js`

```js
const circle = require("./circle.js");

// cherry-pick import - possible for both exports and module.exports
// const {area, variable} = require("./circle.js")

console.log(circle.area(4));
console.log(circle.variable);
```

`app.js` loads the module `circle.js` that is in the same directory as `app.js`.

Variables local to the module will be private, because the module is wrapped in a function by Node.js (module wrapper). In this example, the variable PI is private to circle.js.

Different types of module formats:

1. CommonJS(CJS) - `require` and `module.exports`
2. ES Module(ESM) of ES6(ES2015) - `import` and `export`

</details>
