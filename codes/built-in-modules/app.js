const { readFileSync, writeFileSync } = require("fs");

const first = readFileSync("./first.txt", "utf8");
const second = readFileSync("./second.txt", "utf8");

writeFileSync("./result-sync.txt", `Here is the result: ${first}, ${second}`);
