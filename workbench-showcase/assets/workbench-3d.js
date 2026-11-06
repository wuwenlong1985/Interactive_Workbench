import * as THREE from '../vendor/three.module.js';

const canvas = document.querySelector('#workbench3d');
const fallback = document.querySelector('#cssScene');
const imagePanels = [
  { src: './assets/overview.png', width: 5.1, height: 3.2, x: 0, y: 0.25, z: 0.2, ry: -0.04, rx: 0.02 },
  { src: './assets/components.png', width: 3.35, height: 2.1, x: -2.55, y: -0.58, z: -0.72, ry: 0.24, rx: 0.01 },
  { src: './assets/analytics.png', width: 3.35, height: 2.1, x: 2.55, y: -0.5, z: -0.88, ry: -0.24, rx: 0.01 },
  { src: './assets/design-studio.png', width: 3.5, height: 2.2, x: 0.15, y: -1.38, z: -1.8, ry: 0.01, rx: 0.14 }
];

if (canvas) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 32);
    camera.position.set(0, 0.25, 9.5);
    camera.lookAt(0, -0.15, -0.2);
    scene.add(new THREE.HemisphereLight('#ffffff', '#a9bfdc', 2.2));
    const key = new THREE.DirectionalLight('#ffffff', 2.5);
    key.position.set(-3, 6, 8);
    scene.add(key);
    const deck = new THREE.Group();
    scene.add(deck);
    const loader = new THREE.TextureLoader();
    const materialsReady = Promise.all(imagePanels.map((panel, index) => new Promise((resolve, reject) => {
      loader.load(panel.src, texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const frame = new THREE.Mesh(new THREE.BoxGeometry(panel.width + 0.07, panel.height + 0.07, 0.055), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.36, metalness: 0.08 }));
        const screen = new THREE.Mesh(new THREE.PlaneGeometry(panel.width, panel.height), new THREE.MeshBasicMaterial({ map: texture }));
        screen.position.z = 0.031;
        const group = new THREE.Group();
        group.add(frame, screen);
        group.position.set(panel.x, panel.y, panel.z);
        group.rotation.set(panel.rx, panel.ry, 0);
        group.userData.baseY = panel.y;
        group.userData.phase = index * 1.4;
        deck.add(group);
        resolve();
      }, undefined, reject);
    })));
    const connectorMaterial = new THREE.LineBasicMaterial({ color: '#6d96cb', transparent: true, opacity: 0.26 });
    const connectorPoints = [new THREE.Vector3(-2.55, -0.58, -0.72), new THREE.Vector3(0, 0.25, 0.2), new THREE.Vector3(2.55, -0.5, -0.88), new THREE.Vector3(0.15, -1.38, -1.8)].map(p => p.clone());
    const connector = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(connectorPoints), connectorMaterial);
    connector.position.z = -1.5;
    scene.add(connector);
    let width = 0, height = 0, pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width; height = rect.height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 580 ? 12.2 : 9.5;
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(canvas);
    resize();
    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.22;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
    });
    canvas.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    let visible = true;
    new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; }, { threshold: 0.05 }).observe(canvas);
    materialsReady.then(() => { if (fallback) fallback.style.display = 'none'; }).catch(() => {});
    const tick = () => {
      requestAnimationFrame(tick);
      if (!visible || !width || !height) return;
      const t = clock.getElapsedTime();
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      if (!reduced && !window.__workbench3dPaused) {
        deck.rotation.y = Math.sin(t * 0.22) * 0.055 + pointerX;
        deck.rotation.x = Math.sin(t * 0.18) * 0.018 + pointerY;
        deck.children.forEach(panel => { panel.position.y = panel.userData.baseY + Math.sin(t * 0.7 + panel.userData.phase) * 0.055; });
      }
      renderer.render(scene, camera);
    };
    tick();
  } catch (error) {
    if (fallback) fallback.style.display = 'grid';
    console.info('Three.js WebGL is unavailable; showing the screenshot-panel CSS scene.', error);
  }
}