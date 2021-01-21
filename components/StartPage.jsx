import { Container } from 'react-bootstrap'
import Markdown from './Markdown'
import Masthead from './Masthead'

export default function StartPage({ content, image, headline }) {
  return (
    <div className="start-page">
      <Masthead image={image}>
        <div className="contrast-bg">
          <h1>{headline}</h1>
        </div>
      </Masthead>
      <Container>
        <Markdown>{content}</Markdown>
      </Container>
    </div>
  )
}
