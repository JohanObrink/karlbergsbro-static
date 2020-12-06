import { Container } from "react-bootstrap";
import Feed from "./instagram/Feed";
import Markdown from "./Markdown";

export default function AllotmentPage ({
  content,
  instagram
}) {
  return (
    <>
      <Container>
        <Markdown>{content}</Markdown>
      </Container>
      {instagram &&
        <Feed username={instagram} />
      }
    </>
  )
}
