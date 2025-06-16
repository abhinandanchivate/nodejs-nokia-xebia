//console.log("Hello, World!");
// predefined package  : fs path http, process os
// fs : to perfrom the file ops
// path : to get the path of the file / directory
// ECMA script  ES for our es stnds.

import fs from "fs"; // import the fs module
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// fs module is used to perform file operations
const __filename = fileURLToPath(import.meta.url);
// take ur
const __dirname = dirname(__filename);
const fielPath = path.join(__dirname, "assests.json");
// is really existing ? ==> No.
// check the existance
if (fs.existsSync(fielPath)) {
  console.log("File is existing");
} else {
  console.log("File does not existing");
  // create the file
  fs.writeFileSync(
    fielPath,
    JSON.stringify({ name: "John", age: 30, city: "New York" }, null, 2),
    "utf-8"
  );
  // fielpath : location for our file
  // JSON.stringify : convert the object to string
  // { name: "John", age: 30, city: "New York" } : object to be written
  // null : replacer function (not used here)
  // 2 : number of spaces to use for indentation
}
