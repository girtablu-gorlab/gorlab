import { parseOddments } from '$lib/oddments.js'
import { config } from '$lib/catalog.js'

export const prerender = true

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET({ url }) {
  const exhibits = parseOddments('oddments', config.customFields)
  const base = url.origin + (url.pathname.replace(/\/feed\.xml$/, '') || '')

  const items = exhibits.map(exhibit => `
    <item>
      <title>${escapeXml(exhibit.name ?? '')}</title>
      <description>${escapeXml(exhibit.summary ?? '')}</description>
      <link>${base}/exhibit/${exhibit.slug}/</link>
      <guid isPermaLink="true">${base}/exhibit/${exhibit.slug}/</guid>
      <pubDate>${new Date(exhibit.date + 'T00:00:00Z').toUTCString()}</pubDate>
      ${exhibit.author ? `<author>${escapeXml(exhibit.author)}</author>` : ''}
      ${exhibit.category.map(c => `<category>${escapeXml(c)}</category>`).join('\n      ')}
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.title)}</title>
    <description>${escapeXml(config.description)}</description>
    <link>${base}/</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
