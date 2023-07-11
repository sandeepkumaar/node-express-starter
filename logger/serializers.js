import _errorToJson from 'error-to-json';
const errorToJson = _errorToJson.default;

const  getFullStack = function getFullStack(err) {
  var ret = err.stack || err.toString(),
    cause;

  if (typeof err.cause === 'function') {
    cause = err.cause();
    if (cause) {
      ret += '\nCaused by: ' +
        getFullStack(cause);
    }
  }
  return ret;
};
const customSerializers = {
  err: function errSerializer(err) {
    // check for undefined/null and of expected type
    if (!err || !err.stack) {
      return err;
    }
    return {
      ...errorToJson(err),
      stack: getFullStack(err)
    };
  }
};

export { 
  customSerializers
}
