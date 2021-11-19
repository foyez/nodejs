# Node.js

- Runtime Environment for executing javascript outside of browser (Runtime environment gives your program ability to run, access to other resources such as OS, Networking)
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

#### Built-in Modules

<details>
<summary>View contents</summary>

1. **OS**

The os module provides operating system-related utility methods and properties. It can be accessed using:

```js
const os = require("os");
```

`os.userInfo([options])`

Returns information about the currently effective user.

`os.uptime()`

Returns the system uptime in seconds.

`os.type()` - os name
`os.release()` - os release
`os.totalmem()` - os total memory
`os.freemem()` - os free memory

2. **PATH**

The path module provides utilities for working with file and directory paths. It can be accessed using:

```js
const path = require("path");
```

`path.sep` - returns separator, e.g., '/'

`path.basename(path[,ext])`

The path.basename() method returns the last portion of a path, similar to the Unix basename command. Trailing directory separators are ignored.

```js
path.basename("/foo/bar/baz/asdf/quux.html");
// Returns: 'quux.html'

path.basename("/foo/bar/baz/asdf/quux.html", ".html");
// Returns: 'quux'
```

`path.dirname(path)`

The path.dirname() method returns the directory name of a path, similar to the Unix dirname command. Trailing directory separators are ignored.

```js
path.dirname("/foo/bar/baz/asdf/quux");
// Returns: '/foo/bar/baz/asdf'
```

`path.extname(path)`

The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path, an empty string is returned.

```js
path.extname("index.html");
// Returns: '.html'

path.extname("index.coffee.md");
// Returns: '.md'

path.extname("index.");
// Returns: '.'

path.extname("index");
// Returns: ''

path.extname(".index");
// Returns: ''

path.extname(".index.md");
// Returns: '.md'
```

`path.join([...paths])`

The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

```js
path.join("/foo", "bar", "baz/asdf", "quux", "..");
// Returns: '/foo/bar/baz/asdf'

path.join("foo", {}, "bar");
// Throws 'TypeError: Path must be a string. Received {}'
```

`path.resolve([...paths])`

The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

If no path segments are passed, path.resolve() will return the absolute path of the current working directory.

```js
path.resolve("/foo/bar", "./baz");
// Returns: '/foo/bar/baz'

path.resolve("/foo/bar", "/tmp/file/");
// Returns: '/tmp/file'

path.resolve("wwwroot", "static_files/png/", "../gif/image.gif");
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'

path.resolve(__dirname, "content");
// __dirname returns current directory
```

3. **FS** <sup>[ref](https://nodejs.org/api/fs.html)</sup>

The fs module enables interacting with the file system in a way modeled on standard POSIX functions.

To use the promise-based APIs:

```js
import * as fs from "fs/promises";
// const fs = require('fs/promises')
```

To use the callback and sync APIs:

```js
import * as fs from "fs";
// const fs = require('fs')
```

All file system operations have synchronous, callback, and promise-based forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).

Promise example

```js
import { unlink } from "fs/promises";
// const { unlink } = require('fs/promises')

try {
  await unlink("/tmp/hello");
  console.log("successfully deleted /tmp/hello");
} catch (error) {
  console.error("there was an error:", error.message);
}
```

Callback example

```js
import { unlink } from "fs";

unlink("/tmp/hello", (err) => {
  if (err) throw err;
  console.log("successfully deleted /tmp/hello");
});
```

Synchronous example

The synchronous APIs block the Node.js event loop and further JavaScript execution until the operation is complete.

```js
import { unlinkSync } from "fs";

try {
  unlinkSync("/tmp/hello");
  console.log("successfully deleted /tmp/hello");
} catch (err) {
  // handle the error
}
```

4. **HTTP**

</details>

</details>
