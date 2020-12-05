import React from 'react'
import Head from 'next/head'
import { getPath, getPaths } from '../api/content'
import Menu from '../components/Menu'
import AllotmentListPage from '../components/AllotmentListPage'
import AllotmentPage from '../components/AllotmentPage'
import DefaultPage from '../components/DefaultPage'
import StartPage from '../components/StartPage'
import Footer from '../components/Footer'

const render = (page) => {
  switch ((page.type || '').toLowerCase()) {
    case 'allotmentlist':
      return <AllotmentListPage {...page} />
    case 'allotment':
      return <AllotmentPage {...page} />
    case 'start':
      return <StartPage {...page} />
    default:
      return <DefaultPage {...page} />
  }
}

export default function Page ({menu, pageData}) {
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <Menu menu={menu} />
      <main>
        {render(pageData)}
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async (context) => {
  const { page = [] } = context.params
  const menu = getPaths().map(({path, name}) => ({path, name}))
  const pageData = getPath(page)
  return {props: {menu, pageData}}
}

export const getStaticPaths = async () => {
  const data = getPaths()
  const paths = data.map(p => p.path)
  return {
    paths,
    fallback: false,
  }
}
