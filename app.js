const http = require('http');
const fs = require('fs');

function getFile(url, res) {
  let file = '';
  if (url === '/') file = '/index.html';
  return fs.readFile(`./public${file}`, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(`no encontre lo que buscas: ${url}`);
    }
    res.end(data);
  });
}

const callback = (req, res) => {
  getFile(req.url, res);
};

const server = http.createServer(callback);

server.listen(3000,() => console.info('ready'));