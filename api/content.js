const { readdirSync } = require('fs')
const { join, parse } = require('path')
const { read } = require('gray-matter')
const memoize = require('fast-memoize')

const getPaths = memoize((dirs = []) => {
  const path = join(process.cwd(), 'content', dirs.join('/'))
  const list = readdirSync(path, {withFileTypes: true})

  let paths = []
  for (dirent of list) {
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

const getPath = memoize((slugs = []) => {
  const paths = getPaths()
  const url = ['', ...slugs].join('/')
  return paths.find(p => p.path === url || p.path === url + '/')
})

module.exports = { getPaths, getPath }
