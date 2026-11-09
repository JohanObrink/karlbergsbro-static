import { test } from '@playwright/test'

test.describe('smoke test', () => {
  test('renders all (non-specifically tested) pages', async ({
    page,
    request,
  }) => {
    const specificallyTested = ['/intresse']

    const response = await request.get('/api')
    const content = await response.json()

    const traverse = async (node) => {
      if (!specificallyTested.includes(node.path)) {
        await page.goto(node.path)
      }
      if (node.children) {
        for (const child of node.children) {
          await traverse(child)
        }
      }
    }
    await traverse(content)
  })
})
