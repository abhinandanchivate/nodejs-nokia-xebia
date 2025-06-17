import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsFile = path.join(__dirname, "./assets/telecomAssets.json");
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const data = fs.readFileSync(assetsFile, "utf-8");
    const json = JSON.parse(data);
    console.log(Array.isArray(json.assets));
    if (Array.isArray(json.assets) && json.assets.length === 0) {
      res.writeHead(204, { "Content-Type": "text/plain" });
      res.end(); // 204 No Content
      return;
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data); // send data to client
    }
  } else if (req.method === "POST") {
    // assetId, assetName, assetType, assetValue, assetLocation
    let body = "";
    // data ==> request body .
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      try {
        const newAsset = JSON.parse(body);
        console.log(newAsset);
        // json content from the client we recived in terms of string
        // parse then string to json object
        // sample postman data
        // {
        //   "assetId": "123",
        //   "assetName": "Router",
        //   "assetType": "Network",
        //   "assetValue": "1000",
        //   "assetLocation": "USA"
        // }
        console.log(
          "status",
          !newAsset ||
            typeof newAsset !== "object" ||
            !newAsset.assetId ||
            !newAsset.assetName ||
            !newAsset.assetType ||
            !newAsset.assetValue ||
            !newAsset.assetLocation
        );
        if (
          !newAsset ||
          typeof newAsset !== "object" ||
          !newAsset.assetId ||
          !newAsset.assetName ||
          !newAsset.assetType ||
          !newAsset.assetValue ||
          !newAsset.assetLocation
        ) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing required fields");
          return;
        }
        // Read existing data
        const fileData = fs.readFileSync(assetsFile, "utf-8");
        const json = JSON.parse(fileData);
        json.assets.push(newAsset);

        // Save updated list
        fs.writeFileSync(assetsFile, JSON.stringify(json, null, 2));

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Data added successfully", newAsset })
        );
        // res.writeHead(201, { "Content-Type": "application/json" });
        // console.log("newAsset", newAsset);
        // res.end(
        //   JSON.stringify({ message: "data added successfully", newAsset })
        //   // {message : '', newAssets: newAsset}
        // ); // send the new asset back to the client
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid JSON format" + error);
        return;
      }
    });
  }
  // res : response object ==> we can send data to client using this object
  // req : request object ==> we can get data from client using this object
  // writeHead ==> httpStatus(meta data) : , Content-Type(meta data):
  // account  acc
  // microorganism m-o
  // http protocol
  else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  } // end the response and send data to client
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
}); // listen on port 3000 port number which is used for comm.
