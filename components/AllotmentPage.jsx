import ReactMarkdown from "react-markdown";

export default function AllotmentPage ({
  content,
  instagram
}) {
  return (
    <>
      <Container>
        <ReactMarkdown source={content} />
      </Container>
      {instagram &&
        <Feed username={instagram} />
      }
    </>
  )
}
