import { useCallback, useRef } from 'react'

/** 磁性元素：向光标方向轻微吸附，离开后弹性回正 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.22, 1.6, 0.36, 1)'
    el.style.transform = 'translate(0, 0)'
    window.setTimeout(() => {
      if (el) el.style.transition = ''
    }, 560)
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
