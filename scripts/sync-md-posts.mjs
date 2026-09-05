#!/usr/bin/env node
/**
 * 把 OneDrive 文档/MD 里的 md 笔记批量转为博客文章：
 * - 生成 frontmatter（id/title/excerpt/date/readTime/tags/emoji）
 * - 复制引用的本地图片到 public/posts/<id>/ 并重写路径
 * - 输出到 src/content/posts/<id>.md（已存在的跳过，防止覆盖精修文章）
 * 用法：node scripts/sync-md-posts.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = 'C:/Users/KYDSZ/OneDrive/文档/MD'
const OUT_POSTS = path.join(ROOT, 'src/content/posts')
const OUT_IMG = path.join(ROOT, 'public/posts')

// 已经是博客里精修过的原始笔记，跳过（对应的精修稿：git-undo / http-url-anatomy / docker-debian / ansible-kubespray-k8s / k8s-cluster-notes）
const SKIP = new Set([
  'DevOps/Ansible 部署 Kubernetes 笔记（基于 Kubespray）.MD',
  'DevOps/Kubernetes 集群实操总结笔记.MD',
  'Git/Git.md',
  'http.md',
  'debian安装docker.md',
])

// 按文件夹分组 -> 标签 + 默认 emoji
const GROUP = {
  AcWing: { tags: ['算法'], emoji: '💻' },
  洛谷: { tags: ['算法'], emoji: '💻' },
  力扣: { tags: ['算法'], emoji: '💻' },
  Dotcpp: { tags: ['算法'], emoji: '💻' },
  牛客: { tags: ['算法'], emoji: '💻' },
  蓝桥杯官网: { tags: ['算法'], emoji: '💻' },
  'C++代码': { tags: ['C++'], emoji: '🔧' },
  代码模板: { tags: ['C++'], emoji: '🔧' },
  数据结构: { tags: ['C++'], emoji: '🔧' },
  数学: { tags: ['数学'], emoji: '📐' },
  笔记: { tags: ['笔记'], emoji: '📓' },
  Linux学习: { tags: ['运维'], emoji: '🐧' },
  sql: { tags: ['后端'], emoji: '🗄️' },
  Git: { tags: ['工具'], emoji: '🌿' },
}

// 顶层文件按文件名匹配
const FILE_RULES = [
  [/^debian|^docker/, ['运维'], '🐳'],
  [/^django/, ['后端'], '🛠️'],
  [/hexo/, ['前端'], '📝'],
  [/easyX/, ['C++'], '🎨'],
  [/^raw图库/, ['工具'], '🖼️'],
  [/tesstrain/, ['工具'], '🛠️'],
  [/^Renbat/, ['工具'], '🛠️'],
  [/^dome/, ['C++'], '🔧'],
  [/^dp/, ['算法'], '💻'],
  [/ttyd/i, ['运维'], '🖥️'],
  [/日月双塔/, ['生活'], '🏯'],
]

function slugify(name) {
  return name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
}

function walk(dir, rel = '', out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name)
    const relPath = rel ? `${rel}/${ent.name}` : ent.name
    if (ent.isDirectory()) {
      walk(abs, relPath, out)
    } else {
      const ext = path.extname(ent.name).toLowerCase()
      const isMd = ext === '.md'
      const isNoExt = ext === '' && ent.name.toLowerCase() === 'ttyd'
      if (isMd || isNoExt) out.push({ abs, relPath })
    }
  }
  return out
}

function inferMeta(rel) {
  const parts = rel.replace(/\\/g, '/').split('/')
  for (let i = parts.length - 1; i >= 0; i--) {
    const g = GROUP[parts[i]]
    if (g) return g
  }
  const fname = parts[parts.length - 1]
  for (const [re, tags, emoji] of FILE_RULES) {
    if (re.test(fname)) return { tags, emoji }
  }
  return { tags: ['笔记'], emoji: '📄' }
}

function prefixFor(relDir) {
  if (!relDir) return ''
  const parts = relDir.split('/')
  const known = parts.find((p) => GROUP[p])
  return slugify(known ?? parts[parts.length - 1])
}

function resolveImg(src, fileDir) {
  let p = src.trim()
  if (!p || p.startsWith('data:') || /^https?:\/\//i.test(p)) return null
  if (/^[A-Za-z]:[\\/]/.test(p) || /^(\\\\|\/\/)/.test(p)) {
    return fs.existsSync(p) ? p : null
  }
  const abs = path.resolve(fileDir, p)
  return fs.existsSync(abs) ? abs : null
}

/** 迁移 md 里的图片引用到 public/posts/<id>/，返回 {text, copied, missing} */
function migrateImages(raw, fileAbs, postId) {
  const fileDir = path.dirname(fileAbs)
  let copied = 0
  const missing = []
  const collected = new Map() // basename -> 源绝对路径（首个出现优先）

  let text = raw.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => {
    const abs = resolveImg(src, fileDir)
    if (!abs) {
      missing.push(src)
      return ''
    }
    const base = path.basename(abs)
    if (!collected.has(base)) collected.set(base, abs)
    return `![${alt}](/posts/${postId}/${base})`
  })

  text = text.replace(/<img[^>]*>/gi, (tag) => {
    const m = tag.match(/src=["']([^"']+)["']/)
    if (!m) return tag
    const abs = resolveImg(m[1], fileDir)
    if (!abs) {
      missing.push(m[1])
      return ''
    }
    const base = path.basename(abs)
    if (!collected.has(base)) collected.set(base, abs)
    return tag.replace(m[1], `/posts/${postId}/${base}`)
  })

  for (const [base, abs] of collected) {
    const imgDir = path.join(OUT_IMG, postId)
    fs.mkdirSync(imgDir, { recursive: true })
    const target = path.join(imgDir, base)
    if (!fs.existsSync(target)) {
      fs.copyFileSync(abs, target)
      copied++
    }
  }
  return { text, copied, missing }
}

