import { test, expect, type Page } from '@playwright/test'

async function waitForCards(page: Page) {
  await page.locator('article.card').first().waitFor({ timeout: 10000 })
}

async function openFiltersIfCollapsed(page: Page) {
  const btn = page.getByRole('button', { name: 'Filters' })
  if (await btn.isVisible()) await btn.click()
}

test.describe('catalog page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('.')
    await waitForCards(page)
  })

  test('loads with cards visible', async ({ page }) => {
    const cards = page.locator('article.card')
    await expect(cards.first()).toBeVisible()
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('tag cloud category filter narrows results', async ({ page }) => {
    const cards = page.locator('article.card')
    const total = await cards.count()

    const tagCloud = page.getByRole('group', { name: 'Filter by category' })
    await tagCloud.getByRole('button').filter({ hasNotText: 'All' }).first().click()

    await expect(async () => {
      const filtered = await cards.count()
      expect(filtered).toBeGreaterThan(0)
      expect(filtered).toBeLessThan(total)
    }).toPass({ timeout: 10000 })

    await tagCloud.getByRole('button', { name: 'All' }).click()

    await expect(async () => {
      expect(await cards.count()).toBe(total)
    }).toPass({ timeout: 10000 })
  })

  test('pagination is hidden when all exhibits fit on one page', async ({ page }) => {
    await expect(page.locator('nav[aria-label*="pagination"]')).not.toBeVisible()
  })

  test('category URL param pre-filters results', async ({ page }) => {
    const tagCloud = page.getByRole('group', { name: 'Filter by category' })
    const categoryButton = tagCloud.getByRole('button').filter({ hasNotText: 'All' }).first()
    const category = (await categoryButton.textContent())!.trim()

    await page.goto(`./?category=${encodeURIComponent(category)}`)
    await waitForCards(page)

    for (const card of await page.locator('article.card').all()) {
      const chipTexts = await card.locator('.chip').allTextContents()
      expect(chipTexts.some(t => t.trim().toLowerCase() === category.toLowerCase())).toBe(true)
    }
  })
})
