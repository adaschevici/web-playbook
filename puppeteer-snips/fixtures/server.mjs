import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define the port to run the server on
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Serve the index.html file
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "shadow-dom.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

// Listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
