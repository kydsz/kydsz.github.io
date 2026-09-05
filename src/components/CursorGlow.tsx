import { useEffect, useRef } from 'react'

/** 跟随鼠标的柔和光晕（rAF 平滑插值） */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = '1'
    }

    const loop = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
