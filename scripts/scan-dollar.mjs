import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(ROOT, 'src/content/posts')

let files = 0
let count = 0
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue
  const t = fs.readFileSync(path.join(dir, f), 'utf8')
  const body = t.replace(/^---[\s\S]*?---\r?\n?/, '')
  // 剔除代码块里的 $，再数剩下的 $（KaTeX 行内/独立的非 $$ 美元符）
  const noCode = body.replace(/```[\s\S]*?```/g, '')
  const singles = (noCode.match(/\$/g) || []).length
  if (singles > 0) {
    files++
    count += singles
    // 找出这些 $ 所在行，便于判断是否是行内公式
    const lines = noCode.split(/\r?\n/)
    const hits = lines
      .map((l, i) => (l.includes('$') ? i + 1 + ': ' + l.trim().slice(0, 80) : null))
      .filter(Boolean)
    console.log('##', f, '单$数:', singles)
    hits.slice(0, 6).forEach((h) => console.log('   ', h))
  }
}
console.log('含孤立$文件数:', files, '总数:', count)