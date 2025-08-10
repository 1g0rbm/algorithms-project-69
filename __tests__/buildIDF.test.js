import { expect, test } from 'vitest'
import { buildIDF } from '../src/search.js'

const invertedIndex = {
  i: [{ id: 'doc1', tf: 1, length: 4}],
  "can't": [{ id: 'doc1', tf: 1, length: 4}],
  shoot: [{ id: 'doc2', tf: 3, length: 6}, { id: 'doc1', tf: 1, length: 4}],
  straight: [{ id: 'doc1', tf: 1, length: 4}],
  "don't": [{ id: 'doc2', tf: 1, length: 6}],
  at: [{ id: 'doc2', tf: 1, length: 6}],
  me: [{ id: 'doc2', tf: 1, length: 6}]
}
const query = ['shoot', 'at']

const expected = {
  at: 0.34657359027997264,
  shoot: 0.23104906018664842,
}

test('Function should return valid idf', () => {
  expect(buildIDF(invertedIndex, query, 1)).toEqual(expected)
})
