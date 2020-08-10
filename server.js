'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const port = 8071;

const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(helmet());
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(helmet.hidePoweredBy({
  setTo: 'PHP 4.2.0'
}));
app.disable('x-powered-by');
app.use(cookieParser());

// Put these statements before you define any routes.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(`${__dirname}`)));
console.log(`${__dirname}`);
app.use('*', (req, res, next) => {
  console.log(`URL: ${req.baseUrl}`);
  next();
});
app.use(cors(corsOptions));
app.options('*', cors());

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/index.html`));
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.status(404);
  res.sendFile(path.resolve(`${__dirname}/index.html`));
});

app.listen(port)
  .on('error', error => {
    // logger.error(error);
    console.log(error);
  })
  .on('listening', () => {
    console.log(`listening on port ${port}`);
    // logger.info(`Express listening on ${port}`);
  });