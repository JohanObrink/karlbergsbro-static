import { Card } from '../Card'

export function Post({ text, media, likes, href }) {
  return (
    <a href={href} target="_blank">
      <Card image={media[0].thumbnail} text={text} imageText={`❤️ ${likes}`} />
    </a>
  )
}
