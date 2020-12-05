import ReactMarkdown from "react-markdown";

export default function DefaultPage ({content}) {
  return (
    <>
      Default
      <ReactMarkdown source={content} />
    </>
  )
}
