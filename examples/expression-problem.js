
// http://www.infoq.com/presentations/polymorphism-functional-oop
// this is a JavaScript implementation of the examples given in
// the above talk given in Clojure, Ocaml, Haskell, and Scala

var method = require('..')

var reduce = method(function(arr, fn, init){
  var l = arr.length
  var i = 0
  while (i < l) init = fn(init, arr[i++])
  return init
})

var add = method(function(a, b){
  return a + b
})

var ident = method(function(a){
  return new a.constructor
})

var head = method(function(arr){
  return arr[0]
})

function sum(coll){
  return reduce(coll, add, ident(head(coll)))
}

console.log(sum([1,2,3]))
console.log(sum(['a','b','c']))

// now lets at a new type to our system

function Tree(l, v, r){
  this.left = l
  this.value = v
  this.right = r
}

// now to support this we need to define how to reduce it

reduce.define(Tree.prototype, function(node, fn, init){
  if (node.left ) init = reduce(node.left , fn, init)
  if (node.right) init = reduce(node.right, fn, init)
  return fn(init, node.value)
})

// and how to get its head value

head.define(Tree.prototype, function(node){
  if (node.left ) return head(node.left)
  if (node.right) return head(node.right)
  return node.value
})

// Boom! sum now supports Tree's

console.log(sum(new Tree(new Tree(null, 1), 2, new Tree(null, 3))))
console.log(sum(new Tree(new Tree(null, 'a'), 'b', new Tree(null, 'c'))))
