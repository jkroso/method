
var method = require('./')

var format = method()

format['default'] = function(obj, pre){
  return obj.toString()
}

format.define(Function.prototype, format.default)
format.define(Number.prototype, format.default)
format.define(RegExp.prototype, format.default)
format.define(String.prototype, json)

format.define(Object.prototype, function(obj, indent){
  var ks = keys(obj)
  if (!ks.length) return '{}'
  if (ks.length == 1) {
    var k = ks[0]
    var str = format(obj[k])
    if (/^[a-z]*$/.test(k) && k.length < 8 && str.length < 60) {
      return '{' + json(k) + ': ' + str + '}'
    }
  }
  return ks.reduce(function(str, k, i){
    if (i) str += ','
    return str + '\n'
      + indent + '  ' + json(k) + ': '
      + format(obj[k], indent + '  ')
  }, '{') + '\n' + indent + '}'
})

format.define(Array.prototype, function(arr, indent){
  var short = json(arr)
  if (short.length < 71) return short
  return arr.reduce(function(str, item, i){
    if (i) str += ','
    return str + '\n  ' + indent + format(item, indent + '  ')
  }, '[') + '\n' + indent + ']'
})

function json(o){
  return JSON.stringify(o)
}

function keys(obj){
  var out = []
  for (var k in obj) out.push(k)
  return out
}

process.stdout.write(format({
  "name": "method",
  "version": "0.1.0",
  "description": "create methods without risk of naming collisions",
  "keywords": ["method","polymorphism","protocol"],
  "bin": {"method": "./bin/method"},
  "devDependencies": {
    "serve": "jkroso/serve",
    "chai-spies": "*",
    "hydro-chai": "*",
    "hydro-html": "*",
    "hydro-bdd": "*",
    "hydro-dot": "*",
    "hydro": "*",
    "jsmd": "*",
    "chai": "*"
  },
  "repository": "git://github.com/jkroso/method.git",
  "bugs": "https://github.com/jkroso/method/issues",
  "author": "Jake Rosoman",
  "files": ["index.js"],
  "license": "MIT"
}, '') + '\n')
