import { normalizeUnicodeText } from 'normalize-unicode-text'
import { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import MapEmbed from './Map'

const linkRenderer = ({ href, children, ...props }) => {
  if (href.startsWith('https://google.com/maps')) {
    return <MapEmbed src={href} />
  }
  if (href.startsWith('http')) {
    return createElement('a', { ...props, href, target: '_blank' }, children)
  }
  return createElement('a', { ...props, href }, children)
}

function HeadingRenderer({ node }) {
  const level = Number(node.tagName.slice(1))
  const text = node.children[0].value
  const linkId = normalizeUnicodeText(text.toLowerCase().replace(/ /g, '-'))
  const anchor = createElement('a', { id: linkId, key: linkId })
  return createElement(`h${level}`, null, [anchor, text])
}

const components = {
  a: linkRenderer,
  h1: HeadingRenderer,
  h2: HeadingRenderer,
  h3: HeadingRenderer,
  h4: HeadingRenderer,
  h5: HeadingRenderer,
  h6: HeadingRenderer,
}

export default function Markdown({ children, className = '' }) {
  return (
    <div className={`text-start markdown ${className}`}>
      <ReactMarkdown components={components} remarkPlugins={[gfm]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
