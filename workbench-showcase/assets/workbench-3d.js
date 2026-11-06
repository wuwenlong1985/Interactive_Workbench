import * as THREE from '../vendor/three.module.js';
import { addReferenceCube } from './generated-cube.js';

const canvas = document.querySelector('#workbench3d');
if (canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const cssFallback = document.querySelector('#cssScene');
  if (cssFallback) cssFallback.style.display = 'none';
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#edf4ff', 9, 20);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
  camera.position.set(4.5, 3.25, 7.2);

  scene.add(new THREE.HemisphereLight('#ffffff', '#b5c8e1', 2.0));
  const key = new THREE.DirectionalLight('#ffffff', 3.2);
  key.position.set(3, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight('#6d8fff', 20, 12);
  rim.position.set(-3, 1.5, -2);
  scene.add(rim);

  const rig = new THREE.Group();
  scene.add(rig);
  const model = new THREE.Group();
  rig.add(model);

  // The central BoxGeometry is generated from the real login screenshot by
  // the img2threejs/plugin-hello-cube deterministic image-to-code recipe.
  const cube = addReferenceCube(THREE, model);
  cube.position.set(0, 0.48, 0);
  cube.rotation.set(0.22, 0.38, 0.04);
  cube.castShadow = true;
  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(cube.geometry),
    new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.58 })
  );
  edge.position.copy(cube.position);
  edge.rotation.copy(cube.rotation);
  model.add(edge);

  const blue = new THREE.MeshStandardMaterial({ color: '#4c8dff', roughness: 0.26, metalness: 0.15 });
  const pale = new THREE.MeshStandardMaterial({ color: '#f8fbff', roughness: 0.36, metalness: 0.08 });
  const mint = new THREE.MeshStandardMaterial({ color: '#5ac9ae', roughness: 0.32, metalness: 0.12 });
  const amber = new THREE.MeshStandardMaterial({ color: '#ffc676', roughness: 0.32, metalness: 0.08 });

  const platform = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.25, 0.14, 72), pale);
  platform.position.y = -0.88;
  platform.receiveShadow = true;
  model.add(platform);
  const platformLine = new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.018, 8, 80), blue);
  platformLine.rotation.x = Math.PI / 2;
  platformLine.position.y = -0.78;
  model.add(platformLine);

  const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.58, 0.012, 8, 120), new THREE.MeshBasicMaterial({ color: '#8aa9dc', transparent: true, opacity: 0.55 }));
  orbit.rotation.x = 1.06;
  orbit.rotation.y = -0.32;
  model.add(orbit);

  const cards = new THREE.Group();
  model.add(cards);
  const cardSpecs = [
    { x: -2.35, y: 0.72, z: 0.15, rx: -0.18, ry: -0.18, w: 1.12, h: 0.7, material: pale },
    { x: 2.28, y: 0.38, z: -0.1, rx: 0.16, ry: 0.3, w: 1.05, h: 0.66, material: mint },
    { x: -0.05, y: 1.82, z: -0.55, rx: -0.28, ry: 0.04, w: 0.82, h: 0.52, material: amber },
    { x: 1.83, y: -0.35, z: 0.48, rx: 0.26, ry: 0.5, w: 0.72, h: 0.48, material: pale }
  ];
  const cardObjects = cardSpecs.map((spec, index) => {
    const group = new THREE.Group();
    group.position.set(spec.x, spec.y, spec.z);
    group.rotation.set(spec.rx, spec.ry, 0);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(spec.w, spec.h, 0.055), spec.material);
    panel.castShadow = true;
    group.add(panel);
    const lineMaterial = index === 1 ? mint : blue;
    for (let i = 0; i < 3; i++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(spec.w * (0.45 + 0.12 * (i % 2)), 0.035, 0.012), lineMaterial);
      line.position.set(-spec.w * 0.17, 0.12 - i * 0.12, 0.036);
      group.add(line);
    }
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), index === 2 ? amber : blue);
    dot.position.set(-spec.w * 0.34, spec.h * 0.3, 0.045);
    group.add(dot);
    cards.add(group);
    return group;
  });

  for (let i = 0; i < 7; i++) {
    const bead = new THREE.Mesh(new THREE.SphereGeometry(i % 2 ? 0.055 : 0.04, 12, 10), i % 3 ? blue : mint);
    const a = i / 7 * Math.PI * 2;
    bead.position.set(Math.cos(a) * (2.15 + (i % 2) * 0.22), -0.1 + Math.sin(i * 2.1) * 0.68, Math.sin(a) * 1.8);
    model.add(bead);
  }

  const floor = new THREE.Mesh(new THREE.CircleGeometry(5.4, 64), new THREE.MeshBasicMaterial({ color: '#edf4ff', transparent: true, opacity: 0.45 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.07;
  scene.add(floor);

  let width = 0, height = 0, pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width; height = rect.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 580 ? 9.2 : 7.2;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  canvas.addEventListener('pointermove', event => {
    const rect = canvas.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.42;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.24;
  });
  canvas.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = false;
  const motionButton = document.querySelector('#toggle-model-motion');
  if (motionButton) {
    if (reduced) {
      motionButton.textContent = '已遵循减少动态效果偏好';
      motionButton.disabled = true;
    } else {
      motionButton.addEventListener('click', () => {
        paused = !paused;
        motionButton.textContent = paused ? '继续动画' : '暂停动画';
      });
    }
  }
  const clock = new THREE.Clock();
  let visible = true;
  const visibility = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; }, { threshold: 0.05 });
  visibility.observe(canvas);
  const tick = () => {
    requestAnimationFrame(tick);
    if (!visible || !width || !height) return;
    const t = clock.getElapsedTime();
    pointerX += (targetX - pointerX) * 0.035;
    pointerY += (targetY - pointerY) * 0.035;
    if (!reduced && !paused) {
      model.rotation.y = t * 0.13 + pointerX;
      model.rotation.x = Math.sin(t * 0.28) * 0.035 + pointerY;
      cube.rotation.y = 0.38 + t * 0.24;
      cube.position.y = 0.48 + Math.sin(t * 0.78) * 0.08;
      edge.position.copy(cube.position);
      edge.rotation.copy(cube.rotation);
      cardObjects.forEach((item, i) => { item.position.y = cardSpecs[i].y + Math.sin(t * 0.8 + i * 1.7) * 0.08; });
      orbit.rotation.z = t * 0.06;
    }
    renderer.render(scene, camera);
  };
  tick();
}
