# Interactive Workbench 官网展示页

交互式工作台·龙哥很忙的公开产品展示页。访客无需 GPT 登录即可访问：[打开官网](https://interactive-workbench-showcase.wuwenlong1985123.chatgpt.site/)。

## 体验入口

- [官网首页](https://interactive-workbench-showcase.wuwenlong1985123.chatgpt.site/)
- [工作台预览（自动填入体验账号）](https://interactive-workbench-showcase.wuwenlong1985123.chatgpt.site/Interactive_Workbench_V1.0.html?demo=1)
- [GitHub 开源项目](https://github.com/wuwenlong1985/Interactive_Workbench)

体验账号：`demo`，密码：`Demo@2026`。账号仅用于前端演示，没有服务端身份验证。

## 页面展示

- 八个独立运行的工作台实例，展示不同框架风格、主题色、页面与明暗模式
- 工作台总览、组件画廊、数据分析、方案实验室和实际登录界面截图
- 17 个工作视图、8 种内建设计体系、组件收藏拼装与 AI 交付流程
- 每个对照面板都从工作台外观设置读取状态，不用同一张默认主题截图冒充多种效果
- 工作台实时页面嵌入 CSS 3D 透视层，Three.js 绘制动态空间光环

## 本地运行

无需安装依赖。在仓库根目录运行：

```powershell
python -m http.server 8000 --directory workbench-showcase
```

然后访问 `http://localhost:8000/`。

## 源码与演示边界

`workbench/` 目录包含与仓库根目录同步的工作台入口、样式和脚本；八种展示方案调用工作台内建的设计体系样式、主题模式与主色，并非加载八套独立的第三方组件库。站点使用原生 HTML、CSS、JavaScript 与本地 Three.js 模块，不连接真实业务数据或服务器认证。

桌面页面内容宽度随窗口保持约 75%；窄屏时扩展到近全宽。首屏提供工作台预览、GitHub 项目页和 ZIP 源码入口。
