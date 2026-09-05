export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  emoji: string
  featured?: boolean
  /** Markdown 正文 */
  content: string
}

/* ---------- markdown 文章加载：frontmatter + 正文 ---------- */

const modules = import.meta.glob('../content/posts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

interface PostMeta {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  emoji: string
  featured?: boolean
}

/** 解析简单的 YAML frontmatter（key: value / 数组 / 布尔），返回元数据与正文 */
function parseFrontmatter(raw: string): { data: PostMeta; content: string } {
  const matched = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!matched) {
    return { data: { id: '', title: '', excerpt: '', date: '', readTime: '', tags: [], emoji: '' }, content: raw }
  }

  const [, fm, body] = matched
  const values: Record<string, unknown> = {}

  for (const line of fm.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      values[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
      continue
    }
    if (value === 'true') {
      values[key] = true
      continue
    }
    if (value === 'false') {
      values[key] = false
      continue
    }
    if (value.startsWith('"') && value.endsWith('"')) {
      try {
        values[key] = JSON.parse(value)
        continue
      } catch {
        // fallthrough：当作普通字符串
      }
    }
    values[key] = value.replace(/^['"]|['"]$/g, '')
  }

  return {
    data: {
      id: String(values.id ?? ''),
      title: String(values.title ?? ''),
      excerpt: String(values.excerpt ?? ''),
      date: String(values.date ?? ''),
      readTime: String(values.readTime ?? ''),
      tags: Array.isArray(values.tags) ? (values.tags as string[]) : [],
      emoji: String(values.emoji ?? ''),
      featured: values.featured === true ? true : undefined,
    },
    content: body.trimStart(),
  }
}

export const POSTS: Post[] = Object.entries(modules)
  .map(([, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return { ...data, content }
  })
  .filter((p) => p.id)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

/** 分类固定顺序，仅展示有文章的分类 */
const TAG_ORDER = ['云原生', '运维', '后端', '工具', '网络', '算法', 'C++', '数学', '笔记', '前端', '生活'] as const

/** 动态分类：'全部' + 实际文章中出现过的 tag（按固定顺序） */
export const TAGS: string[] = [
  '全部',
  ...Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort((a, b) => {
    const ia = TAG_ORDER.indexOf(a as (typeof TAG_ORDER)[number])
    const ib = TAG_ORDER.indexOf(b as (typeof TAG_ORDER)[number])
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  }),
]

export const SITE_STATS = [
  { num: String(POSTS.length), label: '原创文章' },
  { num: '∞', label: '好奇心' },
]

export const SKILLS = [
  'Go',
  'Python',
  'SQL / MySQL',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Ansible',
  'Linux',
]

export const TOOLS_USED = [
  { name: 'Go', level: '熟练' },
  { name: 'Python', level: '熟练' },
  { name: 'TypeScript', level: '了解' },
  { name: 'SQL / MySQL', level: '熟练' },
  { name: 'PostgreSQL', level: '掌握' },
  { name: 'Redis', level: '熟练' },
  { name: 'Linux', level: '熟练' },
  { name: 'Git', level: '熟练' },
  { name: 'Docker', level: '熟练' },
  { name: 'Ansible', level: '熟练' },
  { name: 'Vite', level: '了解' },
  { name: 'Java', level: '掌握' },
  { name: 'Vue2 / Vue3', level: '掌握' },
  { name: 'Kafka', level: '掌握' },
  { name: 'HTML / CSS / JavaScript', level: '掌握' },
  { name: 'C / C++', level: '掌握' },
  { name: 'Uniapp', level: '了解' },
  { name: 'CMake', level: '了解' },
  { name: 'Hadoop', level: '了解' },
]