import 'source-map-support/register';
import 'dotenv/config';
const log = require('bunyan').createLogger({name: 'server/server'});
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bunyan = require('bunyan');
const mongoose = require('mongoose');
const router = require('./routes/router');
const path = require('path');
const cors = require('cors');
const mongodb = require('mongodb');
const Promise = require('bluebird');
const serveIndex = require('serve-index');
const fs = require('fs');
Promise.promisifyAll(mongodb);

// DB setup
const adminPanelMongoUri = process.env.ADMIN_PANEL_MONGO_URI; // || 'mongodb://localhost:27017/apnea';
const serverApiMongoUri = process.env.SERVER_API_MONGO_URI; // || 'mongodb://localhost:27017/nea';
mongoose.connect(adminPanelMongoUri);

// App setup
var app = new express();
app.serverApiMongoConnection = mongodb.MongoClient.connectAsync(serverApiMongoUri)
  .then(db => {
    log.info('Connected correctly to Server API mongo.');
    return db;
  })
  .catch(err => {
    log.warn(`
      Error while connecting to Server API mongo!
        message: ${err.message}
        type: ${err.type}
        description: ${err.description}
    `);
    throw err;
  });

app.adminPanelMongoConnection = mongodb.MongoClient.connectAsync(adminPanelMongoUri)
  .then(db => {
    log.info('Connected correctly to Admin Panel mongo.');
    return db;
  })
  .catch(err => {
    log.warn(`
      Error while connectin to Admin Panel mongo!
        message: ${err.message}
        type: ${err.type}
        description: ${err.description}
    `);
    throw err;
  });

app.use(morgan('combined'));
app.use(cors());

// serve static assets normally
app.use(express.static('public'));

app.use(bodyParser.json({type: '*/*'}));

router(app);

app.get('*', function (req, res) {
  log.info('DEPLOY_PATH =', process.env.DEPLOY_PATH);
  log.info('req.url =', req.url);
  let indexPage = fs.readFileSync(path.resolve('templates', 'index.html'));
  let out = String(indexPage).replace('%req_url%', "'" + req.url + "'");
  out = String(out).replace('%deploy_path%', JSON.stringify(process.env.DEPLOY_PATH));
  log.info('out =', out);
  res.send(out);
});

// App start
const port = 3000;
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    log.warn(`
      Error!
        message: ${err.message}
        type: ${err.type}
        description: ${err.description}
    `);
  } else {
    log.info('Server listening on port:', port);
  }
});
