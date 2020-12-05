import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Feed from "./instagram/Feed";
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
        <ReactMarkdown source={content} />
      </Container>
      {instagram &&
        <Feed username={instagram} />
      }
    </>
  )
}