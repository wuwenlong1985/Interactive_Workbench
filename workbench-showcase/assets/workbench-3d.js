import * as THREE from '../vendor/three.module.js';

const canvas = document.querySelector('#workbench3d');
if (canvas) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.set(0, 0, 9);
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const ringColors = [0x6096ef, 0x8b79e6, 0x55c8ba, 0xa6c8ff];
    ringColors.forEach((color, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.9 + index * 0.27, index === 0 ? 0.012 : 0.008, 6, 180),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.27 - index * 0.035 })
      );
      ring.scale.set(1.28, 0.72 + index * 0.04, 1);
      ring.rotation.set(0.98 + index * 0.13, index * 0.27, index * 0.32);
      orbitGroup.add(ring);
    });

    const particlePositions = new Float32Array(84 * 3);
    for (let i = 0; i < 84; i += 1) {
      const angle = (i / 84) * Math.PI * 2;
      const radius = 3.4 + (i % 5) * 0.12;
      particlePositions[i * 3] = Math.cos(angle) * radius * 1.17;
      particlePositions[i * 3 + 1] = Math.sin(angle) * radius * 0.33;
      particlePositions[i * 3 + 2] = -0.8 + Math.sin(angle * 3) * 0.28;
    }
    const particles = new THREE.BufferGeometry();
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const dust = new THREE.Points(particles, new THREE.PointsMaterial({ color: 0x6b95d4, size: 0.028, transparent: true, opacity: 0.38, sizeAttenuation: true }));
    scene.add(dust);

    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = true;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 580 ? 11.6 : 9;
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; }, { threshold: 0.05 }).observe(canvas);
    resize();

    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.16;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.1;
    });
    canvas.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    const tick = () => {
      requestAnimationFrame(tick);
      if (!visible || !width || !height) return;
      const time = clock.getElapsedTime();
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      if (!reduced && !window.__workbench3dPaused) {
        orbitGroup.rotation.z = Math.sin(time * 0.12) * 0.03;
        orbitGroup.rotation.y = pointerX + Math.sin(time * 0.16) * 0.025;
        orbitGroup.rotation.x = pointerY + Math.sin(time * 0.13) * 0.018;
        dust.rotation.z = -time * 0.008;
      }
      renderer.render(scene, camera);
    };
    tick();
  } catch (error) {
    canvas.style.display = 'none';
    console.info('Three.js orbit decoration is unavailable; live CSS 3D pages remain visible.', error);
  }
}
