import { Container } from 'react-bootstrap'
import Markdown from './Markdown'
import { ProspectForm } from './ProspectForm'

export default function DefaultPage({ content, headline }) {
  return (
    <Container className="mt-3">
      <h1>{headline}</h1>
      <Markdown>{content}</Markdown>
      <hr />
      <ProspectForm />
    </Container>
  )
}
