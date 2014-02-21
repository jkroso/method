
# method

A better way of creating polymorphic functions. Rather than attaching specialized functions to your data you "attach" them to `method`'s. Each `method` represents a concept. e.g `forEach`, `map`, `reduce`, etc.. and the specialized functions you write implement this concept for each data type you want it defined for. With this approach you don't need to worry about naming collisions (I'm constantly wanting to give functions and data the same name). And it gets you back to working with plain functions, which makes a lot of abstractions easier to apply.

## Installation

With your favorite package manager:

- [packin](//github.com/jkroso/packin): `packin add jkroso/method`
- [component](//github.com/component/component#installing-packages): `component install jkroso/method`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install jkroso/method`

then in your app:

```js
var method = require('method')
```

## API

### method([name])

  Create a new method

```js
var format = method()
```

### format.define(type, fn)

  define a specialized handler for instances of `type`

```js
format.define(Object.prototype, JSON.stringify)
format.define(RegExp.prototype, String)
```

### format(object, [...])

  Invoke the method on object. You can pass as many arguments as you like.

```js
format(/^\w+$/i) // => '/^\\w+$/i'
format({a:1}) // => '{"a":1}'
```

## Implementation

This is actually implemented as a very thin wrapper on top of normal methods. However, the major drawback of methods does not apply since they are properly namespaced. They are also non-enumerable so its very unlikely you will ever notice they are there. People say "never extend objects you don't own" but none of their reasons apply here.

## Drawbacks

- __convenience:__ One advantage of defining methods directly on your data is that you always have convenient access to the method anywhere you might be interested in using it. You miss out on this convenience by using this approach
- __performance:__ because its built on top of methods it will always be slightly slower than them.