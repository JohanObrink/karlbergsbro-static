import '../styles/app.scss'
import Router from 'next/router'
import withGa from 'next-ga'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withGa('G-N01WEE729Q', Router)(MyApp)
