import { useEffect, useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import 'katex/dist/katex.min.css'
import { POSTS } from '../data/posts'
import type { Post } from '../data/posts'
import Reveal from '../components/Reveal'
import PostCard from '../components/PostCard'
import { useTilt } from '../hooks/useTilt'

/** 把标题转成稳定 id（保留中文），供目录与锚点定位 */
function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
}

/** 从 markdown 正文提取 h2 标题，生成目录并做滚动高亮 */
function Toc({ post }: { post: Post }) {
  const headings = useMemo(
    () =>
      (post.content.match(/^##\s+.+$/gm) ?? []).map((line) => {
        const text = line.replace(/^##\s+/, '').trim()
        return { id: slugify(text), text }
      }),
    [post.content],
  )

  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id, headings])

  if (headings.length === 0) return null

  const scrollTo = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <aside className="toc" aria-label="文章目录">
        <div className="toc-title">目录</div>
        <div className="toc-list">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`toc-link${activeId === h.id ? ' toc-link-active' : ''}`}
              onClick={scrollTo(h.id)}
            >
              {h.text}
            </a>
          ))}
        </div>
      </aside>

      {/* 移动端：横向滚动目录条 */}
      <div className="toc-mobile" aria-label="文章目录（移动端）">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`toc-mobile-link${activeId === h.id ? ' toc-mobile-active' : ''}`}
            onClick={scrollTo(h.id)}
          >
            {h.text}
          </a>
        ))}
      </div>
    </>
  )
}

/** 相关文章：按共同标签推荐，最多 3 篇 */
function RelatedPosts({ post }: { post: Post }) {
  const related = POSTS.filter(
    (p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)),
  ).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">Keep Reading</div>
          <h2 className="section-title" style={{ fontSize: 26, marginBottom: 28 }}>
            相关<span className="gradient-text">推荐</span>
          </h2>
        </Reveal>
        <div className="post-grid">
          {related.map((p, i) => (
            <PostCard key={p.id} post={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const index = POSTS.findIndex((p) => p.id === id)
  const post = POSTS[index]

  // 切换文章时回到顶部
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!post) {
    return (
      <main className="page-fade post-page">
        <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔭</div>
          <h1 style={{ marginBottom: 12 }}>这篇文章飘走了</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>它可能还没写出来，或者链接有误。</p>
          <Link to="/" className="btn btn-primary">
            回到首页
          </Link>
        </div>
      </main>
    )
  }

  const prev = POSTS[index - 1]
  const next = POSTS[index + 1]
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLButtonElement>()

  return (
    <main className="page-fade post-page">
      <Toc post={post} />

      <div className="container">
        <div className="post-hero">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
              {post.tags.map((t) => (
                <span key={t} className="tag tag-active">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="post-hero-title">
              <span style={{ marginRight: 10 }}>{post.emoji}</span>
              {post.title}
            </h1>
            <div className="post-hero-meta">
              <span>📅 {post.date}</span>
              <span>☕ {post.readTime}</span>
              <span>✍️ 等等</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <article className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
              components={{
                h2: ({ children }) => (
                  <h2 id={slugify(String(children ?? ''))}>{children}</h2>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <nav className="post-nav" aria-label="文章导航">
            {prev ? (
              <Link to={`/post/${prev.id}`} className="post-nav-card">
                <span className="post-nav-label">← 上一篇</span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/post/${next.id}`} className="post-nav-card next">
                <span className="post-nav-label">下一篇 →</span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            )}
          </nav>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', margin: '48px 0 40px' }}>
            <button
              className="btn btn-primary"
              ref={ref}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onClick={() => navigate('/')}
            >
              <span className="magnetic-inner">← 回到全部文章</span>
            </button>
          </div>
        </Reveal>
      </div>

      <RelatedPosts post={post} />
    </main>
  )
}