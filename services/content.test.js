const {
  getPaths,
  getTree,
  getMenu,
  findNode,
} = require('./content')

describe('api/content', () => {
  describe('#getPaths', () => {
    it('loads index', () => {
      const paths = getPaths()
      expect(paths[0].path).toEqual('/')
    })
    it('loads directories', () => {
      const paths = getPaths()
      expect(paths[1].path).toEqual('/lotter')
    })
    it('loads directories children', () => {
      const paths = getPaths()
      expect(paths[2].path).toEqual('/lotter/lott-1')
    })
    it('loads page data', () => {
      const paths = getPaths()
      expect(paths[0].title).toEqual(expect.any(String))
      expect(paths[0].content).toEqual(expect.any(String))
    })
  })
  describe('#getTree', () => {
    it('returns one top element', () => {
      const tree = getTree()
      expect(tree).toEqual({
        path: '/',
        name: expect.any(String),
        type: expect.any(String),
        title: expect.any(String),
        image: expect.any(String),
        headline: expect.any(String),
        instagram: expect.any(String),
        content: expect.any(String),
        children: expect.any(Array),
      })
    })
    it('parses children', () => {
      const tree = getTree()
      expect(tree.children).toHaveLength(2)
    })
  })
  describe('#getMenu', () => {
    it('returns one top element with name and path', () => {
      const menu = getMenu()
      expect(menu).toEqual({
        path: '/',
        name: expect.any(String),
        thumbnail: null,
        children: expect.any(Array),
      })
    })
    it('parses children', () => {
      const menu = getMenu()
      expect(menu.children).toHaveLength(2)
      expect(menu.children[0]).toEqual({
        path: '/lotter',
        name: expect.any(String),
        thumbnail: null,
        children: expect.any(Array),
      })
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