const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(`message: Hello World\n`);
    res.write(`url part: ${req.url}\n`);

    const q = url.parse(req.url, true).query;
    const txt = q.year + " " + q.month;
    res.end(`query string: ${txt}`);
  })
  .listen(5000);

// http://localhost:5000/test
// http://localhost:8080/?year=2017&month=July
