const fs = require("fs");
const path = require("path");

// Read files

const filePath = path.resolve(__dirname, "hello.txt");
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("error message: ", err.message);
  }

  console.log(data);
});

// Write files

const filePath2 = path.resolve(__dirname, "hello2.txt");
const contents = "Nice to meet you!";
fs.appendFile(filePath2, contents, "utf-8", (err) => {
  if (err) {
    console.log("error message: ", err.message);
  }

  console.log("saved");
});
