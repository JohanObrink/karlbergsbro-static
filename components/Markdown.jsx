import { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { normalizeUnicodeText } from 'normalize-unicode-text'
import Map from './Map'

const linkRenderer = ({ href, children, ...props }) => {
  if (href.startsWith('https://google.com/maps')) {
    return <Map src={href} />
  }
  if (href.startsWith('http')) {
    return createElement('a', { ...props, href, target: '_blank' }, children)
  }
  return createElement('a', { ...props, href }, children)
}

const makeHeadingRenderer = (level) =>
  function HeadingRenderer({ node }) {
    const text = node.children[0].value
    const linkId = normalizeUnicodeText(text.toLowerCase().replace(/ /g, '-'))
    const anchor = createElement('a', { id: linkId, key: linkId })
    return createElement(`h${level}`, null, [anchor, text])
  }

const components = {
  a: linkRenderer,
  h1: makeHeadingRenderer(1),
  h2: makeHeadingRenderer(2),
  h3: makeHeadingRenderer(3),
  h4: makeHeadingRenderer(4),
  h5: makeHeadingRenderer(5),
  h6: makeHeadingRenderer(6),
}

export default function Markdown({ children, className = '' }) {
  return (
    <div className={`text-left markdown ${className}`}>
      <ReactMarkdown components={components} remarkPlugins={[gfm]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
