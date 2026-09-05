import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // 把体积大、且仅少数页面用到的依赖拆成独立 chunk，
        // 让首页/列表首屏 bundle 明显变小。
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // 数学渲染：仅个别文章用到，独立成 math chunk
          if (id.includes('katex') || id.includes('remark-math') || id.includes('rehype-katex')) {
            return 'math'
          }
          // React 生态拆分
          if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
            return 'react-vendor'
          }
          // markdown 渲染相关
          if (
            id.includes('react-markdown') ||
            id.includes('remark-') ||
            id.includes('rehype-') ||
            id.includes('micromark') ||
            id.includes('mdast') ||
            id.includes('hast') ||
            id.includes('unist') ||
            id.includes('vfile') ||
            id.includes('lowlight') ||
            id.includes('highlight') ||
            id.includes('unified') ||
            id.includes('bail') ||
            id.includes('trough') ||
            id.includes('is-plain-obj') ||
            id.includes('fault')
          ) {
            return 'md'
          }
        },
      },
    },
  },
})
