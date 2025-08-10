import { expect, test } from 'vitest'
import { terms2tf } from '../src/search.js'

const terms = ['hello', 'world', 'hello', 'yes', 'hello', 'world']

test('Function should return valid object with tf metric', () => {
  expect(terms2tf(terms)).toEqual({hello: 3, world: 2, yes: 1})
})
