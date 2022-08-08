const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const up = require('universal-pattern');

const indexPath = path.join(__dirname, 'public/build');

const app = express();
let db = null;
const server = http.createServer(app);
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public/build'));

up(app, {
  swagger: {
    baseDoc: process.env.BASEPATH,
    host: `${process.env.HOST}:${process.env.PORT}`,
    folder: path.join(process.cwd(), 'swagger'),
    info: {
      version: '1.0.0',
      title: 'Prata API',
      contact: {
        email: 'mauro.adrian.gramajo@gmail.com',
      },
    }
  },
  compress: true,
  cors: true,
  production: process.env.NODE_ENV === 'production',
  database: {
    uri: process.env.MONGODBURI,
    name: process.env.MONGODBDATABASE,
  },
  routeController: (req, res, next, props) => next(),
})
  .then((upInstance) => server.listen(port, () => console.info(`listen *:${port}`)))
  .catch(err => console.error('Error initializing ', err));

app.post('/core/bills', async (req, res) => {
  console.info(req);
  const {
    amount,
    date
  } = req.query;
  const inserted = await db.bills.asyncInsert({ amount, date });
  res.json(inserted);
});