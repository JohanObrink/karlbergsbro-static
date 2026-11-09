import { expect, test } from '@playwright/test'

test.describe('/intresse', () => {
  test('is not reachable (hidden with _ prefix)', async ({ request }) => {
    const response = await request.get('/intresse')
    expect(response.status()).toBe(404)
  })
})

// Page is temporarily hidden (content/_intresse.md). Re-enable this suite
// (remove .skip) once the page is unhidden again.
test.describe
  .skip('/intresse (mail form, page currently hidden)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/intresse')
    })

    test('renders', async () => {
      // no assertions: just verifies the page loads without erroring
    })

    const fields = {
      name: 'Rosa Ragnarsson',
      address: 'Hånger nygård',
      postal_address: '115 21 STOCKHOLM',
      email: 'rosa.ragnarsson@mailinator.com',
      phone: '08-6709459',
      occupation: 'Företagssäljare',
      year_of_birth: '1964',
      has_summer_home: 'Nej',
      motivation: 'Det vore kul',
    }

    test.describe('mail form', () => {
      for (const key of Object.keys(fields)) {
        test(`fails if [${key}] is missing`, async ({ page }) => {
          const entries = Object.entries(fields).filter(
            ([field]) => field !== key,
          )
          for (const [field, value] of entries) {
            await page.locator(`[name="${field}"]`).fill(String(value))
          }
          await page.locator('[type="submit"]').click()
          await expect(
            page.locator('input:invalid, textarea:invalid'),
          ).toHaveCount(1)
        })
      }

      test('succeeds if all required fields are entered', async ({ page }) => {
        for (const [field, value] of Object.entries(fields)) {
          await page.locator(`[name="${field}"]`).fill(String(value))
        }
        await page.locator('[type="submit"]').click()
      })

      test('succeeds if all fields are entered', async ({ page }) => {
        for (const [field, value] of Object.entries(fields)) {
          await page.locator(`[name="${field}"]`).fill(String(value))
        }
        await page.locator('[name="number_of_kids"]').fill('1')
        await page.locator('[name="kids_years_of_birth"]').fill('2001')
        await page.locator('[type="submit"]').click()
      })
    })
  })
