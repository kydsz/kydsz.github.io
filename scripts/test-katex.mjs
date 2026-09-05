import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import { visit } from 'unist-util-visit'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(ROOT, 'src/content/posts')

const targets = process.argv.slice(2)
const files = targets.length
  ? targets
  : ['代码模板-数据结构.md', '数学-数学公式.md', '笔记-大一上期末英语中文.md', 'Linux学习-Linux学习.md', 'tesstrain训练模型环境准备.md']

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)

for (const f of files) {
  const p = path.join(dir, f)
  if (!fs.existsSync(p)) { console.log('跳过(不存在):', f); continue }
  const raw = fs.readFileSync(p, 'utf8')
  const body = raw.replace(/^---[\s\S]*?---\r?\n?/, '')
  try {
    const tree = processor.parse(body)
    await processor.run(tree)
    console.log('OK  :', f)
  } catch (e) {
    console.log('FAIL:', f, '->', e.message.split('\n')[0])
  }
}