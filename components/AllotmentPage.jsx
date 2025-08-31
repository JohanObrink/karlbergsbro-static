import { Container } from 'react-bootstrap'
import Markdown from './Markdown'

export default function AllotmentPage({ content }) {
  return (
    <>
      <Container className="mt-3">
        <Markdown>{content}</Markdown>
      </Container>
    </>
  )
}
