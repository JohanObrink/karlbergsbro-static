import {
  getPaths,
  getTree,
  getMenu,
  findNode,
} from './content'
import mockFs from 'mock-fs'

describe('services/content', () => {
  beforeEach(() => {
    const root = `${process.cwd()}/content`
    mockFs({
      [root]: {
        'lotter': {
          'index.md': `---
name: Lotter
---`,
          'lott-1.md': '',
          'lott-10.md': '',
          'lott-2.md': '',
          'lott-h.md': ''
        },
        'index.md': `---
title: titel
name: Hem
---
# markdown`,
        'intresse.md': '',
        'om-oss': `---
sort: 1
---`
      }
    })
  })
  afterEach(() => mockFs.restore())
  describe('#getPaths', () => {
    it('loads index', () => {
      const paths = getPaths()
      expect(paths[0].path).toEqual('/')
    })
    it('loads recursively', () => {
      const paths = getPaths()
      expect(paths).toHaveLength(8)
    })
    it('loads directories', () => {
      const paths = getPaths()
      expect(paths[1].path).toEqual('/intresse')
    })
    it('loads directories children', () => {
      const paths = getPaths()
      expect(paths[3].path).toEqual('/lotter/lott-1')
    })
    it('loads page data', () => {
      const paths = getPaths()
      expect(paths[0].title).toEqual('titel')
      expect(paths[0].content).toEqual('# markdown')
    })
  })
  describe('#getTree', () => {
    it('returns one top element', () => {
      const tree = getTree()
      expect(tree).toEqual({
        path: '/',
        title: 'titel',
        name: 'Hem',
        content: '# markdown',
        children: expect.any(Array),
      })
    })
    it('parses children', () => {
      const tree = getTree()
      expect(tree.children).toHaveLength(3)
    })
  })
  describe('#getMenu', () => {
    it.only('returns one top element with name and path', () => {
      const menu = getMenu()
      expect(menu).toEqual({
        path: '/',
        sort: '/',
        name: 'Hem',
        thumbnail: null,
        children: expect.any(Array),
      })
    })
    it('parses children', () => {
      const menu = getMenu()
      expect(menu.children).toHaveLength(3)
      expect(menu.children[2]).toEqual({
        path: '/lotter',
        sort: '/lotter',
        name: 'Lotter',
        thumbnail: null,
        children: expect.any(Array),
      })
    })
    it('sorts children based on sort', () => {
      const { children } = getMenu()
      expect(children.map(c => c.path))
        .toEqual(['/om-oss', '/lotter', '/intresse'])
    })
    it('sorts children based on path', () => {
      const { children } = getMenu()
      expect(children[1].children.map(c => c.path))
        .toEqual(['/om-oss', '/lotter', '/intresse'])
    })
  })
  describe('#findNode', () => {
    let menu
    beforeEach(() => {
      menu = {
        path: '/',
        name: 'Hem',
        children: [
          { path: '/lotter', name: 'Lotter', children: [] },
          { path: '/om-oss', name: 'Om oss', children: [] }
        ]
      }
    })
    it('returns the correct node', () => {
      const node = findNode(menu, '/lotter')
      expect(node).toEqual(menu.children[0])
    })
    it('returns undefined if node does not exist', () => {
      const node = findNode(menu, '/foo')
      expect(node).toBe(undefined)
    })
  })
})