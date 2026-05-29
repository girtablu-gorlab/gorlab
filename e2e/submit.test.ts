import { test, expect } from '@playwright/test'

test.describe('submission form', () => {
  let formEnabled = false

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('./submit/')
    formEnabled = await page.locator('[name="fields[name]"]').isVisible()
    await page.close()
  })

  test.beforeEach(async ({ page }) => {
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      } else {
        await route.continue()
      }
    })

    await page.goto('./submit/')
  })

  test('shows closed message when submissions are disabled', async ({ page }) => {
    test.skip(formEnabled, 'showSubmitForm is enabled — closed state not applicable')
    await expect(page.getByText('Submissions Closed')).toBeVisible()
  })

  test('renders required fields', async ({ page }) => {
    test.skip(!formEnabled, 'showSubmitForm is disabled')
    await expect(page.locator('[name="fields[name]"]')).toBeVisible()
    await expect(page.locator('[name="fields[summary]"]')).toBeVisible()
    await expect(page.locator('input[name="fields[category][]"]')).not.toBeAttached()
  })

  test('submits form with correct fields to the configured submitUrl', async ({ page }) => {
    test.skip(!formEnabled, 'showSubmitForm is disabled')
    let capturedRequest: { url: string; body: string } | null = null

    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        capturedRequest = {
          url: route.request().url(),
          body: route.request().postData() ?? '',
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        })
      } else {
        await route.continue()
      }
    })

    await page.fill('[name="fields[name]"]', 'My TTRPG Hack')
    await page.fill('[name="fields[author]"]', 'Jane Doe')
    await page.fill('[name="fields[summary]"]', 'A short form game about exploration.')

    await page.getByRole('button', { name: 'Submit Exhibit' }).click()
    await expect(page.locator('[data-testid="form-success"]')).toBeVisible()

    expect(capturedRequest).not.toBeNull()
    expect(capturedRequest!.body).toContain('My TTRPG Hack')
    expect(capturedRequest!.body).toContain('Jane Doe')
  })

  test('shows success message after successful submission', async ({ page }) => {
    test.skip(!formEnabled, 'showSubmitForm is disabled')
    await page.fill('[name="fields[name]"]', 'My Game')
    await page.fill('[name="fields[summary]"]', 'Great game.')

    await page.getByRole('button', { name: 'Submit Exhibit' }).click()
    await expect(page.locator('[data-testid="form-success"]')).toBeVisible()
  })

  test('shows error message when submission fails', async ({ page }) => {
    test.skip(!formEnabled, 'showSubmitForm is disabled')
    await page.route('**', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 500, body: 'Internal Server Error' })
      } else {
        await route.continue()
      }
    })

    await page.fill('[name="fields[name]"]', 'My Game')
    await page.fill('[name="fields[summary]"]', 'Great game.')

    await page.getByRole('button', { name: 'Submit Exhibit' }).click()
    await expect(page.locator('[data-testid="form-error"]')).toBeVisible()
  })
})
