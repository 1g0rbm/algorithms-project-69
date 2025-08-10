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

  const idx = buildRevertedIndex(docs)

  const docsPerTerm = needleTerms.map(term => idx[term] || [])
  if (docsPerTerm.length == 0) {
    return []
  }

  const res = new Set(docsPerTerm[0])
  docsPerTerm.slice(1).flat().forEach(doc => {
    if (!res.has(doc)) {
      res.add(doc)
    }
  })

  return Array.from(res)
}

/**
 * @param {Array.<{id:string, text: string}>} docs
 * 
 * @returns {Object.<string, Array.<string>>}
 */
export function buildRevertedIndex(docs) {
  return docs.reduce((acc, doc) => {
    const terms = tokens2terms(doc.text)
    terms.forEach(term => {
      if (!acc[term]) {
        acc[term] = []
      }

      if (!acc[term].includes(doc.id)) {
        acc[term].push(doc.id)
      }
    })

    return acc
  }, {})
}

/**
 * @param {string} token
 *
 * @returns {string[]}
 */
export function tokens2terms(token) {
  return token.toLowerCase().match(/[a-z']+/g) ?? []
}
