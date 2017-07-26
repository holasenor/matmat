const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const bunyan = require('bunyan');
// const router = require('./routes/router');
const path = require('path');
// const cors = require('cors');
// const Promise = require('bluebird');
const fs = require('fs');

var app = new express();

app.use(express.static('public'));

app.use(bodyParser.json({type: '*/*'}));

// router(app);

app.get('*', function (req, res) {
  let indexPage = fs.readFileSync('index.html');
  res.send(String(indexPage));
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
