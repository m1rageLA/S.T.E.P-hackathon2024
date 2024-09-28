import * as THREE from 'three';
import { createMesh } from './meshCreator.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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


  // Load scene model
  const obstacles = [];

  const loader = new GLTFLoader();
  loader.load(
    "/SceneNotComplete.glb",
    (gltf) => {
      const DEG2RAD = Math.PI / 180;

      // Setup scene model on scene
      const sceneModel = gltf.scene;
      sceneModel.position.set(2, -0.5, 2);
      const sceneScale = 0.7;
      sceneModel.scale.set(sceneScale, sceneScale, sceneScale);
      sceneModel.rotation.set(0, -90 * DEG2RAD, 0)
      sceneModel.castShadow = true;

      // Search for obstacles in scene
      const obstacleTresholdSize = 1;
      sceneModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.metalness = 0;

          const box = new THREE.Box3().setFromObject(child);

          const size = new THREE.Vector3();
          box.getSize(size);

          const sizeList = [...size];

          if (sizeList.some(item => item >= obstacleTresholdSize)) {
            obstacles.push(child);
          }
        }
      });

      scene.add(sceneModel);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  // Return an object containing the meshes for later access
  return {
    obstacles,
    characterMesh,
    platformMesh
  };
}

export { createMeshes };