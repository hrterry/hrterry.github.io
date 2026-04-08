# Haoran (Haron) Xu - Personal Homepage

一个简洁、可扩展、可直接部署到 GitHub Pages 的静态个人主页模板。

## 本地预览

直接双击 `index.html` 即可打开，或使用任意静态服务器进行预览。

## GitHub Pages 部署

1. 将仓库推送到 GitHub（建议仓库名：`<your-github-id>.github.io`）。
2. 进入仓库 `Settings` -> `Pages`。
3. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` / `root`
4. 保存后等待 1-2 分钟，访问：
   - `https://<your-github-id>.github.io/`

## 你最常改的地方

- 主页标题与简介：`index.html`
- 主题色与版式：`style.css`
- 交互行为（暗黑/亮色切换）：`script.js`
- 联系方式与项目链接：`index.html` 的 `#projects`、`#contact` 区域

## 扩展建议

- 新增 `blog.html`、`projects.html` 多页面
- 接入 Google Analytics / Umami
- 添加 `assets/` 存放头像、项目封面、简历 PDF
- 增加中英双语切换
