import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** 滚动显现容器：进入视口后淡入上浮 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' reveal-visible' : ''} ${className}`}
      style={{ ['--reveal-delay' as string]: `${delay}s` }}
    >
      {children}
    </div>
  )
}
