const path = require('path');
const { add } = require('./example');

console.log(__filename);
console.log(__dirname);
console.log(path.dirname(__filename));

console.log(add(3, 4)); // 7
