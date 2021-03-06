import { readdirSync } from 'fs'
import { join, parse } from 'path'
import { read } from 'gray-matter'
import memoize from 'fast-memoize'

export const getPaths = memoize((dirs = []) => {
  const path = join(process.cwd(), 'content', dirs.join('/'))
  const list = readdirSync(path, { withFileTypes: true })

  let paths = []
  list.forEach((dirent) => {
    if (dirent.isDirectory()) {
      paths = paths.concat(getPaths([...dirs, dirent.name]))
    } else {
      const filename = parse(dirent.name)
      const filepath = join(path, dirent.name)

      const { content, data } = read(filepath)

      const slugs = ['', ...dirs]
      if (filename.name !== 'index') {
        slugs.push(filename.name)
      }
      paths.push({
        path: slugs.join('/') || '/',
        content,
        ...data,
      })
    }
  })

  return paths
})

export const getPath = memoize((slugs = []) => {
  const paths = getPaths()
  const url = ['', ...slugs].join('/')
  return paths.find((p) => p.path === url || p.path === `${url}/`)
})

export const getTree = memoize((path = '') => {
  const fullPath = join(process.cwd(), 'content', path)
  let result = {
    path: join('/', path),
    children: [],
  }
  const list = readdirSync(fullPath, { withFileTypes: true })
  list.forEach((dirent) => {
    if (dirent.isDirectory()) {
      result.children.push(getTree(join(path, dirent.name)))
    } else {
      const filename = parse(dirent.name)
      const filepath = join(fullPath, dirent.name)

      const { content, data } = read(filepath)

      if (filename.name !== 'index') {
        result.children.push({
          ...data,
          path: join('/', path, filename.name),
          content,
        })
      } else {
        result = {
          ...result,
          ...data,
          content,
        }
      }
    }
  })
  return result
})

export const getMenu = memoize((node = getTree()) => ({
  path: node.path,
  sort:
    parseInt(node.sort, 10) ||
    parseInt(node.path.match(/\d+/), 10) ||
    node.path,
  name: node.name,
  thumbnail: node.thumbnail || null,
  children: (node.children || [])
    .map((child) => getMenu(child))
    .sort(({ sort: s1 }, { sort: s2 }) => {
      const isNum1 = typeof s1 === 'number'
      const isNum2 = typeof s2 === 'number'
      if (isNum1 && isNum2) return s1 - s2
      if (isNum1 && !isNum2) return -1
      if (!isNum2 && isNum1) return 1
      return s1 < s2 ? -1 : 1
    }),
}))

export const findNode = memoize((node, path) => {
  let result
  if (node.path === path) {
    result = node
  } else {
    ;(node.children || []).forEach((child) => {
      if (path.indexOf(child.path) === 0) {
        const match = findNode(child, path)
        if (match) {
          result = match
        }
      }
    })
  }

  return result
})
