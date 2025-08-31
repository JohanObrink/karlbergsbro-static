import { Col, Container, Row } from 'react-bootstrap'
import Markdown from './Markdown'
import Masthead from './Masthead'

export default function DefaultPage({ content, image, headline, subheader }) {
  return (
    <>
      <Masthead image={image}>
        <h1>{headline}</h1>
        {subheader && <h2>{subheader}</h2>}
      </Masthead>
      <Container>
        <Row>
          <Col>
            <Markdown>{content}</Markdown>
          </Col>
        </Row>
      </Container>
      {/* instagram && <Feed username={instagram} /> */}
    </>
  )
}
