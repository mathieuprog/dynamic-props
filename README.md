# `dynamic-props`

`dynamic-props` allows to create and delete nested properties of object literals dynamically.

## Usage

```javascript
import { setNestedProp } from 'dynamic-props';

const foo = {};

setNestedProp`bar.baz[${2}].qux`(foo, 'hello');

console.log(foo);
```

> { bar: { baz: [ <2 empty items>, { qux: 'hello' } ] } }

```javascript
import { deleteNestedProp } from 'dynamic-props';

deleteNestedProp`bar.baz[${2}].qux`(foo);

console.log(foo);
```

> { }

Note that by default `deleteNestedProp` recursively removes properties containing undefined values, empty objects, empty arrays or arrays containing only undefined values.

## Limitations

Multidimensional arrays are not supported.

## Installation

You can get `dynamic-props` via [npm](http://npmjs.com).

```bash
$ npm install dynamic-props --save
```
