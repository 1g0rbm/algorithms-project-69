/**
 * @param {Array.<{id:string, text: string}>} docs
 * @param {string} needle
 *
 * @returns {Array.<string>}
 */
export default function search(docs, needle) {
  const needleTerm = needle.toLowerCase().match(/\w+/g) ?? []
  if (needleTerm.length == 0) {
    return []
  }

  return docs
    .filter((doc) => {
      /** @type {string[]} */
      const textTerm = doc.text.toLowerCase().match(/\w+/g) ?? []
      return needleTerm.some(term => textTerm.includes(term))
    })
    .map(doc => doc.id)
}
