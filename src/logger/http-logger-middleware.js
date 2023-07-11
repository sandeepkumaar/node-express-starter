import createLogger from './index.js';
import { v4 as uuid } from 'uuid'

const isLogInstance = function(log) {
  return typeof log.info == 'function'
  && typeof log.debug == 'function'
  && typeof log.child == 'function'
}
export default function httpLoggerMiddleware(instance) {
  let logger = instance;
  if(!isLogInstance(instance)) {
    logger = createLogger(instance);
  };
  return function loggerMiddleware(req, res, next) {
    let txnId = uuid();
    let httpLog = logger.child({
      txnId,
      // other fields that need to be printed on all logs
    });
    req.txnId = txnId;
    res.txnId = txnId;
    res.set({"X-Request-ID": txnId});
    req.log = httpLog;

    const startTime = Date.now();
    httpLog.info({req: req});
    res.on("finish", function() {
      res.responseTime = Date.now() - startTime;
      httpLog.info({res: res});
    })
    return next();
  }
}
