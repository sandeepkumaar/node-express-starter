import packageConfig from '../package.json' assert { type: 'json' };
import createLogger from '../logger/index.js';
import { v4 as uuid } from 'uuid'



export const logger = createLogger(packageConfig.name);

export function httpLogMiddleware(req, res, next) {
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


