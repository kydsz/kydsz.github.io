import { useCallback, useRef } from 'react'

const MAX_TILT = 8

/** 3D 倾斜：鼠标悬停时根据位置轻微旋转卡片 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(
      px * MAX_TILT
    ).toFixed(2)}deg) translateY(-4px)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
