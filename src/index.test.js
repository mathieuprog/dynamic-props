import { setNestedProp, deleteNestedProp } from './index';
import { isArray, isObjectLiteral } from './utils';

test('setNestedProp', () => {
  const foo = {};

  setNestedProp`bar.baz[${2}].qux`(foo, 'hello');

  expect(isObjectLiteral(foo.bar)).toBeTruthy();
  expect(isArray(foo.bar.baz)).toBeTruthy();
  expect(isObjectLiteral(foo.bar.baz[2])).toBeTruthy();
  expect(foo.bar.baz[2].qux).toBe('hello');

  // test override
  setNestedProp`bar.baz[${2}].qux`(foo, 'world');

  expect(foo.bar.baz[2].qux).toBe('world');

  setNestedProp`bar.baz[${1}]`(foo, 'test');

  expect(foo.bar.baz[1]).toBe('test');
  expect(foo.bar.baz[2].qux).toBe('world');
});

test('deleteNestedProp', () => {
  const foo = { bar: { baz: [ undefined, undefined, { qux: 'hello' } ] } };

  deleteNestedProp`bar.baz[${2}].qux`(foo);

  expect(isArray(foo.bar?.baz)).toBeFalsy();
  expect(isObjectLiteral(foo.bar)).toBeFalsy();
});

test('deleteNestedProp 2', () => {
  const foo = { bar: { baz: [ 1, undefined, { qux: 'hello' } ] } };

  deleteNestedProp`bar.baz[${2}].qux`(foo);

  expect(isArray(foo.bar?.baz)).toBeTruthy();
  expect(isObjectLiteral(foo.bar)).toBeTruthy();
});

test('deleteNestedProp 3', () => {
  const foo = { bar: { corge: 1, baz: [ undefined, undefined, { qux: 'hello' } ] } };

  deleteNestedProp`bar.baz[${2}].qux`(foo);

  expect(isArray(foo.bar?.baz)).toBeFalsy();
  expect(isObjectLiteral(foo.bar)).toBeTruthy();
});

test('deleteNestedProp 4', () => {
  const foo = { bar: { corge: 1, baz: [ undefined, undefined, 1 ] } };

  deleteNestedProp`bar.baz`(foo);

  expect(isArray(foo.bar?.baz)).toBeFalsy();
  expect(isObjectLiteral(foo.bar)).toBeTruthy();
});
