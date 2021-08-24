import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Card } from './Card'
import Markdown from './Markdown'

export default function AllotmentListPage({ content, node }) {
  return (
    <>
      <Container className="mt-3">
        <Markdown>{content}</Markdown>
        <Row>
          {node.children.map((allotment) => (
            <Col lg="3" md="4" sm="6" xs="12" key={allotment.path}>
              <Link href={allotment.path}>
                <a href={allotment.path}>
                  <Card title={allotment.name} image={allotment.thumbnail} />
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
