import { projects } from '@/lib/data';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://brianmcgauley.com';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const items = projects.map((project) => {
    const url = project.demoUrl || `${BASE_URL}/projects/${project.id}`;
    return `
    <item>
      <title>${escapeXml(project.title)}</title>
      <link>${escapeXml(url)}</link>
      <description>${escapeXml(project.description)}</description>
      <guid isPermaLink="${project.demoUrl ? 'true' : 'false'}">${escapeXml(url)}</guid>
      <category>${project.tags.map(escapeXml).join(', ')}</category>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Brian McGauley – Projects &amp; Work</title>
    <link>${BASE_URL}</link>
    <description>Projects, consulting work, and development portfolio by Brian McGauley – web developer, IT consultant, and MBA student based in Fresno, CA.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/images/profile/DSC07056-2.webp</url>
      <title>Brian McGauley</title>
      <link>${BASE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
