import { Card } from "../Card";

export function Post ({ text, media, likes, href }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gy-4">
      <a href={href} target="_blank">
        <Card
          image={media[0].thumbnail}
          text={text}
          imageText={`❤️ ${likes}`} />
      </a>
    </div>
  )
}