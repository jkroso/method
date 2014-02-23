
var noop = function(){}
var counter = 1

/**
 * create a new method
 *
 * @return {Function}
 * @api public
 */

function method(name){
  function dispatch(obj){
    var fn = obj != null
      ? obj[name] || dispatch['default']
      : dispatch['default']
    return fn.apply(this, arguments)
  }
  dispatch['default'] = noop
  if (typeof name == 'function') {
    dispatch['default'] = name
    name = null
  }
  name = name || 'jkroso/method-' + counter++
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
