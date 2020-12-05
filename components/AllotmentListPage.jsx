import ReactMarkdown from "react-markdown";

export default function AllotmentListPage ({content}) {
  return (
    <>
      Allotment list
      <ReactMarkdown source={content} />
    </>
  )
}
