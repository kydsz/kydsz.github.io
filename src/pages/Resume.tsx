import { RESUME, type Project } from '../data/resume'

function withBold(text: string) {
  return text.split('**').map((seg, i) => (i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg))
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="resume-sec-title">
      {children}
      <span className="resume-sec-en" aria-hidden="true" />
    </h2>
  )
}

function ProjectBlock({ p }: { p: Project }) {
  return (
    <article className="resume-proj">
      <header className="resume-proj-head">
        <h3 className="resume-proj-name">{p.name}</h3>
        <span className="resume-proj-meta">
          {p.role} · {p.time}
        </span>
      </header>
      <p className="resume-proj-bg">{withBold(p.bg)}</p>
      <p className="resume-proj-stack">
        {p.stack.map((s) => (
          <span key={s} className="resume-chip">
            {s}
          </span>
        ))}
      </p>
      <div className="resume-proj-cols">
        <div>
          <h4 className="resume-sub-title">主要职责</h4>
          <ul className="resume-list">
            {p.duties.map((d, i) => (
              <li key={i}>{withBold(d)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="resume-sub-title resume-sub-title-accent">项目成果</h4>
          <ul className="resume-list">
            {p.results.map((r, i) => (
              <li key={i}>{withBold(r)}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function Resume() {
  const r = RESUME
  return (
    <main className="page-fade resume-page">
      <div className="container resume-container">
        <div className="resume-toolbar">
          <span className="section-eyebrow">Resume / 简历</span>
        </div>

        <div className="resume-sheet">
          <header className="resume-head">
            <div>
              <h1 className="resume-name">等等</h1>
              <p className="resume-intent">
                <span className="resume-title">{r.title}</span>
              </p>
            </div>
            <ul className="resume-meta">
              <li>
                <a href={`mailto:${r.email}`}>{r.email}</a>
              </li>
              <li>
                <a href={r.github} target="_blank" rel="noreferrer">
                  github.com/kydsz
                </a>
              </li>
            </ul>
          </header>

          <p className="resume-intro">{withBold(r.intro)}</p>

          <section className="resume-sec">
            <SectionTitle>专业技能</SectionTitle>
            <ul className="resume-skills">
              {r.skills.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong>
                  <span className="resume-skills-sep">：{s.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-sec">
            <SectionTitle>项目经历</SectionTitle>
            <div className="resume-projs">
              {r.projects.map((p) => (
                <ProjectBlock key={p.name} p={p} />
              ))}
            </div>
          </section>

          <div className="resume-2col">
            <section className="resume-sec">
              <SectionTitle>教育背景</SectionTitle>
              <div className="resume-edu">
                <div className="resume-edu-head">
                  <h3 className="resume-edu-major">{r.education.major}</h3>
                  <span className="resume-edu-time">{r.education.time}</span>
                </div>
                <p className="resume-edu-note">{r.education.note}</p>
              </div>
            </section>

            <section className="resume-sec">
              <SectionTitle>荣誉奖项</SectionTitle>
              <ul className="resume-honors">
                {r.honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
