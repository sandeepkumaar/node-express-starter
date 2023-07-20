import express from "express";
import bodyParser from "body-parser";

import errorToJson from "@stdlib/error-to-json";

import { logger, httpLogMiddleware } from "./logger.js";
import { contextProvider, proxyWithContext } from "./async-context.js";

global.log = proxyWithContext(logger, "log");
const log = global.log;

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// logger
app.use(httpLogMiddleware);
// set the log, txnId for each request
app.use(function (req, _res, next) {
  const store = {
    log: req.log,
    txnId: req.txnId,
  };
  return contextProvider(store, next);
});

app.get("/version", function (req, res, next) {
  log.info("contextual log");
  throw new Error("hi");
  return res.json({
    name: "sandeep",
  });
});

/**
 * @type {import('express').ErrorRequestHandler}
 */
const errorHandler = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let log = req.log || console;
  // decorate error
  err.txnId = req.txnId;
  err.statusCode = err.statusCode || 500;
  log.error(err);
  res.status(err.statusCode).json({
    ...errorToJson(err),
  });
  return;
};
app.use(errorHandler);

export default app;
