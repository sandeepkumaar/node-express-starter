import  express from 'express'
import bodyParser from 'body-parser'

import _errorToJson from 'error-to-json';
const errorToJson = _errorToJson.default; // bug on the pacakge. raised issue

import createLogger  from './logger/index.js'
import httpLogger from './logger/http-logger-middleware.js'


const app = express();

app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));

// logger
const log = createLogger('main');
app.use(httpLogger(log));


app.get('/version', function(req, res, next) {
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

