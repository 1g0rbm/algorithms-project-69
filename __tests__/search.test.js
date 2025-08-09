// @ts-check

import { expect, test } from 'vitest'
import search from '../index.js'

const doc1 = { id: 'doc1', text: 'I can\'t shoot straight unless I\'ve had a pint!' }
const doc2 = { id: 'doc2', text: 'Don\'t shoot shoot shoot that thing at me.' }
const doc3 = { id: 'doc3', text: 'I\'m your shooter.' }
const docs = [doc1, doc2, doc3]

test('search should return two results', () => {
  expect(search(docs, 'shoot')).toEqual(['doc1', 'doc2'])
})

test('search should return empty resiult', () => {
  expect(search(docs, 'scooter')).toEqual([])
})

test('punctuation marks should not affect the search', () => {
  expect(search(docs, 'pint')).toEqual(['doc1'])
  expect(search(docs, 'pint!')).toEqual(['doc1'])
})
