import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const myPlugin = function (...args) {
  // console.log(...args)
  // console.log(this)
}

export default function Markdown({ children }) {
  return (
    <ReactMarkdown plugins={[gfm, myPlugin]} className="text-left markdown">
      {children}
    </ReactMarkdown>
  )
}
