import { Image } from "react-bootstrap";

export function Card ({ image, title, text, imageText }) {
  return (
    <div className="card text-left">
      {image &&
        <div className="imageWrap">
          <Image src={image} className="card-image" rounded fluid />
          {imageText && <div className="card-image-text">{imageText}</div>}
        </div>
      }
      {(title || text) && <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {text && <p className="card-text">{text}</p>}
      </div>}
    </div>
  )
}
