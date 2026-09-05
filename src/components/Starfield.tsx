import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  baseAlpha: number
  phase: number
  speed: number
}

/** 全屏星空：星星闪烁 + 轻微视差跟随鼠标 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let raf = 0
    let w = 0
    let h = 0
    const mouse = { x: 0.5, y: 0.5 }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(160, Math.floor((w * h) / 12000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.8 + 0.3,
      }))
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = e.clientY / window.innerHeight
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const parX = (mouse.x - 0.5) * 18
      const parY = (mouse.y - 0.5) * 12

      for (const s of stars) {
        const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(s.phase + t * 0.001 * s.speed)
        ctx.globalAlpha = s.baseAlpha * twinkle
        ctx.fillStyle = '#ababab'
        ctx.beginPath()
        ctx.arc(s.x + parX * s.r * 0.6, s.y + parY * s.r * 0.6, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
