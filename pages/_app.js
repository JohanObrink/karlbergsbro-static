import '../styles/app.scss'

function MyApp({ Component, pageProps }) {
  return (
    <html lang="sv" className="h-100">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="d-flex h-100 text-center text-black bg-light">
        <div className="d-flex w-100 h-100 mx-auto flex-column">
          <Component {...pageProps} />
        </div>
      </body>
    </html>
  )
}

export default MyApp
