import * as THREE from 'three';

function createCharacterController(characterMesh) {

  const properties = {
    speed: 0.1,
  }

  function moveTowards(position) {
    const currentPosition = characterMesh.position;
    const positionDifference = new THREE.Vector3().subVectors(position, currentPosition);
    positionDifference.y = 0;
    let moved = false;
    if (positionDifference.length() > properties.speed) {
      const movementDirection = positionDifference.normalize();
      const movement = movementDirection.multiplyScalar(properties.speed);
      characterMesh.position.add(movement);
      moved = true;
    }
    return {
      moved
    }
  }

  return {
    moveTowards
  }
}

export { createCharacterController };