// Vendored from normalize-unicode-text (MIT, frandiox) to avoid an external
// dependency for ~10 lines of logic: https://github.com/frandiox/normalize-unicode-text
// Used to turn headings into URL-safe, ASCII anchor ids (see components/Markdown.jsx).

const NON_DECOMPOSABLE = [
  ['L', /ł/gi],
  ['O', /ø/gi],
  ['AE', /æ/gi],
  ['SS', /ß/gi],
]

const CLEANUP_PATTERNS = [
  [/[\u0300-\u036f]/g, ''], // combining diacritical marks left over after NFKD
  [/[\u180e\u200b-\u200d\u2060\ufeff]/g, ''], // zero-width characters
  [/[\u2420\u2422\u2423]/g, ' '], // visible space symbols
  [/[ \u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]/g, ' '], // uncommon whitespace
  [/\s+/g, ' '],
]

export function normalizeUnicodeText(text) {
  let result = text.normalize('NFKD')
  for (const [pattern, replacement] of CLEANUP_PATTERNS) {
    result = result.replace(pattern, replacement)
  }
  for (const [replacement, pattern] of NON_DECOMPOSABLE) {
    result = result.replace(pattern, (match) =>
      match === match.toUpperCase() ? replacement : replacement.toLowerCase(),
    )
  }
  return result
}
