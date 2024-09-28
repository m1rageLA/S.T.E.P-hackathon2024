import * as THREE from 'three';
import { createMesh } from './meshCreator.js'

function createMeshes(scene) {
  const characterMesh = createMesh({
    size: {x: 1, y: 1, z: 1},
    material: new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  });
  scene.add(characterMesh);

  const terminalMesh = createMesh({
    size: {x: 1, y: 1, z: 1},
    position: {x: 10, y: 0, z: 0},
    material: new THREE.MeshStandardMaterial({ color: 0x304fff }),
  });
  scene.add(terminalMesh);

  const computerMesh = createMesh({
    size: {x: 1, y: 1, z: 1},
    position: {x: -10, y: 0, z: 0},
    material: new THREE.MeshStandardMaterial({ color: 0x304fff }),
  });
  scene.add(computerMesh);

  const testMesh = createMesh({
    size: {x: 1, y: 1, z: 1},
    position: {x: 0, y: 0, z: -7},
    material: new THREE.MeshStandardMaterial({ color: 0x304fff }),
  });
  scene.add(testMesh);

  const obstacle1Mesh = createMesh({
    size: {x: 3, y: 3, z: 6},
    position: {x: 2, y: 1, z: -3},
    material: new THREE.MeshStandardMaterial({ color: 0x304fff }),
  });
  scene.add(obstacle1Mesh);

  const platformMesh = createMesh({
    size: {x: 500, y: 1, z: 500},
    position: {x: 0, y: -1, z: 0},
    material: new THREE.MeshStandardMaterial({ color: 0xffffff }),
  });
  scene.add(platformMesh);

  // Return an object containing the meshes for later access
  return {
    obstacles: {
      obstacle1Mesh
    },
    characterMesh,
    terminalMesh,
    computerMesh,
    testMesh,
    platformMesh
  };
}

export { createMeshes };