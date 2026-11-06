# Interactive Workbench 产品展示页

这是 Interactive Workbench 的独立展示页，内容和图片均围绕本仓库中的交互式工作台展开。页面首屏提供 GitHub 仓库跳转和源码 ZIP 下载，并附有八种 UI 框架、主题主色、界面密度与明暗模式的可交互预览。

## 页面展示

- 工作台总览、组件画廊、数据分析中心、方案实验室的真实截图
- 新增实际登录页截图，展示品牌欢迎区与登录表单
- 17 个工作视图、8 种设计体系、组件收藏拼装、统一设计 Token 与 AI 交付流程
- 可切换 Ant Design Pro、shadcn/ui、Material UI、Element Plus、Tabler、Bootstrap 5、AdminLTE、daisyUI
- 提供八张框架与主题色效果快照，差异落实到导航、侧栏、密度、卡片边框和阴影，并可点击同步到交互预览
- 可切换主色、密度与深浅主题的工作台预览
- 用总览、组件、分析和方案实验室真实截图组成的 3D 界面组，支持缓慢空间移动、鼠标视差与暂停控制
- 首屏 GitHub 项目入口和 ZIP 源码下载按钮

## 本地运行

无需安装依赖。在仓库根目录运行：

```powershell
python -m http.server 8000 --directory workbench-showcase
```

访问 `http://localhost:8000/`。

## 源码与演示边界

页面使用原生 HTML、CSS、JavaScript 与本地 Three.js 模块。工作台展示图来自本仓库 `docs/screenshots/` 的真实截图。框架主题选择器是交互式样式预览，不会动态安装八套框架依赖。

页面主要内容宽度在桌面浏览器中随窗口宽度保持 75%；窄屏下切换为近全宽，避免内容过窄。

3D 场景将工作台总览、组件画廊、数据分析和方案实验室的真实截图作为面板纹理，在空间中分层摆放并加入轻微视差和浮动动画。场景使用本地 Three.js `0.187.0`，同时提供 CSS 3D 回退。它借鉴了 [img2threejs](https://github.com/img2threejs/img2threejs) 的图片驱动 3D 内容思路；页面展示的是工作台本身的界面，而不是抽象立方体。

ZIP 按钮下载本仓库 GitHub `main` 分支源码。
