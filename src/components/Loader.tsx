import { useEffect, useMemo, useState } from 'react'

interface LoaderProps {
  /** 加载完成（对外通知，App 据此淡出遮罩） */
  onDone: () => void
  /** 最短展示时长 ms：即使资源秒加载完，也至少展示这么久，避免一闪而过 */
  minDuration?: number
  /** 兜底上限 ms：若某资源卡住，超过此时间也强制结束，避免遮罩永驻 */
  maxDuration?: number
}

const LOAD_STAGES = ['初始化', '编译', '排版', '渲染', '就绪']

/** 监听页面真实加载是否就绪：字体 + 全部图片 + window load */
async function isContentReady(): Promise<boolean> {
  // 等待字体加载（document.fonts.ready 永不 reject）
  try {
    await Promise.race([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 2500)),
    ])
  } catch {
    /* 忽略 */
  }
  // 等待所有图片加载完成（若存在）
  const imgs = Array.from(document.images)
  if (imgs.length) {
    try {
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((r) => {
                const done = () => r()
                img.addEventListener('load', done, { once: true })
                img.addEventListener('error', done, { once: true })
              }),
        ),
      )
    } catch {
      /* 忽略 */
    }
  }
  // 文档已完成加载，或等待 window load 事件（兜底 3s）
  if (document.readyState === 'complete') return true
  return new Promise<boolean>((resolve) => {
    const t = window.setTimeout(() => resolve(true), 3000)
    window.addEventListener(
      'load',
      () => {
        clearTimeout(t)
        resolve(true)
      },
      { once: true },
    )
  })
}

/**
 * 全屏加载遮罩：黑红 brutalist + 衬线标题
 * 多层高级效果：粒子星空 / 扫光标题 / 流光进度环 / 几何装饰 / 分段阶段指示 / 中心聚焦线
 * 进度：真实监听字体/图片/文档就绪，到达后补满 100% 再淡出；含最短展示与兜底上限。
 */
export default function Loader({
  onDone,
  minDuration = 800,
  maxDuration = 5000,
}: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // 随机粒子：用 useMemo 固定一次，避免重渲染抖动
  const particles = useMemo(() => {
    const arr: { id: number; left: number; top: number; size: number; delay: number; dur: number }[] = []
    for (let i = 0; i < 42; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 4,
        dur: 3 + Math.random() * 4,
      })
    }
    return arr
  }, [])

  useEffect(() => {
    let raf = 0
    let ready = false
    let finishTimer = 0
    const startedAt = performance.now()

    // 平滑推进：逼近但不越过 96%，等待真实就绪后由 finish() 补满
    const tick = () => {
      setProgress((p) => {
        const target = ready ? 100 : Math.min(p + (100 - p) * 0.045 + 0.4, 96)
        return Math.round(target)
      })
      if (!ready) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // 真实就绪后：保证最短展示 → 补满 100% → 淡出
    const finish = () => {
      if (finishTimer) return
      const elapsed = performance.now() - startedAt
      const wait = Math.max(0, minDuration - elapsed)
      finishTimer = window.setTimeout(() => {
        ready = true
        cancelAnimationFrame(raf)
        setProgress(100)
        setLeaving(true)
        window.setTimeout(onDone, 520)
      }, wait)
    }

    // 监听真实加载就绪
    let cancelled = false
    ;(async () => {
      const ok = await isContentReady()
      if (cancelled) return
      if (ok) finish()
    })()

    // 兜底：即便某资源卡住，到 maxDuration 也强制结束
    const cap = window.setTimeout(finish, maxDuration)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(finishTimer)
      clearTimeout(cap)
    }
  }, [minDuration, maxDuration, onDone])

  const stageIndex = Math.min(
    Math.floor((progress / 100) * LOAD_STAGES.length),
    LOAD_STAGES.length - 1,
  )

  return (
    <div className={`loader${leaving ? ' loader-leaving' : ''}`} role="status" aria-live="polite">
      {/* 背景几何网格 */}
      <div className="loader-grid" aria-hidden="true" />
      {/* 粒子星空 */}
      <div className="loader-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="loader-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>
      {/* 顶部 / 底部细标尺 */}
      <div className="loader-rule loader-rule-top" aria-hidden="true" />
      <div className="loader-rule loader-rule-bottom" aria-hidden="true" />

      <div className="loader-center">
        {/* 流光进度环 + 中心百分比 */}
        <div
          className="loader-ring"
          style={{ ['--loader-progress' as string]: `${progress * 3.6}deg` }}
        >
          <div className="loader-ring-halo" aria-hidden="true" />
          <div className="loader-ring-inner">
            <span className="loader-pct">{progress}</span>
            <span className="loader-pct-sign">%</span>
          </div>
          <span className="loader-ring-dot" aria-hidden="true" />
        </div>

        {/* 扫光品牌标题 */}
        <h2 className="loader-title">
          <span className="loader-title-word">等等</span>
          <span className="loader-title-dot">.</span>
          <span className="loader-title-word loader-title-blog">blog</span>
        </h2>

        {/* 分段阶段指示 */}
        <div className="loader-stages" aria-hidden="true">
          {LOAD_STAGES.map((s, i) => {
            const active = i === stageIndex
            return (
              <span
                key={s}
                className={`loader-stage${active ? ' loader-stage-active' : ''}`}
                data-done={i < stageIndex ? 1 : 0}
              >
                {s}
              </span>
            )
          })}
        </div>

        {/* 底部细线进度 */}
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-percent-text">{progress}%</div>
      </div>

      {/* 角落标签 */}
      <div className="loader-corner loader-corner-tl" aria-hidden="true">KYDSZ</div>
      <div className="loader-corner loader-corner-br" aria-hidden="true">EST. 2026</div>
    </div>
  )
}
