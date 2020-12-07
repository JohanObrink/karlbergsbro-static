import React from 'react'
import Head from 'next/head'
import { getPath, getPaths, getTree, getMenu, findNode } from '../api/content'

import Menu from '../components/Menu'
import Footer from '../components/Footer'

import AllotmentListPage from '../components/AllotmentListPage'
import AllotmentPage from '../components/AllotmentPage'
import DefaultPage from '../components/DefaultPage'
import StartPage from '../components/StartPage'
import ProspectPage from '../components/ProspectPage'

const render = (menu, node, page) => {
  switch ((page.type || '').toLowerCase()) {
    case 'allotmentlist':
      return <AllotmentListPage menu={menu} node={node} {...page} />
    case 'allotment':
      return <AllotmentPage menu={menu} node={node} {...page} />
    case 'prospect':
      return <ProspectPage menu={menu} node={node} {...page} />
    case 'start':
      return <StartPage menu={menu} node={node} {...page} />
    default:
      return <DefaultPage menu={menu} node={node} {...page} />
  }
}

export default function Page ({menu, node, pageData}) {
  return (
    <div className="d-flex w-100 h-100 mx-auto flex-column">
      <Head>
        <title>{pageData.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Menu menu={menu.children} path={pageData.path} />
      <main>
        {render(menu, node, pageData)}
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async (context) => {
  const { page = [] } = context.params
  const menu = getMenu(getTree())
  const pageData = getPath(page)
  const node = findNode(menu, pageData.path)
  return {props: {menu, pageData, node}}
}

export const getStaticPaths = async () => {
  const data = getPaths()
  const paths = data.map(p => p.path)
  return {
    paths,
    fallback: false,
  }
}
