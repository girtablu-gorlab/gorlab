export const base = ''
export const assets = ''

let assetBase = ''

export function setAssetBase(path: string) {
  assetBase = path
}

export function resetAssetBase() {
  assetBase = ''
}

export function resolve(path: string) {
  return path
}

export function asset(file: string) {
  return `${assetBase}${file}`
}
