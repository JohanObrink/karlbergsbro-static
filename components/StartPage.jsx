import { Container } from "react-bootstrap"
import Feed from "./instagram/Feed";
import Markdown from "./Markdown";
import Masthead from "./Masthead"

export default function StartPage ({
  content,
  image,
  headline,
  instagram
}) {
  return (
    <>
      <Masthead image={image}>
        <h1>{headline}</h1>
      </Masthead>
      <Container>
      <Markdown>{content}</Markdown>
      </Container>
      {instagram &&
        <Feed username={instagram} />
      }
    </>
  )
}
