
// this is an example of a custom JSON formatter. In this case
// its designed to format JSON the same way I do when coding
// it by hand

var method = require('..')

var format = method()

format.define(Function.prototype, String)
format.define(Boolean.prototype, String)
format.define(Number.prototype, String)
format.define(RegExp.prototype, String)
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

process.stdout.write(format(require('hydro/package'), '') + '\n')
