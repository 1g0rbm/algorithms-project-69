import { expect, test } from 'vitest'
import { buildInvertedIndex } from '../src/search.js'

const doc1 = { id: 'doc1', text: 'I can\'t shoot straight.' }
const doc2 = { id: 'doc2', text: 'Don\'t shoot shoot shoot at me.' }
const docs = [doc1, doc2]

const expected = {
  i: [{ id: 'doc1', tf: 1, length: 4}],
  "can't": [{ id: 'doc1', tf: 1, length: 4}],
  shoot: [{ id: 'doc2', tf: 3, length: 6}, { id: 'doc1', tf: 1, length: 4}],
  straight: [{ id: 'doc1', tf: 1, length: 4}],
  "don't": [{ id: 'doc2', tf: 1, length: 6}],
  at: [{ id: 'doc2', tf: 1, length: 6}],
  me: [{ id: 'doc2', tf: 1, length: 6}]
}

test('Function should return inverted index', () => {
  expect(buildInvertedIndex(docs)).toEqual(expected)
})
