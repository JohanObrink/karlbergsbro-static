import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { getPaths, getTree, getMenu, findNode } from './content'

describe('services/content', () => {
  let tmpRoot
  let cwdSpy

  beforeAll(() => {
    tmpRoot = mkdtempSync(join(tmpdir(), 'karlbergsbro-content-'))
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(tmpRoot)

    const contentRoot = join(tmpRoot, 'content')
    const lotterRoot = join(contentRoot, 'lotter')
    mkdirSync(lotterRoot, { recursive: true })

    writeFileSync(
      join(lotterRoot, 'index.md'),
      `---
name: Lotter
---`,
    )
    writeFileSync(join(lotterRoot, 'lott-1.md'), '')
    writeFileSync(join(lotterRoot, 'lott-10.md'), '')
    writeFileSync(join(lotterRoot, 'lott-2.md'), '')
    writeFileSync(join(lotterRoot, 'lott-27.md'), '')

    writeFileSync(
      join(contentRoot, 'index.md'),
      `---
title: titel
name: Hem
---
# markdown`,
    )
    writeFileSync(join(contentRoot, 'intresse.md'), '')
    writeFileSync(
      join(contentRoot, 'om-oss'),
      `---
sort: 1
---`,
    )

    writeFileSync(join(contentRoot, '_hidden.md'), '')
    const hiddenDir = join(contentRoot, '_hidden-dir')
    mkdirSync(hiddenDir, { recursive: true })
    writeFileSync(join(hiddenDir, 'index.md'), '')
  })
  afterAll(() => {
    cwdSpy.mockRestore()
    rmSync(tmpRoot, { recursive: true, force: true })
  })
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
    it('excludes files and directories prefixed with _', () => {
      const paths = getPaths()
      expect(paths.map((p) => p.path)).not.toContain('/_hidden')
      expect(paths.map((p) => p.path)).not.toContain('/_hidden-dir')
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
    it('excludes children prefixed with _', () => {
      const tree = getTree()
      expect(tree.children.map((c) => c.path)).not.toContain('/_hidden-dir')
      expect(tree.children.map((c) => c.path)).not.toContain('/_hidden')
    })
  })
  describe('#getMenu', () => {
    it('returns one top element with name and path', () => {
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
      expect(children.map((c) => c.path)).toEqual([
        '/om-oss',
        '/intresse',
        '/lotter',
      ])
    })
    it('sorts children based on path', () => {
      const { children } = getMenu()
      expect(children[2].children.map((c) => c.path)).toEqual([
        '/lotter/lott-1',
        '/lotter/lott-2',
        '/lotter/lott-10',
        '/lotter/lott-27',
      ])
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
          { path: '/om-oss', name: 'Om oss', children: [] },
        ],
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
