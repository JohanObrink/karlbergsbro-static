import ReactMarkdown from "react-markdown";

export default function StartPage ({content}) {
  return (
    <>
      Start
      <ReactMarkdown source={content} />
    </>
  )
}