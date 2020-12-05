const { getPaths, getTree } = require('./content')

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
})