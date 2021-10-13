# Node.js

- Runtime Environment for executing javascript outside of browser.
- Built on Chrome's V8 javascript Engine
- In 2009, Ryan Dahl rewrite v8 engine using c++ called Node.exe
- Node is not a programming language or a framework

## Used for

- Highly-scalable, data-intensive and real-time apps

## Node Architecture

```
JS CODE ----> JS ENGINE ----> MACHINE CODE

edge - Chakra
Firefox - SpiderMonkey
Chrome - v8
```

## How Node works?

- Node.js is non-blocking asynchronous (single threaded)

## Good for <sup>[ref](https://stackoverflow.com/questions/61421370/what-is-the-meaning-of-i-o-intensive-in-node-js)</sup>

- Node.js is ideal for I/O-intensive apps. Node.js performs best when your application is not CPU intensive and instead spends most of its time doing I/O (input/output) tasks such as reading/writing to a database, read/writing from files, reading/sending network data and so on.

Web server's primary job is responding to http requests which are usually requests for data, most web servers spend most of their time fetching things, reading and writing things and sending things which are all I/O tasks. In the node.js design, all these I/O tasks happen asynchronously in a non-blocking fashion and they use events to signal when those operations complete. This is where the phrase "event-driven design" comes from when describing node.js. It so happens that this makes node.js very efficient at handling things that involve primarily I/O. This is what a simple implementation of node.js does best. And, it generally does it better than a purely threaded server design that devotes an OS thread to every currently in-flight I/O operation (the original design for many server frameworks).

If you do have CPU intensive things (major calculations, image processing, heavy crypto operations, etc...) and you do them very often or they take very long, then you will be best served if you put those tasks in a Worker Thread or in another process and communicate back and forth between the main process in node.js and this worker to get that CPU-intensive work done. It used to be that node.js didn't have Worker Threads which made this task a little more complicated where you often had to use one or more additional processes (either via clustering or additional dedicated processes) in order to handle this CPU-intensive work, but now you can use Worker Threads which can be a bit more convenient.

For example, I have a server task that requires a very heavy amount of crypto (performing a billion crypto operations). If I put that in the main node.js thread, that essentially blocks the event loop so my server can't process other requests while that heavy duty crypto operation is running which would ruin the responsiveness of my server.

But, I was able to move the crypto work to a worker thread (actually to several worker threads) and then can crunch away on the crypto while my main thread stays nice and lively to handle other, unrelated incoming requests in a timely fashion.
