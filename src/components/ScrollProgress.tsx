import { useEffect, useRef, useState } from 'react'

/** 顶部滚动进度条 + 返回顶部按钮 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current
      if (!bar) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />
}

export function BackTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-top${visible ? ' back-top-visible' : ''}`}
      aria-label="返回顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
