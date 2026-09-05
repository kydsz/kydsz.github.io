import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="page-fade post-page" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div className="notfound-emoji">🛸</div>
        <h1 className="notfound-code gradient-text">404</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 17, marginBottom: 8 }}>
          呜——这个页面在星际迷航中走丢了
        </p>
        <p style={{ color: 'var(--text-faint)', fontSize: 14, marginBottom: 36 }}>
          你访问的地址不存在，或者已经被移动到了别的星系。
        </p>
        <Link to="/" className="btn btn-primary">
          返回地球（首页）
        </Link>
      </div>
    </main>
  )
}
