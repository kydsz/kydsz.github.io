import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'blog-theme'
const LEGACY_KEY = 'aurora-theme'

// 迁移旧版主题键，避免改版后丢用户偏好
function migrateThemeKey(): void {
  const legacy = localStorage.getItem(LEGACY_KEY)
  if (legacy && !localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, legacy)
    localStorage.removeItem(LEGACY_KEY)
  }
}

function getInitialTheme(): Theme {
  migrateThemeKey()
  const saved = localStorage.getItem(KEY)
  if (saved === 'dark' || saved === 'light') return saved
  // 未手动选择过时跟随系统偏好
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(KEY, theme)
  }, [theme])

  // 用户未手动切换过时，实时跟随系统的深浅色变化
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(KEY)) setTheme(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
