import { Col, Container, Row } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { Card } from "./Card"

export default function AllotmentListPage ({
  content,
  node
}) {

  return (
    <>
      <Container>
        <ReactMarkdown className="text-left" source={content} />
        <Row>
          {node.children.map((allotment) => (
            <Col
              lg="3"
              md="4"
              sm="6"
              xs="12"
              key={allotment.path}>
              <Link href={allotment.path}>
                <a><Card title={allotment.name} image={allotment.thumbnail} /></a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}