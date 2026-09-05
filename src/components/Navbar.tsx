import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { Theme } from '../hooks/useTheme'

interface NavbarProps {
  theme: Theme
  onToggleTheme: () => void
}

const NAV_ITEMS: { id: string; label: string; to?: string }[] = [
  { id: 'home', label: '首页' },
  { id: 'posts', label: '文章' },
  { id: 'about', label: '关于' },
]

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // 高亮胶囊跟随当前链接滑动
  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return
    const target = bg.parentElement?.querySelector<HTMLAnchorElement>(
      '.nav-link[data-active="1"]',
    )
    if (target) {
      bg.style.left = `${target.offsetLeft}px`
      bg.style.width = `${target.offsetWidth}px`
      bg.style.opacity = '1'
    } else {
      bg.style.opacity = '0'
    }
  }, [active])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 首页滚动监听：高亮当前区块；子页面不显示导航高亮
  useEffect(() => {
    if (location.pathname !== '/') {
      setActive('')
      return
    }
    const onScroll = () => {
      const mid = window.innerHeight * 0.45
      let current = 'home'
      for (const item of NAV_ITEMS) {
        if (item.to) continue
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= mid) current = item.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const go = (id: string) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="nav-logo-avatar" src="/avatar.png" alt="等等" />
            <span>
              等等<span className="gradient-text">.blog</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="主导航">
            <div className="nav-link-bg" ref={bgRef} />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={`nav-link${active === item.id ? ' nav-link-active' : ''}`}
                data-active={active === item.id ? '1' : '0'}
                href={item.to ?? `/#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                  if (item.to) {
                    navigate(item.to)
                    window.scrollTo({ top: 0 })
                  } else {
                    go(item.id)
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <button className="theme-toggle" onClick={onToggleTheme} aria-label="切换主题">
              <span className={`theme-icon${theme === 'dark' ? '' : ' theme-icon-hidden'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
                </svg>
              </span>
              <span className={`theme-icon${theme === 'light' ? '' : ' theme-icon-hidden'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M19.2 4.8l-1.7 1.7M6.5 17.5l-1.7 1.7" />
                </svg>
              </span>
            </button>
            <button
              className={`nav-burger${menuOpen ? ' nav-burger-open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="菜单"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' mobile-menu-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            className={active === item.id ? 'active' : ''}
            href={item.to ?? `/#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              if (item.to) {
                navigate(item.to)
                window.scrollTo({ top: 0 })
              } else {
                go(item.id)
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
