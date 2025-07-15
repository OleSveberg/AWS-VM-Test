const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method == "GET") {
    if (req.url == "/") {
      const filePath = path.join(__dirname, "index.html");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.end("Error loading file "+ filepath);
        }
        else {
          res.writeHead(200, {"Content-Type": "text/html"});
          res.end(data);
        }
      });
      return;
    }
    if (req.url.startsWith("/img/")) {
      const filePath = path.join(__dirname, req.url);
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".svg": "image/svg+xml"
      };
      const contentType = mimeTypes[ext] || "application/octet-stream";
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "text/plain"});
          res.end("Image not found "+ filepath);
        }
        else {
          res.writeHead(200, {"Content-Type": contentType});
          res.end(data);
        }
      });
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});