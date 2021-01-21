import { Container } from 'react-bootstrap'
import Markdown from './Markdown'
import Masthead from './Masthead'

export default function StartPage({ content, image, headline }) {
  return (
    <div className="start-page">
      <Masthead image={image}>
        <h1>{headline}</h1>
      </Masthead>
      <Container>
        <Markdown>{content}</Markdown>
      </Container>
    </div>
  )
}
