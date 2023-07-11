import  express from 'express'
import bodyParser from 'body-parser'

import _errorToJson from 'error-to-json';
const errorToJson = _errorToJson.default; // bug on the pacakge. raised issue

import { logger, httpLogMiddleware } from './logger.js'
import { contextProvider, proxyWithContext } from './async-context.js';

global.log = proxyWithContext(logger, 'log');


const app = express();

app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));

// logger
app.use(httpLogMiddleware);
// set the log, txnId for each request
app.use(function(req, res, next) {
  const store = {
    log: req.log,
    txnId: req.txnId,
  };
  return contextProvider(store, next);
});


app.get('/version', function(req, res, next) {
  log.info('contextual log');
  throw new Error('hi');
  return res.json({
    name: 'sandeep'
  })
});

app.use(function(err, req, res, next) {
  if(res.headersSent) {
    return next(err);
  };
  let log = req.log;
  // decorate error
  err.txnId = req.txnId;
  err.statusCode = err.statusCode || 500;
  log.error(err);
  return res.status(err.statusCode).json({
    ...errorToJson(err)
  })

})

export default app;

