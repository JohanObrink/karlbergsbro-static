import { createElement } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Map from './Map'

const mapRenderer = (node) => {
  if (node.href.startsWith('https://google.com/maps')) {
    console.log(node.children)
    return <Map src={node.href} />
  }
  return createElement('a', node)
}

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      renderers={{ link: mapRenderer }}
      plugins={[gfm]}
      className="text-left markdown"
    >
      {children}
    </ReactMarkdown>
  )
}
