import { Col, Container, Row } from 'react-bootstrap'
import Markdown from './Markdown'

export default function InfoPage({ content }) {
  return (
    <Container>
      <Row>
        <Col>
          <Markdown className="info">{content}</Markdown>
        </Col>
      </Row>
    </Container>
  )
}
