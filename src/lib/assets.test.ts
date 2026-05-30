import { fallbackToRootAsset, resolveAssetPath } from './assets.js'
import { resetAssetBase, setAssetBase } from '../test/mocks/app-paths.js'

afterEach(() => {
  resetAssetBase()
})

test('resolveAssetPath prefixes root-relative paths with the configured asset base', () => {
  setAssetBase('/oddments')
  expect(resolveAssetPath('/covers/game.webp')).toBe('/oddments/covers/game.webp')
})

test('resolveAssetPath leaves external and relative paths unchanged', () => {
  setAssetBase('/oddments')
  expect(resolveAssetPath('https://example.com/cover.webp')).toBe('https://example.com/cover.webp')
  expect(resolveAssetPath('covers/game.webp')).toBe('covers/game.webp')
})

test('fallbackToRootAsset strips the configured asset base from failed images', () => {
  setAssetBase('/oddments')
  const img = document.createElement('img')
  img.setAttribute('src', '/oddments/covers/game.webp')
  const event = new Event('error')
  Object.defineProperty(event, 'currentTarget', { value: img })

  fallbackToRootAsset(event)

  expect(img.getAttribute('src')).toBe('/covers/game.webp')
})
