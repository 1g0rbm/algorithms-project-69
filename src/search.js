/**
 * @param {Array.<{id:string, text: string}>} docs
 * @param {string} needle
 *
 * @returns {Array.<string>}
 */
export default function search(docs, needle) {
  const needleTerms = tokens2terms(needle)
  if (needleTerms.length == 0) {
    return []
  }

  return docs
    .map(doc => ({ ...doc, term: tokens2terms(doc.text) }))
    .map(doc => ({
      ...doc,
      weight: needleTerms.reduce((total, needle) => total + doc.term.filter(term => term == needle).length, 0),
    }))
    .sort((a, b) => b.weight - a.weight)
    .filter(doc => doc.weight > 0)
    .map(doc => doc.id)
}

/**
 * @param {string} token
 *
 * @returns {string[]}
 */
function tokens2terms(token) {
  return token.toLowerCase().match(/\w+/g) ?? []
}
