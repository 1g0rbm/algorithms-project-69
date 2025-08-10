import { expect, test } from 'vitest'
import { buildRevertedIndex } from '../src/search.js'

const doc1 = { id: 'doc1', text: 'I can\'t shoot straight.' }
const doc2 = { id: 'doc2', text: 'Don\'t shoot shoot shoot at me.' }
const docs = [doc1, doc2]

const expected = {
  i: ['doc1'],
  "can't": ['doc1'],
  shoot: ['doc1', 'doc2'],
  straight: ['doc1'],
  "don't": ['doc2'],
  at: ['doc2'],
  me: ['doc2']
}

test('Function should return reverted index', () => {
  expect(buildRevertedIndex(docs)).toEqual(expected)
})
