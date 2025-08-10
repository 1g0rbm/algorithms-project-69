/**
 * @param {Array.<{id:string, text: string}>} docs
 * @param {string} needle
 *
 * @returns {string[]}
 */
export default function search(docs, needle) {
  const needleTerms = tokens2terms(needle)
  if (needleTerms.length == 0) {
    return []
  }

  const invertedIndex = buildInvertedIndex(docs)
  const docCount = docs.length

  const qtf = terms2tf(needleTerms)
  const uniqueQueryTerms = Object.keys(qtf)
  const idf = buildIDF(invertedIndex, uniqueQueryTerms, docCount)

  const scores = uniqueQueryTerms.reduce((acc, term) => {
    const indexedDocs = invertedIndex[term] || []
    if (indexedDocs.length == 0) {
      return acc
    }

    const termIDF = idf[term]
    const termQtfNorm = qtf[term] / needleTerms.length

    indexedDocs.forEach((doc) => {
      const tfNorm = doc.tf / Math.max(1, doc.length)
      const contrib = tfNorm * termIDF * termQtfNorm
      acc[doc.id] = (acc[doc.id] || 0) + contrib
    })

    return acc
  }, Object.create(null))

  return Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .map(r => r.id)
}

/**
 * @param {Object.<string, Array.<{id:string, tf: number, length: number}>>} invertedIndex
 * @param {string[]} uniqueQueryTerms
 * @param {number} docCount
 * 
 * @returns {Object.<string, number>}
 */
export function buildIDF(invertedIndex, uniqueQueryTerms, docCount) {
  return uniqueQueryTerms.reduce((acc, term) => {
    const indexedDocs = invertedIndex[term] || []
    return {...acc, [term]: indexedDocs.length == 0 ? 0 : Math.log((1 + docCount)) / (indexedDocs.length + 1)}
  }, Object.create(null))
}

/**
 * @param {Array.<{id:string, text: string}>} docs
 * 
 * @returns {Object.<string, Array.<{id:string, tf: number, length: number}>>}
 */
export function buildInvertedIndex(docs) {
  const idx = docs.reduce((acc, doc) => {
    const terms = tokens2terms(doc.text)
    const tf = terms2tf(terms)
    Object.entries(tf).forEach(([term, tf]) => {
      if (!acc[term]) {
        acc[term] = []
      }

      acc[term].push({ id: doc.id, tf, length: terms.length })
    })

    return acc
  }, {})

  Object.keys(idx).forEach(term => idx[term].sort((a, b) => b.tf - a.tf))

  return idx
}

/**
 * @param {string[]} terms
 * 
 * @returns {Object.<string, number>}
 */
export function terms2tf(terms) {
  return terms.reduce((acc, term) => {
    acc[term] = (acc[term] || 0) + 1
    return acc
  }, Object.create(null))
}

/**
 * @param {string} tokens
 *
 * @returns {string[]}
 */
export function tokens2terms(tokens) {
  return tokens.toLowerCase().match(/[a-zа-яё0-9']+/g) ?? [];
}
