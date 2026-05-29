import { test, expect } from '@playwright/test'

let firstExhibitUrl: string

test.describe('exhibit detail page', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('.')
    await page.locator('article.card').first().waitFor()
    firstExhibitUrl = (await page.locator('article.card').first().getByRole('link').first().getAttribute('href'))!
    await page.close()
  })

  test('renders an exhibit title heading', async ({ page }) => {
    await page.goto(firstExhibitUrl)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('source CTA link is shown when exhibit has a source URL', async ({ page }) => {
    await page.goto(firstExhibitUrl)
    const cta = page.getByRole('link', { name: /source|get it/i }).first()
    const hasSource = await cta.isVisible()
    test.skip(!hasSource, 'first exhibit has no source link')
    const href = await cta.getAttribute('href')
    expect(href).toBeTruthy()
  })

  test('back link returns to catalog', async ({ page }) => {
    await page.goto(firstExhibitUrl)
    const backLink = page.getByRole('link', { name: '← Back to catalog' })
    await expect(backLink).toBeVisible()
    await backLink.click()
    await expect(page).toHaveURL(/\/$|\/\?/)
    await expect(page.locator('article.card').first()).toBeVisible()
  })

  test('renders cover image when cover-image is set', async ({ page }) => {
    await page.goto(firstExhibitUrl)
    const img = page.getByRole('img').first()
    const hasImg = await img.isVisible()
    test.skip(!hasImg, 'first exhibit has no cover image')
    const src = await img.getAttribute('src')
    expect(src).toBeTruthy()
  })

  test('clicking a catalog card navigates to its exhibit page', async ({ page }) => {
    await page.goto('.')
    const firstCardLink = page.locator('article.card').first().getByRole('link').first()
    await firstCardLink.click()
    await expect(page).toHaveURL(/\/exhibit\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
