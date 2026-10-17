# 得欧Vibe Coding 创意梳理工作台

帮助学生把模糊想法梳理成可执行 Web 项目创意方案的交互式工作台。纯静态站点，零依赖、零构建。

## 功能

- 六步创意梳理流程：灵感起源 → 用户画像 → 商业调研 → 核心功能 → 方案评分 → 创意输出
- 优秀 Vibe Coding 案例库（8 个案例，配图，可一键应用到自己的项目）
- 5 维度方案自检评分
- 一键生成 Markdown 创意文档（可直接作为 AI 编程工具的初始 prompt），支持复制和下载
- 填写内容自动保存到浏览器 localStorage
- 移动端适配

## 目录结构

```
.
├── index.html      # 全部页面、样式与逻辑（单文件应用）
└── assets/         # logo 与案例插图
```

## 部署到 Cloudflare Pages

方式一：GitHub 集成（推荐）

1. 把本目录推送到 GitHub 仓库（`index.html` 放在仓库根目录）
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. 选择仓库，构建设置：
   - Framework preset：**None**
   - Build command：**留空**
   - Build output directory：**`/`**（根目录）
4. 点击 Save and Deploy，完成后即可获得 `*.pages.dev` 域名

方式二：直接上传

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Upload assets
2. 把本目录整个拖入上传即可

## 本地预览

无需任何工具，直接用浏览器打开 `index.html` 即可；也可以起一个静态服务器：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```
