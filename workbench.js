/* Interactive Workbench V1.0 · self-contained frontend implementation. */
(()=>{'use strict';
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const T=(zh,en)=>state.lang==='zh'?zh:en;
const timeFmt=()=>new Date().toLocaleDateString(state.lang==='zh'?'zh-CN':'en-US',{year:'numeric',month:'short',day:'numeric'});
const ICONS={
  layout:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M9 9h12"/>',
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  components:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7m-3.5-3.5h7"/>',
  table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/>',
  form:'<path d="M8 4h12M8 10h12M8 16h7M3 4h1M3 10h1M3 16h1"/><path d="M15 20l3-3 2 2-3 3h-2z"/>',
  kanban:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M5 7h2M11 7h2M17 7h2M5 11h2M11 11h2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15h3"/>',
  chart:'<path d="M3 20h18M5 16l5-5 4 3 6-8"/><circle cx="20" cy="6" r="1"/>',
  bot:'<rect x="4" y="7" width="16" height="13" rx="4"/><path d="M12 3v4M9 3h6M4 13H2M22 13h-2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m3 17 5-5 4 4 3-3 6 5"/>',
  type:'<path d="M4 6V4h16v2M12 4v16M8 20h8"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  play:'<path d="m8 5 11 7-11 7z"/>',pause:'<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M9 3h6l.7 3 2 1 3-1 3 5-2 2 0 2 2 2-3 5-3-1-2 1-.7 3H9l-.7-3-2-1-3 1-3-5 2-2v-2l-2-2 3-5 3 1 2-1z" transform="translate(1 -1) scale(.9)"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  plus:'<path d="M12 4v16M4 12h16"/>',minus:'<path d="M5 12h14"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',chevronleft:'<path d="m15 6-6 6 6 6"/>',chevronright:'<path d="m9 6 6 6-6 6"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>',check:'<path d="m4 12 5 5L20 6"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H6a2 2 0 0 0-2 2v10h4"/>',
  refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 8a7 7 0 0 1 12-1l2 5M4 12l2 5a7 7 0 0 0 12-1"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  moon:'<path d="M19 15A8 8 0 0 1 9 5a8.2 8.2 0 1 0 10 10z"/>',
  sliders:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="var(--card)"/><circle cx="15" cy="17" r="2" fill="var(--card)"/>',
  spark:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
  eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.5"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/>',
  edit:'<path d="m4 16 12-12 4 4L8 20H4zM14 6l4 4"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/>',
  cursor:'<path d="m4 3 16 9-8 2-3 7z"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>',
  home:'<path d="m3 11 9-8 9 8v10H3zM9 21v-7h6v7"/>',
  heart:'<path d="M12 20S3 14.5 3 8.5A5 5 0 0 1 12 6a5 5 0 0 1 9 2.5c0 6-9 11.5-9 11.5z"/>',
  star:'<path d="m12 2 3 6 7 1-5 5 1.2 8L12 18l-6.2 4L7 14 2 9l7-1z"/>',
  file:'<path d="M5 3h10l5 5v13H5zM15 3v5h5M8 13h9M8 17h7"/>',
  cloud:'<path d="M5 18h14a4 4 0 0 0 .2-8A7 7 0 0 0 6 9a4.5 4.5 0 0 0-1 9z"/>',
  shield:'<path d="m12 2 9 4v6c0 6-4 9-9 10-5-1-9-4-9-10V6zM8 12l3 3 5-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  filter:'<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
  terminal:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  link:'<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/>',
  alert:'<path d="m12 3 10 18H2zM12 9v5M12 18h.01"/>',
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  monitor:'<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8M12 18v4"/>',
  tablet:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 19h2"/>',
  coffee:'<path d="M3 8h14v7a6 6 0 0 1-12 0V8m12 2h2a3 3 0 0 1 0 6h-2M3 21h16"/>',
  lightning:'<path d="m13 2-9 11h7l-1 9 10-12h-7z"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4 10 20"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8zM2 12l10 6 10-6M2 16l10 6 10-6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>'
};
const ICON_GLYPH_VARIANTS={
 rounded:{
  dashboard:'<rect x="3.3" y="3.3" width="7.2" height="7.2" rx="2.6"/><rect x="13.5" y="3.3" width="7.2" height="7.2" rx="2.6"/><rect x="3.3" y="13.5" width="7.2" height="7.2" rx="2.6"/><rect x="13.5" y="13.5" width="7.2" height="7.2" rx="2.6"/>',
  components:'<rect x="3" y="5" width="8" height="7" rx="3"/><rect x="13" y="5" width="8" height="7" rx="3"/><rect x="3" y="14" width="8" height="7" rx="3"/><path d="M17 14v7m-3.5-3.5h7"/>',
  table:'<rect x="3" y="4" width="18" height="16" rx="4"/><path d="M3 10.5h18M3 15.5h18M10 10.5v9.5"/>',
  form:'<rect x="4" y="3" width="16" height="18" rx="4"/><path d="M8 8h8M8 12h8M8 16h5"/><path d="M15 19l4-4"/>',
  kanban:'<rect x="3" y="4" width="18" height="16" rx="4"/><rect x="6" y="7" width="4" height="6" rx="1.8"/><rect x="12" y="7" width="6" height="9" rx="1.8"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="4"/><path d="M8 3v4M16 3v4M3 10h18"/><circle cx="9" cy="15.2" r="1.5"/>',
  chart:'<path d="M4 19V6M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><circle cx="11" cy="11" r="1.3"/>',
  bot:'<rect x="4" y="7" width="16" height="13" rx="6"/><path d="M12 3v4M3 12H2m20 0h-1"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M10 17h4"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="5"/><circle cx="9" cy="9" r="1.5"/><path d="m5 17 5-5 3.5 3 3-2.5 3.5 3.5"/>',
  type:'<path d="M4 7V5h16v2M12 5v14M8 19h8"/><path d="M5 10V8m14 2V8"/>',
  bell:'<path d="M7 9a5 5 0 0 1 10 0c0 5 2 6 2 8H5c0-2 2-3 2-8"/><path d="M10 20h4"/>',
  file:'<path d="M6 3h9l4 4v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 1-2"/><path d="M15 3v5h4M9 13h6M9 17h5"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5zM4 13l8 5 8-5M5 17l7 4 7-4"/>',
  search:'<circle cx="10.5" cy="10.5" r="6"/><path d="m15.5 15.5 5 5"/>',
  settings:'<circle cx="12" cy="12" r="8.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="3"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/>'
 },
 geometric:{
  dashboard:'<path d="M3 3h8v8H3zM14 3h7v7h-7zM3 14h7v7H3zM13 13h8v8h-8z"/>',
  components:'<path d="M3 3h8v8H3zM14 3h7v7h-7zM3 14h8v7H3zM14 17h7m-3.5-3.5v7"/>',
  table:'<path d="M3 4h18v16H3zM3 9h18M3 15h18M10 9v11M16 9v11"/>',
  form:'<path d="M5 3h14v18H5zM8 8h2m2 0h4M8 13h2m2 0h4M8 18h8"/>',
  kanban:'<path d="M3 3h18v18H3zM9 3v18M15 3v18M5 7h2M11 7h2M17 7h2M11 13h2"/>',
  calendar:'<path d="M3 5h18v16H3zM3 10h18M7 3v4M17 3v4M7 14h3v3H7zM13 14h4"/>',
  chart:'<path d="M3 3v18h18M6 15h4v6H6zM12 10h4v11h-4zM18 5h3v16h-3"/>',
  bot:'<path d="M5 7h14v13H5zM9 3h6M12 3v4M3 11h2m14 0h2M8 13h2M14 13h2M9 17h6"/>',
  image:'<path d="M3 3h18v18H3zM7 8h3v3H7zM3 18l6-6 4 4 3-3 5 5"/>',
  type:'<path d="M3 5h18M6 5v3M18 5v3M12 5v15M8 20h8"/>',
  bell:'<path d="M7 6h10v9l3 3H4l3-3zM10 21h4M10 3h4"/>',
  file:'<path d="M5 3h10l5 5v13H5zM15 3v5h5M8 13h9M8 17h9"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8zM2 13l10 6 10-6M2 17l10 5 10-5"/>',
  search:'<path d="M4 4h13v13H4zM17 17l5 5"/>',
  settings:'<path d="M4 4h16v16H4zM8 8h8v8H8z"/>',
  user:'<path d="M9 4h6v7H9zM5 20v-6h14v6z"/>'
 },
 flow:{
  dashboard:'<path d="M4 5q0-2 2-2h5v8H4zM14 3h4q3 0 3 3v5h-7zM4 14h7v7H7q-3 0-3-3zM14 14h7v4q0 3-3 3h-4z"/>',
  components:'<path d="M4 7q0-4 4-4h3v8H4zM14 3h3q4 0 4 4v4h-7zM4 14h7v7H8q-4 0-4-4zM17 14v7m-3.5-3.5h7"/>',
  table:'<path d="M5 4h14q2 0 2 2v12q0 2-2 2H5q-2 0-2-2V6q0-2 2-2zM3 10h18M9 10v10M15 10v10"/>',
  form:'<path d="M6 4q-2 0-2 2v13q0 2 2 2h12q2 0 2-2V6q0-2-2-2zM8 9h8M8 13h8M8 17h4"/>',
  kanban:'<path d="M4 4q0-1 2-1h12q3 0 3 3v12q0 3-3 3H6q-3 0-3-3V6q0-2 1-2zM9 3v18M15 3v18M5 8h2M11 12h2M17 8h2"/>',
  calendar:'<path d="M6 4h12q3 0 3 3v11q0 3-3 3H6q-3 0-3-3V7q0-3 3-3zM8 2v5M16 2v5M3 10h18M8 15h3"/>',
  chart:'<path d="M4 19q8 0 16 0M5 16c3-7 5-7 8-3s5-2 7-8"/><circle cx="20" cy="5" r="1.5"/>',
  bot:'<path d="M8 6h8q5 0 5 5v4q0 5-5 5H8q-5 0-5-5v-4q0-5 5-5zM12 3v3M9 12h.01M15 12h.01M9 16q3 2 6 0"/>',
  image:'<path d="M7 4h10q4 0 4 4v8q0 4-4 4H7q-4 0-4-4V8q0-4 4-4zM6 17q5-9 8-4t5 1M9 9h.01"/>',
  type:'<path d="M4 8V6q0-2 2-2h12q2 0 2 2v2M12 4v16M8 20h8"/>',
  bell:'<path d="M8 8c0-6 8-6 8 0 0 6 3 7 4 9H4c1-2 4-3 4-9zM10 21h4"/>',
  file:'<path d="M7 3h7l6 6v10q0 2-2 2H6q-2 0-2-2V6q0-3 3-3zM14 3v6h6M8 14h8M8 18h5"/>',
  layers:'<path d="M12 3C9 5 5 7 3 8l9 6 9-6-9-5zM3 12c2 2 7 5 9 6 2-1 7-4 9-6M3 16c2 2 7 5 9 6 2-1 7-4 9-6"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16q2 1 5 5"/>',
  settings:'<circle cx="12" cy="12" r="8.5"/><path d="M8 12q4-8 8 0t-8 0"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 20q8-10 16 0"/>'
 }
};
function icon(name,size=17){
 const variant=ICON_STYLES.some(v=>v[0]===state.iconStyle)?state.iconStyle:'line';
 const glyph=variant==='line'?(ICONS[name]||ICONS.spark):(ICON_GLYPH_VARIANTS[variant]?.[name]||ICONS[name]||ICONS.spark);
 return `<svg class="icon icon-outline icon-variant-${variant}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${variant==='geometric'?1.7:1.85}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="icon-glyph">${glyph}</g></svg>`;
}

const styles={
 ant:{name:'Ant Design Pro',color:'#1677ff',bg:'#f5f7fb',side:'#ffffff',text:'#1d2840',line:'#e7ebf3',radius:8,shadow:'0 4px 20px #1b397009',active:'#eaf2ff'},
 shadcn:{name:'shadcn/ui',color:'#18181b',bg:'#fafafa',side:'#ffffff',text:'#18181b',line:'#e4e4e7',radius:12,shadow:'none',active:'#f4f4f5'},
 material:{name:'Material UI',color:'#6750a4',bg:'#faf8ff',side:'#f9f6ff',text:'#211f28',line:'#e7e1f0',radius:18,shadow:'0 6px 25px #412b6d14',active:'#eee7ff'},
 element:{name:'Element Plus',color:'#409eff',bg:'#f5f7fa',side:'#ffffff',text:'#303133',line:'#ebeef5',radius:6,shadow:'0 2px 12px #00000007',active:'#ecf5ff'},
 tabler:{name:'Tabler',color:'#206bc4',bg:'#f5f7fb',side:'#fff',text:'#182433',line:'#e6e8ec',radius:8,shadow:'0 2px 7px #172e4b09',active:'#e8f2ff'},
 bootstrap:{name:'Bootstrap 5',color:'#0d6efd',bg:'#f8f9fa',side:'#fff',text:'#212529',line:'#dee2e6',radius:8,shadow:'0 4px 14px #0000000a',active:'#e8f1ff'},
 adminlte:{name:'AdminLTE',color:'#3c8dbc',bg:'#f4f6f9',side:'#ffffff',text:'#17253b',line:'#dfe5ec',radius:5,shadow:'0 5px 14px #14243c10',active:'#eaf3fa',sideText:'#61718a'},
 daisy:{name:'daisyUI',color:'#7955e8',bg:'#f7f6ff',side:'#ffffff',text:'#202238',line:'#e9e6f1',radius:17,shadow:'0 6px 18px #775be015',active:'#efeaff'}
};
const DENSITIES=[['ultra',0.58,'极致','Micro'],['dense',0.72,'超密','Dense'],['compact',0.85,'紧凑','Compact'],['comfortable',1,'标准','Normal'],['relaxed',1.15,'舒适','Cozy'],['airy',1.33,'宽松','Airy'],['spacious',1.55,'展示','Spacious']];
const ICON_STYLES=[['line','经典线描','Classic outline'],['rounded','圆润线描','Rounded outline'],['geometric','几何线描','Geometric outline'],['flow','流动线描','Flow outline']];
const IMAGE_STYLES=[['gradient','流体渐变','Aurora'],['editorial','杂志拼贴','Editorial'],['mono','建筑黑白','Monochrome'],['neon','赛博落日','Synthwave'],['glass','未来玻璃','Glassscape'],['pixel','像素场景','Pixel world'],['paper','纸雕景观','Paper-cut']];
const PAGES=[['overview','dashboard','概览仪表盘','Overview'],['components','components','组件画廊','Components'],['table','table','数据表格','Data table'],['forms','form','表单工坊','Forms'],['kanban','kanban','项目看板','Kanban'],['calendar','calendar','日程日历','Calendar'],['analytics','chart','数据分析','Analytics'],['agents','bot','AI 智能体','AI agents'],['assets','image','图标与图片','Icons & media'],['typography','type','排版实验','Typography'],['feedback','bell','动效与反馈','Feedback'],['export','file','AI 设计交付','AI handoff'],['lab','layers','方案实验室','Design studio'],['settings-appearance','settings','外观与框架','Appearance & UI'],['settings-layout','sliders','排版与布局','Typography & layout'],['settings-icons','image','图标与素材','Icons & assets'],['settings-handoff','file','AI 交付设置','AI handoff']];
const pageById=id=>PAGES.find(p=>p[0]===id)||PAGES[0];
const DATA=(zh,en)=>({zh,en});
const SAMPLE_ROWS=[
 ['AG-1042','内容运营助手','Content copilot','内容创作','Content','running',124,96.8,'2026-11-03'],
 ['AG-1043','数据洞察引擎','Insights engine','数据分析','Analytics','running',98,93.2,'2026-11-02'],
 ['AG-1044','销售邮件管家','Sales mailer','营销增长','Growth','paused',48,88.3,'2026-11-02'],
 ['AG-1045','智能客服专员','Support specialist','客服','Support','running',267,99.1,'2026-11-01'],
 ['AG-1046','短视频策划师','Video planner','内容创作','Content','running',73,91.4,'2026-11-01'],
 ['AG-1047','品牌监测雷达','Brand monitor','数据分析','Analytics','draft',0,0,'2026-10-30'],
 ['AG-1048','电商商品诊断','Commerce auditor','电商','Commerce','running',145,95.3,'2026-10-29'],
 ['AG-1049','文档知识库','Knowledge base','知识管理','Knowledge','paused',36,87.8,'2026-10-28'],
 ['AG-1050','日报自动生成','Daily reporter','数据分析','Analytics','running',61,97.6,'2026-10-27'],
 ['AG-1051','广告素材助手','Ad creative','营销增长','Growth','draft',0,0,'2026-10-26'],
 ['AG-1052','线索评分助手','Lead scoring','营销增长','Growth','running',44,90.7,'2026-10-25'],
 ['AG-1053','合同摘要分析','Contract reader','知识管理','Knowledge','paused',12,89.5,'2026-10-24'],
 ['AG-1054','口碑分析工具','Sentiment watcher','数据分析','Analytics','running',59,94.6,'2026-10-23'],
 ['AG-1055','产品竞品追踪','Competitor tracker','电商','Commerce','running',81,92.1,'2026-10-22'],
 ['AG-1056','工单自动分派','Ticket dispatcher','客服','Support','running',201,97.5,'2026-10-21'],
 ['AG-1057','活动文案编辑','Campaign writer','内容创作','Content','draft',0,0,'2026-10-20']
].map((r,i)=>({id:r[0],name:DATA(r[1],r[2]),category:DATA(r[3],r[4]),status:r[5],tasks:r[6],score:r[7],updated:r[8],owner:['Mia','Leo','Nina','Alex'][i%4]}));
const initTasks=[
 {id:1,title:DATA('优化新手引导流程','Improve onboarding flow'),desc:DATA('减少用户首次创建智能体的步骤','Reduce time to first agent'),lane:'todo',priority:'high',owner:'Mia',due:'11/07'},
 {id:2,title:DATA('组件暗黑模式走查','Audit component dark mode'),desc:DATA('校验输入框、弹窗和图表配色','Verify fields, dialogs, charts'),lane:'todo',priority:'normal',owner:'Leo',due:'11/09'},
 {id:3,title:DATA('设计 Token 规范','Design token system'),desc:DATA('统一圆角、字阶与色彩语义','Unify radius, type, and colors'),lane:'doing',priority:'high',owner:'Nina',due:'11/05'},
 {id:4,title:DATA('智能体任务详情页','Agent task detail screen'),desc:DATA('补充日志、状态及重试交互','Add logs, status, retry actions'),lane:'doing',priority:'normal',owner:'Alex',due:'11/06'},
 {id:5,title:DATA('数据图表可访问性','Chart accessibility'),desc:DATA('增加说明文本与对比度','Add descriptions and contrast'),lane:'review',priority:'high',owner:'Mia',due:'11/04'},
 {id:6,title:DATA('列表批量操作','Bulk table actions'),desc:DATA('完成勾选、筛选及导出','Selection, filtering, exporting'),lane:'review',priority:'normal',owner:'Nina',due:'11/02'},
 {id:7,title:DATA('工作台信息架构','Dashboard architecture'),desc:DATA('确定导航层级和关键指标','Define nav and key metrics'),lane:'done',priority:'normal',owner:'Leo',due:'10/29'},
 {id:8,title:DATA('响应式导航方案','Responsive navigation'),desc:DATA('完成桌面、平板、手机布局','Layouts across device sizes'),lane:'done',priority:'low',owner:'Alex',due:'10/27'}
];
const settingsKeys=['style','mode','lang','accent','font','fontSize','radius','density','iconStyle','imageStyle','navCollapsed','navGroups','page','shadow','sidebarWidth','exportSections'];
let restored={};try{restored=JSON.parse(localStorage.getItem('interactive-workbench-v1')||localStorage.getItem('novaflow-ui-lab-v53')||localStorage.getItem('novaflow-ui-lab-v52')||localStorage.getItem('novaflow-ui-lab-v43')||localStorage.getItem('novaflow-ui-lab-v3')||'{}')||{}}catch{}
// v5.4.1: migrate the previous default values only; preserve all other custom preferences.
if(Number(restored.fontSize)===14)restored.fontSize=17;
if(Number(restored.radius)===11)restored.radius=12;
const DEFAULT_ACCENT='#1677ff';
// Existing profiles using the former shipped default purple should receive the new default blue.
if(typeof restored.accent==='string'&&['#6254df','#6750a4'].includes(restored.accent.toLowerCase()))restored.accent=DEFAULT_ACCENT;
const defaults={navGroups:{operations:true,workflows:true,design:true,system:true},style:'ant',mode:'light',lang:'zh',accent:DEFAULT_ACCENT,font:'system',fontSize:17,radius:12,density:'comfortable',iconStyle:'line',imageStyle:'gradient',navCollapsed:false,sidebarWidth:248,shadow:'soft',exportSections:['product','tokens','pages','components','interactions','responsive','ai']};
const state={...defaults,...Object.fromEntries(settingsKeys.filter(k=>restored[k]!==undefined).map(k=>[k,restored[k]])),page:(PAGES.some(x=>x[0]===restored.page)?restored.page:'overview'),navGroups:{operations:true,workflows:true,design:true,system:true,...(restored.navGroups&&typeof restored.navGroups==='object'?restored.navGroups:{})},navQuery:'',navFlyoutGroup:null,chartType:'line',range:'7d',tableStatus:'all',tableSearch:'',tablePage:1,tableSort:'id',tableSortDir:1,tableSelected:[],rows:structuredClone(SAMPLE_ROWS),tasks:structuredClone(initTasks),agentQuery:'',agentFilter:'all',calendarOffset:0,calendarDate:new Date().toISOString().slice(0,10),events:[],componentTab:'all',accordion:0,step:1,loading:false,form:{name:'',email:'',type:'design',date:'',notes:'',budget:60,notify:true,agree:false},formError:'',selectedImage:null,selectedEffects:(()=>{try{return JSON.parse(localStorage.getItem('novaflow-ui-lab-saved-effects')||'[]')||[]}catch{return []}})(),iconQuery:'',iconCategory:'all',mediaTab:'all',progress:42,toastHistory:[],mobileNav:false,settingsOpen:false,settingsTab:'appearance'};
if(!state.accent)state.accent=DEFAULT_ACCENT;
state.sidebarWidth=Math.max(196,Math.min(420,Math.round(Number(state.sidebarWidth)||248)));

if(!ICON_STYLES.some(x=>x[0]===state.iconStyle))state.iconStyle='line';
function persist(){try{localStorage.setItem('interactive-workbench-v1',JSON.stringify(Object.fromEntries(settingsKeys.map(k=>[k,state[k]]))))}catch{}}
const yes=(c,a,b='')=>c?a:b;
function btn(label,action,kind='',extra=''){return `<button type="button" class="btn ${kind}" data-action="${action}" ${extra}>${label}</button>`}
function badge(status){let variants={running:['success',T('运行中','Running')],paused:['warning',T('已暂停','Paused')],draft:['neutral',T('草稿','Draft')],done:['success',T('已完成','Done')],high:['error',T('高优先级','High')],normal:['neutral',T('普通','Normal')],low:['success',T('低优先级','Low')]};let v=variants[status]||['neutral',status];return `<span class="badge ${v[0]} dot">${v[1]}</span>`}
function heading(kicker,title,desc,actions=''){return `<div class="ws-page-header"><div><div class="page-kicker">${kicker}</div><h1>${title}</h1><p>${desc}</p></div><div class="toolbar-buttons">${btn(icon('star')+T('收藏当前页面','Save this design'),'save-page','small')}${actions}</div></div>`}
function card(title,desc,body,actions=''){return `<section class="card card-pad"><div class="card-heading"><div><h3>${title}</h3>${desc?`<p>${desc}</p>`:''}</div>${actions}</div>${body}</section>`}
function chartSvg(type='line',range='7d'){
 const series=range==='30d'?[55,78,76,83,80,91,88,101,99,116,110,127,122,139,132,148,152,145,168,162,182,173,187,193,184,203,210,202,218,229]:[65,86,80,112,103,135,156], vals=series;
 const sx=i=>39+(604*i)/(vals.length-1),sy=v=>204-v*.74;
 const path=vals.map((v,i)=>`${i?'L':'M'}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
 let visual=type==='bar'?vals.map((v,i)=>`<rect class="chart-bar" x="${sx(i)-Math.max(3,vals.length===7?15:4)}" y="${sy(v)}" width="${Math.max(5,vals.length===7?30:8)}" height="${204-sy(v)}" rx="4"/>`).join(''):`<path class="chart-area" d="${path} L643 204 L39 204 Z"/><path class="chart-line" d="${path}"/>${vals.length===7?vals.map((v,i)=>`<circle class="chart-dot" cx="${sx(i)}" cy="${sy(v)}" r="3.4"/>`).join(''):''}`;
 return `<svg class="overview-chart" viewBox="0 0 675 237" role="img" aria-label="${T('业务趋势','Business trend')}">${[35,80,125,170,204].map(y=>`<line class="chart-grid" x1="39" y1="${y}" x2="644" y2="${y}"/>`).join('')}${[250,200,150,100,50].map((v,i)=>`<text class="chart-label" x="7" y="${38+i*42}">${v}</text>`).join('')}${visual}${(range==='30d'?['10/05','10/10','10/15','10/20','10/25','11/03']:['10/28','10/29','10/30','10/31','11/01','11/02','11/03']).map((s,i,a)=>`<text class="chart-label" x="${Math.min(620,39+604*i/(a.length-1))}" y="226" text-anchor="middle">${s}</text>`).join('')}</svg>`;
}
function footer(){return `<footer class="page-footer"><span>© 2026 交互式工作台 · ${T('可配置的工作台与业务功能','Configurable workspace and workflows')}</span><span>${T('设计工具与工作流程','Design tools and workflows')}</span></footer>`}
function monthEvents(){if(state.events.length)return;const d=new Date(),y=d.getFullYear(),m=d.getMonth(),date=n=>`${y}-${String(m+1).padStart(2,'0')}-${String(n).padStart(2,'0')}`;state.events=[{id:1,date:date(4),title:DATA('设计评审','Design review'),time:'10:00',type:'design'},{id:2,date:date(8),title:DATA('研发同步','Engineering sync'),time:'14:30',type:'meeting'},{id:3,date:date(12),title:DATA('组件发布','Component release'),time:'16:00',type:'release'},{id:4,date:date(16),title:DATA('周会','Weekly standup'),time:'09:30',type:'meeting'},{id:5,date:date(22),title:DATA('交互评审','Interaction test'),time:'11:00',type:'design'},{id:6,date:date(26),title:DATA('里程碑验收','Milestone review'),time:'15:00',type:'release'}]}
function imageUri(id,style='gradient'){
 const palettes=[['#4b38d3','#eb76c8','#ffc98a'],['#006e7b','#37d0c0','#f2da84'],['#ec5c6d','#f7a956','#fff0b5'],['#562ab3','#8c6ae7','#92e4fb'],['#005a91','#54a4e3','#c3e8f5'],['#154c4b','#57b796','#d0d989']];
 let [a,b,c]=palettes[id%palettes.length],title=['HORIZON','OCEAN','SUNSET','DREAM','METRO','GARDEN'][id%6];
 let shape='';
 if(style==='editorial')shape=`<rect width="540" height="340" fill="#f8eddb"/><rect x="28" y="24" width="272" height="290" fill="${a}"/><circle cx="309" cy="156" r="118" fill="${b}"/><rect x="315" y="72" width="186" height="177" fill="${c}" transform="rotate(14 408 160)"/><path d="M18 265L275 45L454 323" fill="none" stroke="#132631" stroke-width="17"/><text x="44" y="100" fill="white" font-size="48" font-weight="900" font-family="Arial">NO.</text><text x="44" y="145" fill="white" font-size="68" font-weight="900" font-family="Arial">0${id+1}</text><text x="345" y="305" fill="#132631" font-size="22" font-weight="900" font-family="Arial">${title}</text>`;
 else if(style==='mono')shape=`<rect width="540" height="340" fill="#111720"/><circle cx="410" cy="95" r="56" fill="#e8e9e5"/><path d="M0 275L0 114L95 80L95 275M105 275V38H224V275M234 275V108H340V275M352 275V148H500V275M508 275V86H540V275" fill="#8e9399" stroke="#f2f1eb" stroke-width="5"/><path d="M0 277L540 277" stroke="#fff" stroke-width="7"/><g stroke="#30363e" stroke-width="8">${Array.from({length:13},(_,i)=>`<path d="M${i*46} 120v140"/>`).join('')}</g><path d="M0 310Q180 240 540 318" stroke="#c5c6c7" stroke-width="18" fill="none"/><text x="25" y="319" fill="#fff" font-family="monospace" font-size="17" letter-spacing="7">ARCHIVE // 0${id+1}</text>`;
 else if(style==='neon')shape=`<rect width="540" height="340" fill="#100b35"/><defs><linearGradient id="sun${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffe45e"/><stop offset="1" stop-color="#ff3ba6"/></linearGradient></defs><circle cx="270" cy="127" r="91" fill="url(#sun${id})"/><path d="M180 140H360M166 160H374M156 184H384" stroke="#100b35" stroke-width="10"/><path d="M0 220L102 174L174 228L240 194L310 244L404 165L540 214V340H0" fill="#241163" stroke="#ed36fd" stroke-width="3"/><path d="M0 276H540M0 309H540M0 336H540${Array.from({length:13},(_,i)=>`M270 219L${i*54-54} 340`).join('')}" fill="none" stroke="#24fff5" stroke-width="2" opacity=".72"/><text x="28" y="46" font-size="20" font-weight="900" letter-spacing="6" fill="#70fff8" font-family="monospace">${title} // 2088</text>`;
 else if(style==='glass')shape=`<rect width="540" height="340" fill="#0b1149"/><defs><filter id="blur${id}"><feGaussianBlur stdDeviation="37"/></filter><linearGradient id="glass${id}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient></defs><g filter="url(#blur${id})"><circle cx="115" cy="215" r="114" fill="${b}"/><circle cx="420" cy="105" r="123" fill="${c}"/><circle cx="279" cy="320" r="107" fill="${a}"/></g><rect x="76" y="54" width="375" height="244" rx="42" fill="url(#glass${id})" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><circle cx="175" cy="157" r="71" fill="#fff" fill-opacity=".15" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><path d="M295 93H412M295 121H402M295 148H374" stroke="#fff" stroke-opacity=".85" stroke-width="12" stroke-linecap="round"/><text x="290" y="250" font-family="Arial" font-weight="800" font-size="28" fill="white">0${id+1} / ${title}</text>`;
 else if(style==='pixel')shape=`<rect width="540" height="340" fill="#6c8ff5"/><rect y="231" width="540" height="109" fill="#326c67"/><rect y="270" width="540" height="70" fill="#245544"/><rect x="95" y="62" width="80" height="18" fill="#fff2c1"/><rect x="75" y="80" width="130" height="18" fill="#fff2c1"/><rect x="332" y="35" width="55" height="55" fill="#ffee8a"/><path d="M0 260h40v-20h45v-20h40v-20h45v-30h60v32h45v20h45v20h45v18h175" fill="${a}"/><path d="M0 250h40v-30h45v-20h40v-20h45v-30h60v32h45v20h45v20h45v28h175" fill="${b}" opacity=".83"/><g fill="#f6d37a">${Array.from({length:11},(_,i)=>`<rect x="${i*54+8}" y="${272+(i%3)*16}" width="23" height="13"/>`).join('')}</g><g fill="#1f2c53"><rect x="36" y="195" width="13" height="60"/><rect x="24" y="190" width="40" height="12"/><rect x="472" y="177" width="15" height="85"/><rect x="458" y="169" width="44" height="14"/></g><text x="20" y="36" font-family="monospace" font-size="20" fill="#fff" font-weight="900">WORLD 0${id+1} ■ PIXEL</text>`;
 else if(style==='paper')shape=`<rect width="540" height="340" fill="#ffefda"/><circle cx="385" cy="112" r="84" fill="${c}"/><path d="M0 258Q92 82 180 226Q295 62 380 225Q475 115 540 208V340H0" fill="${a}" stroke="#fff" stroke-width="8"/><path d="M0 297Q96 202 182 297Q275 163 359 284Q468 180 540 279V340H0" fill="${b}" stroke="#fff4" stroke-width="9"/><path d="M0 337Q120 232 235 320Q385 213 540 326V340H0" fill="${c}" stroke="#ffefda" stroke-width="7"/><circle cx="110" cy="100" r="27" fill="#fff"/><circle cx="159" cy="121" r="19" fill="#fff"/><rect x="110" y="114" width="47" height="17" fill="#fff"/><text x="29" y="49" fill="#39413a" font-family="Georgia" font-weight="bold" font-size="24">THE PAPER LAND / 0${id+1}</text>`;
 else shape=`<defs><radialGradient id="aur${id}" cx=".72" cy=".28" r=".8"><stop stop-color="${c}"/><stop offset=".49" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></radialGradient></defs><rect width="540" height="340" fill="url(#aur${id})"/><circle cx="410" cy="90" r="103" fill="#fff" opacity=".25"/><path d="M-25 310Q110 95 255 227Q380 334 560 86V340H-25" fill="${c}" opacity=".65"/><path d="M-30 324Q130 200 247 293Q410 105 565 248V340H-30" fill="${a}" opacity=".65"/><path d="M-30 332Q120 288 250 319Q420 221 570 309V340H-30" fill="${b}" opacity=".58"/><text x="31" y="56" font-family="Arial" font-size="25" font-weight="800" letter-spacing="7" fill="#fff">${title}</text>`;
 const details=[
 `<path d="M64 218L122 143L183 220" fill="none" stroke="#e94af7" stroke-width="6"/>`,
 `<path d="M30 240Q75 218 120 240Q165 264 210 240M333 240Q385 211 439 240Q487 265 526 240" fill="none" stroke="#46f4f7" stroke-width="5"/>`,
 `<g fill="none" stroke="#fff7cc" stroke-width="4"><path d="M65 87q15-15 30 0q15-15 30 0M410 73q12-12 24 0q12-12 24 0"/></g>`,
 `<g fill="#fc65ff"><path d="m80 78 6 18 18 6-18 6-6 18-6-18-18-6 18-6z"/><path d="m448 130 4 13 13 4-13 4-4 13-4-13-13-4 13-4z"/></g>`,
 `<g fill="#101432" stroke="#7ff9ff" stroke-width="3"><rect x="35" y="134" width="43" height="84"/><rect x="80" y="111" width="36" height="107"/><rect x="434" y="113" width="36" height="104"/><rect x="470" y="150" width="41" height="67"/></g>`,
 `<g stroke="#64fdd6" fill="none" stroke-width="5"><path d="M60 256L58 135M58 140q-43-35-51-19M58 140q44-39 61-19M58 150q-37-13-51 9M58 150q37-20 55 5M476 259V153M476 155q-37-35-57-15M476 155q33-37 52-24"/></g>`
 ];
 const detail=style==='neon'?details[id%6]:'';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 340">${shape}${detail}</svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function topMeta(){return `<span class="badge neutral">${esc(styles[state.style].name)}</span>`}
function overviewPage(){
 const metrics=[[T('活跃智能体','Active agents'),'24','+12.8%','bot'],[T('今日任务','Tasks today'),'1,284','+18.6%','lightning'],[T('累计收入','Total revenue'),'¥86,420','+9.3%','chart'],[T('成功率','Success rate'),'98.6%','+2.1%','target']];
 const activities=[[T('内容运营助手完成任务','Content copilot completed'),T('生成任务执行成功','Generation task completed'),'10:45','check'],[T('新成员加入团队','New team member'),T('Nina 接受了邀请','Nina accepted invite'),'09:20','user'],[T('设计规范更新','Design spec updated'),T('设计 Token 已同步','Tokens synchronized'),'08:40','file']];
 const header=heading('WORKSPACE / 01',T('工作台总览','Workspace overview'),T('同一数据、同一主色，观察八种不同布局与组件设计。','Same data and accent across eight distinct structures.'),btn(icon('refresh')+T('刷新','Refresh'),'refresh-demo')+btn(icon('plus')+T('新建智能体','Create agent'),'modal-agent','primary'));
 const metricCards=metrics.map((m,i)=>`<div class="nf-metric metric-${i} card"><div class="nf-metric-label">${m[0]}</div><div class="nf-metric-icon">${icon(m[3],19)}</div><strong>${m[1]}</strong><span class="nf-metric-change">↗ ${m[2]} <small>${T('较上期','vs prior')}</small></span><div class="nf-mini-bars"><i></i><i></i><i></i><i></i><i></i></div></div>`).join('');
 const metricsPanel=`<section class="nf-metrics">${metricCards}</section>`;
 const hero=`<section class="nf-hero"><div><span class="nf-overline">INTERACTIVE WORKBENCH / V1.0</span><h2>${T('让界面设计更有依据','Design with clarity')}</h2><p>${T('组件、布局和数据协同，保持一致的设计主色。','One content set, one accent. Eight real layout directions.')}</p></div><div class="nf-hero-symbol">✦</div></section>`;
 const chart=card(T('任务与收益趋势','Tasks & revenue trend'),T('折线图 / 柱状图，7 天或 30 天','Line or bar, 7 or 30 days'),`<div id="overview-chart">${chartSvg(state.chartType,state.range)}</div><div class="nf-chart-caption">● ${T('工作区指标','Workspace metrics')}</div>`,`<div class="toolbar-buttons"><div class="segmented"><button data-action="chart-line" class="${state.chartType==='line'?'selected':''}">${T('折线','Line')}</button><button data-action="chart-bar" class="${state.chartType==='bar'?'selected':''}">${T('柱状','Bar')}</button></div><select class="control-select" data-change="range"><option value="7d" ${state.range==='7d'?'selected':''}>7D</option><option value="30d" ${state.range==='30d'?'selected':''}>30D</option></select></div>`);
 const activity=card(T('近期动态','Recent activity'),T('最新动态记录','Latest activity feed'),`<div>${activities.map(a=>`<div class="activity-item"><span class="activity-square">${icon(a[3])}</span><div style="flex:1;min-width:0"><strong>${a[0]}</strong><p>${a[1]}</p></div><time>${a[2]}</time></div>`).join('')}</div><button class="btn soft" data-action="notification">${T('查看全部动态','View all activity')} ${icon('arrow',13)}</button>`);
 const agents=card(T('运行中的智能体','Active agents'),T('点击详情可查看数据并管理运行状态','Click a record to open interactive details'),`<div class="table-wrap"><table class="data-table"><thead><tr><th>${T('名称','Name')}</th><th>${T('状态','Status')}</th><th>${T('任务','Tasks')}</th><th>${T('操作','Actions')}</th></tr></thead><tbody>${state.rows.slice(0,4).map(r=>`<tr><td><strong>${esc(r.name[state.lang])}</strong><div class="muted tiny">${r.id}</div></td><td>${badge(r.status)}</td><td>${r.tasks}</td><td>${btn(T('详情','Details'),'agent-detail','small',`data-id="${r.id}"`)}</td></tr>`).join('')}</tbody></table></div>`,`<button class="btn small" data-nav="agents">${T('全部智能体','All agents')} ${icon('arrow',12)}</button>`);
 const sparkNav=`<div class="nf-workflow-shortcuts"><span>${icon('bot',15)} ${T('智能体','Agents')}</span><span>${icon('layers',15)} ${T('工作流','Workflows')}</span><span>${icon('table',15)} ${T('数据','Data')}</span><span>${icon('file',15)} ${T('报表','Reports')}</span></div>`;
 let layout='';
 switch(state.style){
  case 'ant':layout=`<div class="nf-overview nf-overview-ant">${metricsPanel}<div class="nf-duo">${chart}${activity}</div>${agents}</div>`;break;
  case 'shadcn':layout=`<div class="nf-overview nf-overview-shadcn"><div class="nf-shadcn-summary nf-shadcn-shortcuts-only">${sparkNav}</div>${metricsPanel}<div class="nf-duo">${chart}${agents}</div>${activity}</div>`;break;
  case 'material':layout=`<div class="nf-overview nf-overview-material">${hero}<div class="nf-material-main"><div>${metricsPanel}${chart}</div><div>${activity}${agents}</div></div></div>`;break;
  case 'element':layout=`<div class="nf-overview nf-overview-element"><div class="nf-element-tools">${icon('check',16)} ${T('系统运行正常','Systems operational')} <span>· ${T('最近更新','Last sync')} 11:03</span></div>${metricsPanel}<div class="nf-duo">${chart}${activity}</div>${agents}</div>`;break;
  case 'tabler':layout=`<div class="nf-overview nf-overview-tabler"><div class="nf-tabler-ribbon"><b>${T('操作概况','Operations')}</b><span>${T('活跃工作区','Active workspace')}</span><span>v2.4.1 · 99.9% uptime</span></div><div class="nf-tabler-row">${chart}${metricsPanel}</div><div class="nf-duo">${agents}${activity}</div></div>`;break;
  case 'bootstrap':layout=`<div class="nf-overview nf-overview-bootstrap"><div class="nf-bootstrap-jumbo"><h2>${T('业务控制台','Business control center')}</h2><p>${T('经典容器布局，清晰的操作路径和反馈。','Classic utility-driven layout and explicit controls.')}</p><button class="btn primary" data-action="modal-agent">${T('创建智能体','Create agent')}</button></div>${metricsPanel}<div class="nf-duo">${activity}${chart}</div>${agents}</div>`;break;
  case 'adminlte':layout=`<div class="nf-overview nf-overview-adminlte"><div class="nf-admin-breadcrumb">${T('首页','Home')} &gt; Dashboard <span>${T('控制台','Control panel')}</span></div>${metricsPanel}<div class="nf-admin-board">${agents}${chart}</div>${activity}</div>`;break;
  case 'daisy':layout=`<div class="nf-overview nf-overview-daisy"><div class="nf-bento-grid"><div class="nf-bento-hero">${hero}</div><div class="nf-bento-metrics">${metricsPanel}</div></div><div class="nf-duo">${activity}${chart}</div>${agents}</div>`;break;
  default:layout=`<div class="nf-overview">${metricsPanel}${chart}${activity}${agents}</div>`;
 }
 return header+layout+footer();
}
function componentPage(){
 const active=state.componentTab;
 const saved=state.selectedEffects.filter(x=>x.type==='component');
 const groups=[['all',T('全部组件','All components')],['basic',T('基础组件','Basics')],['composite',T('组合方案','Composite patterns')],['advanced',T('高级交互','Advanced')]];
 const demos=[
 {group:'basic',t:T('按钮体系 / Button system','Button system'),d:T('主按钮、次按钮、软按钮、危险按钮与加载态','Primary, secondary, soft, danger and loading variants'),body:`<div class="demo-actions">${btn(T('主要操作','Primary'),'demo-success','primary')}${btn(T('次要操作','Secondary'),'demo-info')}${btn(T('轻量按钮','Soft'),'demo-info','soft')}${btn(T('危险操作','Danger'),'demo-confirm','danger')}</div><div class="demo-actions">${btn(icon('download')+T('下载数据','Download'),'export-csv','small')}${btn(icon('plus')+T('创建','Create'),'modal-agent','primary lg')}${btn(T('刷新列表','Refresh data'),'demo-load')}</div>`},
 {group:'basic',t:T('输入控件 / Inputs','Inputs'),d:T('文本框、下拉、日期、范围与开关','Text field, select, date, range and toggle'),body:`<input class="control-input" placeholder="${T('请输入关键词…','Enter a keyword…')}"/><div class="demo-actions"><select class="control-select"><option>${T('选择一项','Select an option')}</option><option>Design</option><option>Engineering</option></select><input type="date" class="control-input" style="width:146px"/></div><input type="range" min="0" max="100" value="65" style="width:100%;accent-color:var(--accent)"/><label class="checkline"><input class="toggle" type="checkbox" checked> ${T('在线状态','Online status')}</label>`},
 {group:'composite',t:T('导航方案 / Navigation','Navigation patterns'),d:T('侧边导航、顶部胶囊导航与双层导航对照','Sidebar, top pills and dual-level navigation'),body:`<div class="variant-grid nav-variants"><div class="variant-card"><div class="variant-head"><strong>${T('侧边导航','Sidebar')}</strong><button class="btn small ghost" data-action="save-component" data-value="Navigation / Sidebar">${icon('star',13)}</button></div><div class="mini-sidebar"><span>${icon('dashboard',14)} Overview</span><span class="active">${icon('layers',14)} Components</span><span>${icon('table',14)} Table</span></div></div><div class="variant-card"><div class="variant-head"><strong>${T('顶部胶囊','Top pills')}</strong><button class="btn small ghost" data-action="save-component" data-value="Navigation / Top pill">${icon('star',13)}</button></div><div class="mini-topnav"><span class="active">${icon('dashboard',14)} Dashboard</span><span>${icon('bot',14)} Agents</span><span>${icon('chart',14)} Analytics</span></div></div><div class="variant-card"><div class="variant-head"><strong>${T('双层导航','Dual-level')}</strong><button class="btn small ghost" data-action="save-component" data-value="Navigation / Dual level">${icon('star',13)}</button></div><div class="mini-dualnav"><div class="bar">Workspace · Design · Data</div><div class="sub">Overview / Components / Export</div></div></div></div>`},
 {group:'composite',t:T('卡片方案 / Cards','Card patterns'),d:T('统计卡、信息卡与媒体卡的版式差异','Metric, content and media card patterns'),body:`<div class="variant-grid"><div class="variant-card"><div class="variant-head"><strong>${T('统计卡','Metric card')}</strong><button class="btn small ghost" data-action="save-component" data-value="Card / Metric">${icon('star',13)}</button></div><div class="metric-tile"><div class="label">MRR</div><div class="value">¥48,230</div><div class="change">↗ 13.2%</div></div></div><div class="variant-card"><div class="variant-head"><strong>${T('信息卡','Content card')}</strong><button class="btn small ghost" data-action="save-component" data-value="Card / Content">${icon('star',13)}</button></div><div class="content-tile"><strong>${T('季度发布计划','Quarterly release plan')}</strong><p>${T('梳理组件、页面模板与开发交付边界。','Align components, templates and engineering handoff.')}</p></div></div><div class="variant-card"><div class="variant-head"><strong>${T('媒体卡','Media card')}</strong><button class="btn small ghost" data-action="save-component" data-value="Card / Media">${icon('star',13)}</button></div><div class="media-tile"><img alt="preview" src="${imageUri(1,state.imageStyle)}"/><span>${T('视觉主题示意','Visual style preview')}</span></div></div></div>`},
 {group:'composite',t:T('表格方案 / Tables','Table patterns'),d:T('紧凑列表、舒适列表与指标型表格','Compact, roomy and KPI-centric tables'),body:`<div class="variant-grid table-variants"><div class="variant-card"><div class="variant-head"><strong>${T('紧凑表格','Compact')}</strong><button class="btn small ghost" data-action="save-component" data-value="Table / Compact">${icon('star',13)}</button></div><table class="mini-table compact"><tr><th>ID</th><th>${T('名称','Name')}</th><th>${T('状态','Status')}</th></tr><tr><td>AG-1</td><td>Flow Bot</td><td>${badge('running')}</td></tr><tr><td>AG-2</td><td>Mailer</td><td>${badge('paused')}</td></tr></table></div><div class="variant-card"><div class="variant-head"><strong>${T('舒适表格','Comfort')}</strong><button class="btn small ghost" data-action="save-component" data-value="Table / Spacious">${icon('star',13)}</button></div><table class="mini-table cozy"><tr><th>${T('名称','Name')}</th><th>${T('类别','Type')}</th><th>${T('分数','Score')}</th></tr><tr><td>Sentiment watcher</td><td>Analytics</td><td>94.6%</td></tr><tr><td>Knowledge base</td><td>Knowledge</td><td>87.8%</td></tr></table></div><div class="variant-card"><div class="variant-head"><strong>${T('指标行','KPI row')}</strong><button class="btn small ghost" data-action="save-component" data-value="Table / KPI">${icon('star',13)}</button></div><div class="kpi-table"><div><span>${T('请求量','Requests')}</span><b>13,204</b></div><div><span>Latency</span><b>420ms</b></div><div><span>Error</span><b>0.8%</b></div></div></div></div>`},
 {group:'advanced',t:T('反馈组件 / Feedback','Feedback components'),d:T('提醒、步骤条、进度和折叠区','Alerts, stepper, progress and accordion'),body:`<div class="alert">${icon('info',17)} ${T('这是可用于说明重要信息的提示条。','This is an informational notice.')}</div><div class="stepper">${[1,2,3,4].map((n,i)=>`${i?`<div class="step-line ${state.step>i?'done':''}"></div>`:''}<div class="step-circle ${state.step>=n?'done':''}">${n}</div>`).join('')}</div><div class="demo-actions">${btn(T('上一步','Back'),'step-prev','small')}${btn(T('下一步','Next'),'step-next','primary small')}</div><div class="progress-track"><div class="progress-fill" style="width:72%"></div></div>`},
 {group:'advanced',t:T('弹窗与详情 / Dialogs','Dialogs & details'),d:T('确认弹窗、详情弹窗和创建表单','Confirmation, detail and create dialogs'),body:`<div class="demo-actions">${btn(T('删除确认','Delete confirm'),'demo-confirm','danger')}${btn(T('详情弹窗','Detail modal'),'demo-details')}${btn(T('创建实体','Create item'),'modal-task','primary')}</div><p class="muted tiny">Esc · ${T('关闭弹窗','Close dialog')}</p>`}
 ];
 const slotLabel={button:T('按钮','Buttons'),card:T('卡片','Cards'),navigation:T('导航','Navigation'),table:T('表格','Tables'),other:T('其它','Other')};
 const grouped=['button','card','navigation','table'].map(slot=>({slot,label:slotLabel[slot],items:saved.filter(x=>(x.slot||'other')===slot)}));
 return heading('UI KIT / 02',T('组件选型与方案对比','Component picker & compare'),T('不只是看组件，而是把喜欢的按钮、卡片、导航和表格收藏、组合，再导出给 AI 开发。','Save the patterns you like, combine them into a system, then export an AI-ready brief.'),btn(icon('copy')+T('复制组件清单','Copy component checklist'),'copy-components'))+
 `<div class="gap-16"><div class="row between"><div class="segmented">${groups.map(([id,n])=>`<button class="${active===id?'selected':''}" data-action="component-tab" data-value="${id}">${n}</button>`).join('')}</div><span class="muted tiny">${T('点击星标收藏方案，右侧导出区会自动写入','Save patterns via the star button; exports update automatically')}</span></div>
 <div class="grid-3">${demos.filter(o=>active==='all'||o.group===active).map(o=>`<div class="card component-demo"><div class="row between"><div><h4>${o.t}</h4><div class="demo-hint" style="margin-top:4px">${o.d}</div></div><button class="btn small ghost" title="${T('收藏此组件','Save component')}" data-action="save-component" data-value="${esc(o.t)}">${icon('star',14)}</button></div>${o.body}</div>`).join('')}</div>
 ${card(T('方案组合板','Combination board'),T('把收藏的组件按类型对照，形成可交付的界面方案。','Group saved components by type to form a handoff-ready design direction.'),`<div class="compare-board">${grouped.map(g=>`<div class="compare-slot"><div class="compare-slot-head"><strong>${g.label}</strong><span>${g.items.length}</span></div>${g.items.length?g.items.map(item=>`<div class="compare-pill">★ ${esc(item.label)} <button class="ghost-chip" data-action="remove-effect" data-id="${item.id}">${icon('close',12)}</button></div>`).join(''):`<div class="compare-empty">${T('从上方收藏该类组件','Save a pattern above')}</div>`}</div>`).join('')}</div><div class="row between top-gap"><span class="muted tiny">${T('这些选择将进入 AI 设计需求文档','These picks flow into the AI design brief')}</span><div class="demo-actions">${btn(T('清空组件收藏','Clear components'),'clear-components','small')}${btn(T('前往导出','Go to export'),'open-export','primary small')}</div></div>`)}
 </div>`+footer();
}

function sortedRows(){let rows=state.rows.filter(r=>(state.tableStatus==='all'||r.status===state.tableStatus)&&(`${r.id} ${r.name.zh} ${r.name.en} ${r.category.zh} ${r.owner}`).toLowerCase().includes(state.tableSearch.toLowerCase()));rows.sort((a,b)=>{let x=a[state.tableSort],y=b[state.tableSort];if(typeof x==='object'){x=x[state.lang];y=y[state.lang]}return (typeof x==='number'?x-y:String(x).localeCompare(String(y)))*state.tableSortDir});return rows}
function tablePage(){let rows=sortedRows(),pageCount=Math.max(1,Math.ceil(rows.length/6));state.tablePage=Math.min(Math.max(1,state.tablePage),pageCount);let visible=rows.slice((state.tablePage-1)*6,state.tablePage*6);let allSelected=visible.length>0&&visible.every(r=>state.tableSelected.includes(r.id));return heading('DATA MANAGEMENT / 03',T('数据表格','Data table'),T('搜索、排序、状态筛选、分页、多选、行编辑、批量操作与 CSV 导出。','Search, sort, filter, paginate, select, edit, bulk-update and export CSV.'),btn(icon('refresh')+T('刷新列表','Refresh list'),'load-table')+btn(icon('download')+' CSV','export-csv','primary'))+
 `<div class="card"><div class="row between" style="padding:16px;flex-wrap:wrap"><div class="table-tools"><input id="table-search" class="control-input" value="${esc(state.tableSearch)}" data-input="table-search" placeholder="${T('搜索名称 / ID…','Search name or ID…')}"/><select class="control-select" data-change="table-status"><option value="all">${T('全部状态','All statuses')}</option>${[['running',T('运行中','Running')],['paused',T('已暂停','Paused')],['draft',T('草稿','Draft')]].map(([id,t])=>`<option value="${id}" ${state.tableStatus===id?'selected':''}>${t}</option>`).join('')}</select></div><div class="table-tools">${state.tableSelected.length?`<span class="badge">${T('已选','Selected')} ${state.tableSelected.length}</span>${btn(T('批量暂停','Pause selected'),'bulk-pause','small')}${btn(T('批量删除','Delete selected'),'bulk-delete','danger small')}`:`<span class="muted tiny">${T('可勾选多行执行批量操作','Select rows for bulk actions')}</span>`}</div></div>
 <div class="table-wrap" id="table-render-zone">${tableRowsHtml(visible,allSelected)}</div><div class="row between" style="padding:13px 16px;border-top:1px solid var(--stroke);flex-wrap:wrap"><span class="muted tiny">${T('共','Total')} ${rows.length} ${T('项','items')} · ${T('第','Page')} ${state.tablePage}/${pageCount}</span><div class="pagination"><button data-action="table-prev" ${state.tablePage===1?'disabled':''}>‹</button>${Array.from({length:pageCount},(_,i)=>`<button data-action="table-goto" data-index="${i+1}" class="${i+1===state.tablePage?'active':''}">${i+1}</button>`).join('')}<button data-action="table-next" ${state.tablePage===pageCount?'disabled':''}>›</button></div></div></div>`+footer()}
function tableRowsHtml(rows,allSelected){return `<table class="data-table"><thead><tr><th><input type="checkbox" data-change="table-select-all" ${allSelected?'checked':''} aria-label="Select all"/></th>${[['id','ID'],['name',T('名称','Name')],['category',T('类型','Category')],['status',T('状态','Status')],['tasks',T('今日任务','Tasks')],['score',T('成功率','Success')],['updated',T('更新日期','Updated')]].map(([key,label])=>`<th class="sortable" data-action="table-sort" data-key="${key}">${label} ${state.tableSort===key?(state.tableSortDir===1?'↑':'↓'):''}</th>`).join('')}<th>${T('操作','Actions')}</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td><input type="checkbox" data-change="table-select" data-id="${r.id}" ${state.tableSelected.includes(r.id)?'checked':''}/></td><td>${r.id}</td><td><strong>${esc(r.name[state.lang])}</strong><div class="muted" style="font-size:calc(10px * var(--site-font-scale,1))">${r.owner}</div></td><td>${esc(r.category[state.lang])}</td><td>${badge(r.status)}</td><td>${r.tasks}</td><td>${r.score?`${r.score}%`:'—'}</td><td>${r.updated}</td><td><div class="row" style="gap:4px">${btn(icon('edit',13),'table-edit','small',`data-id="${r.id}"`)}${btn(icon('eye',13),'agent-detail','small',`data-id="${r.id}"`)}</div></td></tr>`).join(''):`<tr><td colspan="9"><div class="empty-state">${icon('search',29)}<div>${T('没有匹配的数据','No matching data')}</div></div></td></tr>`}</tbody></table>`}
function formsPage(){let f=state.form;return heading('FORM BUILDER / 04',T('表单工坊','Form playground'),T('字段验证、单选多选、日期、附件选择、表单预览与提交反馈。','Validation, select, date, file upload, live summary and submission feedback.'),btn(icon('refresh')+T('重置表单','Reset form'),'form-reset'))+
 `<div class="split-64">${card(T('创建新的设计任务','Create a design request'),T('所有字段均可编辑，带 * 的项必填','Editable controls; * indicates required'),`<form id="design-form" class="gap-16" novalidate><div class="grid-2"><div class="field"><label for="form-name">${T('项目名称','Project name')} *</label><input id="form-name" data-field="name" class="control-input" value="${esc(f.name)}" placeholder="${T('例如：移动端改版','e.g. Mobile redesign')}"/><small>${T('不少于 2 个字符','At least 2 characters')}</small></div><div class="field"><label for="form-email">${T('负责人邮箱','Owner email')} *</label><input id="form-email" data-field="email" class="control-input" type="email" value="${esc(f.email)}" placeholder="name@example.com"/><small>${T('使用正确的邮箱格式','Use a valid email address')}</small></div></div><div class="grid-2"><div class="field"><label>${T('项目类型','Project type')}</label><select class="control-select" data-field="type"><option value="design" ${f.type==='design'?'selected':''}>${T('设计系统','Design system')}</option><option value="web" ${f.type==='web'?'selected':''}>${T('Web 产品','Web product')}</option><option value="mobile" ${f.type==='mobile'?'selected':''}>${T('移动端应用','Mobile app')}</option></select></div><div class="field"><label>${T('目标日期','Target date')}</label><input type="date" class="control-input" data-field="date" value="${esc(f.date)}"/></div></div><div class="field"><label>${T('项目描述','Brief')}</label><textarea class="control-textarea" data-field="notes" placeholder="${T('描述主要目标、目标用户与功能范围…','Describe users, goals and scope…')}">${esc(f.notes)}</textarea></div><div class="field"><div class="row between"><label>${T('预估预算权重','Budget priority')}</label><span id="budget-reading" class="badge">${f.budget}%</span></div><input type="range" min="0" max="100" data-field="budget" value="${f.budget}" style="accent-color:var(--accent)"/></div><div class="field"><label>${T('附件 / Assets','Attachments / Assets')}</label><label class="dropzone" for="demo-file">${icon('upload',23)}<div>${T('点击选择本地附件（仅保存文件名）','Choose a local file (filename only)')}</div><small id="attached-file">${T('未选中文件','No file selected')}</small></label><input type="file" id="demo-file" style="display:none" data-upload="form"/></div><div class="demo-actions"><label class="checkline"><input type="checkbox" data-field="notify" ${f.notify?'checked':''}/> ${T('完成后通知我','Notify me')}</label><label class="checkline"><input type="checkbox" data-field="agree" ${f.agree?'checked':''}/> ${T('我已确认需求信息','I confirm the brief')}</label></div>${state.formError?`<div class="alert error">${icon('alert',17)}${esc(state.formError)}</div>`:''}<div class="demo-actions">${btn(T('保存草稿','Save draft'),'form-draft')}${btn(icon('check')+T('校验并提交','Validate & submit'),'form-submit','primary')}</div></form>`)}
 <div class="gap-16">${card(T('实时表单摘要','Live form summary'),T('每次输入时自动更新','Updates as fields change'),`<div class="form-summary" id="form-summary">${formSummary()}</div><div class="divider"></div><div class="tiny muted">${T('此面板展示典型的主从布局、信息对照与确认步骤。','This illustrates a master-detail layout with a live confirmation view.')}</div>`)}${card(T('字段设计检查','Field design checklist'),T('常见输入状态与微交互','Common form states and micro-interactions'),`<div class="gap-12"><div class="row between"><span class="small-text">${T('必填字段标识','Required indicators')}</span>${badge('done')}</div><div class="row between"><span class="small-text">${T('输入焦点高亮','Focus highlight')}</span>${badge('done')}</div><div class="row between"><span class="small-text">${T('校验错误提示','Validation errors')}</span>${badge('done')}</div><div class="row between"><span class="small-text">${T('提交结果反馈','Submission feedback')}</span>${badge('done')}</div></div>`)}</div></div>`+footer();}
function formSummary(){let f=state.form;return `<dl><dt>${T('项目','Project')}</dt><dd>${esc(f.name||'—')}</dd><dt>${T('邮箱','Email')}</dt><dd>${esc(f.email||'—')}</dd><dt>${T('类型','Type')}</dt><dd>${({design:T('设计系统','Design system'),web:'Web',mobile:T('移动端','Mobile')})[f.type]}</dd><dt>${T('日期','Date')}</dt><dd>${esc(f.date||'—')}</dd><dt>${T('预算','Priority')}</dt><dd>${f.budget}%</dd><dt>${T('通知','Notify')}</dt><dd>${f.notify?T('开启','On'):T('关闭','Off')}</dd><dt>${T('描述','Notes')}</dt><dd>${esc(f.notes?.slice(0,110)||'—')}</dd></dl>`}
function kanbanPage(){const lanes=[['todo',T('待开始','To do'),'#9da8b8'],['doing',T('进行中','In progress'),'#8b75e9'],['review',T('待评审','In review'),'#edac53'],['done',T('已完成','Done'),'#34b48e']];let show=state.taskFilter||'all';return heading('PROJECT FLOW / 05',T('项目看板','Project kanban'),T('支持拖拽任务跨列、方向按钮移动、卡片详情与新增任务。','Drag cards between lanes, use move arrows, inspect and create tasks.'),btn(icon('plus')+T('新建任务','New task'),'modal-task','primary'))+`<div class="gap-16"><div class="row between"><div class="segmented"><button class="${show==='all'?'selected':''}" data-action="task-filter" data-value="all">${T('全部任务','All')}</button><button class="${show==='high'?'selected':''}" data-action="task-filter" data-value="high">${T('高优先级','High priority')}</button></div><span class="muted tiny">${T('拖拽卡片或使用箭头移动状态','Drag and drop, or use arrow buttons')}</span></div><div class="kanban-board">${lanes.map(([id,title,color],laneIndex)=>{let cards=state.tasks.filter(t=>t.lane===id&&(show==='all'||t.priority===show));return `<section class="kanban-lane" data-lane="${id}"><div class="lane-head"><span class="row" style="gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:${color}"></span>${title}</span><span class="badge neutral">${cards.length}</span></div>${cards.map(task=>`<div class="task-card" draggable="true" data-task="${task.id}"><div class="row between">${badge(task.priority)}<button class="btn small ghost" data-action="task-detail" data-id="${task.id}" aria-label="Details">${icon('more',15)}</button></div><h4>${esc(task.title[state.lang])}</h4><p>${esc(task.desc[state.lang])}</p><div class="task-foot"><span class="row" style="gap:6px"><span class="mini-avatar">${esc(task.owner.slice(0,1))}</span><span class="mini-date">${esc(task.due)}</span></span><div class="task-arrows"><button data-action="task-move" data-id="${task.id}" data-dir="-1" ${laneIndex===0?'disabled':''}>←</button><button data-action="task-move" data-id="${task.id}" data-dir="1" ${laneIndex===3?'disabled':''}>→</button></div></div></div>`).join('')}${cards.length===0?`<div class="empty-state">${T('暂无任务','No tasks')}</div>`:''}<button class="btn ghost small" data-action="modal-task" data-lane="${id}">${icon('plus',13)} ${T('添加卡片','Add card')}</button></section>`}).join('')}</div></div>`+footer()}
function calendarPage(){monthEvents();let now=new Date(),view=new Date(now.getFullYear(),now.getMonth()+state.calendarOffset,1),year=view.getFullYear(),month=view.getMonth();let first=(view.getDay()+6)%7;let days=new Date(year,month+1,0).getDate(),prevDays=new Date(year,month,0).getDate();let cells=Array.from({length:42},(_,i)=>{let day=i-first+1,dd=new Date(year,month,day),iso=`${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`;return {day:dd.getDate(),iso,other:dd.getMonth()!==month,today:iso===new Date().toISOString().slice(0,10)}});let selected=state.calendarDate,dayEvents=state.events.filter(x=>x.date===selected);let monthTitle=view.toLocaleDateString(state.lang==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long'});return heading('SCHEDULER / 06',T('日程日历','Calendar & scheduling'),T('月份切换、日期选取、事件列表和新增会议弹窗。','Navigate months, select dates, inspect events and schedule meetings.'),btn(icon('plus')+T('新建日程','New event'),'modal-event','primary'))+`<div class="split-73"><section class="card card-pad"><div class="calendar-head"><div><strong>${monthTitle}</strong><div class="tiny muted">${T('点击日期查看当日安排','Select a date to view the agenda')}</div></div><div class="toolbar-buttons">${btn(icon('chevronleft',13),'calendar-prev','small')}${btn(T('今天','Today'),'calendar-today','small')}${btn(icon('chevronright',13),'calendar-next','small')}</div></div><div class="calendar-grid">${[T('一','Mon'),T('二','Tue'),T('三','Wed'),T('四','Thu'),T('五','Fri'),T('六','Sat'),T('日','Sun')].map(w=>`<div class="calendar-week">${w}</div>`).join('')}${cells.map(c=>{let events=state.events.filter(x=>x.date===c.iso);return `<button class="calendar-day ${c.other?'other':''} ${c.today?'today':''} ${selected===c.iso?'selected':''}" data-action="calendar-select" data-date="${c.iso}"><span class="day-number">${c.day}</span>${events.slice(0,2).map(x=>`<span class="event-line">${esc(x.title[state.lang])}</span>`).join('')}</button>`}).join('')}</div></section><div class="gap-16">${card(T('当日安排','Daily agenda'),esc(selected),`<div>${dayEvents.length?dayEvents.map(x=>`<div class="event-row"><time>${esc(x.time)}</time><div style="flex:1"><b>${esc(x.title[state.lang])}</b><div class="muted tiny">${x.type}</div></div><button class="btn small" data-action="event-delete" data-id="${x.id}">${icon('trash',13)}</button></div>`).join(''):`<div class="empty-state">${icon('calendar',30)}<div>${T('当天没有日程','Nothing scheduled for this day')}</div></div>`}</div>${btn(icon('plus')+T('添加事件','Add event'),'modal-event','soft')}`)}${card(T('日程分类','Event categories'),T('适合展示标签和列表','Semantic events and list rows'),`<div class="gap-12"><div class="row between"><span class="tiny">🟣 ${T('设计评审','Design reviews')}</span><strong>${state.events.filter(x=>x.type==='design').length}</strong></div><div class="row between"><span class="tiny">🔵 ${T('团队会议','Team meetings')}</span><strong>${state.events.filter(x=>x.type==='meeting').length}</strong></div><div class="row between"><span class="tiny">🟢 ${T('版本发布','Releases')}</span><strong>${state.events.filter(x=>x.type==='release').length}</strong></div></div>`)}</div></div>`+footer();}
function analyticsPage(){return heading('INTELLIGENCE / 07',T('数据分析中心','Analytics center'),T('趋势图、渠道占比、热力图、漏斗和多指标对照，适配高密度分析界面。','Trends, channel mix, heatmap, funnel and multi-metric analytics.'),btn(icon('download')+T('导出报告','Export report'),'export-csv','primary'))+`<div class="gap-16"><div class="grid-4">${[[T('总访问量','Total visits'),'86.2K','+12.4%'],[T('新注册','Sign-ups'),'3,284','+8.1%'],[T('转化率','Conversion'),'4.82%','+0.6%'],[T('平均停留时长','Avg. duration'),'04:32','+2.8%']].map(a=>`<div class="card metric-card"><div class="label">${a[0]}</div><div class="figure">${a[1]}</div><div class="change">↑ ${a[2]}</div></div>`).join('')}</div><div class="split-64">${card(T('转化与访问趋势','Visits & conversion trend'),T('折线 / 柱状图联动切换','Switch between line and bars'),chartSvg(state.chartType,state.range),`<div class="segmented"><button data-action="chart-line" class="${state.chartType==='line'?'selected':''}">${T('折线','Line')}</button><button data-action="chart-bar" class="${state.chartType==='bar'?'selected':''}">${T('柱状','Bars')}</button></div>`)}${card(T('流量来源','Traffic sources'),T('环形统计和图例列表','Donut chart and breakdown'),`<div class="donut"><div class="donut-center"><strong>86.2K</strong><small>${T('总访问量','Visits')}</small></div></div><div style="margin-top:16px">${[[T('自然搜索','Organic search'),'47%','var(--accent)'],[T('直接访问','Direct'),'25%','#64c6b2'],[T('社交媒体','Social'),'15%','#f2b86e'],[T('其他','Other'),'13%','#c0c7d7']].map(a=>`<div class="legend-row"><span><i class="legend-dot" style="background:${a[2]}"></i>${a[0]}</span><b>${a[1]}</b></div>`).join('')}</div>`)}</div><div class="split-64">${card(T('最近 16 周活动热力图','16-week activity heatmap'),T('颜色深浅反映活跃程度','Intensity represents activity'),`<div class="analytics-heatmap">${Array.from({length:112},(_,i)=>`<span class="heat-cell" title="Week ${Math.floor(i/7)+1}" style="--opacity:${[.12,.2,.35,.52,.68,.83,1][(i*11+Math.floor(i/7)*3)%7]}"></span>`).join('')}</div><div class="row between tiny muted top-gap"><span>${T('较少','Less')}</span><span>${T('较多','More')} →</span></div>`)}${card(T('转化漏斗','Conversion funnel'),T('常见 SaaS 用户行为路径','Typical SaaS conversion stages'),`<div class="gap-12">${[[T('访客','Visitors'),100],[T('注册','Sign-ups'),66],[T('激活','Activated'),39],[T('付费','Paid'),16]].map(([n,v])=>`<div><div class="row between tiny" style="margin-bottom:5px"><span>${n}</span><strong>${v}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${v}%"></div></div></div>`).join('')}</div>`)}</div></div>`+footer()}
function agentsPage(){let all=state.rows.filter(r=>(state.agentFilter==='all'||r.status===state.agentFilter)&&`${r.name.zh} ${r.name.en}`.toLowerCase().includes(state.agentQuery.toLowerCase()));return heading('AGENT WORKSPACE / 08',T('AI 智能体中心','AI agent center'),T('独立卡片视图、工作流节点、状态切换、日志详情和创建智能体。','Agent cards, workflow nodes, runtime states, logs and creation dialogs.'),btn(icon('plus')+T('创建智能体','Create agent'),'modal-agent','primary'))+`<div class="gap-16"><div class="row between" style="flex-wrap:wrap"><div class="table-tools"><input class="control-input" id="agent-query" value="${esc(state.agentQuery)}" data-input="agent-query" placeholder="${T('搜索智能体…','Find agents…')}"/><select class="control-select" data-change="agent-status"><option value="all">${T('所有状态','All statuses')}</option>${['running','paused','draft'].map(s=>`<option value="${s}" ${state.agentFilter===s?'selected':''}>${({running:T('运行中','Running'),paused:T('暂停','Paused'),draft:T('草稿','Draft')})[s]}</option>`).join('')}</select></div><span class="tiny muted">${T('共','Total')} ${all.length} ${T('个智能体','agents')}</span></div><div class="grid-3">${all.map((a,i)=>`<div class="card agent-card"><div class="row between"><div class="agent-meta"><div class="agent-illustration">${icon(['bot','spark','chart','target'][i%4],22)}</div><div><h3>${esc(a.name[state.lang])}</h3><div class="tiny muted">${a.id} · ${esc(a.category[state.lang])}</div></div></div>${badge(a.status)}</div><p>${T('自动化处理任务，包含输入、推理和动作节点。','Automation with input, reasoning and action nodes.')}</p><div class="workflow"><span class="workflow-node">${T('输入','Input')}</span><i class="workflow-connector"></i><span class="workflow-node">LLM</span><i class="workflow-connector"></i><span class="workflow-node">${T('执行','Execute')}</span></div><div class="agent-footer"><span class="tiny muted">${T('任务','Tasks')} <b style="color:var(--text)">${a.tasks}</b></span><div class="demo-actions">${btn(icon('eye',13)+T('日志','Logs'),'agent-detail','small',`data-id="${a.id}"`)}${btn(icon(a.status==='running'?'pause':'play',13)+(a.status==='running'?T('暂停','Pause'):T('运行','Run')),'agent-toggle','soft small',`data-id="${a.id}"`)}</div></div></div>`).join('')||`<div class="empty-state">${T('没有匹配的智能体','No matching agents')}</div>`}</div></div>`+footer()}
function assetsPage(){let names=[['远山','Mountains'],['潮汐','Ocean'],['日落','Sunset'],['梦境','Dreamscape'],['城市','City'],['花园','Garden']];let entries=Object.keys(ICONS).filter(n=>n.includes(state.iconQuery.toLowerCase()));return heading('VISUAL LIBRARY / 09',T('图标与媒体素材','Icons & media library'),T('内置 SVG 插画、可切换图像风格、图标检索、预览与复制名称。','Offline SVG artwork, image styles, searchable icons, previews and copy.'),btn(icon('upload')+T('导入本地图片','Import image'),'image-upload'))+`<div class="gap-16">${card(T('图片风格画廊','Image style gallery'),T('矢量插画与图像风格资源','Vector artwork and visual asset styles'),`<div class="media-gallery">${names.map((n,i)=>`<div class="media-item" role="button" tabindex="0" data-action="image-detail" data-index="${i}"><img alt="${esc(n[state.lang])}" src="${imageUri(i,state.imageStyle)}"/><div class="media-caption"><strong>${n[state.lang==='zh'?0:1]} / 0${i+1}</strong><small>SVG · ${state.imageStyle.toUpperCase()} · 540 × 340</small></div></div>`).join('')}</div><input type="file" accept="image/*" id="image-file" style="display:none" data-upload="gallery"/>${state.selectedImage?`<div class="top-gap"><div class="section-title">${T('本地上传预览','Local upload preview')}</div><img style="width:min(340px,100%);border-radius:10px" src="${state.selectedImage.data}" alt="${esc(state.selectedImage.name)}"/><p class="tiny muted">${esc(state.selectedImage.name)}</p></div>`:''}`,`<div class="segmented">${IMAGE_STYLES.map(([k,zh,en])=>[k,T(zh,en)]).map(([k,l])=>`<button data-action="image-style" data-value="${k}" class="${state.imageStyle===k?'selected':''}">${l}</button>`).join('')}</div>`)}
 ${card(T('图标资产目录','Icon asset catalog'),T('五套与界面风格协同的图标家族；切换后所有菜单与控件图标同步更新，点击复制名称','Five coherent icon families matched to the UI language; all icons update together and can be copied by name'),`<div class="row between" style="gap:12px;flex-wrap:wrap;margin-bottom:13px"><input class="control-input" placeholder="${T('搜索图标英文名…','Search icon name…')}" value="${esc(state.iconQuery)}" data-input="icon-query" id="icon-search"/><div class="segmented">${ICON_STYLES.map(([k,zh,en])=>[k,T(zh,en)]).map(([k,l])=>`<button data-action="icon-style" data-value="${k}" class="${state.iconStyle===k?'selected':''}">${l}</button>`).join('')}</div></div><div class="icon-catalog">${entries.map(k=>`<button class="icon-tile" data-action="copy-icon" data-value="${k}">${icon(k,42)}<span>${k}</span></button>`).join('')||`<div class="empty-state">${T('未找到图标','No icons found')}</div>`}</div><div class="row between tiny muted top-gap"><span>${T('图标数量','Icons')}: ${entries.length}</span><span>${T('内部 SVG，无需字体文件','Inline SVG, no icon font')}</span></div>`)}
 ${card(T('头像 / 装饰元素','Avatars & decoration'),T('内容型产品经常需要的视觉组件','Frequently used visual assets in product UI'),`<div class="grid-3"><div class="illustration-frame"><div><div class="avatar-stack">${['M','N','A','L','J'].map((c,i)=>`<span class="mini-avatar" style="background:${['#9b81ec','#5faeae','#f3a96a','#677dd2','#d67b97'][i]};width:40px;height:40px">${c}</span>`).join('')}</div><p class="tiny muted">${T('头像组合','Avatar group')}</p></div></div><div class="illustration-frame">${icon('spark',68)}<div class="tiny muted">${T('空状态装饰','Empty state motif')}</div></div><div class="illustration-frame"><div class="demo-actions">${['success','warning','error'].map(x=>`<span class="badge ${x}">${x}</span>`).join('')}</div><div class="tiny muted">${T('语义状态标识','Semantic status')}</div></div></div>`)}</div>`+footer();}
function typographyPage(){let examples=[[T('展示标题','Display heading'),2.2,800],[T('页面标题','Page heading'),1.76,780],[T('区块标题','Section title'),1.28,760],[T('正文内容展示一段真实可读的句子。','The quick brown fox jumps over the lazy dog.'),1,450],[T('次级描述文字与辅助信息。','Secondary descriptive text and useful hints.'),.82,430],[T('小型标签与元数据','Captions & metadata'),.68,640]];let a=styles[state.style],accent=state.accent||DEFAULT_ACCENT;return heading('FOUNDATIONS / 10',T('排版与设计 Token','Typography & design tokens'),T('字体家族、字号缩放、字体层级、调色板、按钮样式和间距参考。','Fonts, type scale, color swatches, buttons and spacing tokens.'),btn(icon('copy')+T('复制 CSS Token','Copy CSS tokens'),'copy-css','primary'))+`<div class="gap-16"><div class="split-64">${card(T('实时字体比例标本','Live typography specimens'),T('设置弹窗修改字体和基准字号，此处即时更新','Change font family and base size from the Settings dialog'),`<div style="margin:-5px -19px -17px">${examples.map(([txt,scale,weight])=>`<div class="type-sample"><span class="type-name">${Math.round(state.fontSize*scale)}px</span><span style="font-size:calc(var(--fsize)*${scale});font-weight:${weight};flex:1;line-height:1.28;word-break:break-word">${txt}</span><span class="type-size">${weight}</span></div>`).join('')}</div>`)}${card(T('字体预设','Font presets'),T('系统字体优先，离线可用','System fonts, available offline'),`<div class="gap-12">${[['system','System UI'],['cjk',T('中文优先','Chinese first')],['serif','Editorial Serif'],['mono','Monospace']].map(([k,label])=>`<button class="btn ${state.font===k?'primary':''}" data-action="font-preset" data-value="${k}" style="justify-content:flex-start">${icon('type',15)} ${label}</button>`).join('')}</div><div class="divider"></div><p class="muted tiny">${T('实际显示效果取决于设备上安装的字体。','Actual glyph rendering depends on installed fonts.')}</p>`)}</div><div class="split-64">${card(T('语义色板','Semantic color palette'),T('主色 / 前景 / 背景 / 分割线 / 状态色','Accent, text, canvas, border and status colors'),`<div class="palette-grid">${[[accent,T('主色','Accent')],['var(--text)',T('文字','Text')],['var(--muted)',T('次要','Muted')],['#23a47b',T('成功','Success')],['#dca14f',T('警告','Warning')],['#dd5362',T('错误','Danger')],['#8e7de5',T('辅助','Secondary')],['#253044',T('深色','Dark')],['#d6deea',T('描边','Stroke')],['#ffffff',T('表层','Surface')]].map(([v,n])=>`<div class="color-chip" style="background:${v};${v==='#ffffff'?'color:#333':''}">${n}</div>`).join('')}</div>`)}${card(T('控件对照','Control treatments'),T('当前主色与圆角同步','Uses current accent and radius'),`<div class="gap-12">${btn(T('主要操作','Primary action'),'demo-info','primary')}${btn(T('次要操作','Secondary action'),'demo-info')}${btn(T('柔和按钮','Soft action'),'demo-info','soft')}<input class="control-input" value="Border / Radius / Tokens" readonly/><div class="progress-track"><div class="progress-fill" style="width:69%"></div></div></div>`)}</div>${card(T('Token 结构预览','Token structure preview'),T('导出会包含完整 CSS 变量和设计决策','The handoff includes CSS variables and design rationale'),`<pre class="export-preview" style="max-height:260px;margin:0">${esc(getCssTokens())}</pre>`)}</div>`+footer()}
function feedbackPage(){return heading('INTERACTION LAB / 11',T('动效与用户反馈','Interaction & feedback'),T('Toast、通知、对话框、确认、加载骨架、进度及空状态组件。','Working toasts, notifications, dialogs, confirmations, skeletons and empty states.'),btn(icon('bell')+T('通知中心','Notifications'),'notification'))+`<div class="gap-16"><div class="grid-2">${card(T('Toast 反馈消息','Toast notifications'),T('提示会显示在浏览器右下角并自动消失','Feedback appears bottom-right and dismisses automatically'),`<div class="demo-actions">${btn(T('成功','Success'),'demo-success','primary')}${btn(T('提醒','Information'),'demo-info')}${btn(T('警告','Warning'),'demo-warning')}${btn(T('错误','Error'),'demo-error','danger')}</div><div class="alert top-gap">${icon('info',16)} ${T('重要操作要有及时、可理解的反馈。','Important actions need immediate and legible feedback.')}</div>`)}${card(T('对话与确认','Dialogs & confirmations'),T('点击验证确认弹窗、详情弹窗和新建表单','Open confirmation, detail and create dialogs'),`<div class="demo-actions">${btn(T('删除确认','Delete confirm'),'demo-confirm','danger')}${btn(T('详情内容','Details'),'demo-details')}${btn(T('创建实体','Create item'),'modal-task','primary')}</div><p class="muted tiny">Esc · ${T('关闭弹窗','Close dialog')}</p>`)}</div><div class="grid-2">${card(T('进度指示','Progress indicator'),T('运行任务并查看执行进度','Run task and view progress'),`<div class="row between"><span class="small-text">${T('界面资源同步','Asset sync')}</span><strong id="feedback-progress-text">${state.progress}%</strong></div><div class="progress-track top-gap"><div id="feedback-progress-fill" class="progress-fill" style="width:${state.progress}%"></div></div><div class="demo-actions top-gap">${btn(icon('play')+T('开始任务','Start task'),'run-progress','primary')}${btn(T('重置','Reset'),'reset-progress')}</div>`)}${card(T('骨架加载','Skeleton loading'),T('局部加载与数据刷新','Partial loading and data refresh'),`<div id="skeleton-demo"><div class="row" style="margin-bottom:9px"><div class="skeleton" style="height:38px;width:38px;border-radius:50%"></div><div style="display:grid;gap:8px;flex:1"><div class="skeleton" style="width:60%"></div><div class="skeleton" style="width:90%"></div></div></div><div class="skeleton" style="width:95%;margin-bottom:7px"></div><div class="skeleton" style="width:75%"></div></div><div class="top-gap">${btn(icon('refresh')+T('重新获取','Fetch data'),'demo-load','small')}</div>`)}</div><div class="grid-2">${card(T('空状态 / Empty state','Empty state'),T('带插画、说明和行动召唤','Illustration, description and call to action'),`<div class="empty-state">${icon('layers',39)}<h3 style="color:var(--text);margin:8px 0 4px">${T('这里还是空的','Nothing here yet')}</h3><p>${T('创建第一条数据，让工作流运转起来。','Create a first item to get started.')}</p>${btn(icon('plus')+T('创建一项','Create item'),'modal-task','primary')}</div>`)}${card(T('消息与通知中心','Notification center'),T('不同优先级的消息类型','Messages with multiple priority levels'),`<div>${[[T('设计规范已发布','Design spec published'),'5 min','check'],[T('有一条任务待审核','Task awaiting review'),'15 min','clock'],[T('例行维护提醒','Maintenance reminder'),'1 h','alert']].map(a=>`<div class="activity-item"><div class="activity-square">${icon(a[2])}</div><div><strong>${a[0]}</strong><p>${a[1]}</p></div></div>`).join('')}</div>${btn(T('打开通知面板','Open notifications'),'notification','soft')}`)}</div></div>`+footer()}
function exportPage(){let md=generateMarkdown();return heading('DESIGN HANDOFF / 13',T('AI 设计交付中心','AI design handoff'),T('把选中的 UI 风格、参数、页面、交互及响应式要求整理成可交给 AI 的 Markdown。','Export selected UI system, design tokens, pages and interactions as an AI-ready Markdown brief.'),btn(icon('download')+T('导出 Markdown','Download Markdown'),'download-md','primary'))+`<div class="split-64">${card(T('当前方案摘要','Current design selection'),T('参数会随右侧设置实时同步','Selections sync with the Settings dialog'),`<div class="grid-2">${[[T('设计体系','Design system'),styles[state.style].name],[T('主题模式','Appearance'),state.mode==='dark'?T('暗色','Dark'):T('亮色','Light')],[T('语言','Language'),state.lang==='zh'?'简体中文':'English'],[T('字体 / 字号','Font / Size'),`${state.font} · ${state.fontSize}px`],[T('圆角 / 密度','Radius / Density'),`${state.radius}px · ${state.density}`],[T('图标 / 图片','Icons / Images'),`${state.iconStyle} · ${state.imageStyle}`],[T('布局导航','Navigation'),'sidebar'],[T('主色','Accent'),state.accent||DEFAULT_ACCENT]].map(([a,b])=>`<div class="form-summary"><div class="tiny muted">${a}</div><b style="display:block;margin-top:6px;font-size:calc(12px * var(--site-font-scale,1))">${esc(b)}</b></div>`).join('')}</div><div class="demo-actions top-gap">${btn(icon('copy')+T('复制完整需求','Copy full brief'),'copy-md','primary')}${btn(icon('download')+T('导出配置 JSON','Export config JSON'),'download-json')}</div>`)}${card(T('导出内容范围','Handoff scope'),T('选择要包含的需求章节','Choose document sections'),`<div class="gap-12">${EXPORT_OPTIONS.map(([key,zh,en])=>`<label class="checkline"><input type="checkbox" data-export-section="${key}" ${state.exportSections.includes(key)?'checked':''}/> ${T(zh,en)}</label>`).join('')}</div><div class="divider"></div><div class="alert">${icon('info',17)} ${T('设置弹窗的“AI 交付”标签可在任何页面直接下载当前设计上下文。','Use the Settings dialog Export tab to download this brief from any page.')}</div>`)}</div><div class="card card-pad"><div class="card-heading"><div><h3>${T('Markdown 实时预览','Live Markdown preview')}</h3><p>${T('包含实际参数与所有菜单的功能规范','Includes actual selections and menu-by-menu requirements')}</p></div><span class="badge">.md</span></div><pre class="export-preview" id="page-md-preview" style="max-height:620px">${esc(md)}</pre></div></div>`+footer()}
const EXPORT_OPTIONS=[['product','产品目标与适用场景','Product goals & use cases'],['tokens','设计 Token 与主题参数','Design tokens & theme settings'],['pages','13 个页面功能清单','13-page functional requirements'],['components','组件状态与交互规范','Component states & behavior'],['interactions','数据与交互事件契约','Data models & interaction contracts'],['responsive','适配、暗黑与国际化','Responsive, dark mode & i18n'],['ai','AI 实现指令与验收条件','AI build instructions & acceptance']];
function getCssTokens(){let s=styles[state.style],dark=state.mode==='dark';return [':root {',`  --color-primary: ${state.accent||DEFAULT_ACCENT};`,`  --color-background: ${dark?'#10141f':'#f5f7fb'};`,`  --color-surface: ${dark?'#1c2433':'#ffffff'};`,`  --color-text: ${dark?'#f1f4fc':'#1e293b'};`,`  --color-border: ${dark?'#394458':'#e1e6ee'};`,`  --radius-base: ${state.radius}px;`,`  --font-size-base: ${state.fontSize}px;`,`  --sidebar-width: ${state.sidebarWidth}px;`,`  --font-family: ${fontFamilies[state.font]||fontFamilies.system};`,`  --icon-treatment: ${state.iconStyle};`,`  --image-treatment: ${state.imageStyle};`,`  --density: ${state.density};`,`  --shadow: ${state.shadow};`,'}'].join('\n')}
const fontFamilies={system:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif',cjk:'"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif',serif:'Georgia, "Noto Serif CJK SC", "Songti SC", serif',mono:'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'};
function generateMarkdown(){let sections=state.exportSections,lines=[];const push=(key,text)=>{if(sections.includes(key))lines.push(text.trim())};let style=styles[state.style],accent=state.accent||DEFAULT_ACCENT,locale=state.lang==='zh'?'zh-CN':'en-US';lines.push(`# 交互式工作台 · ${T('AI 界面设计需求上下文','AI Interface Design Context')}\n\n> ${T('生成日期','Generated')}: ${timeFmt()} · ${T('工作区文档','Workspace document')} · Interactive Workbench V1.0`);
 lines.push(`> ${T('对比模式：框架切换不会修改主色、明暗模式、字体、字号、圆角和密度。','Comparison mode: switching frameworks never mutates accent, color mode, type, radius or density.')}\n> ${T('固定主色','Locked accent')}: ${accent}\n> ${T('界面体系','Selected system')}: ${style.name}`);
 if(state.selectedEffects.length){let groupedRefs=state.selectedEffects.reduce((acc,x)=>{let k=x.slot||'other';(acc[k]||(acc[k]=[])).push(x);return acc},{});lines.push(`## ${T('收藏的设计参考','Saved design references')}\n${state.selectedEffects.map((x,i)=>`- ${i+1}. **${esc(x.label)}** | ${T('类型','Type')}: ${esc(x.type)} / ${esc(x.slot||'other')} | ${T('页面','Page')}: ${x.page} | ${T('风格','Style')}: ${x.style} | ${T('主题','Theme')}: ${x.mode} | ${T('图标','Icon')}: ${x.iconStyle||state.iconStyle} | ${T('主色','Accent')}: ${x.accent} | ${T('字体','Font')}: ${x.font}, ${x.fontSize}px | ${T('圆角','Radius')}: ${x.radius}px`).join('\n')}\n\n${Object.entries(groupedRefs).map(([k,v])=>`- ${k}: ${v.map(i=>i.label).join(' / ')}`).join('\n')}\n\n${T('请优先复用上述收藏的布局或组件表现，并结合当前主方案设计 Token 整合为统一产品。','Prioritize the bookmarked layout/component patterns and combine them with the current global design tokens.')}`)}
 push('product',`## 1. ${T('项目背景与设计目标','Product vision & goals')}\n- ${T('项目类型：可扩展的智能体 SaaS 后台与通用设计系统。','Type: scalable agent SaaS dashboard and reusable design system.')}\n- ${T('主要用户：产品经理、UI/UX 设计师、前端开发者和 AI 编程助手。','Users: product managers, designers, engineers and AI coding agents.')}\n- ${T('目标：统一后台体验，保持复杂表单、报表、数据列表和任务工作流的一致性。','Goal: unify complex forms, reports, tables and task workflows.')}\n- ${T('优先级：可读性 > 易用性 > 品牌辨识度 > 装饰性。','Priority: readability > usability > distinctiveness > decoration.')}\n- ${T('当前参考体系','Selected reference')}: **${style.name}**. ${T('所选风格用于设计规范参考，开发时按组件规范实现。','Selected style provides design guidelines; implement components according to the specification. native framework packages.')}`);
 push('tokens',`## 2. ${T('视觉规范 / Design Tokens','Visual specification & tokens')}\n| Token | Value |\n|---|---|\n| Design system | ${style.name} |\n| Accent | ${accent} |\n| Theme | ${state.mode} |\n| Locale | ${locale} |\n| Font preset | ${state.font} |\n| Font stack | ${fontFamilies[state.font]} |\n| Base font size | ${state.fontSize}px |\n| Radius | ${state.radius}px |\n| Density | ${state.density} |\n| Navigation | ${'sidebar'} |\n| Sidebar width | ${state.sidebarWidth}px |\n| Shadow | ${state.shadow} |\n| Icons | ${state.iconStyle} |\n| Image treatment | ${state.imageStyle} |\n\n${T('建议的 CSS 变量','Suggested CSS variables')}:\n\n\`\`\`css\n${getCssTokens()}\n\`\`\`\n\n${T('组件中必须使用语义变量，禁止在每个组件里硬编码颜色。','Use semantic tokens across components; avoid hardcoded one-off colors.')}`);
 push('pages',`## 3. ${T('页面与菜单功能要求','Page-by-page requirements')}\n${[
 [`01 ${T('概览仪表盘','Dashboard')}`,T('欢迎区、四种 KPI 卡片、可切换 7D/30D 的线图/柱状图、动态消息流、可点击的智能体摘要表；支持刷新、创建和详情。','Hero, four KPIs, 7D/30D line/bar trends, activity list and agent summary table; refresh, create and inspect actions.')],
 [`02 ${T('组件画廊','Component gallery')}`,T('至少 9 组组件：按钮、标签、单选、多选、开关、文本框、日期、滑杆、Alert、步进、折叠、弹窗、骨架；覆盖 hover/disabled/loading/empty/error。','At least nine groups: buttons, badges, radios, checks, switches, inputs, date, range, alerts, stepper, accordion, dialog, skeleton; hover/disabled/loading/empty/error states.')],
 [`03 ${T('数据表格','Data table')}`,T('搜索、排序、过滤、全选、跨页选择、批量暂停/删除、行编辑、详情、分页、CSV 导出、刷新列表和无数据视图。','Search, sort, filter, select-all, multi-select, bulk pause/delete, inline row edit, details, pagination, CSV export, simulated loading and empty state.')],
 [`04 ${T('表单工坊','Forms')}`,T('输入、邮箱验证、下拉、日期、文本域、滑杆、附件上传文件名、同意勾选、重置、草稿和提交；右侧实时摘要。','Text/email validation, select, date, textarea, slider, local filename preview, consent checkbox, reset, draft and submit; live summary.')],
 [`05 ${T('项目看板','Kanban')}`,T('四列状态、拖放卡片、方向按钮、优先级筛选、任务创建、任务详情、状态移动和进度统计。','Four lanes, drag-and-drop and keyboard-friendly arrow moves, priority filter, create/detail actions and progress stats.')],
 [`06 ${T('日程日历','Calendar')}`,T('月历、上月/下月/今天、点日期显示日程、分类统计、新建和删除事件。','Monthly calendar, previous/next/today, daily agenda, event categories, create and delete.')],
 [`07 ${T('数据分析','Analytics')}`,T('访问指标、线柱切换、环形图、16 周热力图、转化漏斗、CSV 导出。','KPI cards, line/bar switcher, donut chart, 16-week heatmap, conversion funnel and CSV export.')],
 [`08 ${T('AI 智能体','AI agents')}`,T('卡片式智能体管理、搜索/筛选、工作流示意、运行/暂停、日志详情、新建智能体。','Cards, search/filter, workflow steps, run/pause, details/logs and create agent.')],
 [`09 ${T('图标与图片','Icons & media')}`,T('SVG 插画画廊、渐变/编辑/黑白风格、放大预览、本地图像导入、图标搜索、线性/实底/柔和样式和复制。','SVG gallery, gradient/editorial/mono modes, zoom, local uploads, searchable icon catalog, outline/filled/soft icons and copy.')],
 [`10 ${T('排版实验','Typography')}`,T('标题/正文/辅助文案的字阶标本、四种字体族、语义色板、按钮和 Token 代码预览。','Type scale specimens, four font presets, semantic colors, controls and design token code.')],
 [`11 ${T('动效反馈','Feedback')}`,T('成功/提醒/警告/错误 Toast、确认和表单弹窗、通知面板、执行进度、骨架、空状态。','Success/info/warning/error toasts, confirmations, dialogs, notification drawer, simulated progress, skeleton and empty states.')],
 [`12 ${T('AI 设计交付','AI handoff')}`,T('实时反映所选设计参数，可选择导出章节、复制完整需求、下载 Markdown / JSON。','Live selection summary, selectable document sections, copy requirements and download Markdown/JSON.')]
 ].map(([title,body])=>`### ${title}\n- ${body}`).join('\n\n')}`);
 push('components',`## 4. ${T('通用组件状态规范','Reusable components & states')}\n- ${T('按钮：primary / secondary / soft / danger / ghost，覆盖 small / default / large，提供 loading 与 disabled。','Buttons: primary/secondary/soft/danger/ghost, sizes small/default/large, loading/disabled.') }\n- ${T('数据：loading / success / empty / error；禁止没有反馈的可点击控件。','Data: loading/success/empty/error; no inert clickable controls.') }\n- ${T('表单：焦点态、必填标识、字段级校验、提交错误提示、成功确认。','Forms: focus, required markers, field validation, submission errors and success.') }\n- ${T('弹窗：显式关闭和取消按钮、Esc 关闭、焦点管理、遮罩，破坏性操作二次确认。','Dialogs: close/cancel, Esc, focus management, backdrop and confirmations for destructive actions.') }\n- ${T('图标：建议一致的 24px 视口，线条粗细 1.75–2px，全部带 aria-label 或隐藏装饰图标。','Icons: consistent 24px viewbox, 1.75–2px stroke, aria-label or decorative hiding.') }`);
 push('interactions',`## 5. ${T('数据模型与交互约定','Data models & event contracts')}\n\`\`\`ts\ntype Agent = { id: string; name: string; category: string; status: 'running'|'paused'|'draft'; tasks: number; score: number; updated: string; owner: string };\ntype Task = { id: number; title: string; description: string; lane: 'todo'|'doing'|'review'|'done'; priority: 'high'|'normal'|'low'; owner: string; due: string };\ntype Event = { id: number; date: string; title: string; time: string; type: 'design'|'meeting'|'release' };\n\`\`\`\n- ${T('事件：createAgent, toggleAgent, updateRow, filterRows, sortRows, bulkUpdate, moveTask, createEvent, exportCsv, exportDesignBrief。','Events: createAgent, toggleAgent, updateRow, filterRows, sortRows, bulkUpdate, moveTask, createEvent, exportCsv, exportDesignBrief.') }\n- ${T('数据接口应支持鉴权、审计、异常重试与幂等处理。','This HTML uses in-memory demo data; production needs APIs, auth, audit, retries and idempotency.') }\n- ${T('异步操作应提供加载态，错误应有可操作的恢复入口。','Async operations must show loading and actionable errors.') }`);
 push('responsive',`## 6. ${T('响应式、暗黑主题、国际化与可访问性','Responsive, dark mode, i18n & accessibility')}\n- ${T('断点建议：桌面 >= 1200px，平板 768–1199px，手机 < 768px；侧栏在手机折叠为抽屉。','Breakpoints: desktop >=1200px, tablet 768–1199px, mobile <768px; sidebar collapses to a drawer.') }\n- ${T('页面须支持 Light / Dark；背景、表层、文本、边框、悬浮态、图表颜色都要切换。','Light/Dark applies to canvas, surfaces, text, borders, hover states and charts.') }\n- ${T('中英文文案必须从语言资源取值；预留 30–40% 的文字长度扩展。','Zh/En text comes from locale resources; allow 30–40% text expansion.') }\n- ${T('交互需支持键盘操作、合理焦点顺序、aria-label、颜色对比度及减弱动态效果。','Keyboard access, focus order, aria-labels, contrast and reduced-motion support.') }\n- ${T('优先采用 CSS 变量，图像提供 alt，数据图表附有等价描述。','Prefer CSS variables; images need alt; charts need equivalent descriptions.') }`);
 push('ai',`## 7. ${T('交给 AI 的设计 / 开发指令','AI implementation instructions & acceptance')}\n1. ${T('先按以上 Token 建立全局 Design System，并构建复用组件，而非复制各页面 HTML。','Build the design system and reusable components from tokens instead of copy-pasting pages.') }\n2. ${T('保证所有 13 个菜单具有独立布局和真实可验证的交互，不允许用统一空白页占位。','Implement all 13 distinct screens with testable interactions; no blank placeholder routes.') }\n3. ${T('页面状态应覆盖空态、加载态、错误态、禁用态和成功反馈。','Cover empty, loading, error, disabled and success states.') }\n4. ${T('以选定的','Use the selected')} **${style.name}** ${T('设计语言为准，保留可配置的主题参数。','visual language and keep theme parameters configurable.') }\n5. ${T('按桌面、平板、手机三种尺寸截图验收；切换全部主题与语言并验证导出。','Verify screenshots at desktop, tablet and mobile; test themes, languages and export.') }\n6. ${T('可将该 Markdown 提供给 ChatGPT、Codex 或其他 AI 编程工具用于原型迭代。','Pass this Markdown to ChatGPT, Codex or another coding assistant for further implementation.') }\n\n### ${T('验收清单','Acceptance checklist')}\n- [ ] 13 ${T('菜单均有完整且互不相同的内容','distinct pages populated with complete content')}\n- [ ] 8 ${T('设计体系可切换','switchable visual systems')}\n- [ ] ${T('字体、字阶、主色、圆角、密度、导航方式可配置','Configurable font, type scale, accent, radius, density and navigation')}\n- [ ] ${T('明暗主题和中英文切换无明显问题','Light/dark and Zh/En both work')}\n- [ ] ${T('搜索、筛选、分页、弹窗、表单、看板拖拽、日程及导出可运行','Search, filter, paginate, modal, forms, kanban, calendar and export work')}\n- [ ] ${T('适配与可访问性检查通过','Responsive and accessibility verification passed')}`);
 lines.push(labComposeMarkdown());return lines.join('\n\n---\n\n')+'\n'}
/* NovaFlow v5: design comparison studio; extends v4.3 without external dependencies. */
const LAB_SLOTS = [
 ['navigation','导航','Navigation','layout-panel-left'],
 ['button','按钮','Buttons','mouse-pointer-click'],
 ['card','卡片','Cards','layout-dashboard'],
 ['table','表格','Tables','table'],
 ['form','表单','Forms','form'],
 ['dialog','弹窗','Dialogs','layers']
];
const LAB_STYLE_META = {
 ant:{zh:'业务层级清晰 · 分组导航',en:'Enterprise hierarchy · grouped nav',nav:'grouped',button:'rect',card:'metric',table:'row',form:'label',dialog:'standard'},
 shadcn:{zh:'克制的线框 · 精简结构',en:'Minimal borders · sparse layout',nav:'rail',button:'mono',card:'clean',table:'minimal',form:'outlined',dialog:'compact'},
 material:{zh:'导航轨道 · 填充容器',en:'Navigation rail · tonal surfaces',nav:'compact',button:'pill',card:'tonal',table:'filled',form:'floating',dialog:'rounded'},
 element:{zh:'紧凑控件 · 分栏管理',en:'Compact controls · admin splits',nav:'tree',button:'rect',card:'admin',table:'zebra',form:'stack',dialog:'standard'},
 tabler:{zh:'水平标签 · 数据优先',en:'Top tabs · data-first',nav:'top',button:'small',card:'spark',table:'dense',form:'inline',dialog:'sheet'},
 bootstrap:{zh:'常规栅格 · 明确边界',en:'Classic grid · clear borders',nav:'navbar',button:'classic',card:'grid',table:'striped',form:'classic',dialog:'classic'},
 adminlte:{zh:'管理信息盒 · 树形菜单',en:'Admin info-box · tree nav',nav:'admin',button:'sharp',card:'box',table:'admin',form:'admin',dialog:'admin'},
 daisy:{zh:'柔和胶囊 · Bento 模块',en:'Soft pills · Bento modules',nav:'floating',button:'bubble',card:'bento',table:'tile',form:'friendly',dialog:'pop'}
};
const LAB_STYLES = ['ant','shadcn','material','element','tabler','bootstrap','adminlte','daisy'];
const LAB_STORAGE = 'novaflow-v5-design-projects';
const LAB_SESSION = 'novaflow-v5-design-session';
function labLoad(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
function labSessionSave(){try{localStorage.setItem(LAB_SESSION,JSON.stringify({board:state.labBoard,labOrder:state.labOrder,labNotes:state.labNotes,labProjectName:state.labProjectName,labCompare:state.labCompare,labSlot:state.labSlot,labTab:state.labTab,activeProjectId:state.activeProjectId}))}catch{}}
function labInit(){
 const saved=labLoad(LAB_SESSION,{});
 state.labBoard=Object.fromEntries(Object.entries(saved.board||{}).filter(([k,v])=>LAB_SLOTS.some(x=>x[0]===k)&&LAB_STYLES.includes(v)));
 state.labOrder=Array.isArray(saved.labOrder)?[...new Set(saved.labOrder.filter(v=>LAB_SLOTS.some(x=>x[0]===v))),...LAB_SLOTS.map(x=>x[0]).filter(v=>!saved.labOrder.includes(v))]:LAB_SLOTS.map(x=>x[0]);
 state.labPreviewMode='desktop';state.labPreviewDialog=false;state.labPaletteSlot='button';
 state.labNotes=String(saved.labNotes||'').slice(0,2500);
 state.labProjectName=String(saved.labProjectName||'Interactive Workbench Design').slice(0,90);
 state.labCompare=Array.isArray(saved.labCompare)?saved.labCompare.filter(x=>LAB_STYLES.includes(x)).slice(0,3):['ant','shadcn'];
 state.labSlot=LAB_SLOTS.some(x=>x[0]===saved.labSlot)?saved.labSlot:'navigation';
 state.labTab=['compare','board','projects','audit'].includes(saved.labTab)?saved.labTab:'compare';
 state.labProjects=labLoad(LAB_STORAGE,[]).filter(x=>x&&x.id&&typeof x.name==='string'&&x.board).slice(0,30);
 state.activeProjectId=saved.activeProjectId||null;
 state.labRenderMs=0;
}
function labPersistProjects(){try{localStorage.setItem(LAB_STORAGE,JSON.stringify(state.labProjects))}catch{toast(T('本地存储空间不足，请先导出方案 JSON','Local storage is full; export JSON first'),'warning')}}
function labSlotTitle(slot){const found=LAB_SLOTS.find(x=>x[0]===slot)||LAB_SLOTS[0];return T(found[1],found[2])}
function labFrame(style,type,scale='normal'){
 const o=LAB_STYLE_META[style]||LAB_STYLE_META.ant;
 const label=styles[style]?.name||style;
 const navItem=(symbol,name,active=false)=>`<span class="lab-ui-navitem ${active?'active':''}"><span class="lab-ui-navsymbol">${symbol}</span><span>${name}</span></span>`;
 let inner='';
 if(type==='navigation'){
   if(['top','navbar','floating'].includes(o.nav))inner=`<div class="lab-ui-nav-top"><div class="lab-ui-navbrand">${o.nav==='floating'?'✦':o.nav==='navbar'?'N.':'NOVA'}</div><div class="lab-ui-navtabs">${navItem('◈',T('概览','Home'),true)}${navItem('▦',T('数据','Data'))}${navItem('◇',T('设置','Config'))}</div></div><div class="lab-ui-nav-page"><div class="lab-ui-nav-line wide"></div><div class="lab-ui-nav-line"></div><div class="lab-ui-navline-group"><i></i><i></i><i></i></div></div>`;
   else inner=`<div class="lab-ui-navlayout"><div class="lab-ui-navside"><div class="lab-ui-navbrand">${o.nav==='compact'?'◈':o.nav==='rail'?'N.':'Nova'}</div>${navItem('◈',T('概览','Home'),true)}${navItem('▦',T('数据','Data'))}${navItem('◇',T('设置','Config'))}</div><div class="lab-ui-nav-page"><div class="lab-ui-nav-line wide"></div><div class="lab-ui-nav-line"></div><div class="lab-ui-navline-group"><i></i><i></i><i></i></div></div></div>`;
 } else if(type==='button'){
   inner=`<div class="lab-ui-button-layout"><span class="lab-ui-btn primary">${o.button==='pill'?'✦ ':o.button==='sharp'?'⊞ ':''}${T('主要操作','Primary action')}</span><span class="lab-ui-btn secondary">${T('次要操作','Secondary')}</span><span class="lab-ui-btn muted">${T('轻量','Tertiary')}</span></div><div class="lab-ui-helper">${o.button==='mono'?'outline + solid':o.button==='bubble'?'soft + elevated':o.button==='sharp'?'rectangular + compact':o.button==='pill'?'tonal + full radius':o.button==='classic'?'bootstrap-like states':'semantic variants'}</div>`;
 } else if(type==='card'){
   inner=`<div class="lab-ui-metric"><div class="lab-ui-metric-top"><span>${T('本月收入','Monthly revenue')}</span><span class="lab-ui-metric-mark">${o.card==='bento'?'✦':o.card==='box'?'▣':'↗'}</span></div><div class="lab-ui-metric-number">¥ 48,230</div><div class="lab-ui-metric-foot"><strong>+13.2%</strong><span>${T('环比增长','vs last month')}</span></div><div class="lab-ui-spark"><span style="height:35%"></span><span style="height:57%"></span><span style="height:45%"></span><span style="height:80%"></span><span style="height:64%"></span><span style="height:95%"></span></div></div>`;
 } else if(type==='table'){
   inner=`<div class="lab-ui-table"><div class="lab-ui-table-head"><b>${T('智能体列表','Agent inventory')}</b><span class="lab-ui-table-tool">${o.table==='dense'?'Filter • Sort':o.table==='tile'?'✦ Filter':'⌕ Search'}</span></div><div class="lab-ui-tr is-heading"><span>${T('名称','Name')}</span><span>${T('状态','Status')}</span><span>${T('执行量','Jobs')}</span></div><div class="lab-ui-tr"><span>Flow Agent</span><span class="lab-ui-state">● ${T('运行','Active')}</span><strong>284</strong></div><div class="lab-ui-tr"><span>Content Bot</span><span class="lab-ui-state mute">◌ ${T('暂停','Paused')}</span><strong>78</strong></div><div class="lab-ui-tr"><span>Audit Pro</span><span class="lab-ui-state">● ${T('运行','Active')}</span><strong>162</strong></div></div>`;
 } else if(type==='form'){
   inner=`<div class="lab-ui-form"><div class="lab-ui-form-label">${T('任务名称','Task name')}</div><div class="lab-ui-form-input">${o.form==='floating'?'✦ ':''}${T('设计新工作台','Design a new workspace')}</div><div class="lab-ui-form-label">${T('项目分类','Category')}</div><div class="lab-ui-form-select">${T('产品设计','Product design')} <span>⌄</span></div><div class="lab-ui-form-actions"><span class="lab-ui-mini-check">✓</span> ${T('启用自动保存','Autosave enabled')} <b>${T('保存','Save')}</b></div></div>`;
 } else if(type==='dialog'){
   inner=`<div class="lab-ui-dialog-shell"><div class="lab-ui-dialog"><div class="lab-ui-dialog-symbol">${o.dialog==='pop'?'✦':o.dialog==='admin'?'!':'◇'}</div><div class="lab-ui-dialog-title">${T('发布设计方案','Publish design')}</div><p>${T('确认将当前方案保存到工作区？','Save this design to your workspace?')}</p><div class="lab-ui-dialog-actions"><span>${T('取消','Cancel')}</span><strong>${T('确认','Confirm')}</strong></div></div></div>`;
 }
 return `<div class="lab-component-frame lab-variant lab-v-${style} lab-kind-${type} lab-size-${scale}" data-lab-preview="${style}:${type}" style="--lab-accent:var(--accent);">${inner}</div>`;
}
function labPage(){
 const selected=state.labCompare;
 const currentType=state.labSlot;
 const tabLabels=[['compare',T('同色组件对比','Fair comparison')],['board',T('方案拼装板','Composition board')],['projects',T('方案库','Saved projects')],['audit',T('质量扫描','Quality checks')]];
 const navtabs=`<div class="lab-main-tabs" role="tablist">${tabLabels.map(([k,label])=>`<button class="${state.labTab===k?'active':''}" role="tab" aria-selected="${state.labTab===k}" data-action="lab-tab" data-value="${k}">${label}${k==='board'?` <span class="lab-counter">${Object.keys(state.labBoard).length}</span>`:k==='projects'?` <span class="lab-counter">${state.labProjects.length}</span>`:''}</button>`).join('')}</div>`;
 return heading('DESIGN STUDIO / 13',T('可视化方案实验室','Visual design studio'),T('固定主题参数，真实比较组件结构；从多个框架挑选组件、组装方案、保存版本并交付 AI。','Freeze your tokens; compare structural variants, compose and save design solutions for AI implementation.'),btn(icon('download')+T('导出当前方案','Export design brief'),'lab-export-md','primary'))+
 `<div class="lab-page"><div class="lab-main-top"><div class="lab-lock-label"><span class="lab-lock-icon">◆</span><b>${T('公平对比模式','Fair comparison mode')}</b><small>${T('8 套框架共享相同主色、字体、字号、圆角与密度','All eight systems share accent, type, radius and density')}</small></div><div class="lab-token-summary"><span class="lab-token-dot" style="background:${esc(state.accent||DEFAULT_ACCENT)}"></span><b>${esc(state.accent||DEFAULT_ACCENT)}</b><span>${state.fontSize}px</span><span>${state.mode==='dark'?T('暗色','Dark'):T('亮色','Light')}</span></div></div>${navtabs}${({compare:labComparePage,board:labBoardPage,projects:labProjectsPage,audit:labAuditPage}[state.labTab]||labComparePage)()}</div>`+footer();
}
function labComparePage(){
 const slot=state.labSlot;
 const tokens=LAB_SLOTS.map(([id,zh,en])=>`<button data-action="lab-slot" data-value="${id}" class="${slot===id?'active':''}">${T(zh,en)}</button>`).join('');
 return `<div class="lab-workspace-section"><div class="lab-section-head"><div><b>${T('选择组件类型','Choose a component type')}</b><p>${T('相同内容与数据，不改变全局主题。对比时同时观察布局、按钮、控件与信息层级。','Same content and data, no automatic theme changes. Compare hierarchy, spacing and component anatomy.')}</p></div><div class="lab-type-tabs">${tokens}</div></div><div class="lab-grid">${LAB_STYLES.map(k=>{
   const meta=LAB_STYLE_META[k],compared=state.labCompare.includes(k),picked=state.labBoard[slot]===k;
   return `<article class="lab-sample-card ${compared?'is-compared':''} ${picked?'is-picked':''}" data-style-card="${k}" draggable="true" data-lab-source="${slot}:${k}" title="${T('拖动到方案拼装板中的对应位置','Drag into the composition board')}"><div class="lab-sample-top"><div><span class="lab-sample-index">${String(LAB_STYLES.indexOf(k)+1).padStart(2,'0')}</span><strong>${esc(styles[k].name)}</strong><small>${T(meta.zh,meta.en)}</small></div><span class="lab-type-label">${labSlotTitle(slot)}</span></div>${labFrame(k,slot)}<div class="lab-sample-actions"><button class="lab-quiet-btn ${compared?'active':''}" data-action="lab-compare-toggle" data-value="${k}">${compared?'✓ ': '+ '}${T('加入对比','Compare')}</button><button class="lab-select-btn ${picked?'selected':''}" data-action="lab-choose" data-value="${k}">${picked?'✓ ':''}${T('采用此组件','Use this pattern')}</button></div></article>`}).join('')}</div>
 <div class="lab-side-by-side"><div class="lab-section-head"><div><b>${T('并排对比','Side-by-side comparison')}</b><p>${T('最多同时比较 3 套设计。这里采用完全相同的内容和主题参数。','Compare up to three systems with identical content and tokens.')}</p></div><span class="lab-comparison-meta">${state.labCompare.length}/3</span></div><div class="lab-compare-grid">${state.labCompare.map(k=>`<div class="lab-compare-item"><div><b>${esc(styles[k].name)}</b><button class="lab-plain-remove" data-action="lab-compare-toggle" data-value="${k}" aria-label="${T('从对比中移除','Remove from comparison')}">×</button></div>${labFrame(k,slot,'large')}</div>`).join('')||`<p class="muted">${T('请从上方选择至少一个框架。','Select a design system above.')}</p>`}</div></div></div>`;
}
function labBoardPage(){
 const ordered=state.labOrder.map(id=>LAB_SLOTS.find(x=>x[0]===id)).filter(Boolean);
 return `<div class="lab-workspace-section"><div class="lab-section-head"><div><b>${T('可拖拽混搭方案板','Drag-and-drop composition board')}</b><p>${T('从候选框架卡片拖到对应组件槽位，或拖动槽位改变顺序。亦可用上下箭头和下拉框操作。','Drag a candidate into its matching slot or reorder slots. Arrow buttons and dropdowns also work.')}</p></div><span class="lab-counter-big">${Object.keys(state.labBoard).length} / ${ordered.length}</span></div>
 <div class="nf-drag-palette"><div class="nf-palette-top"><strong>${T('可拖动组件候选区','Draggable component palette')}</strong><span>${T('选择类别，再将框架徽标拖入对应槽位','Choose a type, then drag a style chip into its matching slot')}</span></div><div class="nf-palette-types">${LAB_SLOTS.map(([id,zh,en])=>`<button data-action="lab-palette-slot" data-value="${id}" class="${state.labPaletteSlot===id?'active':''}">${T(zh,en)}</button>`).join('')}</div><div class="nf-palette-list">${LAB_STYLES.map(k=>`<div draggable="true" role="button" tabindex="0" data-lab-source="${state.labPaletteSlot}:${k}" data-action="lab-palette-choose" data-value="${k}" title="${T('拖动应用，或点击直接选择','Drag to apply, or click to choose')}"><span class="nf-palette-dot"></span>${esc(styles[k].name)} <span aria-hidden="true">⠿</span></div>`).join('')}</div></div><div class="lab-board-grid nf-draggable-grid">${ordered.map(([slot,zh,en],idx)=>{const k=state.labBoard[slot];return `<section class="lab-board-item nf-drop-target" data-lab-drop="${slot}" tabindex="0" aria-label="${T(zh,en)} ${T('方案槽位','pattern slot')}"><header><strong><span class="nf-drag-handle" draggable="true" data-lab-reorder="${slot}" title="${T('拖拽排序','Drag to reorder')}" aria-hidden="true">⠿</span> ${idx+1}. ${T(zh,en)}</strong><div><span>${k?esc(styles[k].name):T('未选择','Unselected')}</span>${k?`<button data-action="lab-unchoose" data-value="${slot}" aria-label="${T('移除','Remove')}">×</button>`:''}</div></header><div class="nf-board-select"><select data-lab-select="${slot}" aria-label="${T('选择组件风格','Choose style for component')}"><option value="">${T('请选择风格','Select a style')}</option>${LAB_STYLES.map(v=>`<option value="${v}" ${k===v?'selected':''}>${esc(styles[v].name)}</option>`).join('')}</select><div class="nf-board-arrows"><button data-action="lab-order-up" data-value="${slot}" ${idx===0?'disabled':''} aria-label="${T('上移','Move up')}">↑</button><button data-action="lab-order-down" data-value="${slot}" ${idx===ordered.length-1?'disabled':''} aria-label="${T('下移','Move down')}">↓</button></div></div>${k?labFrame(k,slot):`<div class="lab-empty-slot"><span>⇩</span><p>${T('拖放候选组件到这里','Drop a candidate here')}</p></div>`}<footer><button data-action="lab-edit-slot" data-value="${slot}">${T('查看候选组件','Browse variants')} ↗</button></footer></section>`}).join('')}</div>
 ${labLivePreview()}
 <div class="lab-note-card"><label for="lab-notes"><b>${T('设计决策与约束','Design rationale & constraints')}</b><small>${T('说明目标用户、业务流程与必备交互，自动进入 AI 文档。','Describe users, workflows and mandatory interactions; included in the AI brief.')}</small></label><textarea id="lab-notes" data-lab-input="notes" maxlength="2500" rows="4">${esc(state.labNotes)}</textarea><div class="lab-note-actions"><button class="lab-quiet-btn" data-action="lab-save-project">${T('保存当前方案','Save design')}</button><button class="lab-select-btn" data-action="lab-export-md">${T('导出 AI Markdown','Export AI brief')}</button></div></div></div>`;
}
function labLivePreview(){
 const b=state.labBoard,mode=state.labPreviewMode;
 const pieces=state.labOrder.filter(s=>s!=='navigation'&&s!=='dialog').map(s=>b[s]?`<section class="nf-live-block nf-live-${s}"><div class="nf-live-block-heading"><strong>${labSlotTitle(s)}</strong><small>${styles[b[s]].name}</small></div>${labFrame(b[s],s,'large')}</section>`:'').join('');
 const nav=b.navigation?labFrame(b.navigation,'navigation','large'):`<div class="nf-live-placeholder">${T('请选择导航组件','Select a navigation pattern')}</div>`;
 return `<div class="nf-live-preview-wrap"><div class="lab-section-head"><div><b>${T('实时方案预览','Live composition preview')}</b><p>${T('按组合板当前顺序展示全部已选组件，统一使用当前主题色。','Shows all selected patterns in your chosen order with shared design tokens.')}</p></div><div class="nf-live-actions"><button data-action="lab-preview-mode" data-value="desktop" class="${mode==='desktop'?'active':''}">${T('桌面','Desktop')}</button><button data-action="lab-preview-mode" data-value="mobile" class="${mode==='mobile'?'active':''}">${T('手机','Mobile')}</button><button data-action="lab-preview-dialog" ${b.dialog?'':'disabled'}>${T('预览弹窗','Preview dialog')}</button></div></div><div class="nf-live-screen ${mode==='mobile'?'is-mobile':''}"><div class="nf-live-nav">${nav}</div><div class="nf-live-main"><div class="nf-live-main-head"><span>交互式工作台</span><b>${T('设计工作台预览','Design workspace preview')}</b></div><div class="nf-live-content">${pieces||`<p class="nf-live-placeholder">${T('从左侧槽位选择组件，预览即刻更新。','Select component patterns to populate the preview.')}</p>`}</div></div></div>${state.labPreviewDialog&&b.dialog?`<div class="nf-live-dialog-overlay" role="dialog" aria-modal="false"><button aria-label="${T('关闭预览','Close preview')}" data-action="lab-preview-dialog" class="nf-dialog-close">×</button>${labFrame(b.dialog,'dialog','large')}</div>`:''}</div>`;
}
function labProjectsPage(){
 const projects=state.labProjects;
 return `<div class="lab-workspace-section"><div class="lab-section-head"><div><b>${T('本地方案管理','Local project management')}</b><p>${T('方案保存在当前浏览器 localStorage。可以创建、更新、加载、导入与导出，不会上传到服务器。','Projects live in your current browser only. Create, update, load, import and export; nothing is uploaded.')}</p></div><span class="lab-counter-big">${projects.length} / 30</span></div><div class="lab-project-toolbar"><div class="lab-field"><label for="lab-project-name">${T('方案名称','Project name')}</label><input id="lab-project-name" data-lab-input="name" maxlength="90" value="${esc(state.labProjectName)}" placeholder="${T('请输入方案名称','Name your concept')}"/></div><button class="lab-select-btn" data-action="lab-create-project">＋ ${T('保存为新方案','Save new version')}</button><button class="lab-quiet-btn" data-action="lab-save-project">${T('更新当前方案','Update active project')}</button><button class="lab-quiet-btn" data-action="lab-export-json">${T('导出 JSON','Export JSON')}</button><label class="lab-upload-btn">${T('导入 JSON','Import JSON')}<input type="file" accept=".json,application/json" data-lab-file="project" hidden/></label></div><div class="lab-project-grid">${projects.length?projects.map(p=>`<article class="lab-project-item ${state.activeProjectId===p.id?'is-current':''}"><div><span class="lab-project-mark">${state.activeProjectId===p.id?'●':'◇'}</span><strong>${esc(p.name)}</strong></div><p>${T('已选组件','Selected patterns')} ${Object.keys(p.board||{}).length}/6 · ${new Date(p.updatedAt).toLocaleDateString(state.lang==='zh'?'zh-CN':'en-US')}</p><div class="lab-project-buttons"><button data-action="lab-load-project" data-value="${esc(p.id)}">${T('加载','Open')}</button><button data-action="lab-diff-project" data-value="${esc(p.id)}">${T('比较差异','Diff')}</button><button data-action="lab-delete-project" data-value="${esc(p.id)}">${T('删除','Delete')}</button></div></article>`).join(''):`<div class="lab-project-empty"><strong>${T('还没有保存的方案','No saved projects yet')}</strong><p>${T('先去“同色组件对比”选择组件，再创建第一个方案。','Select component patterns in Fair comparison, then save your first project.')}</p></div>`}</div><div class="lab-caution">${T('提示：清理浏览器站点数据会删除本地方案。建议定期导出 JSON 备份。','Note: Clearing site storage removes local projects. Export a JSON backup regularly.')}</div></div>`;
}
function labHexLuminance(hex){let h=/^#[0-9a-f]{6}$/i.test(hex)?hex:'#6254df';const v=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4));return .2126*v[0]+.7152*v[1]+.0722*v[2]}
function labContrast(a,b){let L1=labHexLuminance(a),L2=labHexLuminance(b);return (Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05)}
function labAuditPage(){
 const accent=state.accent||DEFAULT_ACCENT;
 const fg=accentForeground(accent);
 const ratio=labContrast(accent,fg);
 const bg=state.mode==='dark'?'#10141f':'#f5f7fb';
 const text=state.mode==='dark'?'#f1f4fc':'#1e293b';
 const bodyRatio=labContrast(bg,text);
 const checks=[
 [ratio>=4.5,T('主按钮文字对比','Primary text contrast'),`${ratio.toFixed(2)}:1 · ${ratio>=4.5?'AA':T('建议调整','Review')}`],
 [bodyRatio>=4.5,T('页面正文对比','Body text contrast'),`${bodyRatio.toFixed(2)}:1 · AA`],
 [Object.keys(state.labBoard).length===6,T('组件方案完整性','Composition completeness'),`${Object.keys(state.labBoard).length}/6 ${T('已选择','selected')}`],
 [state.labCompare.length>=2,T('多方案并排对比','Side-by-side comparison'),`${state.labCompare.length} ${T('种框架','systems')}`],
 [true,T('主题变量锁定','Theme variable lock'),`${accent} · ${state.mode}`],
 [state.labNotes.trim().length>24,T('设计决策说明','Decision rationale'),`${state.labNotes.trim().length} ${T('字','characters')}`]
 ];
 return `<div class="lab-workspace-section"><div class="lab-section-head"><div><b>${T('设计自检与交付准备','Design QA readiness')}</b><p>${T('这里执行规则级检查，不是自动化无障碍认证；布局、焦点和屏幕阅读器仍需人工及工具测试。','Rule-based checks only, not accessibility certification. Layout, focus and screen readers still need real tests.')}</p></div><span class="lab-qa-count">${checks.filter(x=>x[0]).length}/${checks.length}</span></div><div class="lab-qa-grid">${checks.map(([ok,label,detail])=>`<div class="lab-qa-check ${ok?'passed':'review'}"><span>${ok?'✓':'!'}</span><div><strong>${label}</strong><p>${detail}</p></div></div>`).join('')}</div><div class="lab-qa-tip"><b>${T('仍需完成的验收','Remaining verification')}</b><p>${T('键盘 Tab 顺序、焦点陷阱、屏幕阅读器读法、真实移动设备、浏览器兼容、动画减弱偏好和真实数据错误态。','Keyboard focus order, modal focus trap, screen reader behavior, real devices, browsers, reduced-motion and real error states.')}</p></div></div>`;
}
function labComposeMarkdown(){
 const name=state.labProjectName.trim()||'Interactive Workbench Concept';const board=state.labBoard;
 const a=state.accent||DEFAULT_ACCENT;
 const rows=state.labOrder.map(id=>LAB_SLOTS.find(x=>x[0]===id)).filter(Boolean).map(([id,zh,en])=>`| ${zh} / ${en} | ${board[id]?styles[board[id]].name:'未选择 / Unselected'} | ${board[id]?LAB_STYLE_META[board[id]][id]:'待选 / Pending'} |`).join('\n');
 return `## 8. ${T('方案实验室 · 组件混搭规范','Design studio · mixed-component specification')}\n\n- ${T('方案名称','Project name')}: **${name.replace(/[\r\n|]/g,' ')}**\n- ${T('锁定主色','Locked accent')}: ${a}\n- ${T('模块排列','Section order')}: ${state.labOrder.map(id=>labSlotTitle(id)).join(' → ')}\n- ${T('交互要求','Interactions')}: ${T('按钮含主/次/禁用/加载状态；表格含排序筛选分页；表单含验证与错误反馈；导航支持分组与折叠；弹窗支持键盘关闭、焦点管理。','Buttons include primary/secondary/disabled/loading; tables sorting/filter/pagination; forms validation; nav groups/collapse; dialogs Escape/focus.')}\n- ${T('外观 / 字体 / 字号 / 圆角 / 密度','Mode / font / size / radius / density')}: ${state.mode} / ${state.font} / ${state.fontSize}px / ${state.radius}px / ${state.density}\n- ${T('图标 / 插画','Icons / imagery')}: ${state.iconStyle} / ${state.imageStyle}\n\n| ${T('组件','Component')} | ${T('选中设计体系','Chosen style source')} | ${T('结构特征','Structural pattern')} |\n|---|---|---|\n${rows}\n\n### ${T('设计决策与禁忌','Design rationale and constraints')}\n${state.labNotes.trim()||T('尚未填写，请在方案拼装板中补充。','No rationale recorded yet; add notes in the composition board.')}\n\n### ${T('统一规则（必须遵守）','Mandatory unification rules')}\n1. ${T('组件可以参考不同体系的结构，但所有组件共用上述同一套语义颜色、字号、间距、圆角和状态变量。','Components may borrow structure from different systems, but share a single semantic token set for colors, typography, spacing, radius and states.')}\n2. ${T('按钮、输入框、表格行及弹窗必须覆盖普通、悬停、聚焦、禁用、加载、错误和成功状态。','Buttons, inputs, table rows and dialogs must cover default, hover, focus, disabled, loading, error and success states.')}\n3. ${T('优先还原各选定组件的信息架构与交互行为，不直接复制不兼容框架的 CSS。','Reproduce selected information architecture and behavior; do not combine incompatible framework CSS wholesale.')}\n4. ${T('当前原型没有安装八套官方框架。正式开发必须先确定统一技术栈，并对参考组件进行适配与重构。','This prototype does not bundle the eight native libraries. Choose one implementation stack and adapt/rebuild reference components for production.')}\n\n### ${T('方案级验收','Composition acceptance criteria')}\n- [ ] ${T('六类组件的选型及候选来源可追溯','All six component selections and sources are traceable')}\n- [ ] ${T('同一主色下，亮暗模式与中英文显示一致','Consistent light/dark and bilingual behavior under the locked accent')}\n- [ ] ${T('至少对比两套候选设计的同类组件','At least two candidate designs compared for each chosen component')}\n- [ ] ${T('响应式、键盘操作与状态反馈经过实际验证','Responsive, keyboard and feedback behavior verified in real tests')}`;
}
function labMarkdown(){return generateMarkdown()}
function labProjectSnapshot(){return {board:structuredClone(state.labBoard),order:structuredClone(state.labOrder),notes:state.labNotes,settings:Object.fromEntries(settingsKeys.filter(x=>x!=='inspectorTab').map(k=>[k,state[k]])),selectedEffects:structuredClone(state.selectedEffects.slice(0,50))}}
function labValidateProject(p){return p&&typeof p.name==='string'&&p.name.length<=90&&p.board&&typeof p.board==='object'&&!Array.isArray(p.board)&&Object.entries(p.board).every(([k,v])=>LAB_SLOTS.some(s=>s[0]===k)&&LAB_STYLES.includes(v))}
function labSaveProject(newVersion=false){
 const name=state.labProjectName.trim();if(!name){toast(T('请输入方案名称','Please enter a project name'),'warning');return}
 if(newVersion&&state.labProjects.length>=30){toast(T('方案最多 30 个，请先删除旧方案或导出备份','Maximum 30 projects; export or delete an old one'),'warning');return}
 const id=(!newVersion&&state.activeProjectId&&state.labProjects.some(x=>x.id===state.activeProjectId))?state.activeProjectId:'project-'+Date.now()+'-'+Math.round(Math.random()*10000);
 const project={id,name,updatedAt:new Date().toISOString(),...labProjectSnapshot()};
 const pos=state.labProjects.findIndex(x=>x.id===id);if(pos>=0)state.labProjects[pos]=project;else state.labProjects.unshift(project);
 state.activeProjectId=id;labPersistProjects();labSessionSave();refreshCurrentPage();toast(T('方案已保存到本地浏览器','Project saved locally'));
}
function labRestoreProject(id){const p=state.labProjects.find(x=>x.id===id);if(!p)return;
 state.labBoard=structuredClone(p.board);state.labOrder=Array.isArray(p.order)?[...new Set([...p.order.filter(v=>LAB_SLOTS.some(x=>x[0]===v)),...LAB_SLOTS.map(x=>x[0])])]:LAB_SLOTS.map(x=>x[0]);state.labNotes=String(p.notes||'');state.labProjectName=p.name;state.activeProjectId=p.id;
 if(p.settings&&typeof p.settings==='object')for(const k of settingsKeys){
  if(k==='inspectorTab')continue;let v=p.settings[k];if(v===undefined)continue;
  if(k==='style'&&!LAB_STYLES.includes(v))continue;
  if(k==='mode'&&!['light','dark'].includes(v))continue;
  if(k==='lang'&&!['zh','en'].includes(v))continue;
  if(k==='accent'&&!(typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v)))continue;
  if(k==='fontSize'&&!(typeof v==='number'&&v>=10&&v<=30))continue;
  if(k==='radius'&&!(typeof v==='number'&&v>=0&&v<=30))continue;
  if(k==='density'&&!DENSITIES.some(x=>x[0]===v))continue;
  if(k==='iconStyle'&&!ICON_STYLES.some(x=>x[0]===v))continue;
  if(k==='imageStyle'&&!IMAGE_STYLES.some(x=>x[0]===v))continue;
  if(k==='font'&&!Object.hasOwn(fontFamilies,v))continue;
  if(k==='shadow'&&!['none','soft','strong'].includes(v))continue;
  if(k==='device'&&!['desktop','tablet','mobile'].includes(v))continue;
  if(k==='exportSections')continue;
  state[k]=v;
 }
 if(Array.isArray(p.selectedEffects))state.selectedEffects=p.selectedEffects.slice(0,50);
 saveEffects();labSessionSave();render({keepDoc:true});toast(T('已加载保存的方案和主题设置','Saved design and tokens loaded'));
}
function labExportJson(){const data={format:'NovaFlow-UI-Lab-Design',version:5,exportedAt:new Date().toISOString(),name:state.labProjectName,...labProjectSnapshot()};downloadFile('Interactive_Workbench_Design_Project_V1.0.json',JSON.stringify(data,null,2),'application/json;charset=utf-8');toast(T('已导出设计方案 JSON','Design project exported'))}
function labShowDiff(id){
 const p=state.labProjects.find(x=>x.id===id);if(!p)return;
 const diff=LAB_SLOTS.map(([slot,zh,en])=>{let current=state.labBoard[slot]||'',past=p.board?.[slot]||'';return {slot,label:T(zh,en),current,past,changed:current!==past}});
 const changed=diff.filter(x=>x.changed).length;
 const tokenDiff=['style','mode','accent','font','fontSize','radius','density','iconStyle','imageStyle'].filter(k=>String(p.settings?.[k])!==String(state[k]));
 showModal(T('方案差异报告','Project diff report'),`${esc(p.name)} · ${changed} ${T('个组件变更','component changes')} / ${tokenDiff.length} ${T('个参数变更','token changes')}`,
 `<div class="lab-diff-report"><div class="lab-diff-head"><b>${T('组件类型','Component')}</b><b>${T('当前工作台','Current board')}</b><b>${T('保存方案','Saved project')}</b></div>${diff.map(x=>`<div class="lab-diff-row ${x.changed?'changed':''}"><span>${x.label}</span><span>${x.current?esc(styles[x.current].name):'—'}</span><span>${x.past?esc(styles[x.past].name):'—'}</span></div>`).join('')}<div class="lab-diff-note">${T('参数差异','Token differences')}: ${tokenDiff.length?tokenDiff.join(', '):T('无','None')}</div></div>`,
 btn(T('关闭','Close'),'modal-close')+btn(T('加载保存方案','Load project'),'lab-load-project','primary',`data-value="${esc(p.id)}"`),true);
}
function labHandleAction(action,el){
 const v=el.dataset.value||'';
 if(action==='lab-tab'){state.labTab=v;labSessionSave();refreshCurrentPage();return true}
 if(action==='lab-slot'){state.labSlot=v;labSessionSave();refreshCurrentPage();return true}
 if(action==='lab-compare-toggle'){const set=state.labCompare;if(set.includes(v))state.labCompare=set.filter(x=>x!==v);else if(set.length>=3){toast(T('最多同时选择 3 套框架','Choose up to three systems'),'warning');return true}else state.labCompare=[...set,v];labSessionSave();refreshCurrentPage();return true}
 if(action==='lab-choose'){state.labBoard[state.labSlot]=v;labSessionSave();refreshCurrentPage();toast(`${styles[v]?.name||v} · ${labSlotTitle(state.labSlot)} ${T('已加入组合板','added to board')}`);return true}
 if(action==='lab-palette-slot'){state.labPaletteSlot=v;refreshCurrentPage();return true}
 if(action==='lab-palette-choose'){state.labBoard[state.labPaletteSlot]=v;labSessionSave();refreshCurrentPage();toast(T('组件已更新','Pattern updated'));return true}
 if(action==='lab-order-up'||action==='lab-order-down'){let idx=state.labOrder.indexOf(v),j=idx+(action==='lab-order-up'?-1:1);if(idx>=0&&j>=0&&j<state.labOrder.length){[state.labOrder[idx],state.labOrder[j]]=[state.labOrder[j],state.labOrder[idx]];labSessionSave();refreshCurrentPage()}return true}
 if(action==='lab-preview-mode'){state.labPreviewMode=v==='mobile'?'mobile':'desktop';refreshCurrentPage();return true}
 if(action==='lab-preview-dialog'){state.labPreviewDialog=!state.labPreviewDialog;refreshCurrentPage();return true}
 if(action==='lab-unchoose'){delete state.labBoard[v];labSessionSave();refreshCurrentPage();return true}
 if(action==='lab-edit-slot'){state.labSlot=v;state.labTab='compare';labSessionSave();refreshCurrentPage();return true}
 if(action==='lab-create-project'){labSaveProject(true);return true}
 if(action==='lab-save-project'){labSaveProject(false);return true}
 if(action==='lab-load-project'){labRestoreProject(v);closeModal();return true}
 if(action==='lab-diff-project'){labShowDiff(v);return true}
 if(action==='lab-delete-project'){const p=state.labProjects.find(x=>x.id===v);if(!p)return true;showModal(T('删除设计方案','Delete design project'),T('此操作会从当前浏览器永久删除该本地方案。','This permanently deletes the local copy in this browser.'),`<p class="muted">${esc(p.name)}</p>`,btn(T('取消','Cancel'),'modal-close')+btn(T('确认删除','Delete'),'lab-delete-confirm','danger',`data-value="${esc(v)}"`));return true}
 if(action==='lab-delete-confirm'){state.labProjects=state.labProjects.filter(x=>x.id!==v);if(state.activeProjectId===v)state.activeProjectId=null;labPersistProjects();labSessionSave();closeModal();refreshCurrentPage();toast(T('方案已删除','Project deleted'));return true}
 if(action==='lab-export-json'){labExportJson();return true}
 if(action==='lab-export-md'){downloadFile('Interactive_Workbench_AI_Composition_V1.0.md',labMarkdown(),'text/markdown;charset=utf-8');toast(T('已导出包含组件选型的 AI 需求文档','AI brief with component selections exported'));return true}
 return false;
}
labInit();

function currentPage(){return ({overview:overviewPage,components:componentPage,table:tablePage,forms:formsPage,kanban:kanbanPage,calendar:calendarPage,analytics:analyticsPage,agents:agentsPage,assets:assetsPage,typography:typographyPage,feedback:feedbackPage,export:exportPage,lab:labPage,'settings-appearance':()=>systemSettingsPage('appearance'),'settings-layout':()=>systemSettingsPage('layout'),'settings-icons':()=>systemSettingsPage('icons'),'settings-handoff':()=>systemSettingsPage('handoff')}[state.page]||overviewPage)()}
function settingsAppearance(){const accent=state.accent||DEFAULT_ACCENT;return `
 <div class="v6-settings-section"><div class="v6-setting-title">${T('8 套界面框架','Eight design systems')}<small>${T('只改变界面结构，始终保持当前主色','Compare structures using one consistent accent')}</small></div><div class="v6-style-grid">${Object.entries(styles).map(([key,style])=>`<button type="button" class="v6-style-pick ${state.style===key?'selected':''}" data-setting="style" data-value="${key}" aria-pressed="${state.style===key}"><span class="v6-style-swatch">${icon('layout',23)}</span><strong>${style.name}</strong>${state.style===key?icon('check',16):''}</button>`).join('')}</div></div>
 <div class="v6-settings-two"><div class="v6-setting"><label>${T('外观模式','Appearance')}</label><div class="v6-choice">${[['light',T('亮色','Light')],['dark',T('暗色','Dark')]].map(([v,n])=>`<button data-setting="mode" data-value="${v}" class="${state.mode===v?'active':''}">${n}</button>`).join('')}</div></div><div class="v6-setting"><label>${T('界面语言','Language')}</label><div class="v6-choice"><button data-setting="lang" data-value="zh" class="${state.lang==='zh'?'active':''}">简体中文</button><button data-setting="lang" data-value="en" class="${state.lang==='en'?'active':''}">English</button></div></div></div>
 <div class="v6-setting"><label>${T('主题主色','Primary color')} · ${esc(accent)}</label><div class="v6-color-row">${['#1677ff','#6254df','#0e9f8d','#ef7b45','#e54772','#18181b','#206bc4','#a07654'].map(c=>`<button class="v6-color-dot ${accent.toLowerCase()===c?'active':''}" style="--c:${c}" data-setting="accent" data-value="${c}" aria-label="${c}"></button>`).join('')}<input type="color" value="${accent}" data-input-setting="accent" aria-label="${T('自定义主色','Custom accent')}"/></div></div>
`}
function settingsLayout(){return ` <div class="v6-settings-two"><div class="v6-setting"><label>${T('字体','Font family')}</label><select data-select-setting="font" class="v6-select">${[['system','System UI'],['cjk',T('中文无衬线','CJK Sans')],['serif','Editorial Serif'],['mono','Monospace']].map(([v,n])=>`<option value="${v}" ${v===state.font?'selected':''}>${n}</option>`).join('')}</select></div><div class="v6-setting"><label>${T('信息密度','Density')}</label><select data-select-setting="density" class="v6-select">${DENSITIES.map(d=>`<option value="${d[0]}" ${d[0]===state.density?'selected':''}>${T(d[2],d[3])}</option>`).join('')}</select></div></div>
 <div class="v6-settings-two"><div class="v6-setting"><label>${T('全站基准字号','Base font size')} <b id="font-reading">${state.fontSize}px</b></label><input type="range" min="10" max="30" step="1" value="${state.fontSize}" data-range-setting="fontSize"/><small class="iw-menu-font-indicator" id="menu-font-reading" aria-live="polite">${T('一级菜单','Parent menu')} ${state.fontSize-1}px · ${T('二级菜单','Child menu')} ${state.fontSize-4}px</small></div><div class="v6-setting"><label>${T('全站圆角','Corner radius')} <b id="radius-reading">${state.radius}px</b></label><input type="range" min="0" max="30" step="1" value="${state.radius}" data-range-setting="radius"/></div></div>
<div class="v6-setting"><label>${T('菜单栏宽度','Sidebar width')} <b id="sidebar-width-reading">${state.sidebarWidth}px</b></label><input type="range" min="196" max="420" step="2" value="${state.sidebarWidth}" data-range-setting="sidebarWidth"/><p class="v6-small-note">${T('也可以直接拖动左侧菜单与内容之间的边界','Or drag the sidebar edge directly')}</p></div><div class="v6-setting"><label>${T('菜单展开','Navigation visibility')}</label><div class="v6-choice"><button data-action="expand-sidebar" class="${!state.navCollapsed?'active':''}">${T('展开','Expanded')}</button><button data-action="collapse-sidebar" class="${state.navCollapsed?'active':''}">${T('折叠','Collapsed')}</button></div></div><div class="v6-setting"><label>${T('卡片层次','Card elevation')}</label><div class="v6-choice">${[['none',T('无阴影','Flat')],['soft',T('柔和阴影','Soft')],['strong',T('明显阴影','Raised')]].map(([v,n])=>`<button data-setting="shadow" data-value="${v}" class="${state.shadow===v?'active':''}">${n}</button>`).join('')}</div></div><div class="v6-setting"><label>${T('重置设置','Restore defaults')}</label><button class="v6-secondary-button" data-action="reset-settings">${icon('refresh',17)} ${T('恢复默认字号 17px、圆角 12px 等设置','Restore default 17px font, 12px radius and more')}</button></div>`}
function iconSampleForStyle(name,mode,size=30){const prev=state.iconStyle;state.iconStyle=mode;try{return icon(name,size)}finally{state.iconStyle=prev}}
function settingsIcons(){let labels=['dashboard','table','form','kanban','calendar','bot','image','layers'];return `<div class="v6-settings-section"><div class="v6-setting-title">${T('同一语义 · 多种线描造型','One meaning · multiple outline designs')}<small>${T('所有图标保持统一线宽、24px 画布和主题配色；默认经典图标完全保留。','Same 24px canvas, stroke language and theme colors. The original outline family stays intact.')}</small></div><div class="v6-icon-choices">${ICON_STYLES.map(([v,zh,en])=>`<button type="button" class="v6-icon-choice ${state.iconStyle===v?'active':''}" data-setting="iconStyle" data-value="${v}" aria-pressed="${state.iconStyle===v}"><div>${['dashboard','table','bot','calendar'].map(x=>iconSampleForStyle(x,v,28)).join('')}</div><strong>${T(zh,en)}</strong><small>${v==='line'?T('原版设计','Original set'):T('相同含义的新线稿','Alternative outlines')}</small></button>`).join('')}</div><div class="v6-icon-compare"><h3>${T('13 个菜单图标实时对比','Live 13-icon comparison')}</h3><div class="v6-semantic-grid">${PAGES.map(p=>`<div><span>${icon(p[1],27)}</span><small>${T(p[2],p[3])}</small></div>`).join('')}</div></div></div><div class="v6-setting"><label>${T('图片素材风格','Image treatment')}</label><div class="v6-image-choices">${IMAGE_STYLES.map(([v,zh,en],i)=>`<button data-setting="imageStyle" data-value="${v}" class="${state.imageStyle===v?'active':''}"><img src="${imageUri(i%6,v)}" loading="lazy" alt="${T(zh,en)}"/><span>${T(zh,en)}</span></button>`).join('')}</div></div>`}
function settingsHandoff(){let text=generateMarkdown();return `<div class="v6-setting"><label>${T('已收藏参考','Saved design references')} · ${state.selectedEffects.length}</label><p class="v6-small-note">${T('导出文档包含框架来源、设计 Token、组件选择和实现验收要求。','Export includes framework choices, tokens, component selections and acceptance criteria.')}</p><pre class="v6-code-preview">${esc(text.slice(0,2300))}</pre></div><div class="v6-settings-actions"><button class="v6-main-button" data-action="download-md">${icon('download',17)} ${T('下载 AI 设计需求 .md','Download AI design brief')}</button><button class="v6-secondary-button" data-action="download-json">${icon('file',17)} ${T('导出 JSON 配置','Export JSON configuration')}</button><button class="v6-secondary-button" data-action="copy-md">${icon('copy',17)} ${T('复制 Markdown','Copy Markdown')}</button></div>`}
function systemSettingsPage(tab){
 const sections={appearance:[T('外观与框架','Appearance & frameworks'),T('比较不同设计体系，统一管理全局颜色、语言与字体','Compare frameworks and manage global theme, color and fonts'),settingsAppearance],layout:[T('排版与布局','Typography & layout'),T('精细控制排版、圆角、菜单宽度与信息密度','Adjust type, radius, navigation width and density'),settingsLayout],icons:[T('图标与素材','Icons & assets'),T('切换同一语义的不同线稿与视觉资源','Choose semantic outline icons and asset treatments'),settingsIcons],handoff:[T('AI 交付设置','AI handoff'),T('输出设计规范、组件决策与开发任务上下文','Export design specifications and implementation requirements'),settingsHandoff]};
 const item=sections[tab]||sections.appearance;
 return `<div class="iw-settings-page">${heading('SETTINGS / V1.0',item[0],item[1])}<div class="iw-settings-body">${item[2]()}</div></div>`;
}
function isMobile(){return window.innerWidth<=750}
const WORKBENCH_ENTRY=['login','workspace','unified'].includes(document.body.dataset.entry)?document.body.dataset.entry:'unified';
const WORKBENCH_LOGIN_FILE='login.html';const WORKBENCH_INDEX_FILE='index.html';
const AUTH_KEY='interactive-workbench-v1-session';
const ACCOUNT_KEY='iw:v1:local-account';
const ACCOUNTS_KEY='iw:v1:accounts';
// This is a frontend-only sample credential. Replace with server-side authentication before deployment.
const BUILTIN_DEMO={id:'builtin-demo',username:'demo',displayName:'工作台用户'};
const BUILTIN_DEMO_PASSWORD='Demo@2026';
function getLocalAccount(){try{const raw=localStorage.getItem(ACCOUNT_KEY);return raw?JSON.parse(raw):null}catch{return null}}
function getLocalAccounts(){
 let accounts=[];
 try{const stored=JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||'[]');if(Array.isArray(stored))accounts=stored.filter(x=>x&&x.username&&x.id)}catch{}
 // Read v1.0's original single-account storage without dropping existing user records.
 const legacy=getLocalAccount();
 if(legacy?.id&&!accounts.some(x=>x.id===legacy.id||String(x.username).toLowerCase()===String(legacy.username).toLowerCase()))accounts.push(legacy);
 return accounts;
}
function findLocalAccount(username){return getLocalAccounts().find(a=>String(a.username).toLowerCase()===String(username).toLowerCase())||null}
async function derivePassword(password,salt){
 if(!globalThis.crypto?.subtle)throw Error(T('当前环境无法安全创建本地账号，请通过 HTTPS 或支持安全上下文的浏览器打开。','Secure cryptography is unavailable. Use HTTPS or a browser supporting secure contexts.'));
 const bytes=new TextEncoder().encode(password);
 const material=await crypto.subtle.importKey('raw',bytes,'PBKDF2',false,['deriveBits']);
 const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:Uint8Array.from(salt),iterations:125000,hash:'SHA-256'},material,256);
 return Array.from(new Uint8Array(bits)).map(n=>n.toString(16).padStart(2,'0')).join('');
}
function loadAuth(){
 const stores=[];try{stores.push(sessionStorage)}catch{}try{stores.push(localStorage)}catch{}
 for(const store of stores){try{
  const raw=store.getItem(AUTH_KEY);if(!raw)continue;
  const session=JSON.parse(raw);
  if(!session||session.expiry<=Date.now())continue;
  if(session.id===BUILTIN_DEMO.id||getLocalAccounts().some(a=>a.id===session.id))return session;
 }catch{}}
 return null;
}
let currentUser=loadAuth();
let authBusy=false;
// Always show sign-in by default. Registration is optional and never blocks the demo account.
let authMode='signin';
function persistAuth(user,remember){
 try{sessionStorage.removeItem(AUTH_KEY);localStorage.removeItem(AUTH_KEY);
 (remember?localStorage:sessionStorage).setItem(AUTH_KEY,JSON.stringify(user))}catch{}
}
function logoutAuth(){try{localStorage.removeItem(AUTH_KEY);sessionStorage.removeItem(AUTH_KEY)}catch{}currentUser=null;authMode='signin';closeModal();if(WORKBENCH_ENTRY==='unified')render({resetScroll:true});else window.location.assign(WORKBENCH_LOGIN_FILE)}
async function submitAuth(){
 if(authBusy)return;
 const accountField=document.getElementById('v6-account'),passField=document.getElementById('v6-password'),err=document.getElementById('v6-login-error');
 const username=String(accountField?.value||'').trim(),password=String(passField?.value||'');
 const signup=authMode==='signup';
 if(!username||password.length<8){if(err){err.dataset.state='error';err.textContent=T('请输入账号和至少 8 位密码','Enter an account and a password of at least 8 characters')}(!username?accountField:passField)?.focus();return}
 authBusy=true;
 const submit=document.querySelector('.v6-login-submit');
 const initialButtonMarkup=submit?.innerHTML||'';
 if(err){err.dataset.state='pending';err.textContent=T('正在验证账号，请稍候…','Verifying credentials…')}
 if(submit){submit.disabled=true;submit.setAttribute('aria-busy','true');submit.innerHTML='<span class="iw-auth-spinner" aria-hidden="true"></span><span>'+T('正在登录…','Signing in…')+'</span>'}
 // Allow browsers to display the pending state before processing local accounts.
 try{
  let account;
  if(signup){
   if(!/^[^\s]{2,48}$/u.test(username))throw Error(T('账号应为 2–48 个不含空格的字符','Account must be 2–48 characters with no spaces'));
   if(username.toLowerCase()===BUILTIN_DEMO.username||findLocalAccount(username))throw Error(T('该账号已经存在，请直接登录','This account already exists. Sign in instead.'));
   if(!globalThis.crypto?.getRandomValues)throw Error(T('浏览器不支持账号创建所需的随机数功能','Your browser cannot generate the random values required for registration'));
   const salt=Array.from(crypto.getRandomValues(new Uint8Array(16)));
   const hash=await derivePassword(password,salt);
   account={id:'local-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),username,displayName:username,salt,hash};
   const accounts=getLocalAccounts();accounts.push(account);
   localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(accounts));
  }else if(username.toLowerCase()===BUILTIN_DEMO.username&&password===BUILTIN_DEMO_PASSWORD){
   account=BUILTIN_DEMO;
  }else{
   account=findLocalAccount(username);
   if(!account||await derivePassword(password,account.salt)!==account.hash)throw Error(T('账号或密码不正确','Incorrect account or password'));
  }
  const remember=Boolean(document.getElementById('v6-remember')?.checked);
  currentUser={id:account.id,name:account.displayName||account.username,en:account.displayName||account.username,role:T('工作区管理员','Workspace administrator'),expiry:Date.now()+(remember?7:1)*86400000};
  persistAuth(currentUser,remember);
  authMode='signin';if(WORKBENCH_ENTRY==='unified')render({resetScroll:true});else window.location.assign(WORKBENCH_INDEX_FILE);return;
 }catch(e){
  console.error('[Interactive Workbench] Authentication failed:',e);
  const visibleError=document.getElementById('v6-login-error');
  if(visibleError){visibleError.dataset.state='error';visibleError.textContent=e?.message||T('登录失败，请检查账号密码后重试','Login failed. Check credentials and try again.')}
  passField?.focus();
 }
 finally{
  authBusy=false;
  if(submit?.isConnected){submit.disabled=false;submit.removeAttribute('aria-busy');submit.innerHTML=initialButtonMarkup}
 }
}
function iwAnimal(){return `<div class="iw-fox-stage" data-cover="false" aria-hidden="true"><div class="iw-fox-halo"></div><div class="iw-fox-spark s1">✦</div><div class="iw-fox-spark s2">✧</div><svg class="iw-fox" viewBox="0 0 340 320" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="foxFur" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffcc8f"/><stop offset=".48" stop-color="#ff976d"/><stop offset="1" stop-color="#e96978"/></linearGradient><linearGradient id="foxVest" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7c63f3"/><stop offset="1" stop-color="#352268"/></linearGradient><filter id="foxSoft"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#0d103f" flood-opacity=".2"/></filter></defs><ellipse cx="170" cy="292" rx="95" ry="13" fill="#15114b" opacity=".3"/><g filter="url(#foxSoft)"><path d="M73 111 64 32q45 10 77 56M267 111l9-79q-46 11-78 56" fill="url(#foxFur)" stroke="#fdd7ae" stroke-width="4"/><path d="M84 92 77 54 118 92M255 92l8-38-41 38" fill="#78396a"/><path d="M93 245q-43-3-41 60h239q0-61-43-60" fill="url(#foxVest)"/><ellipse cx="170" cy="159" rx="107" ry="111" fill="url(#foxFur)"/><path d="M109 198q24-28 61-15 37-13 61 15 0 53-61 62-61-9-61-62" fill="#fff4e6"/><path d="M158 200q12-8 24 0l-12 13z" fill="#4f3345"/><path d="M170 213q-2 13-14 14m14-14q2 13 14 14" stroke="#694357" stroke-width="4" stroke-linecap="round" fill="none"/><g class="iw-fox-eyes"><ellipse cx="126" cy="164" rx="11" ry="16" fill="#423451"/><ellipse cx="213" cy="164" rx="11" ry="16" fill="#423451"/><circle cx="130" cy="158" r="3" fill="#fff"/><circle cx="217" cy="158" r="3" fill="#fff"/></g><ellipse cx="96" cy="193" rx="18" ry="8" fill="#fa7181" opacity=".7"/><ellipse cx="244" cy="193" rx="18" ry="8" fill="#fa7181" opacity=".7"/></g><g class="iw-paw iw-paw-l"><path d="M95 285q-33-14-44-52-4-13 7-20 10-5 19 4-7-18 5-22 13-5 18 14-1-23 12-20 12 3 13 25 10-13 20-5 11 9 1 25l-24 53z" fill="#ffc29b" stroke="#e47878" stroke-width="3"/><circle cx="94" cy="235" r="6" fill="#fff1dd"/></g><g class="iw-paw iw-paw-r"><path d="M245 285q33-14 44-52 4-13-7-20-10-5-19 4 7-18-5-22-13-5-18 14 1-23-12-20-12 3-13 25-10-13-20-5-11 9-1 25l24 53z" fill="#ffc29b" stroke="#e47878" stroke-width="3"/><circle cx="246" cy="235" r="6" fill="#fff1dd"/></g></svg><div class="iw-fox-tip">${T('好设计，也懂得保护隐私','A little privacy makes better design')}</div></div>`}
function syncPasswordMascot(){const root=document.querySelector('.iw-fox-stage'),input=document.getElementById('v6-password');if(!root||!input)return;const shouldCover=document.activeElement===input&&input.type==='password';root.dataset.cover=String(shouldCover);root.dataset.typing=String(!!input.value)}
function renderLoginPage(){const signup=authMode==='signup';return `<main class="v6-login-screen"><section class="v6-login-card"><div class="v6-login-hero"><div class="iw-login-glow"></div><div class="iw-hero-top"><span class="iw-hero-mark">${appMark(32)}</span><strong>Interactive Workbench</strong><span class="iw-version">V1.0</span></div><div class="iw-hero-middle"><div class="iw-hero-kicker">CREATE · EXPLORE · BUILD</div><h1>${T('把每个灵感，','Turn every idea')}<span>${T('变成下一步。','into something real.')}</span></h1><p>${T('一个工作空间，连接设计灵感、组件方案与高效协作。','One beautiful workspace for components, ideas and seamless creation.')}</p>${iwAnimal()}</div><div class="iw-hero-bottom"><span>✦ ${T('统一设计语言','Unified design language')}</span><span>✦ ${T('自由组合','Compose freely')}</span><span>✦ ${T('即时交付','Instant handoff')}</span></div></div><div class="v6-login-form-wrap"><form id="v6-login-form" class="v6-login-form" novalidate><div class="v6-login-top"><span class="v6-login-kicker">YOUR WORKSPACE · V1.0</span><h2>${signup?T('创建你的工作空间','Create your workspace'):T('欢迎回来','Welcome back')}</h2><p>${signup?T('注册账号后即可进入自己的工作空间。','Create a local account to enter your workspace.'):T('登录后继续你的设计与协作。','Sign in to continue where you left off.')}</p></div><label for="v6-account">${T('账号','Account')}</label><input id="v6-account" name="account" autocomplete="username" required maxlength="48" placeholder="${signup?T('设置新的登录账号','Choose an account name'):T('请输入账号','Enter your account')}"/><label for="v6-password">${T('密码','Password')}</label><div class="v6-password-wrap"><input id="v6-password" type="password" name="password" minlength="8" autocomplete="${signup?'new-password':'current-password'}" required placeholder="${T('至少 8 位字符','At least 8 characters')}"/><button type="button" data-action="toggle-password" aria-label="${T('显示或隐藏密码','Show or hide password')}" aria-pressed="false">${icon('eye',19)}</button></div><div class="iw-password-hint" id="iw-password-hint">${T('输入密码时，左边的小狐狸会礼貌地捂住眼睛。','The little fox covers its eyes while you enter your password.')}</div><div class="v6-remember-line"><label><input type="checkbox" id="v6-remember" checked/>${T('保持登录状态','Stay signed in')}</label><span>${icon('shield',15)} ${T('独立工作空间','Private workspace')}</span></div><div id="v6-login-error" role="alert" aria-live="polite"></div><button class="v6-login-submit" type="button" data-action="auth-submit" aria-live="polite"><span>${signup?T('创建账号并进入','Create account & enter'):T('登录并进入','Sign in & enter')}</span>${icon('arrow',18)}</button><div class="iw-auth-switch"><span>${signup?T('已有账号？','Already have an account?'):T('还没有账号？','New to this workspace?')}</span><button type="button" data-action="auth-switch">${signup?T('返回登录','Sign in'):T('注册账号','Register')}</button></div></form><div class="iw-auth-footer">© ${new Date().getFullYear()} Interactive Workbench</div></div></section></main>`}

function accentForeground(hex){let c=/^#[0-9a-f]{6}$/i.test(hex)?hex:'#6750a4',rgb=[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]>.35?'#17212e':'#ffffff'}
function themeVars(){
 const dark=state.mode==='dark';const accent=state.accent||DEFAULT_ACCENT;
 const neutral=dark?{bg:'#10141f',card:'#1c2433',text:'#f1f4fc',muted:'#9faac1',line:'#394458',sidebar:'#1c2433',sideText:'#b7c3d4',sideActive:'#30394a'}:{bg:'#f5f7fb',card:'#ffffff',text:'#1e293b',muted:'#6b7789',line:'#e1e6ee',sidebar:'#ffffff',sideText:'#627185',sideActive:'#f0f2f7'};
 const vars={'--accent':accent,'--accent-on':accentForeground(accent),'--app-bg':neutral.bg,'--card':neutral.card,'--text':neutral.text,'--muted':neutral.muted,'--stroke':neutral.line,'--sidebar':neutral.sidebar,'--side-text':neutral.sideText,'--side-active':neutral.sideActive,'--radius':state.radius+'px','--fsize':state.fontSize+'px','--nav-fsize':(state.fontSize+3)+'px','--ws-sidebar-width':state.sidebarWidth+'px','--family':fontFamilies[state.font]||fontFamilies.system,'--shadow':dark?'0 6px 24px #00000020':'0 6px 22px #17243d10'};
 return Object.entries(vars).map(([k,v])=>`${k}:${v}`).join(';')}
function appMark(size=34){return `<svg class="nf-app-logo" width="${size}" height="${size}" viewBox="0 0 40 40" role="img" aria-label="交互式工作台应用图标"><rect x="1" y="1" width="38" height="38" rx="11" fill="var(--accent,#1677ff)"/><path d="M10 11h8v8h-8zm12 0h8v8h-8zm-12 12h8v8h-8z" fill="#fff" opacity=".97"/><path d="M24 26h6m-3-3v6" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>`}

const NAV_GROUPS=[
 {id:'operations',icon:'dashboard',zh:'业务运营',en:'Operations',pageIds:['overview','components','table','forms']},
 {id:'workflows',icon:'layers',zh:'工作流与分析',en:'Workflows & analytics',pageIds:['kanban','calendar','analytics','agents']},
 {id:'design',icon:'spark',zh:'设计与交付',en:'Design & handoff',pageIds:['assets','typography','feedback','export','lab']},
 {id:'system',icon:'settings',zh:'系统设置',en:'System settings',pageIds:['settings-appearance','settings-layout','settings-icons','settings-handoff']}
];
const NAV_SEARCH_EXTRA={overview:'dashboard 首页 主页 总览',components:'ui widgets buttons controls 控件 按钮 组件',table:'datatable records list 列表 数据表格',forms:'input submit validation 表单 校验',kanban:'tasks board workflow 看板 任务',calendar:'schedule date 日程 日期',analytics:'chart stats insights 指标 分析',agents:'ai bots automation 智能体 自动化',assets:'icons images media 图标 素材 图片',typography:'fonts sizes token 字体 字号 排版',feedback:'dialogs modal alert toast 弹窗 反馈',export:'markdown json handoff prompt AI文档 导出',lab:'compare styles favorites board designs 方案 对比 收藏','settings-appearance':'主题 框架 亮暗 语言 主色 design theme framework','settings-layout':'字体 字号 密度 圆角 导航 宽度 layout typography','settings-icons':'图标 图片 素材 icon image assets','settings-handoff':'AI 提示词 Markdown 导出 JSON handoff'};
function navItemMatches(page,query){return (`${page[0]} ${page[2]} ${page[3]} ${NAV_SEARCH_EXTRA[page[0]]||''}`).toLocaleLowerCase().includes(query.toLocaleLowerCase().trim())}
function renderNavEntries(){
 const collapsed=state.navCollapsed&&!isMobile();const q=collapsed?'':(state.navQuery||'').trim();const compact=false;
 const menuButton=([id,ic,zh,en])=>`<button type="button" data-nav="${id}" title="${T(zh,en)}" class="nav-btn ${state.page===id?'active':''}" ${state.page===id?'aria-current="page"':''}>${icon(ic,17)}<span>${T(zh,en)}</span>${state.style==='adminlte'&&id==='agents'?'<span class="num">8</span>':''}</button>`;
 if(compact){return PAGES.filter(p=>!q||navItemMatches(p,q)).map(menuButton).join('')}
 let total=0;
 const markup=NAV_GROUPS.map(group=>{
  const items=group.pageIds.map(id=>pageById(id)).filter(p=>!q||navItemMatches(p,q));total+=items.length;
  if(q&&!items.length)return '';
  const open=collapsed?state.navFlyoutGroup===group.id:(q?true:state.navGroups[group.id]!==false);
  const label=T(group.zh,group.en);
  return `<section class="nf-nav-section ${group.pageIds.includes(state.page)?'has-current':''} ${collapsed&&state.navFlyoutGroup===group.id?'flyout-open':''}" data-nav-group="${group.id}">
    <button type="button" class="nf-group-toggle" data-action="toggle-nav-group" data-group="${group.id}" aria-controls="${collapsed?'iw-nav-flyout':'nf-nav-items-'+group.id}" aria-expanded="${open}" aria-label="${label}" title="${label}">
      <span class="nf-group-title">${icon(group.icon,15)}<span>${label}</span></span>
      <span class="nf-group-caret" aria-hidden="true">${icon('chevronright',15)}</span>
    </button>
    <div class="nf-nav-items" id="nf-nav-items-${group.id}" ${!collapsed&&open?'':'hidden'}>${items.map(menuButton).join('')}</div>
  </section>`;
 }).join('');
 if(!total)return `<div class="nf-menu-empty">${icon('search',25)}<strong>${T('未找到匹配菜单','No matching pages')}</strong><span>${T('尝试输入“表格”、“AI”或“设计”','Try “table”, “AI” or “design”')}</span><button type="button" data-action="clear-nav-search">${T('清除搜索','Clear search')}</button></div>`;
 return markup;
}
function closeNavFlyout(restoreFocus=false){
 const old=state.navFlyoutGroup;state.navFlyoutGroup=null;
 document.getElementById('iw-nav-flyout')?.remove();
 document.querySelectorAll('.nf-nav-section.flyout-open').forEach(node=>node.classList.remove('flyout-open'));
 document.querySelectorAll('.nf-group-toggle[aria-expanded="true"]').forEach(node=>{
  if(state.navCollapsed&&!isMobile())node.setAttribute('aria-expanded','false');
 });
 if(restoreFocus&&old)document.querySelector(`.nf-group-toggle[data-group="${old}"]`)?.focus();
}
function renderNavFlyout(){
 const old=document.getElementById('iw-nav-flyout');old?.remove();
 const group=NAV_GROUPS.find(g=>g.id===state.navFlyoutGroup);
 if(!group||!state.navCollapsed||isMobile())return;
 const opener=document.querySelector(`.nf-group-toggle[data-group="${group.id}"]`);
 const root=document.getElementById('workspace');if(!opener||!root)return;
 const box=document.createElement('section');box.id='iw-nav-flyout';box.className='iw-nav-flyout';box.style.cssText=themeVars();box.setAttribute('role','dialog');
 const name=T(group.zh,group.en);box.setAttribute('aria-label',name);
 box.innerHTML=`<div class="iw-nav-flyout-head"><span>${name}</span><button type="button" class="iw-nav-flyout-close" data-action="close-nav-flyout" aria-label="${T('关闭子菜单','Close submenu')}">×</button></div><div class="iw-nav-flyout-links">${group.pageIds.map(id=>{
  const p=pageById(id);return `<button type="button" class="nav-btn ${state.page===id?'active':''}" data-nav="${id}" ${state.page===id?'aria-current="page"':''}>${icon(p[1],18)}<span>${T(p[2],p[3])}</span></button>`;
 }).join('')}</div>`;
 document.body.append(box);
 const r=opener.getBoundingClientRect();
 const flyWidth=Math.min(290,window.innerWidth-r.right-12);box.style.width=Math.max(220,flyWidth)+'px';
 const top=Math.min(Math.max(12,r.top-12),window.innerHeight-box.offsetHeight-12);
 box.style.left=Math.min(window.innerWidth-box.offsetWidth-8,r.right+8)+'px';box.style.top=Math.max(10,top)+'px';
 opener.closest('.nf-nav-section')?.classList.add('flyout-open');opener.setAttribute('aria-expanded','true');
}
function refreshNavOnly(){
 const root=$('#ws-nav-entries');if(!root)return;
 // Keep the visible menu position when a group is toggled or search results change.
 const navScrollTop=root.scrollTop;
 root.innerHTML=renderNavEntries();
 root.scrollTop=navScrollTop;
 const query=(state.navQuery||'').trim();
 const clear=$('#nav-search-clear');if(clear)clear.hidden=!query;
 // Only navigation markup changes; the user's vertical position remains stable.
}
function navCommandResults(query=''){
 const q=String(query||'').trim();let items=PAGES.filter(p=>!q||navItemMatches(p,q));
 return items.length?items.map(p=>`<button type="button" class="nf-command-row" data-nav="${p[0]}">${icon(p[1],18)}<span><strong>${T(p[2],p[3])}</strong><small>${p[0]} · ${NAV_GROUPS.find(g=>g.pageIds.includes(p[0]))?.[state.lang==='zh'?'zh':'en']||''}</small></span>${icon('arrow',14)}</button>`).join(''):`<div class="nf-menu-empty">${T('未找到匹配页面','No matching pages')}</div>`;
}
function openNavCommand(){
 showModal(T('搜索工作台页面','Search workspace pages'),T('输入中文、英文或功能关键词，直接跳转。','Search Chinese, English or feature keywords and navigate instantly.'),
 `<div class="nf-command-shell"><input class="control-input" id="nav-command-search" data-input="nav-command-search" type="search" placeholder="${T('例如：表格、智能体、设计','e.g. table, agent, design')}" aria-label="${T('搜索工作台页面','Search workspace pages')}" autocomplete="off"/><div class="nf-command-results" id="nf-command-results">${navCommandResults()}</div></div>`,
 btn(T('关闭','Close'),'modal-close'),'big');
 $('#nav-command-search')?.focus();
}
function openNavSearch(){
 if(isMobile()){ state.mobileNav=true;syncSidebarState()}
 else if(state.navCollapsed){state.navCollapsed=false;syncSidebarState()}
 const field=$('#nav-search');if(field){field.focus();field.select()}
}
function renderWorkspace(){
 const sid=state.style,page=pageById(state.page),pageName=page[state.lang==='zh'?2:3];
 const brand=`<div class="ws-brand"><button type="button" class="nf-brand-toggle" data-action="toggle-sidebar" aria-controls="ws-primary-sidebar" aria-expanded="${isMobile()?Boolean(state.mobileNav):!state.navCollapsed}" aria-label="${T('切换菜单展开状态','Toggle sidebar')}" title="${T('点击图标展开/收起菜单','Click icon to expand or collapse')}">${appMark(34)}</button><div class="nf-brand-copy"><strong>交互式工作台</strong><small>${T('设计参考 · 工作空间','Design reference · Workspace')}</small></div></div>`;
 const search=`<div class="nf-menu-search" role="search"><label for="nav-search" class="nf-menu-search-icon">${icon('search',17)}</label><input type="search" id="nav-search" data-input="nav-search" autocomplete="off" spellcheck="false" value="${esc(state.navQuery)}" placeholder="${T('搜索菜单名称 / Ctrl+K','Search pages / Ctrl+K')}" aria-label="${T('搜索工作台菜单','Search workspace navigation')}"/><button type="button" class="nf-menu-search-clear" id="nav-search-clear" data-action="clear-nav-search" aria-label="${T('清空菜单搜索','Clear menu search')}" ${state.navQuery?'':'hidden'}>×</button></div>`;
 
 const nav=`<nav class="ws-nav" id="ws-nav-entries" aria-label="${T('页面导航','Page navigation')}">${renderNavEntries()}</nav>`;
 const side=`<aside id="ws-primary-sidebar" aria-label="${T('主导航','Primary navigation')}" class="ws-sidebar ${state.mobileNav?'mobile-open':''}">${brand}<div class="nf-nav-control">${search}</div>${nav}<div class="sidebar-bottom"><button type="button" class="profile-line v6-profile-button" data-action="profile-menu" title="${T('打开个人信息','Open profile')}"><span class="mini-avatar" aria-hidden="true">${esc((currentUser?.name||'U').slice(0,1).toUpperCase())}</span><span class="nf-profile-copy"><strong>${state.lang==='zh'?(currentUser?.name||'用户'):(currentUser?.en||'User')}</strong><small>${T('工作区管理员','Workspace administrator')}</small></span>${icon('more',14)}</button></div><div id="nav-resize-handle" class="nf-nav-resizer" role="separator" tabindex="0" aria-orientation="vertical" aria-controls="ws-primary-sidebar" aria-label="${T('拖动调整菜单宽度','Drag to resize navigation')}" aria-valuemin="196" aria-valuemax="420" aria-valuenow="${state.sidebarWidth}"><span></span></div></aside>`;
 const topbar=`<div class="ws-topbar"><div class="row nf-topbar-left"><button type="button" class="ws-icon-btn nf-mobile-app-toggle" data-action="toggle-sidebar" aria-label="${T('打开或关闭菜单','Toggle navigation')}" title="${T('打开或关闭菜单','Toggle navigation')}">${appMark(25)}</button>${sid==='shadcn'?`<b class="nf-toolbar-name">${pageName}</b><span class="muted tiny">/ 交互式工作台</span>`:sid==='tabler'?`<b class="nf-toolbar-name">交互式工作台</b><span class="nf-tabler-top-caption">${pageName}</span>`:sid==='bootstrap'?`<span class="nf-toolbar-name">交互式工作台</span><span class="nf-nav-crumb">/ ${pageName}</span>`:sid==='adminlte'?`<b class="nf-toolbar-name">${pageName}</b><span class="nf-admin-heading">${T('管理控制台','Admin console')}</span>`:`<div class="crumbs">${T('工作空间','Workspace')} / <b>${pageName}</b></div>`}</div><div class="top-controls"><button type="button" class="ws-icon-btn nf-quick-find" data-action="focus-nav-search" title="${T('搜索工作台菜单 Ctrl+K','Search navigation Ctrl+K')}" aria-label="${T('搜索菜单','Search navigation')}">${icon('search',17)}</button><span class="online-chip">● ${T('运行正常','Online')}</span><button class="ws-icon-btn" data-action="notification" title="${T('通知','Notifications')}">${icon('bell',16)}</button><button class="ws-icon-btn v6-settings-trigger" data-action="open-settings" title="${T('系统设置','System settings')}" aria-label="${T('进入系统设置','System settings')}">${icon('settings',20)}</button></div></div>`;
 const strip=sid==='material'?`<div class="nf-material-tabs"><span class="active">${T('全部','Overview')}</span><span>${T('洞察','Insights')}</span><span>${T('发布','Releases')}</span></div>`:sid==='daisy'?`<div class="nf-daisy-tabs"><span class="active">✦ ${T('灵感板','Moodboard')}</span><span>✳ ${T('组件型录','UI kit')}</span><span>◈ ${T('规范交付','Spec')}</span></div>`:sid==='element'?`<div class="nf-element-breadcrumb">${T('首页','Home')}　›　${pageName}</div>`:sid==='tabler'?`<div class="nf-tabler-subnav"><span>${T('本周','This week')}</span><span class="active">${T('工作空间','Workspace')}</span><span>${T('分析报表','Reports')}</span></div>`:'';
 return `<button class="ws-nav-scrim" data-action="close-mobile-sidebar" aria-label="${T('关闭菜单','Close navigation')}"></button>${side}<div class="ws-main">${topbar}${strip}<div class="ws-content">${currentPage()}</div></div>`;
}
function applyGlobalTheme(){let root=document.documentElement;let scale=Math.max(10,Math.min(30,state.fontSize))/17;root.dataset.uiMode=state.mode;root.dataset.uiStyle=state.style;root.style.setProperty('--site-font-scale',String(scale));root.style.setProperty('--accent',state.accent||DEFAULT_ACCENT);root.style.setProperty('--global-font-family',fontFamilies[state.font]||fontFamilies.system);root.style.setProperty('--global-radius',state.radius+'px');root.style.setProperty('--density-factor',String(DENSITIES.find(x=>x[0]===state.density)?.[1]||1));root.style.colorScheme=state.mode}
function render(opts={}){
 closeNavFlyout();
 applyGlobalTheme();
 const oldWorkspace=document.getElementById('workspace');
 const oldPageScroll=oldWorkspace?.querySelector('.ws-main')?.scrollTop||0;
 const oldNavScroll=oldWorkspace?.querySelector('#ws-nav-entries')?.scrollTop||0;
 const app=document.getElementById('app');
 if(currentUser){
  app.innerHTML=`<div id="workspace" class="workspace v6-root v1-root style-${state.style} ${state.navCollapsed?'nav-collapsed':''} ${state.mobileNav?'mobile-nav-open':''} ${state.shadow==='none'?'shadow-none':state.shadow==='strong'?'shadow-strong':''} density-${state.density}" style="${themeVars()}">${renderWorkspace()}</div>`;
 }else{app.innerHTML=renderLoginPage()}
 document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';
 const modal=document.getElementById('modal-root');modal.style.cssText=themeVars();
 const workspace=document.getElementById('workspace');
 const newNav=workspace?.querySelector('#ws-nav-entries');
 if(newNav)newNav.scrollTop=oldNavScroll;
 const main=workspace?.querySelector('.ws-main');
 if(main&&!opts.resetScroll)main.scrollTop=oldPageScroll;
 persist();
}

function toast(message,type='success'){let root=$('#toast-root');root.className='toast-stack';let toastEl=document.createElement('div');toastEl.className='toast '+type;toastEl.setAttribute('role','status');toastEl.innerHTML=`<span>${icon(type==='success'?'check':type==='error'?'alert':'info',17)}</span><span style="flex:1">${esc(message)}</span><button class="toast-close" aria-label="Close">×</button>`;toastEl.querySelector('button').onclick=()=>toastEl.remove();root.append(toastEl);setTimeout(()=>toastEl.remove(),3300)}
let previouslyFocused=null;function showModal(title,desc,body,footerHtml='',big=false){previouslyFocused=document.activeElement;let root=$('#modal-root');root.className='modal-style-'+state.style;root.innerHTML=`<div class="ws-modal-overlay" data-backdrop="true"><div class="ws-dialog ${big?'modal-big':''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="dialog-header"><div><h3>${title}</h3><p>${desc||''}</p></div><button class="ws-icon-btn" data-action="modal-close" aria-label="Close">${icon('close',15)}</button></div>${body}<div class="dialog-footer">${footerHtml||btn(T('关闭','Close'),'modal-close')}</div></div></div>`;root.style.cssText=themeVars();setTimeout(()=>$('.ws-dialog input, .ws-dialog button:not([data-action="modal-close"])')?.focus(),30)}
function closeModal(){let wasOpen=!!$('#modal-root .ws-dialog');$('#modal-root').innerHTML='';window._pendingDanger=null;if(wasOpen&&previouslyFocused?.isConnected)previouslyFocused.focus()}
function openAgentCreate(){showModal(T('新建 AI 智能体','Create AI agent'),T('创建新的智能体记录。','Create a new agent record.'),`<div class="modal-fields"><div class="field"><label>${T('智能体名称','Agent name')} *</label><input class="control-input" id="modal-agent-name" placeholder="${T('例如：品牌创意助手','e.g. Brand creative agent')}" maxlength="48"/></div><div class="field"><label>${T('类别','Category')}</label><select class="control-select" id="modal-agent-category"><option value="content">${T('内容创作','Content')}</option><option value="analytics">${T('数据分析','Analytics')}</option><option value="support">${T('智能客服','Support')}</option><option value="growth">${T('营销增长','Growth')}</option></select></div></div>`,btn(T('取消','Cancel'),'modal-close')+btn(T('确认创建','Create'),'agent-create','primary'))}
function openTaskCreate(lane='todo'){window._newTaskLane=lane;showModal(T('新增看板任务','Add kanban task'),T('新任务会显示在当前本地看板上。','New tasks appear in the local kanban board.'),`<div class="modal-fields"><div class="field"><label>${T('任务标题','Task title')} *</label><input id="modal-task-title" maxlength="65" class="control-input" placeholder="${T('例如：完善组件状态','e.g. Polish component states')}"/></div><div class="field"><label>${T('任务描述','Description')}</label><textarea id="modal-task-desc" class="control-textarea" placeholder="${T('补充实现目标…','Add details…')}"></textarea></div><div class="grid-2"><div class="field"><label>${T('优先级','Priority')}</label><select class="control-select" id="modal-task-priority"><option value="normal">${T('普通','Normal')}</option><option value="high">${T('高','High')}</option><option value="low">${T('低','Low')}</option></select></div><div class="field"><label>${T('初始状态','Initial lane')}</label><select class="control-select" id="modal-task-lane">${[['todo',T('待开始','To do')],['doing',T('进行中','In progress')],['review',T('待评审','Review')],['done',T('已完成','Done')]].map(([v,n])=>`<option value="${v}" ${v===lane?'selected':''}>${n}</option>`).join('')}</select></div></div></div>`,btn(T('取消','Cancel'),'modal-close')+btn(T('创建任务','Create task'),'task-create','primary'))}
function openEventCreate(){showModal(T('添加日程事件','Create calendar event'),T('保存后立即显示到月历和当日列表。','Appears immediately in the calendar and daily agenda.'),`<div class="modal-fields"><div class="field"><label>${T('事件名称','Event title')} *</label><input id="modal-event-title" class="control-input" maxlength="55" placeholder="${T('例如：设计评审','e.g. Design review')}"/></div><div class="grid-2"><div class="field"><label>${T('日期','Date')}</label><input type="date" class="control-input" id="modal-event-date" value="${esc(state.calendarDate)}"/></div><div class="field"><label>${T('时间','Time')}</label><input type="time" class="control-input" id="modal-event-time" value="10:00"/></div></div><div class="field"><label>${T('类别','Category')}</label><select class="control-select" id="modal-event-type"><option value="design">${T('设计','Design')}</option><option value="meeting">${T('会议','Meeting')}</option><option value="release">${T('发布','Release')}</option></select></div></div>`,btn(T('取消','Cancel'),'modal-close')+btn(T('保存日程','Save event'),'event-create','primary'))}
function openRowEdit(id){let r=state.rows.find(r=>r.id===id);if(!r)return;window._editId=id;showModal(T('编辑数据行','Edit table record'),`${r.id} · ${esc(r.name[state.lang])}`,`<div class="modal-fields"><div class="field"><label>${T('名称','Name')}</label><input id="modal-row-name" class="control-input" value="${esc(r.name[state.lang])}"/></div><div class="grid-2"><div class="field"><label>${T('状态','Status')}</label><select class="control-select" id="modal-row-status">${['running','paused','draft'].map(k=>`<option value="${k}" ${r.status===k?'selected':''}>${k}</option>`).join('')}</select></div><div class="field"><label>${T('任务次数','Task count')}</label><input id="modal-row-tasks" type="number" min="0" max="999999" class="control-input" value="${r.tasks}"/></div></div></div>`,btn(T('取消','Cancel'),'modal-close')+btn(T('保存修改','Save changes'),'row-save','primary'))}
function agentDetail(id){let r=state.rows.find(r=>r.id===id);if(!r)return;showModal(T('智能体运行详情','Agent runtime details'),`${r.id} · ${esc(r.name[state.lang])}`,`<div class="gap-12"><div class="row between"><span class="muted small-text">${T('当前状态','Current status')}</span>${badge(r.status)}</div><div class="row between"><span class="muted small-text">${T('任务处理数','Tasks processed')}</span><b>${r.tasks}</b></div><div class="row between"><span class="muted small-text">${T('成功率','Success rate')}</span><b>${r.score}%</b></div><div class="row between"><span class="muted small-text">${T('负责人','Owner')}</span><b>${r.owner}</b></div><div class="divider"></div><div class="small-text bold">${T('示例执行日志','Sample execution logs')}</div><pre class="export-preview" style="max-height:160px;margin:0">[10:42:01] INFO  workflow initialized\n[10:42:02] INFO  prompt validated\n[10:42:04] INFO  LLM node completed\n[10:42:05] INFO  action executed\n[10:42:06] OK    task recorded</pre></div>`,btn(T('关闭','Close'),'modal-close')+btn(r.status==='running'?T('暂停运行','Pause agent'):T('启动运行','Run agent'),'agent-toggle','primary',`data-id="${r.id}"`))}
function taskDetail(id){let task=state.tasks.find(t=>String(t.id)===String(id));if(!task)return;showModal(T('看板任务详情','Kanban task details'),`#${task.id} · ${esc(task.owner)} · ${esc(task.due)}`,`<div class="gap-12"><h3 style="margin:0">${esc(task.title[state.lang])}</h3><p class="muted">${esc(task.desc[state.lang])}</p><div class="row between"><span class="small-text">${T('优先级','Priority')}</span>${badge(task.priority)}</div><div class="row between"><span class="small-text">${T('当前列','Lane')}</span><span class="badge">${task.lane}</span></div><div class="alert">${icon('info',16)} ${T('可拖动卡片，或使用卡片底部左右箭头改变任务状态。','Drag the card or use its move arrows to change the lane.')}</div></div>`,btn(T('关闭','Close'),'modal-close')+btn(T('向右推进','Move forward'),'task-detail-move','primary',`data-id="${task.id}"`))}
function openConfirm(kind){window._pendingDanger=kind;showModal(T('确认此操作？','Confirm this action?'),T('此操作可能影响已有数据，请确认后继续。','This action may affect existing records. Please confirm.'),`<div class="alert error">${icon('alert',18)} ${kind==='bulk'?T(`将删除 ${state.tableSelected.length} 行记录，该操作在本次会话内不可撤销。`,`Delete ${state.tableSelected.length} records. This cannot be undone in this session.`):T('确认后会展示成功消息，组件数据不会被删除。','Confirming shows feedback without deleting other component data.')}</div>`,btn(T('取消','Cancel'),'modal-close')+btn(T('确认删除','Confirm delete'),'confirm-danger','danger'))}
function openNotification(){showModal(T('通知中心','Notification center'),T('最新系统通知','Latest system notifications'),`<div class="gap-12">${[[T('设计规范审核通过','Design spec approved'),T('你的排版规范已通过审核。','Your typography guidelines were approved.'),'check'],[T('异步任务执行完成','Background task completed'),T('有 24 条新任务结果可查看。','24 task results are available.'),'bot'],[T('新的组件更新','Component library update'),T('新增表单字段、骨架屏与提示组件。','New form fields, skeletons and notices.'),'spark']].map(([a,b,ic])=>`<div class="activity-item"><div class="activity-square">${icon(ic)}</div><div><strong>${a}</strong><p>${b}</p></div></div>`).join('')}</div>`,btn(T('全部已读','Mark all read'),'notice-read','primary'))}
function downloadFile(name,body,mime){let url=URL.createObjectURL(new Blob([body],{type:mime})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)}
function downloadCsv(){let header=['id','name','category','status','tasks','score','updated'],cells=[header,...sortedRows().map(r=>[r.id,r.name[state.lang],r.category[state.lang],r.status,r.tasks,r.score,r.updated])];let txt='\ufeff'+cells.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');downloadFile('Interactive_Workbench_Agents_V1.0.csv',txt,'text/csv;charset=utf-8');toast(T('CSV 数据已导出','CSV exported'))}
async function copyText(str){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(str)}else{let node=document.createElement('textarea');node.value=str;node.style.cssText='position:fixed;left:-9999px';document.body.append(node);node.focus();node.select();if(!document.execCommand('copy'))throw Error('Clipboard denied');node.remove()}toast(T('已复制到剪贴板','Copied to clipboard'))}catch{toast(T('无法自动复制，请使用导出文件','Clipboard unavailable; use file download'),'warning')}}
function exportConfig(){return JSON.stringify({name:'交互式工作台',version:'1.0.0',generatedAt:new Date().toISOString(),designSystem:styles[state.style].name,settings:Object.fromEntries(settingsKeys.filter(k=>k!=='inspectorTab').map(k=>[k,state[k]])),cssTokens:getCssTokens(),pages:PAGES.map(([id,ic,zh,en])=>({id,zh,en,icon:ic})),designBoard:state.labBoard,designNotes:state.labNotes,projectName:state.labProjectName,note:'UI prototype/demo; native framework components not included.'},null,2)}
function downloadMd(){downloadFile('Interactive_Workbench_AI_Brief_V1.0.md',generateMarkdown(),'text/markdown;charset=utf-8');toast(T('已导出 Markdown 需求上下文','Markdown design brief downloaded'))}
function resetSettings(){const page=state.page;for(const key of settingsKeys){if(key==='page')continue;state[key]=structuredClone(defaults[key])}state.page=page;state.settingsTab='appearance';render({keepDoc:true});toast(T('已恢复默认设计参数','Default design settings restored'))}
function refreshCurrentPage(){let sc=window.scrollY;$('#workspace .ws-content').innerHTML=currentPage();window.scrollTo({top:sc});}
function loadDemo(){if(state.loading)return;state.loading=true;let target=$('#table-render-zone')||$('#skeleton-demo')||$('#overview-chart');if(target){target.innerHTML=`<div style="padding:20px;display:grid;gap:12px">${Array.from({length:5},(_,i)=>`<span class="skeleton" style="width:${80-i*8}%"></span>`).join('')}</div>`}toast(T('正在更新列表…','Refreshing list…'),'info');setTimeout(()=>{state.loading=false;refreshCurrentPage();toast(T('列表已更新','List updated'))},750)}
function setSetting(key,value){if(key==='fontSize'||key==='radius'||key==='sidebarWidth')value=+value;state[key]=value;if(key==='style'){state.accent=state.accent||DEFAULT_ACCENT}render({keepDoc:true});}
function updateSelectRows(id,checked){let all=new Set(state.tableSelected);if(checked)all.add(id);else all.delete(id);state.tableSelected=[...all];refreshCurrentPage()}
function stepMove(amount){state.step=Math.min(4,Math.max(1,state.step+amount));refreshCurrentPage()}
function changeTaskLane(id,target){let task=state.tasks.find(x=>String(x.id)===String(id));if(!task)return;let lanes=['todo','doing','review','done'];let next=typeof target==='number'?lanes[Math.max(0,Math.min(3,lanes.indexOf(task.lane)+target))]:target;task.lane=next;refreshCurrentPage();toast(T('任务状态已更新','Task moved'))}
function effectSlot(label,type='component'){let s=String(label||'').toLowerCase();if(type==='page')return 'page';if(/button|按钮/.test(s))return 'button';if(/card|卡片|metric|media/.test(s))return 'card';if(/nav|navigation|menu|导航/.test(s))return 'navigation';if(/table|表格|datatable/.test(s))return 'table';if(/form|input|字段|表单/.test(s))return 'form';if(/dialog|modal|弹窗/.test(s))return 'dialog';if(/feedback|alert|toast|step/.test(s))return 'feedback';return 'other'}
function saveEffect(label,type){let x={id:String(Date.now())+Math.floor(Math.random()*999),label,type,slot:effectSlot(label,type),page:state.page,style:styles[state.style].name,styleKey:state.style,mode:state.mode,accent:state.accent||DEFAULT_ACCENT,font:state.font,fontSize:state.fontSize,radius:state.radius,iconStyle:state.iconStyle};if(state.selectedEffects.some(v=>v.label===x.label&&v.page===x.page&&v.style===x.style)){toast(T('该方案已在收藏中','Already saved'),'info');return}state.selectedEffects.unshift(x);state.selectedEffects=state.selectedEffects.slice(0,60);saveEffects();toast(T('已加入 AI 设计参考收藏','Saved for AI design handoff'))}
function saveEffects(){try{localStorage.setItem('novaflow-ui-lab-saved-effects',JSON.stringify(state.selectedEffects))}catch{}}

function syncSidebarState(){
 const w=$('#workspace'),btn=w?.querySelector('.nf-brand-toggle'),aside=w?.querySelector('.ws-sidebar');
 if(!w||!btn)return;
 const mobile=isMobile();
 w.classList.toggle('nav-collapsed',Boolean(state.navCollapsed));
 w.classList.toggle('mobile-nav-open',Boolean(state.mobileNav));
 aside?.classList.toggle('mobile-open',Boolean(state.mobileNav));
 const label=mobile?(state.mobileNav?T('关闭菜单','Close navigation'):T('打开菜单','Open navigation')):(state.navCollapsed?T('展开菜单','Expand navigation'):T('收起菜单','Collapse navigation'));
 btn.title=label;btn.setAttribute('aria-label',label);
 btn.setAttribute('aria-expanded',String(mobile?state.mobileNav:!state.navCollapsed));
 btn.innerHTML=appMark(34);btn.classList.toggle('is-collapsed',Boolean(state.navCollapsed));
 refreshNavOnly();
 document.querySelectorAll('[data-action="expand-sidebar"]').forEach(el=>el.classList.toggle('active',!state.navCollapsed));
 document.querySelectorAll('[data-action="collapse-sidebar"]').forEach(el=>el.classList.toggle('active',state.navCollapsed));
 persist();
}

function setSidebarWidth(value,save=true){
 state.sidebarWidth=Math.max(196,Math.min(420,Math.round(Number(value)||248)));
 const ws=$('#workspace');ws?.style.setProperty('--ws-sidebar-width',state.sidebarWidth+'px');
 const handle=$('#nav-resize-handle');handle?.setAttribute('aria-valuenow',String(state.sidebarWidth));
 const reading=$('#sidebar-width-reading');if(reading)reading.textContent=state.sidebarWidth+'px';
 const range=document.querySelector('[data-range-setting="sidebarWidth"]');if(range)range.value=String(state.sidebarWidth);
 if(save)persist();
}
let navDragging=false;
document.addEventListener('pointerdown',event=>{
 const handle=event.target.closest('#nav-resize-handle');if(!handle||event.button!==0)return;
 if(isMobile()||state.navCollapsed)return;
 navDragging=true;document.body.classList.add('nf-is-resizing');
 try{handle.setPointerCapture(event.pointerId)}catch{}
 event.preventDefault();
});
document.addEventListener('pointermove',event=>{
 if(!navDragging)return;
 const side=$('#ws-primary-sidebar');if(!side)return;
 const rect=side.getBoundingClientRect();
 const direction=getComputedStyle(side).direction==='rtl'?-1:1;
 const next=direction===1?event.clientX-rect.left:rect.right-event.clientX;
 setSidebarWidth(next,false);
});
document.addEventListener('pointerup',()=>{if(navDragging){navDragging=false;document.body.classList.remove('nf-is-resizing');persist()}});
document.addEventListener('pointercancel',()=>{if(navDragging){navDragging=false;document.body.classList.remove('nf-is-resizing');persist()}});
document.addEventListener('keydown',event=>{
 if(event.target?.id!=='nav-resize-handle')return;
 if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();setSidebarWidth(state.sidebarWidth+(event.key==='ArrowRight'?12:-12))}
 if(event.key==='Home'){event.preventDefault();setSidebarWidth(196)}
 if(event.key==='End'){event.preventDefault();setSidebarWidth(420)}
});
document.addEventListener('dblclick',event=>{if(event.target.closest('#nav-resize-handle'))setSidebarWidth(248)});
function act(action,el){if(labHandleAction(action,el))return;switch(action){
 case 'save-page':saveEffect(pageById(state.page)[state.lang==='zh'?2:3],'page');return;
 case 'save-component':saveEffect(el.dataset.value,'component');refreshCurrentPage();return;
 case 'clear-components':state.selectedEffects=state.selectedEffects.filter(x=>x.type!=='component');saveEffects();render({keepDoc:true});return;
 case 'remove-effect':state.selectedEffects=state.selectedEffects.filter(x=>x.id!==el.dataset.id);saveEffects();render({keepDoc:true});return;
 case 'switch-mode':setSetting('mode',state.mode==='light'?'dark':'light');return;
 case 'switch-lang':setSetting('lang',state.lang==='zh'?'en':'zh');return;
 case 'open-settings':state.page='settings-appearance';state.navGroups.system=true;render({resetScroll:true});return;
 case 'close-settings':state.page='overview';render({resetScroll:true});return;
 case 'settings-tab':state.page='settings-'+el.dataset.value;render({resetScroll:true});return;
 case 'open-export':state.page='settings-handoff';state.navGroups.system=true;render({resetScroll:true});return;
 case 'profile-menu':showModal(T('个人账户','Your account'),T('账户与个人信息','Account and profile'),`<div class="v6-profile-details"><span class="mini-avatar">${esc((currentUser?.name||'U').slice(0,1).toUpperCase())}</span><div><strong>${currentUser?.name||'用户'}</strong><p>${T('工作区管理员','Workspace administrator')}</p></div></div>`,btn(T('关闭','Close'),'modal-close')+btn(T('退出登录','Sign out'),'sign-out','danger'));return;
 case 'sign-out':logoutAuth();return;
 case 'auth-submit':void submitAuth();return;
 case 'auth-switch':authMode=authMode==='signup'?'signin':'signup';render();return;
  case 'toggle-password':{let p=document.getElementById('v6-password');if(p){p.type=p.type==='password'?'text':'password';el.setAttribute('aria-pressed',String(p.type==='text'));syncPasswordMascot()}return}
 case 'reset-settings':resetSettings();return;
 case 'reset-sidebar-width':setSidebarWidth(248);return;
 case 'go-assets':state.page='assets';render({resetScroll:true});return;
 case 'chart-line':case 'chart-bar':state.chartType=action.endsWith('bar')?'bar':'line';refreshCurrentPage();return;
 case 'refresh-demo':loadDemo();return;
 case 'notification':openNotification();return;
 case 'demo-success':toast(T('操作已完成，反馈正常。','Action completed successfully.'));return;
 case 'demo-info':toast(T('这是一个可交互的信息提示。','This is an interactive informational message.'),'info');return;
 case 'demo-error':toast(T('操作未成功，请检查输入后重试。','Unable to complete. Check input and retry.'),'error');return;
 case 'demo-warning':toast(T('请检查当前操作的注意事项。','Please review this action before continuing.'),'warning');return;
 case 'demo-load':case 'load-table':loadDemo();return;
 case 'demo-confirm':openConfirm('demo');return;
 case 'demo-details':showModal(T('多内容详情弹窗','Rich detail dialog'),T('一个包含统计信息、提示和操作的真实弹窗。','A working modal with details and controls.'),`<div class="grid-2"><div class="form-summary"><div class="tiny muted">${T('访问量','Visits')}</div><h2>12,842</h2></div><div class="form-summary"><div class="tiny muted">${T('完成率','Completion')}</div><h2>96.8%</h2></div></div><div class="alert top-gap">${icon('info',17)} ${T('弹窗内容可以承载完整详情，而不仅是一句提示。','Dialogs can hold useful detail rather than a single line.')}</div>`,btn(T('取消','Cancel'),'modal-close')+btn(T('确认','Confirm'),'modal-okay','primary'));return;
 case 'modal-okay':closeModal();toast(T('已确认','Confirmed'));return;
 case 'modal-close':closeModal();return;
 case 'confirm-danger':if(window._pendingDanger==='bulk'){state.rows=state.rows.filter(r=>!state.tableSelected.includes(r.id));state.tableSelected=[];state.tablePage=1;refreshCurrentPage()}closeModal();toast(T('操作已确认','Action confirmed'));return;
 case 'modal-agent':openAgentCreate();return;
 case 'agent-create':{
  let name=$('#modal-agent-name')?.value.trim(),kind=$('#modal-agent-category')?.value;if(!name){toast(T('请输入智能体名称','Enter an agent name'),'error');$('#modal-agent-name')?.focus();return}
  let categories={content:DATA('内容创作','Content'),analytics:DATA('数据分析','Analytics'),support:DATA('客服','Support'),growth:DATA('营销增长','Growth')};let id='AG-'+String(Math.max(...state.rows.map(r=>+r.id.split('-')[1]),1057)+1);state.rows.unshift({id,name:DATA(name,name),category:categories[kind]||categories.content,status:'draft',tasks:0,score:0,updated:new Date().toISOString().slice(0,10),owner:'You'});closeModal();state.page='agents';state.agentFilter='all';state.agentQuery='';render({keepDoc:true});toast(T('智能体已创建','Agent created'));return}
 case 'agent-toggle':{let r=state.rows.find(r=>r.id===el.dataset.id);if(!r)return;r.status=r.status==='running'?'paused':'running';closeModal();refreshCurrentPage();toast(T('智能体状态已更新','Agent state updated'));return}
 case 'agent-detail':agentDetail(el.dataset.id);return;
 case 'table-edit':openRowEdit(el.dataset.id);return;
 case 'row-save':{let r=state.rows.find(x=>x.id===window._editId);if(!r)return;let name=$('#modal-row-name')?.value.trim();if(!name){toast(T('名称不能为空','Name cannot be empty'),'error');return}r.name[state.lang]=name;r.status=$('#modal-row-status').value;r.tasks=Math.max(0,+$('#modal-row-tasks').value||0);closeModal();refreshCurrentPage();toast(T('数据行已保存','Table row saved'));return}
 case 'table-sort':{let k=el.dataset.key;if(state.tableSort===k)state.tableSortDir*=-1;else{state.tableSort=k;state.tableSortDir=1}state.tablePage=1;refreshCurrentPage();return}
 case 'table-prev':state.tablePage=Math.max(1,state.tablePage-1);refreshCurrentPage();return;
 case 'table-next':state.tablePage+=1;refreshCurrentPage();return;
 case 'table-goto':state.tablePage=+el.dataset.index;refreshCurrentPage();return;
 case 'bulk-pause':if(!state.tableSelected.length)return;state.rows.forEach(r=>{if(state.tableSelected.includes(r.id))r.status='paused'});refreshCurrentPage();toast(T('已批量暂停选中行','Selected agents paused'));return;
 case 'bulk-delete':openConfirm('bulk');return;
 case 'export-csv':downloadCsv();return;
 case 'component-tab':state.componentTab=el.dataset.value;refreshCurrentPage();return;
 case 'step-next':stepMove(1);return;
 case 'step-prev':stepMove(-1);return;
 case 'accordion':state.accordion=state.accordion===+el.dataset.index?-1:+el.dataset.index;refreshCurrentPage();return;
 case 'copy-components':copyText(['Button','Badge','Checkbox','Radio','Toggle','Text input','Date input','Range slider','Alert','Stepper','Accordion','Dialog','Skeleton'].join('\n'));return;
 case 'form-reset':state.form=structuredClone(defaultsForm);state.formError='';refreshCurrentPage();toast(T('表单已重置','Form reset'));return;
 case 'form-draft':toast(T('草稿已保存','Draft saved'));return;
 case 'form-submit':{
  let f=state.form;state.formError=f.name.trim().length<2?T('项目名称至少需要 2 个字符。','Project name requires at least 2 characters.'):!/^\S+@\S+\.\S+$/.test(f.email)?T('请填写有效的负责人邮箱。','Enter a valid owner email.'):!f.agree?T('提交前请先确认需求信息。','Confirm the brief before submitting.'):'';
  if(state.formError){refreshCurrentPage();toast(T('表单校验未通过','Form validation failed'),'error')}else{showModal(T('表单提交成功','Form submitted'),T('输入校验成功，以下为提交信息。','Validation passed. Submission details follow.'),`<div class="alert success">${icon('check',17)} ${T('已创建一条项目记录','Project created')}</div><div class="form-summary top-gap">${formSummary()}</div>`,btn(T('关闭','Close'),'modal-close','primary'));toast(T('表单校验通过','Form validated'))}return}
 case 'modal-task':openTaskCreate(el.dataset.lane||'todo');return;
 case 'task-create':{let title=$('#modal-task-title')?.value.trim();if(!title){toast(T('请输入任务标题','Task title is required'),'error');return}let description=$('#modal-task-desc')?.value.trim()||T('等待完善任务说明','Awaiting details');state.tasks.push({id:Math.max(...state.tasks.map(t=>t.id),0)+1,title:DATA(title,title),desc:DATA(description,description),lane:$('#modal-task-lane').value,priority:$('#modal-task-priority').value,owner:'You',due:new Date().toLocaleDateString('en-US',{month:'2-digit',day:'2-digit'})});closeModal();state.page='kanban';refreshCurrentPage();toast(T('新任务已创建','Task created'));return}
 case 'task-detail':taskDetail(el.dataset.id);return;
 case 'task-move':changeTaskLane(el.dataset.id,+el.dataset.dir);return;
 case 'task-detail-move':changeTaskLane(el.dataset.id,1);closeModal();return;
 case 'task-filter':state.taskFilter=el.dataset.value;refreshCurrentPage();return;
 case 'calendar-prev':case 'calendar-next':state.calendarOffset+=action==='calendar-prev'?-1:1;{let d=new Date(new Date().getFullYear(),new Date().getMonth()+state.calendarOffset,1);state.calendarDate=d.toISOString().slice(0,10)}refreshCurrentPage();return;
 case 'calendar-today':state.calendarOffset=0;state.calendarDate=new Date().toISOString().slice(0,10);refreshCurrentPage();return;
 case 'calendar-select':state.calendarDate=el.dataset.date;refreshCurrentPage();return;
 case 'modal-event':openEventCreate();return;
 case 'event-create':{let name=$('#modal-event-title')?.value.trim(),date=$('#modal-event-date')?.value,tm=$('#modal-event-time')?.value;if(!name||!date){toast(T('请填写事件名称和日期','Enter an event name and date'),'error');return}let day=new Date(date+'T12:00:00');state.calendarOffset=(day.getFullYear()-new Date().getFullYear())*12+(day.getMonth()-new Date().getMonth());state.calendarDate=date;state.events.push({id:Math.max(0,...state.events.map(e=>e.id))+1,title:DATA(name,name),date,time:tm||'10:00',type:$('#modal-event-type').value});closeModal();refreshCurrentPage();toast(T('日程已新增','Calendar event created'));return}
 case 'event-delete':state.events=state.events.filter(x=>String(x.id)!==String(el.dataset.id));refreshCurrentPage();toast(T('日程已删除','Event deleted'));return;
 case 'image-style':state.imageStyle=el.dataset.value;render({keepDoc:true});return;
 case 'icon-style':state.iconStyle=el.dataset.value;render({keepDoc:true});return;
 case 'image-detail':{let i=+el.dataset.index,n=[T('远山','Mountains'),T('潮汐','Ocean'),T('日落','Sunset'),T('梦境','Dreamscape'),T('城市','City'),T('花园','Garden')][i];showModal(n,`SVG 540 × 340 · ${state.imageStyle}`,`<img class="modal-image" src="${imageUri(i,state.imageStyle)}" alt="${esc(n)}"/><div class="tiny muted top-gap">${T('SVG 矢量插画，可用于颜色与图片裁切对比。','SVG artwork for color and image-crop comparisons.')}</div>`,btn(T('关闭','Close'),'modal-close'),true);return}
 case 'image-upload':$('#image-file')?.click();return;
 case 'copy-icon':copyText(el.dataset.value);return;
 case 'font-preset':state.font=el.dataset.value;render({keepDoc:true});return;
 case 'copy-css':copyText(getCssTokens());return;
 case 'run-progress':{
  if(window._progressTimer)clearInterval(window._progressTimer);state.progress=0;let update=()=>{let fill=$('#feedback-progress-fill'),reading=$('#feedback-progress-text');if(fill)fill.style.width=state.progress+'%';if(reading)reading.textContent=state.progress+'%'};update();window._progressTimer=setInterval(()=>{state.progress=Math.min(100,state.progress+7);update();if(state.progress===100){clearInterval(window._progressTimer);window._progressTimer=null;toast(T('任务已完成','Task completed'))}},180);return}
 case 'reset-progress':if(window._progressTimer)clearInterval(window._progressTimer);window._progressTimer=null;state.progress=0;refreshCurrentPage();return;
 case 'download-md':downloadMd();return;
 case 'download-json':downloadFile('Interactive_Workbench_Config_V1.0.json',exportConfig(),'application/json;charset=utf-8');toast(T('设计参数 JSON 已导出','Design config JSON downloaded'));return;
 case 'copy-md':copyText(generateMarkdown());return;
 case 'focus-nav-search':openNavSearch();return;
 case 'toggle-nav-group':{
   const id=el.dataset.group;if(!NAV_GROUPS.some(g=>g.id===id))return;
   if(state.navCollapsed&&!isMobile()){
     const same=state.navFlyoutGroup===id;closeNavFlyout();
     if(!same){state.navFlyoutGroup=id;renderNavFlyout()}
     return;
   }
   if(state.navQuery){state.navQuery='';const inp=$('#nav-search');if(inp)inp.value=''}
   const focused=document.activeElement===el;
   const oldScroll=$('#ws-nav-entries')?.scrollTop||0;
   state.navGroups[id]=!state.navGroups[id];refreshNavOnly();
   const newRoot=$('#ws-nav-entries');if(newRoot)newRoot.scrollTop=oldScroll;
   if(focused)newRoot?.querySelector(`[data-action="toggle-nav-group"][data-group="${id}"]`)?.focus();
   persist();return;
 }
 case 'expand-all-nav':NAV_GROUPS.forEach(g=>state.navGroups[g.id]=true);state.navQuery='';if($('#nav-search'))$('#nav-search').value='';refreshNavOnly();persist();return;
 case 'collapse-all-nav':NAV_GROUPS.forEach(g=>state.navGroups[g.id]=false);state.navQuery='';if($('#nav-search'))$('#nav-search').value='';refreshNavOnly();persist();return;
 case 'clear-nav-search':state.navQuery='';if($('#nav-search')){$('#nav-search').value='';$('#nav-search').focus()}refreshNavOnly();return;
 case 'toggle-sidebar':{
  closeNavFlyout();
  if(isMobile())state.mobileNav=!state.mobileNav;
  else {state.navCollapsed=!state.navCollapsed;state.mobileNav=false}
  syncSidebarState();return;
 }
 case 'expand-sidebar':closeNavFlyout();state.navCollapsed=false;state.mobileNav=false;syncSidebarState();return;
 case 'collapse-sidebar':closeNavFlyout();state.navCollapsed=true;state.mobileNav=false;syncSidebarState();return;
 case 'close-nav-flyout':closeNavFlyout(true);return;
 case 'close-mobile-sidebar':state.mobileNav=false;syncSidebarState();return;
 case 'mobile-nav':state.mobileNav=!state.mobileNav;syncSidebarState();return;
 default:console.warn('Unhandled action',action)
 }}
const defaultsForm={name:'',email:'',type:'design',date:'',notes:'',budget:60,notify:true,agree:false};
// Delegate all actions so repeated rerendering never creates stale listeners.
document.addEventListener('click',event=>{let el=event.target.closest('[data-style],[data-nav],[data-action],[data-setting]');if(!el){if(event.target.matches('.ws-modal-overlay'))closeModal();return}if(el.dataset.style){let k=el.dataset.style;if(styles[k])setSetting('style',k);return}if(el.dataset.nav){closeNavFlyout();closeModal();state.page=el.dataset.nav;state.mobileNav=false;state.navQuery='';render({resetScroll:true});return}if(el.dataset.setting){setSetting(el.dataset.setting,el.dataset.value);return}if(el.dataset.action){event.preventDefault();act(el.dataset.action,el)}});
document.addEventListener('click',event=>{
 if(state.navFlyoutGroup&&!event.target.closest('#iw-nav-flyout, .nf-group-toggle'))closeNavFlyout();
});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&state.navFlyoutGroup){event.preventDefault();closeNavFlyout(true)}
});
window.addEventListener('resize',()=>{if(state.navFlyoutGroup){if(isMobile())closeNavFlyout();else renderNavFlyout()}});
let searchTimer=null;
document.addEventListener('input',event=>{let el=event.target;if(el.id==='v6-password'){syncPasswordMascot();return}
 if(el.dataset.input==='nav-command-search'){
  const list=$('#nf-command-results');if(list)list.innerHTML=navCommandResults(el.value);return;
 }
 if(el.dataset.input==='nav-search'){
   state.navQuery=String(el.value||'').slice(0,80);
   refreshNavOnly();return;
 }
 if(el.dataset.labInput){if(el.dataset.labInput==='notes')state.labNotes=el.value.slice(0,2500);if(el.dataset.labInput==='name')state.labProjectName=el.value.slice(0,90);labSessionSave();return}
 if(el.dataset.rangeSetting==='sidebarWidth'){setSidebarWidth(+el.value);return}
 if(el.dataset.rangeSetting){let k=el.dataset.rangeSetting;state[k]=+el.value;let ws=$('#workspace');ws?.style.setProperty(k==='fontSize'?'--fsize':'--radius',state[k]+'px');if(k==='fontSize'){ws?.style.setProperty('--nav-fsize',(state.fontSize+3)+'px');let menuRd=$('#menu-font-reading');if(menuRd)menuRd.textContent=`${T('一级菜单','Parent menu')} ${state.fontSize-1}px · ${T('二级菜单','Child menu')} ${state.fontSize-4}px`;}$('#modal-root')?.style.setProperty(k==='fontSize'?'--fsize':'--radius',state[k]+'px');applyGlobalTheme();let rd=$('#'+(k==='fontSize'?'font':'radius')+'-reading');if(rd)rd.textContent=state[k]+'px';persist();return}
 if(el.dataset.inputSetting){state[el.dataset.inputSetting]=el.value;$('#workspace')?.style.setProperty('--accent',el.value);$('#modal-root')?.style.setProperty('--accent',el.value);persist();return}
 if(el.dataset.input){let key=el.dataset.input;let v=el.value;let pos=el.selectionStart;if(key==='table-search'){state.tableSearch=v;state.tablePage=1}else if(key==='agent-query')state.agentQuery=v;else if(key==='icon-query')state.iconQuery=v;clearTimeout(searchTimer);searchTimer=setTimeout(()=>{refreshCurrentPage();let target=$('#'+({['table-search']:'table-search',['agent-query']:'agent-query',['icon-query']:'icon-search'}[key]));if(target){target.focus();try{target.setSelectionRange(pos,pos)}catch{}}},170);return}
 if(el.dataset.field){let k=el.dataset.field;state.form[k]=(el.type==='checkbox'?el.checked:el.type==='range'?+el.value:el.value);let sum=$('#form-summary');if(sum)sum.innerHTML=formSummary();if(k==='budget'){let rd=$('#budget-reading');if(rd)rd.textContent=el.value+'%'}return}
});
document.addEventListener('change',event=>{let el=event.target;
 if(el.dataset.labFile==='project'){
  const file=el.files?.[0];if(!file)return;
  if(file.size>100*1024){toast(T('文件不能超过 100KB','File must be smaller than 100KB'),'error');return}
  const reader=new FileReader();reader.onload=()=>{
    try{const o=JSON.parse(String(reader.result));
      if(o.format!=='NovaFlow-UI-Lab-Design'||!labValidateProject(o))throw Error('Invalid format');
      if(state.labProjects.length>=30)throw Error('Too many saved designs');
      const p={id:'import-'+Date.now(),name:o.name,updatedAt:new Date().toISOString(),board:Object.fromEntries(Object.entries(o.board).filter(([k,v])=>LAB_SLOTS.some(s=>s[0]===k)&&LAB_STYLES.includes(v))),notes:String(o.notes||'').slice(0,2500),settings:o.settings||{},selectedEffects:Array.isArray(o.selectedEffects)?o.selectedEffects.slice(0,40):[]};
      state.labProjects.unshift(p);labPersistProjects();labRestoreProject(p.id);toast(T('JSON 导入成功','JSON imported'));
    }catch(e){toast(T('JSON 格式不正确或超过保存数量限制','Invalid or unsupported project JSON'),'error')}
  };reader.readAsText(file);return;
 }

 if(el.dataset.selectSetting){setSetting(el.dataset.selectSetting,el.value);return}
 if(el.dataset.rangeSetting||el.dataset.inputSetting){render({keepDoc:true});return}
 if(el.dataset.change==='range'){state.range=el.value;refreshCurrentPage();return}
 if(el.dataset.change==='table-status'){state.tableStatus=el.value;state.tablePage=1;refreshCurrentPage();return}
 if(el.dataset.change==='agent-status'){state.agentFilter=el.value;refreshCurrentPage();return}
 if(el.dataset.change==='table-select'){updateSelectRows(el.dataset.id,el.checked);return}
 if(el.dataset.change==='table-select-all'){let rows=sortedRows().slice((state.tablePage-1)*6,state.tablePage*6),ids=rows.map(r=>r.id),all=new Set(state.tableSelected);ids.forEach(id=>el.checked?all.add(id):all.delete(id));state.tableSelected=[...all];refreshCurrentPage();return}
 if(el.dataset.exportSection){let k=el.dataset.exportSection;let set=new Set(state.exportSections);if(el.checked)set.add(k);else set.delete(k);state.exportSections=EXPORT_OPTIONS.map(x=>x[0]).filter(k=>set.has(k));render({keepDoc:true});return}
 if(el.dataset.field){state.form[el.dataset.field]=el.type==='checkbox'?el.checked:el.value;let sum=$('#form-summary');if(sum)sum.innerHTML=formSummary();return}
 if(el.dataset.upload){let f=el.files?.[0];if(!f)return;if(el.dataset.upload==='form'){$('#attached-file').textContent=f.name;toast(T('已选择文件，仅记录文件名','File selected; filename only'));return}if(!f.type.startsWith('image/')){toast(T('请选择图片文件','Please select an image'),'error');return}if(f.size>3*1024*1024){toast(T('图片不能超过 3MB','Image must be under 3MB'),'error');return}let reader=new FileReader();reader.onload=()=>{state.selectedImage={name:f.name,data:String(reader.result)};refreshCurrentPage();toast(T('本地图片已加载','Local image loaded'))};reader.readAsDataURL(f);return}
});

// Palette is keyboard-operable even when native drag and drop is not available.
document.addEventListener('keydown',event=>{const e=event.target.closest?.('.nf-palette-list [data-lab-source]');if(e&&(event.key==='Enter'||event.key===' ')){event.preventDefault();e.click()}});
// Composition-board keyboard-accessible dropdown + HTML5 drag-and-drop.
document.addEventListener('change',event=>{let el=event.target.closest('[data-lab-select]');if(!el)return;const slot=el.dataset.labSelect,val=el.value;if(!LAB_SLOTS.some(x=>x[0]===slot))return;if(val&&LAB_STYLES.includes(val))state.labBoard[slot]=val;else delete state.labBoard[slot];labSessionSave();refreshCurrentPage()});
let nfDrag=null;
document.addEventListener('dragstart',event=>{let src=event.target.closest('[data-lab-source],[data-lab-reorder]');if(!src)return;nfDrag=src.dataset.labSource?{kind:'source',data:src.dataset.labSource}:{kind:'order',data:src.dataset.labReorder};event.dataTransfer.setData('text/plain','nf:'+nfDrag.kind+':'+nfDrag.data);event.dataTransfer.effectAllowed='move'});
document.addEventListener('dragover',event=>{let slot=event.target.closest('[data-lab-drop]');if(!slot||!nfDrag)return;event.preventDefault();slot.classList.add('nf-drag-over')});
document.addEventListener('dragleave',event=>{let slot=event.target.closest('[data-lab-drop]');if(slot&&!slot.contains(event.relatedTarget))slot.classList.remove('nf-drag-over')});
document.addEventListener('drop',event=>{let slot=event.target.closest('[data-lab-drop]');if(!slot||!nfDrag)return;event.preventDefault();const dest=slot.dataset.labDrop;if(nfDrag.kind==='source'){let [type,style]=nfDrag.data.split(':');if(type!==dest){toast(T('请拖入相同类型的组件槽位','Drop into the matching component slot'),'warning');return}if(LAB_STYLES.includes(style))state.labBoard[dest]=style}else if(nfDrag.kind==='order'){let from=state.labOrder.indexOf(nfDrag.data),to=state.labOrder.indexOf(dest);if(from>=0&&to>=0){const [moved]=state.labOrder.splice(from,1);state.labOrder.splice(to,0,moved)}}nfDrag=null;labSessionSave();refreshCurrentPage()});
document.addEventListener('dragend',()=>{nfDrag=null;document.querySelectorAll('.nf-drag-over').forEach(n=>n.classList.remove('nf-drag-over'))});

document.addEventListener('dragstart',event=>{let el=event.target.closest('[data-task]');if(!el)return;event.dataTransfer.setData('text/plain',el.dataset.task);event.dataTransfer.effectAllowed='move'});
document.addEventListener('dragover',event=>{let lane=event.target.closest('[data-lane]');if(!lane)return;event.preventDefault();lane.classList.add('dragover')});
document.addEventListener('dragleave',event=>{let lane=event.target.closest('[data-lane]');if(lane&&!lane.contains(event.relatedTarget))lane.classList.remove('dragover')});
document.addEventListener('drop',event=>{let lane=event.target.closest('[data-lane]');if(!lane)return;event.preventDefault();let id=event.dataTransfer.getData('text/plain');changeTaskLane(id,lane.dataset.lane)});
document.addEventListener('keydown',event=>{
 const navControl=event.target.closest?.('#ws-nav-entries .nav-btn, #ws-nav-entries .nf-group-toggle');
 if(navControl && !event.altKey && !event.ctrlKey && !event.metaKey){
   const navRoot=$('#ws-nav-entries');
   const visible=Array.from(navRoot?.querySelectorAll('.nf-group-toggle,.nav-btn')||[]).filter(el=>el.getClientRects().length>0 && getComputedStyle(el).visibility!=='hidden');
   const i=visible.indexOf(navControl);
   if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
     event.preventDefault();
     const next=event.key==='Home'?0:event.key==='End'?visible.length-1:event.key==='ArrowDown'?Math.min(i+1,visible.length-1):Math.max(i-1,0);
     visible[next]?.focus();return;
   }
   if(navControl.matches('.nf-group-toggle') && ['ArrowRight','ArrowLeft'].includes(event.key)){
     event.preventDefault();
     const shouldOpen=event.key==='ArrowRight';
     if((navControl.getAttribute('aria-expanded')==='true')!==shouldOpen)navControl.click();
     return;
   }
 }
 if(document.activeElement?.id==='nav-command-search'){
  if(event.key==='Enter'){
   event.preventDefault();$('#nf-command-results [data-nav]')?.click();return;
  }
  if(event.key==='ArrowDown'){
   event.preventDefault();$('#nf-command-results [data-nav]')?.focus();return;
  }
 }
 let modal=$('#modal-root .ws-dialog');if(modal&&event.key==='Tab'){let focusables=[...modal.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])')];let i=focusables.indexOf(document.activeElement);if(focusables.length){if(event.shiftKey&&i<=0){event.preventDefault();focusables[focusables.length-1].focus()}else if(!event.shiftKey&&i===focusables.length-1){event.preventDefault();focusables[0].focus()}}}if((event.key==='Enter'||event.key===' ')&&document.activeElement?.matches('.media-item')){event.preventDefault();document.activeElement.click()}if(event.key==='Escape'){closeModal();if(state.mobileNav){state.mobileNav=false;syncSidebarState()}}if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openNavSearch()}
 if(event.key==='Escape'&&document.activeElement?.id==='nav-search'&&state.navQuery){event.preventDefault();state.navQuery='';document.activeElement.value='';refreshNavOnly()}});

document.addEventListener('submit',event=>{if(event.target?.id==='v6-login-form'){event.preventDefault();void submitAuth()}});

// Both the visible button and the Enter key use the same authentication pathway.
document.addEventListener('keydown',event=>{
 if(event.key!=='Enter'||event.isComposing)return;
 if(event.target?.id==='v6-account'||event.target?.id==='v6-password'){
  event.preventDefault();void submitAuth();
 }
});
document.addEventListener('focusin',event=>{if(event.target?.id==='v6-password')syncPasswordMascot()});
document.addEventListener('focusout',event=>{if(event.target?.id==='v6-password')setTimeout(syncPasswordMascot,0)});

state.navGroups=Object.fromEntries(NAV_GROUPS.map(g=>[g.id,state.navGroups?.[g.id]!==false]));
if(!PAGES.some(p=>p[0]===state.page))state.page='overview';
state.navQuery='';
state.navCollapsed=state.navCollapsed===true;if(!styles[state.style])state.style='ant';if(!ICON_STYLES.some(x=>x[0]===state.iconStyle))state.iconStyle='line';if(!IMAGE_STYLES.some(x=>x[0]===state.imageStyle))state.imageStyle='gradient';if(!DENSITIES.some(x=>x[0]===state.density))state.density='comfortable';state.fontSize=Math.max(10,Math.min(30,Number(state.fontSize)||14));state.radius=Math.max(0,Math.min(30,Number(state.radius)||0));if(!['light','dark'].includes(state.mode))state.mode='light';if(!['zh','en'].includes(state.lang))state.lang='zh';// Paint the loading state once before mounting the fully interactive workspace.
requestAnimationFrame(()=>setTimeout(()=>{
 try{
  if(WORKBENCH_ENTRY==='workspace'&&!currentUser){window.location.replace(WORKBENCH_LOGIN_FILE);return}
  if(WORKBENCH_ENTRY==='login'&&currentUser){window.location.replace(WORKBENCH_INDEX_FILE);return}
  monthEvents();render();document.documentElement.dataset.bootReady='true'
 }
 catch(error){console.error('Interactive Workbench startup failed',error);const root=document.getElementById('app');if(root)root.innerHTML='<div class="v6-startup-error">工作台启动失败，请使用 Chrome 或 Edge 打开，并查看控制台。</div>';}
},0));
})();