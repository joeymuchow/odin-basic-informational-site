import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

const server = createServer((req, res) => {
  const __dirname = import.meta.dirname;

  let url = req.url;
  if (url !== '/' && url.indexOf('.') < 0) {
    url += '.html';
  }

  // Build filepath
  const filepath = path.join(__dirname, 'routes', url === '/' ? 'index.html' : url);

  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'routes', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html'});
          res.end(content, 'utf8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(content, 'utf8');
    }
  });

});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => `Server running on ${PORT}`);