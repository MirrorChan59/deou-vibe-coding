# 得欧Vibe Coding 创意梳理工作台

帮助学生把模糊想法梳理成可执行 Web 项目创意方案的交互式工作台。本版本与妙搭原版（Vibe Coding 创意梳理工作台）功能与样式完全一致：直接从原版提取全部页面样式（31KB CSS 原样保留）、组件源码与图片资源，仅去除了妙搭平台的遥测与编辑模式外壳。

## 功能

- 六步创意梳理流程：灵感起源 → 用户画像 → 商业调研 → 核心功能 → 方案评分 → 创意输出
- 每步大字标题 + 引导提示卡（灵感提示 / 用户思维 / MVP 原则等）
- 12 个项目类型标签、12 类目标人群标签、6 种调研方法卡片（含耗时与难度）
- 优秀 Vibe Coding 案例库（8 个案例，配图，可一键应用到自己的项目）
- 5 维度方案自检评分（优秀 ≥75 / 中等 50-74 / 待加强 <50）
- 一键生成创意方案文档，支持复制 Markdown 和下载文件
- 视觉微调面板：主题色（6 色可选）、背景主题（草稿纸 / 深色）、手写 Logo 字体开关
- 填写内容自动保存到浏览器 localStorage，侧栏实时完成进度
- 移动端适配

## 目录结构

```
.
├── index.html          # 页面外壳 + 全部样式（与妙搭原版一致）
├── components/         # React 组件源码（浏览器内 Babel 即时编译，无构建步骤）
│   ├── tweaks-panel.jsx  # 视觉微调面板
│   ├── steps.jsx         # 步骤 1/2/4/5/6 与案例库
│   ├── extra.jsx         # 步骤 3 商业调研等
│   └── App.jsx           # 主应用（状态管理、步骤切换、主题应用）
├── vendor/             # react / react-dom / babel-standalone（本地化，可离线运行）
└── assets/             # logo 与 8 张案例插图
```

技术说明：React 18 UMD + Babel standalone 在浏览器端直接编译 JSX，无需任何构建工具。所有依赖已本地化到 `vendor/`，断网也能运行。

## 本地预览

需要通过静态服务器打开（浏览器不允许 file:// 加载 JSX）：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
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
