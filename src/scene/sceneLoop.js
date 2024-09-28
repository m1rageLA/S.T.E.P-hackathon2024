import * as THREE from 'three';
import { createMeshes } from './meshFactory.js';
import { createCharacterController } from './characterController.js';
import { current } from '@reduxjs/toolkit';
import { createMesh } from './meshCreator.js';
import { aStarFindPath } from './pathFinder.js';

function getSceneUpdate(scene, inputMap, renderer, camera) {
  const meshesPool = createMeshes(scene);

  const characterController = createCharacterController(meshesPool.characterMesh);

  function getClickPostion() {
    if (inputMap.mouseUp && inputMap.event != undefined) {
      const raycaster = new THREE.Raycaster();
      let normalizedMousePosition = new THREE.Vector2();
      normalizedMousePosition.x = (inputMap.event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      normalizedMousePosition.y = ((inputMap.event.clientY / renderer.domElement.clientHeight) * 2 - 1) * -1;
      
      raycaster.setFromCamera(normalizedMousePosition, camera);

      let interactions = raycaster.intersectObject(meshesPool.platformMesh, false);

      if (interactions.length > 0) {
        return interactions[0].point;
      }
    }
  }

  let followsPath = false
  let path = new THREE.Vector3();
  let currentPathStepIndex;

  function updateScene() {
    const clickPosition = getClickPostion();
    if (clickPosition) {
      let newPath = aStarFindPath(meshesPool.characterMesh.position, clickPosition, scene, meshesPool);
      if (newPath) {
        path = newPath;
        currentPathStepIndex = 0
        followsPath = true;
      }
    }

    if (followsPath) {
      const result = characterController.moveTowards(path[currentPathStepIndex])
      if (!result.moved && currentPathStepIndex < path.length - 1) {
        currentPathStepIndex++;
      }
    }
    
    meshesPool.characterMesh.rotation.x += 0.01;
    meshesPool.characterMesh.rotation.y += 0.01;
  }

  return {
    updateScene,
  }
}

export { getSceneUpdate };