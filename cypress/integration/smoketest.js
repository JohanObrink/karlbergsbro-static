describe('smoke test', () => {
  describe('gui', () => {
    let content
    before(() =>
      cy.request('/api').then((response) => {
        content = response.body
      }),
    )
    it('renders all pages', () => {
      const traverse = (node) => {
        cy.visit(node.path)
        if (node.children) {
          node.children.forEach((child) => traverse(child))
        }
      }
      traverse(content)
    })
  })
})
