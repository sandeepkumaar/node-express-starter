const bunyan = require("bunyan");

// substitute with uuid package
const uuid = (function uuid() {
  let count = 0;
  return function() { return count++; }
})();

const reqLog = bunyan.createLogger({
  name: "reqLog",
  serializers: {
    req: function reqSerializer(req) {
      // check for null/undefined and unexpected type 
      if (!req || !req.connection) return req;
      return {
        url: req.url,
        method: req.method,
        protocol: req.protocol,
        requestId: req.requestId,

        // In case there's a proxy server:
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        headers: req.headers
      };
    },
  }
});
const resLog = bunyan.createLogger({
  name: "resLog",
  serializers: {
    res: function resSerializer(res) {
      // check for null/undefined and unexpected type 
      if (!res || !res.statusCode) return res;
      return {
        statusCode: res.statusCode,
        headers: res._header,
        requestId: res.requestId,
        responseTime: res.responseTime
      };
    }
  }
})
/**
 * Express middleware to log Req, Res object
 * Adds requestId to Req 
 * Adds responseTime to Res 
 * Log the Req and Res
 */
module.exports = function httpLogger(req, res, next) {
  var startTime = new Date();
  req.requestId = uuid(); 

  reqLog.info({req: req});

  res.on('finish', function () {
    res.responseTime = new Date() - startTime;
    res.requestId = req.requestId;
    resLog.info({res: res});
  });

  next();
}

