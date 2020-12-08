import { readdirSync } from 'fs'
import { join, parse } from 'path'
import { read } from 'gray-matter'
import memoize from 'fast-memoize'

export const getPaths = memoize((dirs = []) => {
  const path = join(process.cwd(), 'content', dirs.join('/'))
  const list = readdirSync(path, { withFileTypes: true })

  let paths = []
  for (let dirent of list) {
    if (dirent.isDirectory()) {
      paths = paths.concat(getPaths([...dirs, dirent.name]))
    } else {
      const filename = parse(dirent.name)
      const filepath = join(path, dirent.name)
      
      const {content, data} = read(filepath)

      const slugs = ['', ...dirs]
      if (filename.name !== 'index') {
        slugs.push(filename.name)
      }
      paths.push({
        path: slugs.join('/') || '/',
        content,
        ...data
      })
    }
  }

  return paths
})

export const getPath = memoize((slugs = []) => {
  const paths = getPaths()
  const url = ['', ...slugs].join('/')
  return paths.find(p => p.path === url || p.path === url + '/')
})

export const getTree = memoize((path = '') => {
  const fullPath = join(process.cwd(), 'content', path)
  let result = {
    path: join('/', path),
    children: []
  }
  const list = readdirSync(fullPath, {withFileTypes: true})
  for (let dirent of list) {
    if (dirent.isDirectory()) {
      result.children.push(getTree(join(path, dirent.name)))
    } else {
      const filename = parse(dirent.name)
      const filepath = join(fullPath, dirent.name)
      
      const {content, data} = read(filepath)

      if (filename.name !== 'index') {
        result.children.push({
          ...data,
          path: join('/', path, filename.name),
          content
        })
      } else {
        result = {
          ...result,
          ...data,
          content
        }
      }
    }
  }
  return result
})

export const getMenu = memoize((node) => {
  if (!node) {
    node = getTree()
  }
  return {
    path: node.path,
    name: node.name,
    thumbnail: node.thumbnail || null,
    children: (node.children || []).map(child => getMenu(child))
  }
})

export const findNode = memoize((node, path) => {
  if (node.path === path) return node

  for (let child of node.children || []) {
    if (path.indexOf(child.path) === 0) {
      const match = findNode(child, path)
      if (match) return match
    }
  }
})
