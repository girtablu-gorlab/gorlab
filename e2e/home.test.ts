import { test, expect, type Page } from '@playwright/test'

async function waitForCards(page: Page) {
  await page.locator('article.card').first().waitFor({ timeout: 10000 })
}

async function waitForCardCount(page: Page, expected: number) {
  await expect(async () => {
    expect(await page.locator('article.card').count()).toBe(expected)
  }).toPass({ timeout: 10000 })
}

test.describe('home page — with cards', () => {
  test('inline search input filters cards by text', async ({ page }) => {
    await page.goto('.')
    await waitForCards(page)
    const total = await page.locator('article.card').count()

    await page.getByLabel('Search exhibits').fill('black')

    await expect(async () => {
      const count = await page.locator('article.card').count()
      expect(count).toBeGreaterThan(0)
      expect(count).toBeLessThan(total)
    }).toPass({ timeout: 10000 })
  })

  test('category filter and search query combine correctly', async ({ page }) => {
    await page.goto('.')
    await waitForCards(page)
    const total = await page.locator('article.card').count()

    // Apply category filter
    const tagCloud = page.getByRole('group', { name: 'Filter by category' })
    await tagCloud.getByRole('button', { name: 'RPG' }).click()

    await expect(async () => {
      const count = await page.locator('article.card').count()
      expect(count).toBeGreaterThan(0)
      expect(count).toBeLessThan(total)
    }).toPass({ timeout: 10000 })

    const rpgCount = await page.locator('article.card').count()

    // Add a text search on top of the category filter
    await page.getByLabel('Search exhibits').fill('black')

    await expect(async () => {
      const count = await page.locator('article.card').count()
      expect(count).toBeGreaterThan(0)
      expect(count).toBeLessThan(rpgCount)
    }).toPass({ timeout: 10000 })
  })

  test('?tag= URL param applies tag filter and shows tag chip', async ({ page }) => {
    // rules-lite tag exists only on The Black Hack fixture
    await page.goto('./?tag=rules-lite')
    await waitForCards(page)

    expect(await page.locator('article.card').count()).toBe(1)
    await expect(page.getByRole('button', { name: /Clear tag filter: rules-lite/i })).toBeVisible()
  })

  test('clearing the tag chip restores all results', async ({ page }) => {
    await page.goto('./?tag=rules-lite')
    await waitForCards(page)

    const filtered = await page.locator('article.card').count()

    await page.getByRole('button', { name: /Clear tag filter/i }).click()

    await expect(async () => {
      const count = await page.locator('article.card').count()
      expect(count).toBeGreaterThan(filtered)
    }).toPass({ timeout: 10000 })

    await expect(page.getByRole('button', { name: /Clear tag filter/i })).not.toBeVisible()
  })

  test('tag link on exhibit page navigates home with ?tag= filter applied', async ({ page }) => {
    // The Black Hack fixture has tag 'rules-lite' — navigate to it and click the tag
    await page.goto('.')
    await waitForCards(page)

    await page.getByRole('link', { name: /The Black Hack/i }).first().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const tagLink = page.getByRole('link', { name: 'rules-lite' })
    await expect(tagLink).toBeVisible()
    await tagLink.click()

    await expect(page).toHaveURL(/[?&]tag=rules-lite/)
    await waitForCards(page)
    expect(await page.locator('article.card').count()).toBe(1)
  })

  test('URL params reflect active filter state', async ({ page }) => {
    await page.goto('.')
    await waitForCards(page)

    await page.getByRole('group', { name: 'Filter by category' }).getByRole('button', { name: 'RPG' }).click()

    await expect(page).toHaveURL(/[?&]category=RPG/)
  })

  test('navigating to ?category= URL restores filter state', async ({ page }) => {
    await page.goto('./?category=Adventure')
    await waitForCards(page)

    const cards = page.locator('article.card')
    const total = await cards.count()
    expect(total).toBeGreaterThan(0)

    for (const card of await cards.all()) {
      const chipTexts = await card.locator('.chip').allTextContents()
      expect(chipTexts.some(t => t.trim() === 'Adventure')).toBe(true)
    }
  })
})

test.describe('home page — no cards', () => {
  test.skip(
    true,
    'Empty catalog requires a separate build with ODDMENTS_DIR pointing to an empty directory. ' +
    'Visual coverage is provided by the Storybook "Empty" story in Pages/Home.'
  )

  test('shows empty state message without errors', async ({ page }) => {
    await page.goto('.')
    await expect(page.getByText(/no exhibits in the catalog yet/i)).toBeVisible()
    await expect(page.locator('article.card')).toHaveCount(0)
  })
})
