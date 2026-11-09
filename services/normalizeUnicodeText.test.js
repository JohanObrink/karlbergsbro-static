import { normalizeUnicodeText } from './normalizeUnicodeText'

describe('services/normalizeUnicodeText', () => {
  // Examples from the original normalize-unicode-text README, to verify
  // this vendored implementation is behaviorally equivalent.
  it('normalizes non-decomposable latin characters and ligatures', () => {
    expect(normalizeUnicodeText('øqßweŁﬀÆǣ')).toEqual('oqssweLffAEae')
  })

  it('normalizes accented latin characters', () => {
    expect(normalizeUnicodeText('äÄàÀãÃçÇõÕûÛýÝñ')).toEqual('aAaAaAcCoOuUyYn')
  })

  it('collapses uncommon whitespace to a single space', () => {
    expect(normalizeUnicodeText('a\u00A0\u2000b')).toEqual('a b')
  })

  it('strips zero-width characters', () => {
    expect(normalizeUnicodeText('a\u200Bb')).toEqual('ab')
  })
})
