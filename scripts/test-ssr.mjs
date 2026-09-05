import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(ROOT, 'src/content/posts')

for (const f of process.argv.slice(2)) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\r?\n?/, '').trimStart()
  try {
    const el = React.createElement(
      ReactMarkdown,
      { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
      body,
    )
    const html = renderToStaticMarkup(el)
    console.log('===', f, '输出长度:', html.length)
    console.log(html.slice(0, 300))
  } catch (e) {
    console.log('===', f, '抛错:', e.message.split('\n')[0])
  }
}