# Interactive Workbench 产品展示页

这是 Interactive Workbench 的独立展示页，内容和图片均围绕本仓库中的交互式工作台展开。页面首屏提供 GitHub 仓库跳转和源码 ZIP 下载，并附有八种 UI 框架、主题主色、界面密度与明暗模式的可交互预览。

## 页面展示

- 工作台总览、组件画廊、数据分析中心、方案实验室的真实截图
- 17 个工作视图、8 种设计体系、组件收藏拼装、统一设计 Token 与 AI 交付流程
- 可切换 Ant Design Pro、shadcn/ui、Material UI、Element Plus、Tabler、Bootstrap 5、AdminLTE、daisyUI
- 可切换主色、密度与深浅主题的工作台预览
- 首屏 GitHub 项目入口和 ZIP 源码下载按钮

## 本地运行

无需安装依赖。在仓库根目录运行：

```powershell
python -m http.server 8000 --directory workbench-showcase
```

访问 `http://localhost:8000/`。

## 源码与演示边界

页面使用原生 HTML、CSS 和 JavaScript。图中展示的是本仓库 `docs/screenshots/` 中的实际工作台截图；框架主题选择器是展示交互的前端预览，不会动态安装八套框架依赖。ZIP 按钮下载本仓库 GitHub `main` 分支源码。
