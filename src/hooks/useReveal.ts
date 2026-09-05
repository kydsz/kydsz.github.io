import { useEffect, useRef, useState } from 'react'

/** 元素进入视口时返回 true（只触发一次）。
 * 注意：threshold 按「目标元素可见比例」计算，对高于视口的元素（如长文章）
 * 比例永远达不到大阈值，会导致永不可见。因此用很小的阈值 + rootMargin，
 * 保证任意高度的元素都能触发。 */
export function useReveal<T extends HTMLElement>(threshold = 0.01) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}
