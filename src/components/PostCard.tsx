import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { POSTS } from '../data/posts'
import { useNavigate } from 'react-router-dom'
import { useTilt } from '../hooks/useTilt'

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: ReactNode; desc?: string }) {
  return (
    <Reveal>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </Reveal>
  )
}

function PostCard({ post, delay }: { post: (typeof POSTS)[number]; delay: number }) {
  const navigate = useNavigate()
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>()

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="card card-hover post-card tilt"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <div className="post-card-top">
          <span className="tag">{post.tags[0]}</span>
          <span className="post-card-date">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="16" rx="3" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            {post.date}
          </span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-foot">
          <span>☕ {post.readTime}</span>
          <span className="post-card-readmore">
            阅读全文
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Reveal>
  )
}

export default PostCard
