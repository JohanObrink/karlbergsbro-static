export function Card ({ image, title, text, imageText }) {
  return (
    <div className="card text-left">
      <style jsx>{`
        .imageWrap {
          position: relative;
          width: 100%;
        }
        .imageText {
          position: absolute;
          bottom: 5px;
          left: 15px;
          padding: 5px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
        }
        .text {
          font-size: 0.8em;
          height: 75px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      {image &&
        <div className="imageWrap">
          <img src={image} className="card-img-top" alt="..." />
          {imageText && <div className="imageText">{imageText}</div>}
        </div>
      }
      {(title || text) && <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {text && <p className="card-text text">{text}</p>}
      </div>}
    </div>
  )
}
