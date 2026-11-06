(() => {
const frameworkShots = [
  { id: 'ant', name: 'Ant Design Pro', color: '#1677ff', theme: '企业蓝 · 亮色', page: 'overview', mode: 'light', caption: '分组侧栏 · 清晰层级' },
  { id: 'shadcn', name: 'shadcn/ui', color: '#18181b', theme: '石墨灰 · 暗色', page: 'analytics', mode: 'dark', caption: '顶部工具栏 · 极简边框' },
  { id: 'material', name: 'Material UI', color: '#6750a4', theme: '数字紫 · 亮色', page: 'components', mode: 'light', caption: '浮动侧栏 · 高程卡片' },
  { id: 'element', name: 'Element Plus', color: '#12a187', theme: '青绿 · 亮色', page: 'forms', mode: 'light', caption: '紧凑控件 · 轻量面板' },
  { id: 'tabler', name: 'Tabler', color: '#206bc4', theme: '海军蓝 · 暗色', page: 'analytics', mode: 'dark', caption: '顶部导航 · 紧凑仪表盘' },
  { id: 'bootstrap', name: 'Bootstrap 5', color: '#6f42c1', theme: '靛紫 · 亮色', page: 'table', mode: 'light', caption: '栅格导航 · 方形控件' },
  { id: 'adminlte', name: 'AdminLTE', color: '#00a65a', theme: '管理绿 · 暗色', page: 'overview', mode: 'dark', caption: '经典后台 · 强调色标记' },
  { id: 'daisy', name: 'daisyUI', color: '#db6d9c', theme: '柔粉 · 亮色', page: 'lab', mode: 'light', caption: '圆润卡片 · 轻柔层次' }
];

const $ = (selector) => document.querySelector(selector);
const css = document.createElement('style');
css.textContent = `
  .hero-art .device{overflow:hidden;transform-style:preserve-3d}
  .hero-art .device iframe{display:block;width:100%;height:clamp(330px,38vw,520px);border:0;border-radius:9px;background:#f8f9fc}
  .hero-art::before,.hero-art::after{content:none!important}
  .hero-live-panel{position:absolute;z-index:1;top:24%;width:46%;height:55%;overflow:hidden;border:7px solid #fff;border-radius:14px;background:#fff;box-shadow:0 24px 55px #24436a32;transform-style:preserve-3d;pointer-events:none}
  .hero-live-panel.left{left:-4%;transform:translateZ(-90px) rotateY(22deg) rotateX(2deg) rotateZ(-5deg);animation:heroPanelLeft 8s ease-in-out infinite}
  .hero-live-panel.right{right:-4%;top:8%;transform:translateZ(-120px) rotateY(-20deg) rotateX(1deg) rotateZ(4deg);animation:heroPanelRight 9s ease-in-out infinite}
  .hero-live-panel iframe{width:100%;height:100%;border:0;pointer-events:none}
  .hero-live-panel iframe,.variant-live-window iframe,.studio-active-frame iframe,.three-stage .screen-panel iframe{width:calc(100% + 18px)!important}
  .studio-preview{padding:0;overflow:hidden;background:#101827!important}
  .studio-active-frame{height:650px;background:#fff}
  .studio-active-frame iframe{width:100%;height:100%;display:block;border:0}
  .variant-gallery{margin-top:24px}
  .variant-gallery-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:16px;color:#dce7f5}
  .variant-gallery-head b{font-size:21px;color:#fff}
  .variant-gallery-head span{font-size:14px;color:#a9bad0}
  .variant-live-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
  .variant-shot{display:block;min-width:0;overflow:hidden;padding:0;text-align:left;border:1px solid #dfe7f2;border-radius:15px;background:#fff;color:#192337;box-shadow:0 14px 36px #1d345418;transition:transform .2s,border-color .2s,box-shadow .2s}
  .variant-shot:hover{transform:translateY(-3px);border-color:var(--shot-accent);box-shadow:0 20px 46px #172b481f}
  .variant-live-window{height:650px;overflow:hidden;background:#f7f9fc}
  .variant-live-window iframe{display:block;width:100%;height:100%;border:0;background:#f7f9fc;pointer-events:none}
  .variant-caption{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px}
  .variant-caption b{font-size:16px}
  .variant-caption small{font-size:14px;color:#66758b;text-align:right}
  .screen-card .screen-live{width:100%;height:610px;display:block;border:1px solid #dfe7f2;border-radius:10px;background:#f8f9fc}
  .screen-card .screen-meta b{font-size:17px}.screen-card .screen-meta p{font-size:15px}
  .screen-card .screen-live-title{font-size:12px;font-weight:800;color:#7296c5;letter-spacing:.12em;margin:5px 5px 10px}
  .screen-card{padding:14px}
  .screen-card .screen-meta{padding:16px 5px 6px}
  .screen-card .number{font-size:14px}
  .three-stage .screen-panel{overflow:hidden;background:#fff}
  .three-stage .screen-panel iframe{display:block;width:100%;height:100%;border:0;pointer-events:none}
  .three-stage #workbench3d{z-index:0;pointer-events:none}
  .three-stage .css-scene{z-index:2}
  @media(max-width:900px){.variant-grid{grid-template-columns:1fr}.variant-live-window{height:650px}.studio-active-frame{height:520px}.screen-card .screen-live{height:560px}}
  @media(max-width:560px){.variant-live-window{height:540px}.variant-caption{align-items:flex-start;flex-direction:column;gap:4px}.variant-caption small{text-align:left}.variant-gallery-head{display:block}.variant-gallery-head span{display:block;margin-top:5px}.hero-art .device iframe{height:390px}.hero-live-panel{opacity:.45}}
`;
document.head.append(css);

function workbenchUrl(item, page = item.page, mode = item.mode, accent = item.color, density = 'comfortable') {
  const query = new URLSearchParams({ showcase: '1', style: item.id, mode, accent, page, density, fontSize: '17' });
  return `workbench/index.html?${query}`;
}
function iframe(item, page, title, className = '') {
  const frame = document.createElement('iframe');
  frame.loading = 'lazy';
  frame.title = title;
  frame.className = className;
  frame.referrerPolicy = 'no-referrer';
  frame.addEventListener('load', () => {
    try {
      const doc = frame.contentDocument;
      doc.documentElement.style.scrollbarWidth = 'none';
      doc.documentElement.style.overflow = 'hidden';
      doc.body.style.scrollbarWidth = 'none';
    } catch { /* The preview remains usable if browser isolation blocks styling. */ }
  });
  frame.src = workbenchUrl(item, page);
  return frame;
}

// Replace the handcrafted hero mock with the actual Workbench application.
const heroImage = $('.device img');
if (heroImage) heroImage.replaceWith(iframe(frameworkShots[0], 'overview', '真实交互工作台总览'));
const heroArt = $('.hero-art');
if (heroArt) {
  const sidePanels = [
    { item: frameworkShots[2], page: 'components', side: 'left' },
    { item: frameworkShots[4], page: 'analytics', side: 'right' }
  ];
  sidePanels.forEach(({ item, page, side }) => {
    const panel = document.createElement('div');
    panel.className = `hero-live-panel ${side}`;
    panel.append(iframe(item, page, `${item.name} ${page} 实时页面`));
    heroArt.append(panel);
  });
}

// The primary theme control now changes the actual application embedded above it.
let active = frameworkShots[0];
let accent = active.color;
let mode = active.mode;
let density = 'comfortable';
const livePreview = $('#livePreview');
const previewFrame = iframe(active, 'overview', '当前框架和主题的真实工作台预览');
previewFrame.className = 'workbench-live-preview';
if (livePreview) {
  livePreview.replaceChildren(previewFrame);
  livePreview.classList.add('studio-active-frame');
}
function updatePreview() {
  if (!previewFrame) return;
  previewFrame.src = workbenchUrl(active, 'overview', mode, accent, density);
  $('#frameworkName').textContent = active.name;
  $('#colorName').textContent = `${accent.toUpperCase()} · ${mode === 'dark' ? '暗色' : '亮色'}`;
  $('#densityName').textContent = ({ ultra: '极致', dense: '超密', compact: '紧凑', comfortable: '标准', relaxed: '舒适', airy: '宽松', spacious: '展示' })[density] || '标准';
  document.querySelectorAll('[data-fw]').forEach((node) => node.classList.toggle('active', node.dataset.fw === active.id));
  document.querySelectorAll('[data-density]').forEach((node) => node.classList.toggle('active', node.dataset.density === density));
}

const frameworkNames = Object.fromEntries(frameworkShots.map((item) => [item.id, item]));
document.querySelectorAll('#frameworkChoices .choice, #frameworkCards .framework-card').forEach((button) => {
  button.addEventListener('click', () => {
    active = frameworkNames[button.dataset.fw] || active;
    accent = active.color;
    mode = active.mode;
    updatePreview();
  });
});
document.querySelectorAll('#colorChoices .swatch').forEach((button, index) => {
  const palette = ['#1677ff', '#6254df', '#0e9f8d', '#ef7b45', '#e54772', '#18181b'];
  button.addEventListener('click', () => { accent = palette[index] || accent; updatePreview(); });
});
document.querySelectorAll('#densityChoices .choice').forEach((button) => {
  button.addEventListener('click', () => { density = button.dataset.density || density; updatePreview(); });
});
$('#modeToggle')?.addEventListener('click', () => { mode = mode === 'light' ? 'dark' : 'light'; updatePreview(); });

// Eight real Workbench renders, each loading its own framework, accent, mode and page.
const gallery = $('#screens .showcase');
if (gallery) {
  gallery.className = 'variant-live-gallery';
  gallery.replaceChildren();
  frameworkShots.forEach((item) => {
    const card = document.createElement('article');
    card.className = `variant-shot fw-${item.id}`;
    card.style.setProperty('--shot-accent', item.color);
    const window = document.createElement('div');
    window.className = 'variant-live-window';
    window.append(iframe(item, item.page, `${item.name} · ${item.theme} · 真实工作台`));
    const caption = document.createElement('div');
    caption.className = 'variant-caption';
    caption.innerHTML = `<b>${item.name}</b><small>${item.theme} · ${item.caption}</small>`;
    card.append(window, caption);
    gallery.append(card);
  });
  const login = document.createElement('article');
  login.className = 'screen-card';
  login.innerHTML = `<img loading="lazy" src="assets/login.jpg" alt="交互式工作台实际登录与欢迎页面"><div class="screen-meta"><div><b>登录与欢迎页</b><p>保留工作台实际的登录界面与品牌欢迎体验。</p></div><span class="number">SIGN IN</span></div>`;
  gallery.append(login);
}
$('#variantGallery')?.remove();

// Keep the individual UI panels crisp by rendering the same live application as 3D planes.
const scenePages = ['overview', 'components', 'analytics', 'lab'];
document.querySelectorAll('.screen-panel').forEach((panel, index) => {
  const oldImage = panel.querySelector('img');
  oldImage?.remove();
  panel.append(iframe(frameworkShots[[0, 2, 4, 7][index]], scenePages[index], `3D 工作台界面 ${scenePages[index]}`));
});

document.querySelector('.three-note')?.replaceChildren('界面本身以实时网页清晰渲染；Three.js 光环与 CSS 3D 负责空间层次。');

document.querySelector('#screens .sect-head .kicker')?.replaceChildren('真实应用渲染 · 框架与主题可对照');
document.querySelector('#screens .sect-head h2')?.replaceChildren('八套工作台页面，分别按真实设置运行');
const studioIntro = $('#studioPanel .intro');
if (studioIntro) studioIntro.textContent = '所有按钮都直接修改下方嵌入的工作台实例。切换框架、主色、深浅模式与密度，观察同一套真实页面如何变化。';
const intro = $('#screens .sect-head .intro');
if (intro) intro.textContent = '每个面板都加载工作台本身，并通过它的框架、主题、字号和导航设置渲染。文字与图表是浏览器现场绘制的，因此缩放仍然清晰。';
const screenshotsLink = $('#screens .sect-head .textlink');
if (screenshotsLink) { screenshotsLink.href = '#studio'; screenshotsLink.textContent = '打开可交互框架与主题设置 ↗'; }

const sceneIntro = $('#three-dimensional .sect-head .intro');
if (sceneIntro) sceneIntro.textContent = '工作台页面由浏览器实时渲染，Three.js 光环与 CSS 3D 将总览、组件和分析面板组成空间层次，缩放时文字仍保持清晰。';
document.querySelector('#three-dimensional .sect-head .kicker')?.replaceChildren('真实工作台 · CSS 3D + THREE.JS');
$('#workbench3d')?.setAttribute('aria-label', '由真实工作台实时页面组成的三维空间场景');
$('#three-dimensional .three-copy .kicker')?.replaceChildren('真实界面组成的动态展示');
const sceneCopy = $('#three-dimensional .three-copy p');
if (sceneCopy) sceneCopy.textContent = '总览、组件、分析和方案实验室以独立页面实时运行，采用相同的工作台数据结构和各自真实的框架主题设置。';
$('#three-dimensional .three-tag')?.replaceChildren('LIVE UI → CSS 3D → ', Object.assign(document.createElement('b'), { textContent: 'THREE.JS' }));

document.addEventListener('click', (event) => {
  const button = event.target.closest('#densityChoices button');
  if (!button) return;
  event.stopImmediatePropagation();
  density = button.dataset.density || density;
  updatePreview();
}, true);
updatePreview();
})();
