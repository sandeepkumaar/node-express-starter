/**
 * For easier logging. log will be available globally
 * and maintains the request's context or callers context
 */

import { AsyncLocalStorage } from "node:async_hooks";
const context = new AsyncLocalStorage();

/**
 * @type {(store: object, fn:() => void) => void }
 */
const contextProvider = function (store, fn) {
  return context.run(store, fn);
};

const useContext = function () {
  return context.getStore();
};

/**
 * @type {<T extends object>(proxyTarget:T, contextKey: string) => T}
 * proxies any value with context values
 */
const proxyWithContext = function (proxyTarget, contextKey) {
  return new Proxy(proxyTarget, {
    get: function (target, property, receiver) {
      let store = useContext() || {};
      let contextValue = store[contextKey];
      if (contextValue) {
        target = contextValue;
      }
      return Reflect.get(target, property, receiver);
    },
  });
};

export { contextProvider, useContext, proxyWithContext };
