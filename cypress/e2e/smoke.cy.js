describe('smoke test', () => {
  const specificallyTested = ['/intresse']
  describe('gui', () => {
    let content
    before(() =>
      cy.request('/api').then((response) => {
        content = response.body
      })
    )
    it('renders all (non-specifically tested) pages', () => {
      const traverse = (node) => {
        if (!specificallyTested.includes(node.path)) {
          cy.visit(node.path)
        }
        if (node.children) {
          node.children.forEach((child) => traverse(child))
        }
      }
      traverse(content)
    })
  })
})
