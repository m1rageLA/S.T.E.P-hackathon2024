import * as THREE from "three";
import { createMeshes } from "./meshFactory.js";
import { createCharacterController } from "./characterController.js";
import { aStarFindPath } from "./pathFinder.js";
import { createModelLoader } from "./modelLoader.js";
import store from "../store.js";
import { setBlurred } from "../redux/reduxSlice.js";

function getSceneUpdate(scene, inputMap, renderer, camera) {
  // Init meshesPool
  const modelLoader = createModelLoader(scene);
  let obstacles = modelLoader.obstacles;

  let meshesPool = createMeshes(scene);
  meshesPool = {
    ...meshesPool,
    obstacles,
  };

  const characterController = createCharacterController(
    meshesPool.characterMesh
  );
  let position;

  let movementAllowed = true;
  let interactableActivated = false;

  function getClickPosition() {
    if (inputMap.mouseUp && inputMap.event !== undefined) {
      const raycaster = new THREE.Raycaster();
      let normalizedMousePosition = new THREE.Vector2();
      normalizedMousePosition.x =
        (inputMap.event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      normalizedMousePosition.y =
        ((inputMap.event.clientY / renderer.domElement.clientHeight) * 2 - 1) *
        -1;

      raycaster.setFromCamera(normalizedMousePosition, camera);

      let interactPosition = checkInteractables(raycaster);

      if (interactPosition) {
        return interactPosition;
      }

      let interactions = raycaster.intersectObject(
        meshesPool.platformMesh,
        false
      );

      if (interactions.length > 0) {
        return interactions[0].point;
      }
    }
  }

  function checkInteractables(raycaster) {
    for (const i of Object.values(modelLoader.interactables)) {
      let interactions = raycaster.intersectObject(i.mesh, false);

      if (interactions.length > 0) {
        interactableActivated = true;
        position = i.name;
        return i.interactPosition;
      }
    }
  }

  let followsPath = false;
  let path = new THREE.Vector3();
  let currentPathStepIndex;

  function updateScene() {
    if (interactableActivated) {
      movementAllowed = false;
    }

    if (!followsPath && interactableActivated) {
      movementAllowed = false;
      interactableActivated = false;

      // Update blur state based on your logic
      // setBlurred(true); // or false, depending on your logic
      store.dispatch(setBlurred(true));
      localStorage.setItem("place", position);
      console.log(movementAllowed);
      console.log(interactableActivated);
    } else if (
      localStorage.getItem("place") === null ||
      localStorage.getItem("place") === undefined
    ) {
      
      store.dispatch(setBlurred(false));
      movementAllowed = true;
    }

    const clickPosition = getClickPosition();
    if (clickPosition && movementAllowed) {
      let newPath = aStarFindPath(
        meshesPool.characterMesh.position,
        clickPosition,
        scene,
        meshesPool
      );
      if (newPath) {
        path = newPath;
        currentPathStepIndex = 0;
        followsPath = true;
      }
    }

    if (followsPath) {
      const result = characterController.moveTowards(
        path[currentPathStepIndex]
      );

      if (!result.moved) {
        if (currentPathStepIndex < path.length - 1) {
          currentPathStepIndex++;
        } else {
          followsPath = false;
        }
      }
    }

    meshesPool.characterMesh.rotation.x += 0.01;
    meshesPool.characterMesh.rotation.y += 0.01;
  }

  return {
    updateScene,
  };
}

export { getSceneUpdate };
