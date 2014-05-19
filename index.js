
function toString(){ return this.id }
function noop(){}

var counter = 1

/**
 * create a new method
 *
 * @return {Function}
 * @api public
 */

function method(name, i){
  if (i == null) i = 0
  function dispatch(){
    var obj = arguments[i]
    var fn = obj != null
      ? obj[name] || dispatch['default']
      : dispatch['default']
    return fn.apply(this, arguments)
  }
  dispatch['default'] = noop
  dispatch.toString = toString
  if (typeof name == 'function') {
    dispatch['default'] = name
    name = null
  }
  name = name || 'jkroso/method-' + counter++
  dispatch.id = name
  dispatch.def = dispatch.define = define
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
  Object.defineProperty(type, this.id, {
    configurable: true,
    enumerable: false,
    writable: false,
    value: fn
  })
}

module.exports = method
