const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const clientPath = path.join(__dirname, 'client/build');
const publicPath = path.join(__dirname, 'public');

const app = express();
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

app.use(express.static('public', options));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(clientPath, 'index.html'));
});

server.listen(3000,() => console.info('ready'));