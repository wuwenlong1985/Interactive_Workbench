# Interactive Workbench 产品展示页

这是 Interactive Workbench 的独立展示页。首屏提供 GitHub 仓库跳转和源码 ZIP 下载；展示页直接嵌入同一份工作台应用，以八组真实设置显示不同框架风格、主题色、页面与明暗模式。

## 页面展示

- 八个独立运行的工作台实例，分别展示不同框架风格、主题色、页面和明暗模式
- 新增实际登录页截图，展示品牌欢迎区与登录表单
- 17 个工作视图、8 种设计体系、组件收藏拼装、统一设计 Token 与 AI 交付流程
- 可切换 Ant Design Pro、shadcn/ui、Material UI、Element Plus、Tabler、Bootstrap 5、AdminLTE、daisyUI
- 每个对照面板都从工作台“外观与框架”设置读取主题状态，不再使用手绘 UI 示意图
- 可切换框架、主色、密度与深浅主题的真实工作台预览
- 将实时工作台页面放入 CSS 3D 透视层，并用 Three.js 绘制动态空间光环
- 首屏 GitHub 项目入口和 ZIP 源码下载按钮

## 本地运行

无需安装依赖。在仓库根目录运行：

```powershell
python -m http.server 8000 --directory workbench-showcase
```

访问 `http://localhost:8000/`。

## 源码与演示边界

页面使用原生 HTML、CSS、JavaScript 与本地 Three.js 模块。`workbench/` 目录包含与仓库根目录同步的工作台入口、样式和脚本；八种展示方案通过 URL 参数直接调用工作台已有的设计体系、主题模式和主色。它们是工作台内建的八种设计体系样式，并非加载八套独立的第三方组件库。

页面主要内容宽度在桌面浏览器中随窗口宽度保持 75%；窄屏下切换为近全宽，避免内容过窄。

3D 场景将工作台总览、组件画廊、数据分析和方案实验室作为实时页面放进空间面板，不再将压缩过的静态截图放大。场景使用本地 Three.js `0.187.0` 绘制动态光环，并用 CSS 3D 处理面板透视与浮动。页面展示的是工作台本身的界面，而不是抽象立方体。

ZIP 按钮下载本仓库 GitHub `main` 分支源码。
