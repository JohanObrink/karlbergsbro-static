export default function Masthead ({ children, image }) {
  const style = image ? {
    backgroundImage: `url(${image})`
  } : {}
  return (
    <>
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
