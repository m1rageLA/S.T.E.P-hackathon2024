import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

function createModelLoader(scene) {

  const obstacles = [];

  init();

  function loadModels()  {
    return new Promise((resolve, reject) => {
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
          sceneModel.rotation.set(0, -90 * DEG2RAD, 0);
          sceneModel.castShadow = true;
  
          // Search for obstacles in scene
          const obstacleThresholdSize = 1;
          sceneModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.metalness = 0;
  
              const box = new THREE.Box3().setFromObject(child);
              const size = new THREE.Vector3();
              box.getSize(size);
              const sizeList = [...size];
  
              if (sizeList.some(item => item >= obstacleThresholdSize)) {
                obstacles.push(child);
              }
            }
          });
  
          scene.add(sceneModel);
          resolve(sceneModel);
        },
        undefined,
        (error) => {
          console.error("An error occurred while loading the model:", error);
          reject(error); 
        }
      );
    });
  };

  async function init() {
    await loadModels();
  } 

  return {
    obstacles
  }
}


export { createModelLoader };