
var method = require('..')

it('should allow custom names', function(){
  var fn = method('render')
  var obj = {}
  var spy = chai.spy()
  fn.define(obj, spy)
  fn(obj)
  obj.should.have.property('render')
  spy.should.have.been.called()
})

it('should dispatch to defined implementations', function(){
  var fn = method()
  var spy = chai.spy()
  fn.define(String.prototype, spy)
  fn('hi')
  spy.should.have.called.with.exactly('hi')
})

it('should pass all arguments', function(){
  var fn = method()
  var spy = chai.spy()
  fn.define(String.prototype, spy)
  fn('hi', 1, 2, 3)
  spy.should.have.called.with.exactly('hi', 1, 2, 3)
})

it('should prefer more specialized implementations', function(){
  var fn = method()
  var one = chai.spy()
  var two = chai.spy()
  fn.define(Object.prototype, one)
  fn.define(String.prototype, two)
  fn('hi')
  one.should.not.have.been.called()
  two.should.have.called.with.exactly('hi')
})

it('should handle `null` objects', function(){
  var fn = method()
  fn(null)
})

it('should support a global default handler', function(){
  var fn = method()
  fn['default'] = chai.spy()
  fn(null)
  fn['default'].should.have.been.called()
})
