import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // 个人主页根目录部署，保持为 /
  build: {
    outDir: '../assets',  // 构建产物输出到仓库根目录的 assets 文件夹
    assetsDir: 'static',  // 静态资源（JS/CSS/图片）放在 assets/static 下
    emptyOutDir: true  // 每次构建前清空 assets 目录
  }
})