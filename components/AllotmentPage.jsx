import { Container } from 'react-bootstrap'
import Markdown from './Markdown'

export default function AllotmentPage({ content }) {
  return (
    <>
      <Container>
        <Markdown>{content}</Markdown>
      </Container>
    </>
  )
}
