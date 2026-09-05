import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PostCard, { SectionHeader } from '../components/PostCard'
import { POSTS, SITE_STATS, SKILLS, TAGS, TOOLS_USED } from '../data/posts'
import { useTypewriter } from '../hooks/useTypewriter'
import { useMagnetic } from '../hooks/useMagnetic'
import { useTilt } from '../hooks/useTilt'

const ROLES = ['后端工程师', '云原生爱好者', '容器化实践者', '深夜写作者']

function Hero() {
  const text = useTypewriter(ROLES)
  const primary = useMagnetic<HTMLButtonElement>(0.3)
  const ghost = useMagnetic<HTMLButtonElement>(0.3)
  const navigate = useNavigate()

  const goPosts = () => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <span className="float-chip" style={{ top: '14%', right: '6%', animationDelay: '-2s' }}>
        Go
      </span>
      <span className="float-chip" style={{ top: '20%', right: '22%', animationDelay: '-4s' }}>
        Redis
      </span>
      <span className="float-chip" style={{ top: '37%', right: '9%', animationDelay: '-3s' }}>
        Docker
      </span>
      <span className="float-chip" style={{ top: '44%', right: '24%', animationDelay: '-5s' }}>
        Python
      </span>
      <span className="float-chip" style={{ top: '62%', right: '8%', animationDelay: '-1s' }}>
        Linux
      </span>
      <span className="float-chip" style={{ top: '70%', right: '20%', animationDelay: '-4s' }}>
        Git
      </span>

      <div className="container hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          欢迎来到我的数字花园
        </div>

        <h1 className="hero-title">
          你好，我是<span className="gradient-text"> 等等 </span>✨
        </h1>

        <div className="hero-typing">
          我是一名{text}
          <span className="typewriter-caret" />
        </div>

        <p className="hero-desc">
          在这里，我记录后端开发、云原生运维与生活碎片的思考。大多是踩坑笔记，
          偶尔也有一点值得留下的东西。
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            ref={primary.ref}
            onMouseMove={primary.onMouseMove}
            onMouseLeave={primary.onMouseLeave}
            onClick={goPosts}
          >
            <span className="magnetic-inner">
              开始阅读
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
          <button
            className="btn btn-outline"
            ref={ghost.ref}
            onMouseMove={ghost.onMouseMove}
            onMouseLeave={ghost.onMouseLeave}
            onClick={() => navigate('/resume')}
          >
            <span className="magnetic-inner">查看我的简历</span>
          </button>
        </div>

        <div className="hero-stats">
          {SITE_STATS.map((s) => (
            <div key={s.label}>
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="hero-scroll-wheel" />
        向下滚动
      </div>
    </section>
  )
}

function Featured() {
  const post = POSTS.find((p) => p.featured)
  const navigate = useNavigate()
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>()
  if (!post) return null

  return (
    <Reveal>
      <div
        ref={ref}
        className="featured-card tilt"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <div className="featured-cover">
          <span className="featured-cover-emoji">{post.emoji}</span>
        </div>
        <div className="featured-body">
          <span className="featured-tag">精选 · FEATURED</span>
          <h3 className="featured-title">{post.title}</h3>
          <p className="featured-excerpt">{post.excerpt}</p>
          <div className="post-card-foot" style={{ border: 'none', padding: 0 }}>
            <span>
              {post.date} · ☕ {post.readTime}
            </span>
            <span className="post-card-readmore">
              阅读全文
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Posts() {
  const [tag, setTag] = useState<string>('全部')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byTag = tag === '全部' ? POSTS : POSTS.filter((p) => p.tags.includes(tag))
    if (!q) return byTag
    return byTag.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [tag, query])

  return (
    <section className="section" id="posts">
      <div className="container">
        <SectionHeader
          eyebrow="Blog / 写作"
          title={<>最新<span className="gradient-text">文章</span></>}
          desc="关于后端开发、云原生与折腾服务器的长期记录。点击卡片进入全文，每一篇都值得一个安静的下午。"
        />

        <Reveal delay={0.1}>
          <div className="post-toolbar">
            <div className="input-wrap">
              <input
                className="input post-search"
                type="search"
                placeholder="搜索标题、标签或摘要…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="搜索文章"
              />
            </div>
            <div className="filter-row">
              {TAGS.map((t) => (
                <button key={t} className={`tag${tag === t ? ' tag-active' : ''}`} onClick={() => setTag(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {query.trim() && (
          <p className="post-search-count">
            找到 {filtered.length} 篇
            {tag !== '全部' ? `（分类：${tag}）` : ''}
          </p>
        )}

        <div className="post-grid">
          {filtered.map((post, i) => (
            <PostCard key={post.id} post={post} delay={(i % 3) * 0.08} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="post-search-empty">没有匹配「{query}」的文章。</p>
        )}
      </div>
    </section>
  )
}

function About() {
  const navigate = useNavigate()
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="About / 关于"
          title={<>关于<span className="gradient-text">我</span></>}
        />
        <div className="about-grid">
          <Reveal>
            <div className="about-avatar-ring">
              <div className="about-avatar-ring-static" />
              <div className="about-avatar">
                <img src="/avatar.png" alt="等等的头像" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <p className="about-line">
                我是等等，主要写 Go 和 Python，也会点前端、运维。
              </p>
              <p className="about-line">
                前端是 React + TypeScript，基本AI写的。
                页面能看就行(•‿•)。
              </p>
              <div className="about-skills">
                {SKILLS.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
              <div className="about-actions">
                <button className="btn btn-outline" onClick={() => navigate('/resume')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M9 13l2 2 4-4" />
                  </svg>
                  查看我的简历
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="about-tools" delay={0.1}>
          <h3 className="about-tools-title">
            用过的<span className="gradient-text">东西</span>
            <span className="about-tools-sub">学过的、踩过坑的，都在这里</span>
          </h3>
          <ul className="about-tools-list">
            {TOOLS_USED.map((t) => (
              <li className="about-tools-item" key={t.name}>
                <span className="about-tools-name">{t.name}</span>
                <span className="about-tools-level" data-level={t.level}>{t.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Connect() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="subscribe-box">
            <div className="subscribe-inner">
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}>RSS</div>
              <h2 className="section-title">不用订阅框，<span className="gradient-text">用 RSS</span></h2>
              <p className="section-desc" style={{ marginInline: 'auto' }}>
                这是个纯静态网站——后端工程师偶尔也客串前端，所以这里没有后端服务，也没有邮件列表。
                把 RSS 源丢进你的阅读器，更新就会自己找上门。
              </p>
              <div className="connect-row">
                <a className="btn btn-primary" href="/feed.xml" target="_blank" rel="noreferrer">
                  📡 订阅 RSS
                </a>
              </div>
              <p className="connect-hint">复制 feed.xml 地址，粘贴到任何 RSS 阅读器即可。</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="page-fade">
      <Hero />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionHeader
            eyebrow="Featured / 精选"
            title={<>近期<span className="gradient-text">精选</span></>}
          />
          <Featured />
        </div>
      </section>
      <Posts />
      <About />
      <Connect />
    </main>
  )
}
