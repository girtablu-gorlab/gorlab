import { asset } from '$app/paths'

export function resolveAssetPath(path: string | null | undefined): string {
  if (!path) return ''
  return path.startsWith('/') ? asset(path) : path
}

export function fallbackToRootAsset(event: Event) {
  const element = event.currentTarget
  if (!(element instanceof HTMLImageElement)) return

  const src = element.getAttribute('src') ?? ''
  const assetBase = asset('/').replace(/\/$/, '')
  if (!assetBase || !src.startsWith(`${assetBase}/`)) return

  element.src = src.slice(assetBase.length)
}
