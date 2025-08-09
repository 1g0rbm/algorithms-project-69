import { expect, test } from 'vitest'
import { tokens2terms } from '../src/search.js'

test('Tokens to terms should return one term in array.', () => {
  expect(tokens2terms('test')).toEqual(['test'])
})

test('Tokens to terms should return one term array and trim punctuation.', () => {
  expect(tokens2terms(', test!')).toEqual(['test'])
})

test('Tokens to terms should return one lowercase term.', () => {
  expect(tokens2terms(', Test!')).toEqual(['test'])
})

test('Tokens to terms should return twi lowercase terms in array withou punctuation.', () => {
  expect(tokens2terms('Hello, world!')).toEqual(['hello', 'world'])
})
