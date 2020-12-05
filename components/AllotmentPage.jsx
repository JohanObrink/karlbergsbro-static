import ReactMarkdown from "react-markdown";

export default function AllotmentPage ({content}) {
  return (
    <>
      Allotment
      <ReactMarkdown source={content} />
    </>
  )
}
