import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Feed from "./instagram/Feed";
import Masthead from "./Masthead";

export default function DefaultPage ({
  content,
  image,
  headline,
  subheader,
  instagram
}) {
  return (
    <>
      <Masthead image={image}>
        <h1>{headline}</h1>
        {subheader && <h2>{subheader}</h2>}
      </Masthead>
      <Container>
        <Row>
          <Col className="text-left">
            <ReactMarkdown source={content} />
          </Col>
        </Row>
      </Container>
      {instagram &&
        <Feed username={instagram} />
      }
    </>
  )
}
