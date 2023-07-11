import pino from 'pino'
import { customSerializers } from './serializers.js';

const isLocal = process.env.NODE_ENV && process.env.NODE_ENV.includes('local');
const isTest = process.env.NODE_ENV && process.env.NODE_ENV.includes('test');

const defaultLevel = isTest 
  ? "silent"
  : isLocal
  ? "debug"
  : "info"


let defaultOpts = {
  level: defaultLevel,
  serializers: {
    ...pino.stdSerializers,
    ...customSerializers,
  },
  formatters: {
    level: (label, number) => ({level: label})
  },
  transport: {
    target: 'pino/file'
  }
}


export default function createLogger(name, opts={}) {
  let loggerOpts = {...defaultOpts, ...opts};
  return pino({
    name,
    ...loggerOpts
  })
    
}
