
var counter = 1

/**
 * create a new method
 *
 * @return {Function}
 * @api public
 */

function method(name){
  name = name || 'jkroso/method-' + counter++
  function dispatch(obj){
    return obj[name].apply(this, arguments)
  }
  dispatch._name = name
  dispatch.define = define
  return dispatch
}

/**
 * define `this` method for `type`
 *
 * @param {Object} type
 * @param {Function} fn
 * @api public
 */

function define(type, fn){
  Object.defineProperty(type, this._name, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: fn
  })
}

module.exports = method