function firstParagraph(raw) {
  for (const ln of raw.split(/\r?\n/)) {
    const l = ln.trim()
    if (!l || /^#{1,6}\s/.test(l) || l.startsWith('```') || /^!\[/.test(l)) continue
    const clean = l
      .replace(/[*_`#>|]+/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .trim()
    if (!clean) continue
    return clean.length > 90 ? clean.slice(0, 90) + '…' : clean
  }
  return ''
}

function readTimeOf(raw) {
  const chars = raw.replace(/```[\s\S]*?```/g, '').length
  return `${Math.max(1, Math.round(chars / 300))} min`
}

// ---------- 主流程 ----------
const files = walk(SRC).filter((f) => !SKIP.has(f.relPath.replace(/\\/g, '/')))

const created = []
const skippedExisting = []
const emptyBodies = []
let imgCopied = 0
const imgMissing = []

for (const f of files) {
  const rel = f.relPath.replace(/\\/g, '/')
  let raw = fs.readFileSync(f.abs, 'utf8').replace(/^\uFEFF/, '')
  if (!raw.trim()) continue

  const base = path.basename(rel).replace(/\.[^.]+$/, '')
  const relDir = rel.split('/').slice(0, -1).join('/')
  const id = prefixFor(relDir) ? `${prefixFor(relDir)}-${slugify(base)}` : slugify(base)

  // 标签决定输出子文件夹（沿用前端 TAGS 分类）
  const meta = inferMeta(rel)
  const primaryTag = meta.tags[0] || '笔记'
  const target = path.join(OUT_POSTS, primaryTag, `${id}.md`)
  if (fs.existsSync(target)) {
    skippedExisting.push(id)
    continue
  }

  // 标题：首个标题优先，否则用文件名
  const titleMatch = raw.match(/^#{1,3}\s+(.+)$/m)
  const title = (titleMatch ? titleMatch[1].trim() : base).replace(/`/g, '').trim()

  const excerpt = firstParagraph(raw)
  const date = fs.statSync(f.abs).mtime.toISOString().slice(0, 10)
  const readTime = readTimeOf(raw)

  const { text, copied, missing } = migrateImages(raw, f.abs, id)
  imgCopied += copied
  for (const m of missing) imgMissing.push(`${rel} -> ${m}`)

  const body = text.trimEnd()
  if (!body.trim()) {
    emptyBodies.push(id)
    continue
  }

  const fm = [
    '---',
    `id: ${JSON.stringify(id)}`,
    `title: ${JSON.stringify(title)}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `date: ${JSON.stringify(date)}`,
    `readTime: ${JSON.stringify(readTime)}`,
    `tags: [${meta.tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    `emoji: ${JSON.stringify(meta.emoji)}`,
    '---',
    '',
  ].join('\n')

  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, fm + body + '\n', 'utf8')
  created.push(id)
}

console.log(`扫描来源: ${files.length} 个文件`)
console.log(`新增文章: ${created.length}`)
console.log(`已存在跳过: ${skippedExisting.length} -> ${skippedExisting.join(', ')}`)
console.log(`空正文跳过: ${emptyBodies.length} -> ${emptyBodies.join(', ')}`)
console.log(`复制图片: ${imgCopied}`)
if (imgMissing.length) {
  console.log(`缺失图片 ${imgMissing.length} 处:`)
  imgMissing.slice(0, 30).forEach((m) => console.log(`  - ${m}`))
  if (imgMissing.length > 30) console.log(`  ... 其余 ${imgMissing.length - 30} 处略`)
}