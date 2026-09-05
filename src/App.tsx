import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Starfield from './components/Starfield'
import CursorGlow from './components/CursorGlow'
import { ScrollProgress, BackTop } from './components/ScrollProgress'
import Loader from './components/Loader'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Resume from './pages/Resume'
import NotFound from './pages/NotFound'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const [loaded, setLoaded] = useState(false)

  return (
    <HashRouter>
      {/* 初始加载遮罩 */}
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {/* 氛围层：低调的红色光晕，模拟暗房里的反光 */}
      <div className="ambient" aria-hidden="true">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
      </div>
      <Starfield />
      <CursorGlow />
      <ScrollProgress />

      <Navbar theme={theme} onToggleTheme={toggle} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <BackTop />
    </HashRouter>
  )
}
