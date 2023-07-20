import fs from "node:fs/promises";
const packageJson = JSON.parse(await fs.readFile("package.json", "utf-8"));
import createLogger from "../logger/index.js";
import { v4 as uuid } from "uuid";

export const logger = createLogger(packageJson.name);
/**
 * @type {import('express').RequestHandler}
 */
export function httpLogMiddleware(req, res, next) {
  let txnId = uuid();
  let httpLog = logger.child({
    txnId,
    // other fields that need to be printed on all logs
  });
  req.txnId = txnId;
  res.txnId = txnId;
  res.set({ "X-Request-ID": txnId });
  req.log = httpLog;

  const startTime = Date.now();
  httpLog.info({ req: req });
  res.on("finish", function () {
    res.responseTime = Date.now() - startTime;
    httpLog.info({ res: res });
  });
  return next();
}
