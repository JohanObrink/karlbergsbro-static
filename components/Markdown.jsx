import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      plugins={[gfm]}
      className="text-left markdown"
      children={children}
    />
  )
}
