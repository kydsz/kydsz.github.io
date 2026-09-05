import { useEffect, useState } from 'react'

/** 打字机效果：循环打印一组短语 */
export function useTypewriter(phrases: string[], typeMs = 90, holdMs = 1700) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>('type')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const current = phrases[index % phrases.length]
    let timer: number

    if (phase === 'type') {
      if (text.length < current.length) {
        timer = window.setTimeout(() => setText(current.slice(0, text.length + 1)), typeMs)
      } else {
        timer = window.setTimeout(() => setPhase('hold'), 60)
      }
    } else if (phase === 'hold') {
      timer = window.setTimeout(() => setPhase('erase'), holdMs)
    } else {
      if (text.length > 0) {
        timer = window.setTimeout(() => setText(text.slice(0, -1)), 40)
      } else {
        setIndex((i) => (i + 1) % phrases.length)
        setPhase('type')
      }
    }

    return () => window.clearTimeout(timer)
  }, [text, phase, index, phrases, typeMs, holdMs])

  return text
}
