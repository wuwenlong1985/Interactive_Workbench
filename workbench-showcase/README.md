# Interactive Workbench 产品展示页

这是 Interactive Workbench 的独立展示页，内容和图片均围绕本仓库中的交互式工作台展开。页面首屏提供 GitHub 仓库跳转和源码 ZIP 下载，并附有八种 UI 框架、主题主色、界面密度与明暗模式的可交互预览。

## 页面展示

- 工作台总览、组件画廊、数据分析中心、方案实验室的真实截图
- 新增实际登录页截图，展示品牌欢迎区与登录表单
- 17 个工作视图、8 种设计体系、组件收藏拼装、统一设计 Token 与 AI 交付流程
- 可切换 Ant Design Pro、shadcn/ui、Material UI、Element Plus、Tabler、Bootstrap 5、AdminLTE、daisyUI
- 可切换主色、密度与深浅主题的工作台预览
- 用登录页截图生成的程序化 Three.js 模型，含缓慢旋转、悬浮卡片、鼠标视差与暂停控制
- 首屏 GitHub 项目入口和 ZIP 源码下载按钮

## 本地运行

无需安装依赖。在仓库根目录运行：

```powershell
python -m http.server 8000 --directory workbench-showcase
```

访问 `http://localhost:8000/`。

## 源码与演示边界

页面使用原生 HTML、CSS、JavaScript 与本地 Three.js 模块。工作台展示图来自本仓库 `docs/screenshots/` 的真实截图。框架主题选择器是交互式样式预览，不会动态安装八套框架依赖。

3D 中心立方体由 [img2threejs/plugin-hello-cube](https://github.com/img2threejs/plugin-hello-cube) 的确定性图片到代码生成方式生成：截图哈希决定颜色，截图文件长度决定尺寸。其余工作台浮卡与轨道为本项目编写的 Three.js 场景代码。生成逻辑见 `tools/generate-workbench-cube.mjs`，依赖的 Three.js 版本为 `0.187.0`。许可证文件随 `vendor/` 一同提供。

ZIP 按钮下载本仓库 GitHub `main` 分支源码。
