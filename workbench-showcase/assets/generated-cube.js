// Generated from docs/screenshots/05-login.jpg with img2threejs/plugin-hello-cube's deterministic image-to-code recipe.
// Reference image SHA-256: 7e6ca45ba46e0c76ff429c0ee8a50ecba14b2d673ca875918c02dfc11c44d9ea
// Apache-2.0 attribution and license: ../vendor/PLUGIN-HELLO-CUBE-LICENSE.txt
export function addReferenceCube(THREE, scene) {
  const geometry = new THREE.BoxGeometry(1.61, 1.61, 1.61);
  const material = new THREE.MeshStandardMaterial({ color: 0x7e6ca4, roughness: 0.32, metalness: 0.18 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return cube;
}
