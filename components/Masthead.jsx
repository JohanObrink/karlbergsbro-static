export default function Masthead ({ children, image }) {
  const style = image ? {
    backgroundImage: `url(${image})`
  } : {}
  return (
    <>
      <style jsx>{`
        .masthead {
          width: calc(100vw);
          height: 200px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin-bottom: 20px;
        }
        @media (min-width: 600px) {
          .masthead {
            height: 300px;
          }
        }
        @media (min-width: 768px) {
          .masthead {
            height: 500px;
          }
        }
      `}</style>
      <div
        className="masthead text-white"
        style={style}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              { children }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
