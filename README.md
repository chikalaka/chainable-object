# [chainable-object](https://www.npmjs.com/package/chainable-object) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chikalaka/chainable-object/blob/main/LICENSE)

A function that extends `Object` with chainable methods.

More functionality to the "simple" `Object`, but **only** with chainable methods (with one exception - `forEach` method).
Don't expect for functions which are not chainable, i.e. methods which won't return an object.

## Installation
```shell
npm install chainable-object
```

## Usage
```js
import _O from 'chainable-object';

const obj = { a: 1, b: 2, c: 3 }

_O(obj)
  .mapValues(v => v * 2) // { a: 2, b: 4, c: 6, ... }
  .mapKeys(k => k.toUpperCase()) // { A: 2, B: 4, C: 6, ... }
  .map((key, val) => [key + key, val + 10]) // { AA: 12, BB: 14, CC: 16, ... }
  .val() // { AA: 12, BB: 14, CC: 16 }
```

## API
****All the APIs (except `forEach`) returns a new object**

- [concat](#concat)
- [filter](#filter)
- [forEach](#forEach)
- [log](#log)
- [map](#map)
- [mapKeys](#mapKeys)
- [mapValues](#mapValues)
- [remove](#remove)
- [val](#val)

### concat
Similar to `Array.prototype.concat`.

The `concat` method merges two or more objects.

Args: one or more objects

```js
import _O from 'chainable-object';

_O({ a: 1, b: { c: 3 } }).concat({ a: 2, d: 4 }) // { a: 1, b: { c: 3 }, d: 4 }
```

### filter
Similar to `Array.prototype.concat`.

```js
import _O from 'chainable-object';

_O({ a: 1, b: { c: 3 } }).filter(v => v > 0) // { a: 1 }
```

### forEach
Similar to `Array.prototype.concat`.

The ONLY function which returns void.

```js
import _O from 'chainable-object';

_O({ a: 1, b: { c: 3 } }).forEach((val, key) => {
  // do something
})
```

### log
Simple, console.log for debugging
```js
import _O from 'chainable-object';

_O({ a: 1, b: { c: 3 } }).log() // { a: 1, b: { c: 3 } }
```

### map
Map through the object replacing key-value pairs.

Args: `cb: (key, value) => [key: string | number | symbol, value: any]`

```js
import _O from 'chainable-object';

_O({ a: 1, b: 2 }).map((key, val) => [key.toUpperCase(), val * 2]) // { A: 2, B: 4 }
```

### mapKeys
Map through the object replacing keys.

Args: `cb: (key, value) => string | number | symbol`

```js
import _O from 'chainable-object';

_O({ a: 1, b: 2 }).mapKeys(k => k.toUpperCase()) // { A: 1, B: 2 }
```

### mapValues
Map through the object replacing values.

Args: `cb: (value, key) => any`

```js
import _O from 'chainable-object';

_O({ a: 1, b: 2 }).mapKeys(v => v * 2) // { a: 2, b: 4 }
```

### remove
Remove elements from the object

Args: `((value, key) => boolean)`
```js
import _O from 'chainable-object';

_O({ a: 1, b: 2 })
  .remove((key, val) => val > 1) // { a: 1 }
  .remove((key, val) => key === "b") // { }
```

### val
Returns the object literal without `ChainableObject` methods

```js
import _O from 'chainable-object';

for (const key in _O({ a: 1 })) console.log(key) // a, log, map, forEach ...
for (const key in _O({ a: 1 }).val()) console.log(key) // a
```
