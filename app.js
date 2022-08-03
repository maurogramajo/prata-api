const http = require('http');
const fs = require('fs');
const vgMongo = require('vg-mongo');
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const indexPath = path.join(__dirname, 'public/build');

const app = express();
let db = null;
const server = http.createServer(app);

app.use((req, res, next) => {
  console.info('method: ', req.method);
  console.info('url: ', req.url);
  console.info('headers: ', req.headers);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public/build'));

app.post('/', async (req, res) => {
  console.info(req);
  const {
    prata,
  } = req.query;
  let fecha = Date();
  const inserted = await db.pratas.asyncInsert({ prata, fecha });
  res.writeHead(200);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(indexPath, 'index.html'));
});

const url = 'mongodb://127.0.0.1:27017';
async function initServer() {
  db = await vgMongo(url, 'pratadb');
  const server = http.createServer(app);
  server.listen(3000, () => console.info('ready'));
}

initServer();