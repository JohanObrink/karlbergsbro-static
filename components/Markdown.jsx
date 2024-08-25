import { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { normalizeUnicodeText } from 'normalize-unicode-text'
import Map from './Map'

const linkRenderer = (props) => {
  if (props.href.startsWith('https://google.com/maps')) {
    return <Map src={props.href} />
  }
  if (props.href.startsWith('http')) {
    return createElement('a', { ...props, target: '_blank' })
  }
  return createElement('a', props)
}

const headingRenderer = (props) => {
  const text = props.node.children[0].value
  const linkId = normalizeUnicodeText(text.toLowerCase().replace(/ /g, '-'))
  const link = createElement('a', { id: linkId, key: linkId })
  return createElement(`h${props.level}`, null, [link, text])
}

export default function Markdown({ children, className = '' }) {
  const classNames = `text-left markdown ${className}`
  return (
    <ReactMarkdown
      components={{ link: linkRenderer, heading: headingRenderer }}
      remarkPlugins={[gfm]}
      className={classNames}
    >
      {children}
    </ReactMarkdown>
  )
}
