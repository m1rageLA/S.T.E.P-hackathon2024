import * as THREE from 'three';
import { createMesh } from './meshCreator.js'

function createMeshes(scene) {
  const characterMesh = createMesh({
    size: {x: 1, y: 1, z: 1},
    material: new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  });
  scene.add(characterMesh);

  const platformMesh = createMesh({
    size: {x: 500, y: 1, z: 500},
    position: {x: 0, y: -1, z: 0},
    material: new THREE.MeshStandardMaterial({ color: 0xffffff }),
  });
  scene.add(platformMesh);

  return {
    characterMesh,
    platformMesh
  };
}

export { createMeshes };