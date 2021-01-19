export default function Map({ src, title = 'Karta', ...props }) {
  return (
    <iframe
      {...props}
      title={title}
      width="100%"
      height="100%"
      frameBorder="0"
      className="map"
      src={`${src}&key=${process.env.GOOGLE_MAPS_KEY}`}
    />
  )
}
