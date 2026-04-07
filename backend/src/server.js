const http = require("http");
const fs = require("fs");
const path = require("path");

const FRONTEND_ROOT = path.join(__dirname, "..", "..", "frontend");
const port = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent((urlPath || "/").split("?")[0]);
  const requested = cleanPath === "/" ? "/index.html" : cleanPath;
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  return path.join(FRONTEND_ROOT, normalized);
}

function sendFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url);

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(filePath, res);
      return;
    }

    const fallbackPath = path.join(filePath, "index.html");
    fs.stat(fallbackPath, (fallbackErr, fallbackStat) => {
      if (!fallbackErr && fallbackStat.isFile()) {
        sendFile(fallbackPath, res);
        return;
      }

      sendFile(path.join(FRONTEND_ROOT, "index.html"), res);
    });
  });
});

server.listen(port, () => {
  console.log(`Ved Vigyan running on http://localhost:${port}`);
});

