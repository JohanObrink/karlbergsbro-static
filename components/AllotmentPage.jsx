import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Feed from "./instagram/Feed";

export default function AllotmentPage ({
  content,
  instagram
}) {
  return (
    <>
      <Container>
        <ReactMarkdown className="text-left" source={content} />
      </Container>
      {instagram &&
        <Feed username={instagram} />
      }
    </>
  )
}
