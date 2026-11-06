// Adapted from the deterministic image-to-Three.js emitter in
// https://github.com/img2threejs/plugin-hello-cube (Apache-2.0).
// Same input image always yields the same cube color and edge length.
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const reference = resolve(root, '../docs/screenshots/05-login.jpg');
const output = resolve(root, 'assets/generated-cube.js');
const image = await readFile(reference);
const color = createHash('sha256').update(image).digest('hex').slice(0, 6);
const size = (0.5 + (image.length % 151) / 100).toFixed(2);

const source = `// Generated from docs/screenshots/05-login.jpg with img2threejs/plugin-hello-cube's deterministic image-to-code recipe.
// Reference image SHA-256: ${createHash('sha256').update(image).digest('hex')}
// Apache-2.0 attribution and license: ../vendor/PLUGIN-HELLO-CUBE-LICENSE.txt
export function addReferenceCube(THREE, scene) {
  const geometry = new THREE.BoxGeometry(${size}, ${size}, ${size});
  const material = new THREE.MeshStandardMaterial({ color: 0x${color}, roughness: 0.32, metalness: 0.18 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return cube;
}
`;

await writeFile(output, source, 'utf8');
console.log(JSON.stringify({ reference, output, color: `#${color}`, size }));
