/**
 * @param {Array.<{id:string, text: string}>} docs
 * @param {string} needle
 *
 * @returns {Array.<Object>}
 */
export default function search(docs, needle) {
  return docs
    .filter(doc => doc.text.split(' ').includes(needle))
    .map(doc => doc.id)
}
