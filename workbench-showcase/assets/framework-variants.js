const frameworkShots = [
  { id: 'ant', name: 'Ant Design Pro', color: '#1677ff', theme: '企业蓝', caption: '分组侧栏 · 清晰层级' },
  { id: 'shadcn', name: 'shadcn/ui', color: '#29292f', theme: '石墨灰', caption: '顶部导航 · 极简边框' },
  { id: 'material', name: 'Material UI', color: '#6750a4', theme: '数字紫', caption: '抽屉导航 · 浮层卡片' },
  { id: 'element', name: 'Element Plus', color: '#12a187', theme: '青绿', caption: '轻量工具栏 · 紧凑控件' },
  { id: 'tabler', name: 'Tabler', color: '#206bc4', theme: '海军蓝', caption: '高密度侧栏 · 扁平面板' },
  { id: 'bootstrap', name: 'Bootstrap 5', color: '#6f42c1', theme: '靛紫', caption: '栅格仪表盘 · 方形边框' },
  { id: 'adminlte', name: 'AdminLTE', color: '#00a65a', theme: '管理绿', caption: '深色侧栏 · 经典后台' },
  { id: 'daisy', name: 'daisyUI', color: '#db6d9c', theme: '柔粉', caption: '圆润导航 · 柔和卡片' }
];

const gallery = document.querySelector('#variantGallery');
if (gallery) {
  const bars = '<i style="--h:44%"></i><i style="--h:64%"></i><i style="--h:52%"></i><i style="--h:79%"></i><i style="--h:70%"></i><i style="--h:92%"></i><i style="--h:82%"></i>';
  const shell = (item) => `
    <button class="variant-shot fw-${item.id}" data-fw="${item.id}" style="--shot-accent:${item.color}" type="button" aria-label="预览 ${item.name}，${item.theme}主题">
      <span class="shot-window">
        <span class="shot-top"><b>✣ WORKSPACE</b><span>● ACTIVE　⌕　⚙</span></span>
        <span class="shot-body">
          <span class="shot-side"><i>▦ Overview</i><i>◫ Components</i><i>▤ Analytics</i><i>✦ AI Agents</i></span>
          <span class="shot-main">
            <header><b>工作台总览</b><span>最近 7 天　⌄</span></header>
            <span class="shot-metrics"><span><small>活跃智能体</small><strong>24</strong><em></em></span><span><small>今日任务</small><strong>1,284</strong><em></em></span><span><small>成功率</small><strong>98.6%</strong><em></em></span></span>
            <span class="shot-chart">${bars}</span>
          </span>
        </span>
      </span>
      <span class="variant-caption"><b>${item.name}</b><small>${item.theme} · ${item.caption}</small></span>
    </button>`;
  gallery.innerHTML = `<div class="variant-gallery-head"><b>同一工作台 · 八种框架与主题快照</b><span>点击任一效果，可同步到上方交互预览</span></div><div class="variant-grid">${frameworkShots.map(shell).join('')}</div>`;
  gallery.querySelectorAll('.variant-shot').forEach((shot, index) => {
    shot.addEventListener('click', () => {
      const item = frameworkShots[index];
      setFramework(item.id);
      setColor(item.color, item.theme);
    });
  });
}
