export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="nav-logo" style={{ fontSize: 16 }}>
          <img className="nav-logo-avatar" src="/avatar.png" alt="等等" />
          <span>
            等等<span className="gradient-text">.blog</span>
          </span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/kydsz" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.05.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub
          </a>
          <a href="mailto:kydsz@qq.com">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            邮箱
          </a>
          <a href="/#posts" onClick={(e) => { e.preventDefault(); document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' }) }}>
            文章归档
          </a>
        </div>
        <div className="footer-copy">© 2026 等等 · 用 React + TypeScript 打造</div>
      </div>
    </footer>
  )
}
